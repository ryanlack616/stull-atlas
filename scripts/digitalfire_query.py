"""
digitalfire_query.py — AI-friendly query interface for the Digitalfire ceramic database.

Designed to be called by AI agents to look up ceramic chemistry, materials,
glaze troubleshooting, and technical reference from Tony Hansen's Digitalfire
Reference Library (4,851 indexed pages, 190K cross-references).

Usage:
    python digitalfire_query.py search "cone 6 matte glaze"
    python digitalfire_query.py search "crazing" --category trouble
    python digitalfire_query.py lookup "https://digitalfire.com/glossary/stull+chart"
    python digitalfire_query.py material "EPK"
    python digitalfire_query.py oxide "Al2O3"
    python digitalfire_query.py related "https://digitalfire.com/oxide/al2o3"
    python digitalfire_query.py stats
"""

import io
import json
import sqlite3
import sys
from pathlib import Path

DB_PATH = Path(r"C:\home\claude\digitalfire\digitalfire.db")


def get_conn():
    return sqlite3.connect(str(DB_PATH))


def search(query: str, category: str = None, limit: int = 10) -> list[dict]:
    """Full-text search. Returns title, url, category, description, and snippet."""
    conn = get_conn()
    sql = """
        SELECT p.url, p.category, p.title, p.description,
               snippet(pages_fts, 2, '>>>', '<<<', '...', 80) as snippet
        FROM pages_fts
        JOIN pages p ON p.id = pages_fts.rowid
        WHERE pages_fts MATCH ?
    """
    params = [query]
    if category:
        sql += " AND p.category = ?"
        params.append(category)
    sql += " ORDER BY rank LIMIT ?"
    params.append(limit)

    rows = conn.execute(sql, params).fetchall()
    conn.close()
    return [
        {"url": r[0], "category": r[1], "title": r[2],
         "description": r[3], "snippet": r[5] if len(r) > 5 else r[4]}
        for r in rows
    ]


def lookup(url: str) -> dict | None:
    """Get full page content by URL."""
    conn = get_conn()
    row = conn.execute(
        "SELECT url, category, title, description, body_text FROM pages WHERE url = ?",
        (url,),
    ).fetchone()
    conn.close()
    if not row:
        return None
    return {
        "url": row[0], "category": row[1], "title": row[2],
        "description": row[3], "body_text": row[4],
    }


def find_material(name: str) -> list[dict]:
    """Search for a material by name. Searches title and body."""
    conn = get_conn()
    # Try exact title match first
    rows = conn.execute(
        "SELECT url, title, description, body_text FROM pages "
        "WHERE category = 'material' AND title LIKE ? LIMIT 5",
        (f"%{name}%",),
    ).fetchall()

    if not rows:
        # Fall back to FTS
        rows = conn.execute(
            """SELECT p.url, p.title, p.description,
                      snippet(pages_fts, 2, '>>>', '<<<', '...', 80) as snippet
               FROM pages_fts
               JOIN pages p ON p.id = pages_fts.rowid
               WHERE pages_fts MATCH ? AND p.category = 'material'
               ORDER BY rank LIMIT 5""",
            (name,),
        ).fetchall()
        conn.close()
        return [
            {"url": r[0], "title": r[1], "description": r[2], "snippet": r[3]}
            for r in rows
        ]

    conn.close()
    return [
        {"url": r[0], "title": r[1], "description": r[2],
         "body_text": r[3][:2000]}
        for r in rows
    ]


def find_oxide(formula: str) -> dict | None:
    """Look up a specific oxide by formula (e.g., Al2O3, SiO2, CaO)."""
    conn = get_conn()
    # Try matching the slug (URL path)
    row = conn.execute(
        "SELECT url, title, description, body_text FROM pages "
        "WHERE category = 'oxide' AND (slug LIKE ? OR title LIKE ?) LIMIT 1",
        (f"%{formula.lower()}%", f"%{formula}%"),
    ).fetchone()
    conn.close()
    if not row:
        return None
    return {
        "url": row[0], "title": row[1], "description": row[2],
        "body_text": row[3][:3000],
    }


