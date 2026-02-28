"""
Phase 1: Build the Digitalfire Reference Database.

Takes the production DB and adds:
  1. FTS5 full-text search index across all content types
  2. Pre-computed "related content" for each page (from 144K link graph)
  3. Pre-computed oxide-similarity rankings between materials
  4. Unified search_index table for fast category-grouped results

Output: digitalfire_reference.db — ready for sql.js in the browser
"""
import sqlite3
import json
import math
import os
import sys
import time
from collections import defaultdict

SRC_DB = r'C:\rje\dev\digitalfire\databases\digitalfire_production.db'
OUT_DB = r'C:\rje\dev\digitalfire-archive\public\digitalfire_reference.db'


def copy_source(src, dst):
    """Copy production DB as our starting point."""
    for f in [dst, dst + '-wal', dst + '-shm']:
        if os.path.exists(f):
            os.remove(f)

    conn_src = sqlite3.connect(src)
    conn_dst = sqlite3.connect(dst)
    conn_dst.execute('PRAGMA journal_mode=WAL')

    tables = [r[0] for r in conn_src.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence' ORDER BY name"
    ).fetchall()]

    total = 0
    for t in tables:
        schema = conn_src.execute(
            f"SELECT sql FROM sqlite_master WHERE type='table' AND name='{t}'"
        ).fetchone()[0]

        conn_dst.execute(schema)
        rows = conn_src.execute(f'SELECT * FROM [{t}]').fetchall()
        if rows:
            placeholders = ', '.join(['?'] * len(rows[0]))
            conn_dst.executemany(f'INSERT INTO [{t}] VALUES ({placeholders})', rows)
        total += len(rows)
        print(f'  Copied {t}: {len(rows):,}')

    conn_dst.commit()
    conn_src.close()
    return conn_dst, total


