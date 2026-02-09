"""
Extract Digitalfire pages from SQLite into a compact JSON file
for bundling with the Studio Edition.

Strips FTS indexes and cross-refs — just the readable content.
Output is a sidecar data file loaded on-demand (not bundled into JS).

Optimizations applied:
  - Remove 404/stub pages (no title or body < 150 chars)
  - Deduplicate by content fingerprint (first 500 chars of body)
  - Strip 'https://digitalfire.com/' prefix from URLs
  - Truncate picture/* page bodies to 300 chars (search fodder only)
  - Cap all other bodies at 8,000 chars (saves ~50% raw size)
  - Short JSON keys: u/t/c/d/b
  - No pretty-printing (separators=(',',':'))
"""

import sqlite3
import json
import os
import re
from collections import Counter

DB_PATH = r'C:\home\claude\digitalfire\digitalfire.db'
# Goes to public/data/digitalfire/ so it's served as a static asset
OUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'digitalfire', 'pages.json')

URL_PREFIX = 'https://digitalfire.com/'
PICTURE_BODY_LIMIT = 300   # chars — enough for search hits
ARTICLE_BODY_LIMIT = 8000  # chars — a solid amount of readable content

def clean_content(text: str) -> str:
    """Clean up content — remove excessive whitespace, normalize."""
    if not text:
        return ''
    # Collapse multiple blank lines to at most 2
    text = re.sub(r'\n{4,}', '\n\n\n', text)
    # Strip trailing whitespace per line
    text = '\n'.join(line.rstrip() for line in text.split('\n'))
    return text.strip()

def main():
    conn = sqlite3.connect(DB_PATH)

    # Count pages
    count = conn.execute('SELECT COUNT(*) FROM pages').fetchone()[0]
    print(f'Total pages in DB: {count}')

    # Extract all pages — include description for better search
    cur = conn.execute(
        'SELECT url, title, category, description, body_text FROM pages ORDER BY category, title'
    )

    raw_pages = []
    categories = Counter()
    total_content_chars = 0

    for url, title, category, description, body_text in cur:
        cleaned = clean_content(body_text)
        if not cleaned or not title:
            continue  # Skip empty / 404 pages
        if len(cleaned) < 150:
            continue  # Skip stubs
        if category == 'https:':
            continue  # Malformed entry

        total_content_chars += len(cleaned)
        cat = category or 'other'
        categories[cat] += 1
        raw_pages.append((url, title, cat, description, cleaned))

    conn.close()
    print(f'After removing stubs/404s: {len(raw_pages)} pages')

    # ── Deduplicate by content fingerprint ──
    seen_fingerprints: dict[str, str] = {}   # fingerprint -> first URL
    pages = []
    dupes_removed = 0
    for url, title, cat, description, body in raw_pages:
        fingerprint = body[:500]
        if fingerprint in seen_fingerprints:
            dupes_removed += 1
            continue
        seen_fingerprints[fingerprint] = url

        # Strip URL prefix
        short_url = url
        if short_url.startswith(URL_PREFIX):
            short_url = short_url[len(URL_PREFIX):]

        # Truncate bodies
        is_picture = short_url.startswith('picture/')
        if is_picture and len(body) > PICTURE_BODY_LIMIT:
            body = body[:PICTURE_BODY_LIMIT]
        elif not is_picture and len(body) > ARTICLE_BODY_LIMIT:
            body = body[:ARTICLE_BODY_LIMIT] + '\n[...]'

        entry: dict = {
            'u': short_url,    # short keys to save space
            't': title,
            'c': cat,
            'b': body,        # body text
        }
        # Only include description if it differs from title
        if description and description.strip() != title.strip():
            entry['d'] = description.strip()

        pages.append(entry)

    print(f'Duplicates removed: {dupes_removed}')
    print(f'Final page count: {len(pages)}')

    conn.close()

    print(f'\nCategories:')
    for cat, cnt in categories.most_common():
        print(f'  {cat:20s} {cnt:>5}')

    final_body_chars = sum(len(e['b']) for e in pages)
    print(f'\nOriginal content chars: {total_content_chars:,}')
    print(f'Final content chars:    {final_body_chars:,} ({final_body_chars/total_content_chars*100:.0f}%)')
    print(f'Pages extracted: {len(pages)}')

    # Write JSON with short keys, no extra whitespace
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(pages, f, ensure_ascii=False, separators=(',', ':'))

    size_mb = os.path.getsize(OUT_PATH) / (1024 * 1024)
    print(f'\nOutput: {OUT_PATH}')
    print(f'Size: {size_mb:.1f} MB')

    # Check gzip compression (what the browser would actually download)
    import gzip
    gz_path = OUT_PATH + '.gz'
    with open(OUT_PATH, 'rb') as f_in:
        with gzip.open(gz_path, 'wb', compresslevel=9) as f_out:
            f_out.write(f_in.read())
    gz_size_mb = os.path.getsize(gz_path) / (1024 * 1024)
    print(f'Gzipped: {gz_size_mb:.1f} MB (what the browser actually downloads)')
    os.remove(gz_path)

if __name__ == '__main__':
    main()
