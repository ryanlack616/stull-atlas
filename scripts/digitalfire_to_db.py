"""
digitalfire_to_db.py — ETL pipeline for Digitalfire ceramic reference data.

Reads 163 JSON part files of scraped HTML from Tony Hansen's Digitalfire
Reference Library, parses content intelligently, and loads into a SQLite
database with FTS5 full-text search for AI-powered ceramic knowledge queries.

Usage:
    python digitalfire_to_db.py                   # build the database
    python digitalfire_to_db.py --query "alumina"  # search it

Output: C:\\home\\claude\\digitalfire\\digitalfire.db
"""

import json
import os
import re
import sqlite3
import sys
import time
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote_plus

# ── Configuration ──────────────────────────────────────────────────────────

DATA_DIR = Path(r"C:\home\claude\digitalfire")
DB_PATH = DATA_DIR / "digitalfire.db"

# Categories worth indexing (skip schools, consultants — low technical value)
SKIP_CATEGORIES = {"schools", "consultants", "4sight", "potterytony"}


# ── HTML Parsing ───────────────────────────────────────────────────────────

class ContentExtractor(HTMLParser):
    """Extract clean text from HTML, skipping script/style/nav."""

    SKIP_TAGS = {"script", "style", "nav", "footer", "noscript", "iframe"}
    BLOCK_TAGS = {"p", "div", "h1", "h2", "h3", "h4", "h5", "h6",
                  "li", "tr", "br", "hr", "blockquote", "dt", "dd",
                  "table", "thead", "tbody", "section", "article"}

    def __init__(self):
        super().__init__()
        self.parts: list[str] = []
        self.skip_depth = 0
        self._current_tag = None

    def handle_starttag(self, tag, attrs):
        tag = tag.lower()
        self._current_tag = tag
        if tag in self.SKIP_TAGS:
            self.skip_depth += 1
        if tag in self.BLOCK_TAGS and self.parts:
            self.parts.append("\n")
        if tag == "br":
            self.parts.append("\n")

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag in self.SKIP_TAGS:
            self.skip_depth = max(0, self.skip_depth - 1)
        if tag in self.BLOCK_TAGS:
            self.parts.append("\n")

    def handle_data(self, data):
        if self.skip_depth == 0:
            self.parts.append(data)

    def get_text(self) -> str:
        raw = "".join(self.parts)
        # Collapse whitespace within lines, preserve paragraph breaks
        lines = raw.split("\n")
        cleaned = []
        for line in lines:
            line = " ".join(line.split())  # collapse whitespace
            if line:
                cleaned.append(line)
        text = "\n".join(cleaned)
        # Collapse 3+ newlines to 2
        text = re.sub(r"\n{3,}", "\n\n", text)
        return text.strip()


class LinkExtractor(HTMLParser):
    """Extract cross-reference links to other digitalfire pages."""

    def __init__(self):
        super().__init__()
        self.links: list[tuple[str, str]] = []  # (url, anchor_text)
        self._in_link = False
        self._link_url = ""
        self._link_text_parts: list[str] = []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            href = dict(attrs).get("href", "")
            if "digitalfire.com/" in href or href.startswith("/"):
                self._in_link = True
                if href.startswith("/"):
                    href = "https://digitalfire.com" + href
                self._link_url = href
                self._link_text_parts = []

    def handle_endtag(self, tag):
        if tag == "a" and self._in_link:
            text = " ".join("".join(self._link_text_parts).split())
            if text and self._link_url:
                self.links.append((self._link_url, text))
            self._in_link = False

    def handle_data(self, data):
        if self._in_link:
            self._link_text_parts.append(data)


def extract_content_html(html: str) -> str:
    """Extract the main content area from full page HTML.

    Strategy: find the <h1> tag which marks start of real content,
    take everything from there to end of body, stripping footer boilerplate.
    """
    # Find h1 — marks content start
    h1_match = re.search(r"<h1[^>]*>", html)
    if h1_match:
        content = html[h1_match.start():]
    else:
        # Fallback: skip past </nav> and the boilerplate header
        nav_end = html.find("</nav>")
        if nav_end > 0:
            content = html[nav_end + 6:]
        else:
            # Last resort: just use body
            body_match = re.search(r"<body[^>]*>", html)
            content = html[body_match.end():] if body_match else html

    # Remove footer / end-of-page boilerplate
    # Look for common footer markers
    for marker in [
        '<div class="footer"',
        '<footer',
        "<!-- Footer -->",
        "Feedback, Pair",  # Tony's footer text
        "Copyright Tony Hansen",
        '<div id="footer"',
    ]:
        idx = content.find(marker)
        if idx > 100:  # don't clip if marker is near start
            content = content[:idx]
            break

    return content