def build_search_index(conn):
    """Build a unified search index covering all content types.

    Each row has: category, title, snippet (first ~300 chars), url, page_id,
    and the full searchable text goes into the FTS5 table.
    """
    c = conn.cursor()

    # Unified index table (for metadata alongside FTS)
    c.execute("DROP TABLE IF EXISTS search_index")
    c.execute("""
        CREATE TABLE search_index (
            rowid INTEGER PRIMARY KEY,
            category TEXT NOT NULL,
            title TEXT,
            snippet TEXT,
            url TEXT,
            page_id INTEGER
        )
    """)

    # FTS5 virtual table — content-linked to search_index
    c.execute("DROP TABLE IF EXISTS search_fts")
    c.execute("""
        CREATE VIRTUAL TABLE search_fts USING fts5(
            title,
            body,
            category,
            content='search_index',
            content_rowid='rowid',
            tokenize='porter unicode61'
        )
    """)

    def snippet(text, max_len=300):
        if not text:
            return ''
        # First meaningful paragraph
        lines = [l.strip() for l in text.split('\n') if l.strip() and not l.strip().startswith('#')]
        para = ' '.join(lines)
        if len(para) > max_len:
            return para[:max_len].rsplit(' ', 1)[0] + '...'
        return para

    rowid = 0

    # --- Materials (4,380) ---
    rows = c.execute("""
        SELECT p.id, p.url, p.title, p.clean_text,
               mc.body_text
        FROM pages p
        LEFT JOIN material_content mc ON mc.url = p.url
        WHERE p.category = 'material'
    """).fetchall()
    for pid, url, title, clean, body in rows:
        rowid += 1
        text = body or clean or ''
        # Enrich with alt names
        alts = c.execute(
            "SELECT GROUP_CONCAT(alt_name, ', ') FROM material_alt_names WHERE page_id=?", (pid,)
        ).fetchone()[0]
        if alts:
            text = f"{title}. Also known as: {alts}. {text}"
        c.execute(
            "INSERT INTO search_index (rowid, category, title, snippet, url, page_id) VALUES (?,?,?,?,?,?)",
            (rowid, 'material', title, snippet(text), url, pid)
        )
        c.execute(
            "INSERT INTO search_fts (rowid, title, body, category) VALUES (?,?,?,?)",
            (rowid, title or '', text, 'material')
        )

    mat_count = len(rows)
    print(f'  Indexed materials: {mat_count}')

    # --- Glossary (404) ---
    rows = c.execute("""
        SELECT p.id, p.url, p.title, gc.body_text
        FROM pages p
        LEFT JOIN glossary_content gc ON gc.url = p.url
        WHERE p.category = 'glossary'
    """).fetchall()
    for pid, url, title, body in rows:
        rowid += 1
        text = body or ''
        c.execute(
            "INSERT INTO search_index (rowid, category, title, snippet, url, page_id) VALUES (?,?,?,?,?,?)",
            (rowid, 'glossary', title, snippet(text), url, pid)
        )
        c.execute(
            "INSERT INTO search_fts (rowid, title, body, category) VALUES (?,?,?,?)",
            (rowid, title or '', text, 'glossary')
        )
    print(f'  Indexed glossary: {len(rows)}')

    # --- Articles (181) ---
    rows = c.execute("""
        SELECT p.id, p.url, p.title, ac.body
        FROM pages p
        LEFT JOIN article_content ac ON ac.page_id = p.id
        WHERE p.category = 'article'
    """).fetchall()
    for pid, url, title, body in rows:
        rowid += 1
        text = body or ''
        c.execute(
            "INSERT INTO search_index (rowid, category, title, snippet, url, page_id) VALUES (?,?,?,?,?,?)",
            (rowid, 'article', title, snippet(text), url, pid)
        )
        c.execute(
            "INSERT INTO search_fts (rowid, title, body, category) VALUES (?,?,?,?)",
            (rowid, title or '', text, 'article')
        )
    print(f'  Indexed articles: {len(rows)}')

    # --- Recipes (139) ---
    rows = c.execute("""
        SELECT p.id, p.url, p.title, rc.body_text, rfi.cone, rfi.atmosphere
        FROM pages p
        LEFT JOIN recipe_content rc ON rc.url = p.url
        LEFT JOIN recipe_firing_info rfi ON rfi.url = p.url
        WHERE p.category = 'recipe'
    """).fetchall()
    for pid, url, title, body, cone, atm in rows:
        rowid += 1
        text = body or ''
        if cone:
            text = f"Cone {cone}. {text}"
        if atm:
            text = f"{atm}. {text}"
        c.execute(
            "INSERT INTO search_index (rowid, category, title, snippet, url, page_id) VALUES (?,?,?,?,?,?)",
            (rowid, 'recipe', title, snippet(text), url, pid)
        )
        c.execute(
            "INSERT INTO search_fts (rowid, title, body, category) VALUES (?,?,?,?)",
            (rowid, title or '', text, 'recipe')
        )
    print(f'  Indexed recipes: {len(rows)}')

    # --- Pictures (2,794) ---
    rows = c.execute("""
        SELECT p.id, p.url, p.title, pc.caption, pc.body_text
        FROM pages p
        LEFT JOIN picture_content pc ON pc.url = p.url
        WHERE p.category = 'picture'
    """).fetchall()
    for pid, url, title, caption, body in rows:
        rowid += 1
        text = f"{caption or ''} {body or ''}".strip()
        c.execute(
            "INSERT INTO search_index (rowid, category, title, snippet, url, page_id) VALUES (?,?,?,?,?,?)",
            (rowid, 'picture', title, snippet(text), url, pid)
        )
        c.execute(
            "INSERT INTO search_fts (rowid, title, body, category) VALUES (?,?,?,?)",
            (rowid, title or '', text, 'picture')
        )
    print(f'  Indexed pictures: {len(rows)}')

    # --- Hazards (110) ---
    rows = c.execute("""
        SELECT p.id, p.url, p.title, hc.body
        FROM pages p
        LEFT JOIN hazard_content hc ON hc.page_id = p.id
        WHERE p.category = 'hazard'
    """).fetchall()
    for pid, url, title, body in rows:
        rowid += 1
        text = body or ''
        c.execute(
            "INSERT INTO search_index (rowid, category, title, snippet, url, page_id) VALUES (?,?,?,?,?,?)",
            (rowid, 'hazard', title, snippet(text), url, pid)
        )
        c.execute(
            "INSERT INTO search_fts (rowid, title, body, category) VALUES (?,?,?,?)",
            (rowid, title or '', text, 'hazard')
        )
    print(f'  Indexed hazards: {len(rows)}')

    # --- Trouble guides (32) ---
    rows = c.execute("""
        SELECT p.id, p.url, p.title, tg.details
        FROM pages p
        LEFT JOIN trouble_guides tg ON tg.page_id = p.id
        WHERE p.category = 'trouble'
    """).fetchall()
    for pid, url, title, body in rows:
        rowid += 1
        text = body or ''
        c.execute(
            "INSERT INTO search_index (rowid, category, title, snippet, url, page_id) VALUES (?,?,?,?,?,?)",
            (rowid, 'trouble', title, snippet(text), url, pid)
        )
        c.execute(
            "INSERT INTO search_fts (rowid, title, body, category) VALUES (?,?,?,?)",
            (rowid, title or '', text, 'trouble')
        )
    print(f'  Indexed trouble guides: {len(rows)}')

    # --- Tests (193) ---
    rows = c.execute("""
        SELECT p.id, p.url, p.title, td.description
        FROM pages p
        LEFT JOIN test_definitions td ON td.page_id = p.id
        WHERE p.category = 'test'
    """).fetchall()
    for pid, url, title, body in rows:
        rowid += 1
        text = body or ''
        c.execute(
            "INSERT INTO search_index (rowid, category, title, snippet, url, page_id) VALUES (?,?,?,?,?,?)",
            (rowid, 'test', title, snippet(text), url, pid)
        )
        c.execute(
            "INSERT INTO search_fts (rowid, title, body, category) VALUES (?,?,?,?)",
            (rowid, title or '', text, 'test')
        )
    print(f'  Indexed tests: {len(rows)}')

    # --- Videos (90) ---
    rows = c.execute("""
        SELECT p.id, p.url, p.title, vt.transcript
        FROM pages p
        LEFT JOIN video_transcripts vt ON vt.page_id = p.id
        WHERE p.category = 'video'
    """).fetchall()
    for pid, url, title, body in rows:
        rowid += 1
        text = body or ''
        c.execute(
            "INSERT INTO search_index (rowid, category, title, snippet, url, page_id) VALUES (?,?,?,?,?,?)",
            (rowid, 'video', title, snippet(text), url, pid)
        )
        c.execute(
            "INSERT INTO search_fts (rowid, title, body, category) VALUES (?,?,?,?)",
            (rowid, title or '', text, 'video')
        )
    print(f'  Indexed videos: {len(rows)}')

    # --- Oxides (169) ---
    rows = c.execute("""
        SELECT p.id, p.url, p.title, od.notes
        FROM pages p
        LEFT JOIN oxide_descriptions od ON od.page_id = p.id
        WHERE p.category = 'oxide'
    """).fetchall()
    for pid, url, title, body in rows:
        rowid += 1
        text = body or ''
        c.execute(
            "INSERT INTO search_index (rowid, category, title, snippet, url, page_id) VALUES (?,?,?,?,?,?)",
            (rowid, 'oxide', title, snippet(text), url, pid)
        )
        c.execute(
            "INSERT INTO search_fts (rowid, title, body, category) VALUES (?,?,?,?)",
            (rowid, title or '', text, 'oxide')
        )
    print(f'  Indexed oxides: {len(rows)}')

    # --- Projects (93) ---
    rows = c.execute("""
        SELECT p.id, p.url, p.title, pc2.body_text
        FROM pages p
        LEFT JOIN project_content pc2 ON pc2.url = p.url
        WHERE p.category = 'project'
    """).fetchall()
    for pid, url, title, body in rows:
        rowid += 1
        text = body or ''
        c.execute(
            "INSERT INTO search_index (rowid, category, title, snippet, url, page_id) VALUES (?,?,?,?,?,?)",
            (rowid, 'project', title, snippet(text), url, pid)
        )
        c.execute(
            "INSERT INTO search_fts (rowid, title, body, category) VALUES (?,?,?,?)",
            (rowid, title or '', text, 'project')
        )
    print(f'  Indexed projects: {len(rows)}')

    # --- Minerals (74) ---
    rows = c.execute("""
        SELECT p.id, p.url, p.title, md.description
        FROM pages p
        LEFT JOIN mineral_descriptions md ON md.page_id = p.id
        WHERE p.category = 'mineral'
    """).fetchall()
    for pid, url, title, body in rows:
        rowid += 1
        text = body or ''
        c.execute(
            "INSERT INTO search_index (rowid, category, title, snippet, url, page_id) VALUES (?,?,?,?,?,?)",
            (rowid, 'mineral', title, snippet(text), url, pid)
        )
        c.execute(
            "INSERT INTO search_fts (rowid, title, body, category) VALUES (?,?,?,?)",
            (rowid, title or '', text, 'mineral')
        )
    print(f'  Indexed minerals: {len(rows)}')

    # --- Firing schedules (136), temperature (73), property (442) via pages ---
    for cat in ['schedule', 'temperature', 'property']:
        rows = c.execute(
            "SELECT id, url, title, clean_text FROM pages WHERE category=?", (cat,)
        ).fetchall()
        for pid, url, title, clean in rows:
            rowid += 1
            text = clean or ''
            c.execute(
                "INSERT INTO search_index (rowid, category, title, snippet, url, page_id) VALUES (?,?,?,?,?,?)",
                (rowid, cat, title, snippet(text), url, pid)
            )
            c.execute(
                "INSERT INTO search_fts (rowid, title, body, category) VALUES (?,?,?,?)",
                (rowid, title or '', text, cat)
            )
        print(f'  Indexed {cat}: {len(rows)}')

    conn.commit()
    print(f'\n  Total search index: {rowid:,} entries')
    return rowid