def get_related(url: str) -> list[dict]:
    """Get pages linked from a given page."""
    conn = get_conn()
    rows = conn.execute(
        """SELECT DISTINCT cr.to_url, cr.anchor_text, p.title, p.category
           FROM cross_refs cr
           LEFT JOIN pages p ON p.url = cr.to_url
           WHERE cr.from_url = ?
           ORDER BY p.category, cr.anchor_text""",
        (url,),
    ).fetchall()
    conn.close()
    return [
        {"url": r[0], "anchor_text": r[1], "title": r[2], "category": r[3]}
        for r in rows
    ]


def get_stats() -> dict:
    """Database statistics."""
    conn = get_conn()
    total = conn.execute("SELECT COUNT(*) FROM pages").fetchone()[0]
    cats = conn.execute(
        "SELECT category, COUNT(*) FROM pages GROUP BY category ORDER BY COUNT(*) DESC"
    ).fetchall()
    refs = conn.execute("SELECT COUNT(*) FROM cross_refs").fetchone()[0]
    conn.close()
    return {"total_pages": total, "categories": dict(cats), "total_cross_refs": refs}


def main():
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(0)

    cmd = sys.argv[1]

    if cmd == "search":
        query = " ".join(sys.argv[2:])
        # Parse --category flag
        cat = None
        if "--category" in sys.argv:
            idx = sys.argv.index("--category")
            cat = sys.argv[idx + 1]
            query = " ".join(
                a for i, a in enumerate(sys.argv[2:], 2)
                if i != idx and i != idx + 1
            )
        results = search(query, category=cat)
        for r in results:
            print(f"[{r['category']:12s}] {r['title']}")
            print(f"  {r['url']}")
            if r["description"]:
                print(f"  {r['description'][:150]}")
            if r.get("snippet"):
                print(f"  {r['snippet'][:200]}")
            print()

    elif cmd == "lookup":
        url = sys.argv[2]
        page = lookup(url)
        if page:
            print(f"# {page['title']}")
            print(f"Category: {page['category']}")
            print(f"URL: {page['url']}")
            if page["description"]:
                print(f"\n> {page['description']}")
            print(f"\n{page['body_text']}")
        else:
            print(f"Not found: {url}")

    elif cmd == "material":
        name = " ".join(sys.argv[2:])
        results = find_material(name)
        for r in results:
            print(f"# {r['title']}")
            print(f"  {r['url']}")
            if r.get("description"):
                print(f"  {r['description']}")
            if r.get("body_text"):
                print(f"  {r['body_text'][:1000]}")
            if r.get("snippet"):
                print(f"  {r['snippet']}")
            print()

    elif cmd == "oxide":
        formula = sys.argv[2]
        result = find_oxide(formula)
        if result:
            print(f"# {result['title']}")
            print(f"URL: {result['url']}")
            if result["description"]:
                print(f"\n> {result['description']}")
            print(f"\n{result['body_text']}")
        else:
            print(f"Oxide not found: {formula}")

    elif cmd == "related":
        url = sys.argv[2]
        results = get_related(url)
        print(f"{len(results)} related pages:")
        for r in results:
            cat = r["category"] or "?"
            print(f"  [{cat:12s}] {r['anchor_text']} -> {r['title'] or r['url']}")

    elif cmd == "stats":
        s = get_stats()
        print(f"Total pages: {s['total_pages']}")
        print(f"Total cross-refs: {s['total_cross_refs']}")
        print(f"\nCategories:")
        for cat, count in sorted(s["categories"].items(), key=lambda x: -x[1]):
            print(f"  {cat:20s} {count:>6}")

    else:
        print(f"Unknown command: {cmd}")
        print(__doc__)


if __name__ == "__main__":
    main()