def parse_entry(url: str, html: str) -> dict:
    """Parse a single scraped page into structured data."""
    # Extract metadata from <head>
    title_match = re.search(r"<title>(.*?)</title>", html, re.DOTALL)
    title = title_match.group(1).strip() if title_match else None

    desc_match = re.search(r'<meta name="description" content="(.*?)"', html)
    description = desc_match.group(1).strip() if desc_match else None

    # Parse URL to get category and slug
    path = url.replace("https://digitalfire.com/", "")
    parts = path.split("/", 1)
    category = parts[0] if parts else "unknown"
    slug = parts[1] if len(parts) > 1 else ""

    # Extract content area HTML
    content_html = extract_content_html(html)

    # Extract clean text from content area only
    extractor = ContentExtractor()
    extractor.feed(content_html)
    body_text = extractor.get_text()

    # Remove the collapsed index listing that appears at top of many pages
    # These are lists of "All Glossary", "All Recipe Codes", etc.
    # They start with collapsible button text and end before the h1 content
    body_text = strip_index_listing(body_text)

    # Extract cross-references from content area
    link_extractor = LinkExtractor()
    link_extractor.feed(content_html)
    cross_refs = link_extractor.links

    return {
        "url": url,
        "category": category,
        "slug": slug,
        "title": title,
        "description": description,
        "body_text": body_text,
        "content_html": content_html,
        "cross_refs": cross_refs,
    }


def strip_index_listing(text: str) -> str:
    """Remove the collapsed all-items index that appears at top of many pages."""
    # These typically look like a massive list of "|"-separated links
    lines = text.split("\n")
    cleaned = []
    skip_until_real = False
    for line in lines:
        # Detect index listings: lines with many " | " separators
        if line.count(" | ") > 10 or line.count(" |") > 15:
            continue
        # Skip "All Glossary", "All Recipe Codes", etc. button text
        if re.match(
            r"^(All (Glossary|Recipe|Materials|Pictures|Oxide|Article|Test|Video|"
            r"Hazard|Trouble|Properties|Typecodes|Temperature|Schedule|Project))",
            line,
        ):
            continue
        cleaned.append(line)
    return "\n".join(cleaned).strip()


# ── Database ───────────────────────────────────────────────────────────────

def create_database(db_path: Path) -> sqlite3.Connection:
    """Create the SQLite database with schema and FTS5."""
    # Remove existing DB
    if db_path.exists():
        db_path.unlink()

    conn = sqlite3.connect(str(db_path))
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL")

    conn.executescript("""
        CREATE TABLE pages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT UNIQUE NOT NULL,
            category TEXT NOT NULL,
            slug TEXT NOT NULL,
            title TEXT,
            description TEXT,
            body_text TEXT,
            content_html TEXT
        );

        CREATE TABLE cross_refs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            from_url TEXT NOT NULL,
            to_url TEXT NOT NULL,
            anchor_text TEXT,
            FOREIGN KEY (from_url) REFERENCES pages(url)
        );

        CREATE INDEX idx_pages_category ON pages(category);
        CREATE INDEX idx_pages_slug ON pages(slug);
        CREATE INDEX idx_cross_refs_from ON cross_refs(from_url);
        CREATE INDEX idx_cross_refs_to ON cross_refs(to_url);

        -- FTS5 full-text search index
        CREATE VIRTUAL TABLE pages_fts USING fts5(
            title,
            description,
            body_text,
            content='pages',
            content_rowid='id',
            tokenize='porter unicode61'
        );

        -- Triggers to keep FTS in sync with pages table
        CREATE TRIGGER pages_ai AFTER INSERT ON pages BEGIN
            INSERT INTO pages_fts(rowid, title, description, body_text)
            VALUES (new.id, new.title, new.description, new.body_text);
        END;

        CREATE TRIGGER pages_ad AFTER DELETE ON pages BEGIN
            INSERT INTO pages_fts(pages_fts, rowid, title, description, body_text)
            VALUES ('delete', old.id, old.title, old.description, old.body_text);
        END;

        CREATE TRIGGER pages_au AFTER UPDATE ON pages BEGIN
            INSERT INTO pages_fts(pages_fts, rowid, title, description, body_text)
            VALUES ('delete', old.id, old.title, old.description, old.body_text);
            INSERT INTO pages_fts(rowid, title, description, body_text)
            VALUES (new.id, new.title, new.description, new.body_text);
        END;
    """)

    return conn