def build_related_content(conn):
    """Pre-compute related content for each page from the 144K link graph.

    For each page, find the top 10 most relevant related pages.
    Uses bidirectional link counting: pages that link to each other, or
    share many common link targets, are related.
    """
    c = conn.cursor()

    c.execute("DROP TABLE IF EXISTS related_content")
    c.execute("""
        CREATE TABLE related_content (
            page_id INTEGER NOT NULL,
            related_page_id INTEGER NOT NULL,
            related_url TEXT,
            related_title TEXT,
            related_category TEXT,
            link_score INTEGER,
            rank INTEGER
        )
    """)
    c.execute("CREATE INDEX IF NOT EXISTS idx_related_page ON related_content(page_id)")

    # Build URL→page_id lookup
    url_to_page = {}
    page_info = {}
    for pid, url, title, cat in c.execute("SELECT id, url, title, category FROM pages"):
        url_to_page[url] = pid
        page_info[pid] = (url, title, cat)

    # Build adjacency from links table
    # Forward links: source_url → target_url
    forward = defaultdict(set)  # pid → set of target pids
    backward = defaultdict(set)  # pid → set of source pids

    links = c.execute("SELECT source_page_id, target_url FROM links").fetchall()
    for src_pid, tgt_url in links:
        tgt_pid = url_to_page.get(tgt_url)
        if src_pid and tgt_pid and src_pid != tgt_pid:
            forward[src_pid].add(tgt_pid)
            backward[tgt_pid].add(src_pid)

    print(f'  Link graph: {len(forward):,} source pages, {len(links):,} edges')

    # For each page, score related pages
    # Score = direct link (3) + reverse link (3) + shared targets (1 each)
    inserted = 0
    page_ids = list(page_info.keys())

    for i, pid in enumerate(page_ids):
        if i % 2000 == 0 and i > 0:
            print(f'    Processing page {i:,}/{len(page_ids):,}...')

        scores = defaultdict(int)

        # Direct outgoing links
        for target in forward.get(pid, set()):
            scores[target] += 3

        # Incoming links (pages that reference this one)
        for source in backward.get(pid, set()):
            scores[source] += 3

        # Shared targets (co-citation): pages that link to the same things I link to
        my_targets = forward.get(pid, set())
        if len(my_targets) <= 100:  # Skip for hub pages
            for target in my_targets:
                for co_linker in backward.get(target, set()):
                    if co_linker != pid:
                        scores[co_linker] += 1

        # Take top 10
        top = sorted(scores.items(), key=lambda x: -x[1])[:10]

        for rank, (related_pid, score) in enumerate(top, 1):
            url, title, cat = page_info[related_pid]
            c.execute("""
                INSERT INTO related_content
                (page_id, related_page_id, related_url, related_title, related_category, link_score, rank)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (pid, related_pid, url, title, cat, score, rank))
            inserted += 1

    conn.commit()
    print(f'  Related content: {inserted:,} pre-computed relationships')
    return inserted


def build_oxide_similarity(conn):
    """Pre-compute oxide-profile similarity between materials.

    For each material with oxide data, find the 10 most chemically similar
    materials using cosine similarity over their oxide analysis vectors.
    """
    c = conn.cursor()

    c.execute("DROP TABLE IF EXISTS oxide_similarity")
    c.execute("""
        CREATE TABLE oxide_similarity (
            material_url TEXT NOT NULL,
            material_name TEXT,
            similar_url TEXT NOT NULL,
            similar_name TEXT,
            similarity REAL,
            rank INTEGER
        )
    """)
    c.execute("CREATE INDEX IF NOT EXISTS idx_oxide_sim ON oxide_similarity(material_url)")

    # Get all distinct oxides
    oxides = [r[0] for r in c.execute(
        "SELECT DISTINCT oxide FROM material_oxides ORDER BY oxide"
    ).fetchall()]
    oxide_idx = {name: i for i, name in enumerate(oxides)}
    n_oxides = len(oxides)
    print(f'  Oxides tracked: {n_oxides}')

    # Build oxide vectors for each material
    # url → (name, [oxide_values])
    materials = {}
    rows = c.execute("""
        SELECT p.url, mi.material_name, mo.oxide, mo.percent
        FROM material_info mi
        JOIN pages p ON p.id = mi.page_id
        JOIN material_oxides mo ON mo.page_id = mi.page_id
        WHERE mo.percent IS NOT NULL
    """).fetchall()

    for url, name, oxide, pct in rows:
        if url not in materials:
            materials[url] = (name, [0.0] * n_oxides)
        idx = oxide_idx.get(oxide)
        if idx is not None:
            materials[url][1][idx] = float(pct)

    mat_urls = list(materials.keys())
    n_mats = len(mat_urls)
    print(f'  Materials with oxide data: {n_mats}')

    # Pre-compute norms
    norms = {}
    for url in mat_urls:
        vec = materials[url][1]
        norm = math.sqrt(sum(v * v for v in vec))
        norms[url] = norm if norm > 0 else 1e-10

    # Compute pairwise cosine similarity (top 10 per material)
    inserted = 0
    for i, url_a in enumerate(mat_urls):
        if i % 500 == 0 and i > 0:
            print(f'    Computing similarity {i:,}/{n_mats:,}...')

        name_a, vec_a = materials[url_a]
        norm_a = norms[url_a]
        scores = []

        for j, url_b in enumerate(mat_urls):
            if i == j:
                continue
            name_b, vec_b = materials[url_b]
            dot = sum(a * b for a, b in zip(vec_a, vec_b))
            sim = dot / (norm_a * norms[url_b])
            if sim > 0.1:  # Skip near-zero similarities
                scores.append((url_b, name_b, sim))

        scores.sort(key=lambda x: -x[2])
        for rank, (url_b, name_b, sim) in enumerate(scores[:10], 1):
            c.execute("""
                INSERT INTO oxide_similarity
                (material_url, material_name, similar_url, similar_name, similarity, rank)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (url_a, name_a, url_b, name_b, round(sim, 4), rank))
            inserted += 1

    conn.commit()
    print(f'  Oxide similarity: {inserted:,} pre-computed pairs')
    return inserted


def create_indexes(conn):
    """Add indexes for the common query patterns the frontend will use."""
    c = conn.cursor()
    indexes = [
        "CREATE INDEX IF NOT EXISTS idx_pages_cat ON pages(category)",
        "CREATE INDEX IF NOT EXISTS idx_pages_url ON pages(url)",
        "CREATE INDEX IF NOT EXISTS idx_mi_pid ON material_info(page_id)",
        "CREATE INDEX IF NOT EXISTS idx_mo_pid ON material_oxides(page_id)",
        "CREATE INDEX IF NOT EXISTS idx_mo_oxide ON material_oxides(oxide)",
        "CREATE INDEX IF NOT EXISTS idx_ri_pid ON recipe_info(page_id)",
        "CREATE INDEX IF NOT EXISTS idx_ring_pid ON recipe_ingredients(page_id)",
        "CREATE INDEX IF NOT EXISTS idx_links_src ON links(source_page_id)",
        "CREATE INDEX IF NOT EXISTS idx_links_tgt ON links(target_url)",
        "CREATE INDEX IF NOT EXISTS idx_pex_pic ON picture_entity_xref(picture_url)",
        "CREATE INDEX IF NOT EXISTS idx_pex_tgt ON picture_entity_xref(target_url)",
        "CREATE INDEX IF NOT EXISTS idx_pex_cat ON picture_entity_xref(target_category)",
        "CREATE INDEX IF NOT EXISTS idx_alt_pid ON material_alt_names(page_id)",
        "CREATE INDEX IF NOT EXISTS idx_alt_name ON material_alt_names(alt_name)",
        "CREATE INDEX IF NOT EXISTS idx_imgurl ON image_urls(page_id)",
        "CREATE INDEX IF NOT EXISTS idx_si_cat ON search_index(category)",
        "CREATE INDEX IF NOT EXISTS idx_si_pageid ON search_index(page_id)",
    ]
    for idx in indexes:
        c.execute(idx)
    conn.commit()
    print(f'  Created {len(indexes)} indexes')