def insert_entry(conn: sqlite3.Connection, entry: dict):
    """Insert a parsed entry into the database."""
    conn.execute(
        """INSERT OR IGNORE INTO pages
           (url, category, slug, title, description, body_text, content_html)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (
            entry["url"],
            entry["category"],
            entry["slug"],
            entry["title"],
            entry["description"],
            entry["body_text"],
            entry["content_html"],
        ),
    )

    # Insert cross-references
    for to_url, anchor_text in entry["cross_refs"]:
        conn.execute(
            """INSERT INTO cross_refs (from_url, to_url, anchor_text)
               VALUES (?, ?, ?)""",
            (entry["url"], to_url, anchor_text),
        )


# ── Query Interface ───────────────────────────────────────────────────────

def search(conn: sqlite3.Connection, query: str, limit: int = 10,
           category: str = None) -> list[dict]:
    """Full-text search across the database."""
    sql = """
        SELECT p.id, p.url, p.category, p.title, p.description,
               snippet(pages_fts, 2, '>>>', '<<<', '...', 64) as snippet,
               rank
        FROM pages_fts
        JOIN pages p ON p.id = pages_fts.rowid
        WHERE pages_fts MATCH ?
    """
    params: list = [query]

    if category:
        sql += " AND p.category = ?"
        params.append(category)

    sql += " ORDER BY rank LIMIT ?"
    params.append(limit)

    rows = conn.execute(sql, params).fetchall()
    return [
        {
            "id": r[0],
            "url": r[1],
            "category": r[2],
            "title": r[3],
            "description": r[4],
            "snippet": r[5],
            "rank": r[6],
        }
        for r in rows
    ]


def get_page(conn: sqlite3.Connection, url: str) -> dict | None:
    """Get full content of a page by URL."""
    row = conn.execute(
        "SELECT * FROM pages WHERE url = ?", (url,)
    ).fetchone()
    if not row:
        return None
    cols = [d[0] for d in conn.execute("SELECT * FROM pages LIMIT 0").description]
    return dict(zip(cols, row))


def get_related(conn: sqlite3.Connection, url: str) -> list[dict]:
    """Get pages linked from a given page."""
    rows = conn.execute(
        """SELECT cr.to_url, cr.anchor_text, p.title, p.category
           FROM cross_refs cr
           LEFT JOIN pages p ON p.url = cr.to_url
           WHERE cr.from_url = ?
           ORDER BY cr.anchor_text""",
        (url,),
    ).fetchall()
    return [
        {"url": r[0], "anchor_text": r[1], "title": r[2], "category": r[3]}
        for r in rows
    ]


def stats(conn: sqlite3.Connection) -> dict:
    """Get database statistics."""
    total = conn.execute("SELECT COUNT(*) FROM pages").fetchone()[0]
    cats = conn.execute(
        "SELECT category, COUNT(*) FROM pages GROUP BY category ORDER BY COUNT(*) DESC"
    ).fetchall()
    refs = conn.execute("SELECT COUNT(*) FROM cross_refs").fetchone()[0]
    return {"total_pages": total, "categories": dict(cats), "total_cross_refs": refs}


# ── Main ETL ───────────────────────────────────────────────────────────────

def build_database():
    """Main ETL: read all JSON files, parse, and load into SQLite."""
    print(f"Building database at {DB_PATH}")
    print(f"Reading data from {DATA_DIR}")

    conn = create_database(DB_PATH)

    # Collect all data file paths
    data_files = sorted(
        DATA_DIR.glob("digitalfire_data_part*.json"),
        key=lambda p: int(re.search(r"part(\d+)", p.name).group(1)),
    )
    print(f"Found {len(data_files)} data files")

    total_entries = 0
    total_skipped = 0
    total_refs = 0
    start_time = time.time()

    for i, fpath in enumerate(data_files):
        with open(fpath, "r", encoding="utf-8") as f:
            data = json.load(f)

        batch_count = 0
        for url, entry_data in data.items():
            # Determine category
            path = url.replace("https://digitalfire.com/", "")
            cat = path.split("/")[0] if "/" in path else "root"

            if cat in SKIP_CATEGORIES:
                total_skipped += 1
                continue

            html = entry_data.get("html", "")
            if not html or len(html) < 100:
                total_skipped += 1
                continue

            try:
                entry = parse_entry(url, html)
                # Skip entries with very little body text (likely empty/error pages)
                if len(entry["body_text"]) < 50:
                    total_skipped += 1
                    continue

                insert_entry(conn, entry)
                total_entries += 1
                total_refs += len(entry["cross_refs"])
                batch_count += 1
            except Exception as e:
                print(f"  ERROR parsing {url}: {e}")
                total_skipped += 1

        conn.commit()

        # Progress update every 10 files
        if (i + 1) % 10 == 0 or i == len(data_files) - 1:
            elapsed = time.time() - start_time
            print(
                f"  [{i+1}/{len(data_files)}] "
                f"{total_entries} entries, {total_refs} refs, "
                f"{total_skipped} skipped, {elapsed:.1f}s"
            )

    # Optimize FTS index
    print("Optimizing FTS index...")
    conn.execute("INSERT INTO pages_fts(pages_fts) VALUES('optimize')")
    conn.commit()

    # Final stats
    elapsed = time.time() - start_time
    s = stats(conn)
    print(f"\n{'='*60}")
    print(f"Database built in {elapsed:.1f}s")
    print(f"Total pages: {s['total_pages']}")
    print(f"Total cross-references: {s['total_cross_refs']}")
    print(f"Skipped: {total_skipped}")
    print(f"\nCategories:")
    for cat, count in sorted(s["categories"].items(), key=lambda x: -x[1]):
        print(f"  {cat:20s} {count:>6}")
    print(f"\nDatabase size: {DB_PATH.stat().st_size / 1024 / 1024:.1f} MB")
    print(f"Location: {DB_PATH}")

    conn.close()


# ── CLI ────────────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) > 1 and sys.argv[1] == "--query":
        query = " ".join(sys.argv[2:])
        if not query:
            print("Usage: python digitalfire_to_db.py --query <search terms>")
            sys.exit(1)

        conn = sqlite3.connect(str(DB_PATH))
        results = search(conn, query, limit=10)
        if not results:
            print(f"No results for: {query}")
        else:
            print(f"\n{len(results)} results for: {query}\n")
            for r in results:
                print(f"  [{r['category']:12s}] {r['title']}")
                print(f"  {r['url']}")
                if r["description"]:
                    print(f"  {r['description'][:120]}")
                print(f"  ...{r['snippet']}...")
                print()
        conn.close()

    elif len(sys.argv) > 1 and sys.argv[1] == "--stats":
        conn = sqlite3.connect(str(DB_PATH))
        s = stats(conn)
        print(f"Total pages: {s['total_pages']}")
        print(f"Total cross-refs: {s['total_cross_refs']}")
        for cat, count in sorted(s["categories"].items(), key=lambda x: -x[1]):
            print(f"  {cat:20s} {count:>6}")
        conn.close()

    elif len(sys.argv) > 1 and sys.argv[1] == "--page":
        url = sys.argv[2]
        conn = sqlite3.connect(str(DB_PATH))
        page = get_page(conn, url)
        if page:
            print(f"Title: {page['title']}")
            print(f"Category: {page['category']}")
            print(f"Description: {page['description']}")
            print(f"\n{page['body_text'][:3000]}")

            related = get_related(conn, url)
            if related:
                print(f"\n--- Related ({len(related)} links) ---")
                for r in related[:20]:
                    print(f"  [{r['category'] or '?':12s}] {r['anchor_text']}")
        else:
            print(f"Not found: {url}")
        conn.close()

    else:
        build_database()


if __name__ == "__main__":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    main()