def strip_clean_text(conn):
    """Remove clean_text from pages to reduce DB size.

    All the searchable content is now in the FTS index and content tables.
    We keep the pages table for metadata (url, category, title, meta) but
    the full text body is redundant with the search_fts, *_content, and
    glossary/article/recipe body text tables.
    """
    c = conn.cursor()

    # Check how much space clean_text uses
    size_before = c.execute("SELECT SUM(LENGTH(clean_text)) FROM pages").fetchone()[0]
    print(f'  clean_text total: {(size_before or 0) / 1048576:.1f} MB')

    # NULL out clean_text — we keep the column for schema compat
    c.execute("UPDATE pages SET clean_text = NULL")
    conn.commit()
    print(f'  Stripped clean_text from pages (content preserved in FTS + *_content tables)')


def main():
    t0 = time.time()
    print("=" * 60)
    print("PHASE 1: BUILD DIGITALFIRE REFERENCE DATABASE")
    print("=" * 60)

    print(f'\nSource: {SRC_DB}')
    print(f'Output: {OUT_DB}')

    print('\n[1/6] Copying production database...')
    conn, total = copy_source(SRC_DB, OUT_DB)
    print(f'  Copied {total:,} rows')

    print('\n[2/6] Building FTS5 search index...')
    build_search_index(conn)

    print('\n[3/6] Pre-computing related content from link graph...')
    build_related_content(conn)

    print('\n[4/6] Pre-computing oxide similarity rankings...')
    build_oxide_similarity(conn)

    print('\n[5/6] Creating query indexes...')
    create_indexes(conn)

    print('\n[6/6] Stripping redundant clean_text...')
    strip_clean_text(conn)

    # Final VACUUM to reclaim space
    print('\nCompacting database...')
    conn.execute('PRAGMA journal_mode=DELETE')  # Switch from WAL for portability
    conn.execute('VACUUM')
    conn.close()

    size_mb = os.path.getsize(OUT_DB) / 1048576
    elapsed = time.time() - t0

    print(f'\n{"=" * 60}')
    print(f'REFERENCE DATABASE COMPLETE')
    print(f'  Size: {size_mb:.1f} MB')
    print(f'  Time: {elapsed:.0f}s')
    print(f'  Path: {OUT_DB}')
    print(f'{"=" * 60}')


if __name__ == '__main__':
    main()
