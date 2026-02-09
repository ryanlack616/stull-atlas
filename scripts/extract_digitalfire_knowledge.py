"""
Extract Digitalfire Knowledge → Static JSON
============================================
Extracts curated content from the Digitalfire SQLite database into
compact JSON files that ship with the Stull Atlas app.

Always credits Tony Hansen and links back to digitalfire.com.
"""

import sqlite3
import json
import os
import re
import sys

DB_PATH = r'C:\home\claude\digitalfire\digitalfire.db'
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'data', 'digitalfire')

# Force UTF-8 output on Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')


def clean_text(text: str, max_len: int = 500) -> str:
    """Clean and truncate body text for excerpts."""
    if not text:
        return ''
    # Collapse whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    # Remove leading title repetition (first line is often the title again)
    lines = text.split('. ', 1)
    if len(lines) > 1 and len(lines[0]) < 80:
        # Keep the title line as part of the excerpt
        pass
    if len(text) > max_len:
        # Cut at last sentence boundary before max_len
        cut = text[:max_len].rfind('. ')
        if cut > max_len // 2:
            text = text[:cut + 1]
        else:
            text = text[:max_len] + '...'
    return text


def extract_oxides(cursor) -> list:
    """Extract oxide reference entries."""
    cursor.execute("""
        SELECT url, slug, title, description, body_text
        FROM pages WHERE category = 'oxide' AND slug != 'list'
        ORDER BY title
    """)
    entries = []
    for url, slug, title, desc, body in cursor.fetchall():
        # Extract formula from slug (e.g., 'al2o3' → 'Al2O3')
        formula = slug.upper()
        # Fix common formula capitalizations
        formula_map = {
            'SIO2': 'SiO2', 'AL2O3': 'Al2O3', 'B2O3': 'B2O3',
            'NA2O': 'Na2O', 'K2O': 'K2O', 'CAO': 'CaO',
            'MGO': 'MgO', 'ZNO': 'ZnO', 'BAO': 'BaO',
            'SRO': 'SrO', 'LI2O': 'Li2O', 'FE2O3': 'Fe2O3',
            'TIO2': 'TiO2', 'ZRO2': 'ZrO2', 'MNO': 'MnO',
            'MNO2': 'MnO2', 'P2O5': 'P2O5', 'SNO2': 'SnO2',
            'CR2O3': 'Cr2O3', 'CUO': 'CuO', 'COO': 'CoO',
            'NIO': 'NiO', 'V2O5': 'V2O5', 'CEO2': 'CeO2',
            'PBO': 'PbO', 'CDO': 'CdO', 'BI2O3': 'Bi2O3',
        }
        formula = formula_map.get(formula, formula)
        
        excerpt = clean_text(body, 400)
        entries.append({
            'formula': formula,
            'title': title,
            'description': desc or '',
            'excerpt': excerpt,
            'url': url,
        })
    return entries


def extract_materials(cursor) -> list:
    """Extract material reference entries."""
    cursor.execute("""
        SELECT url, slug, title, description, body_text
        FROM pages WHERE category = 'material' AND slug != 'list'
        ORDER BY title
    """)
    entries = []
    for url, slug, title, desc, body in cursor.fetchall():
        excerpt = clean_text(body, 400)
        # Extract alternate names if present
        alt_names = ''
        alt_match = re.search(r'Alternate Names?:\s*(.+?)(?:\n|$)', body or '')
        if alt_match:
            alt_names = alt_match.group(1).strip()
        
        entries.append({
            'name': title,
            'altNames': alt_names,
            'description': desc or '',
            'excerpt': excerpt,
            'url': url,
        })
    return entries


def extract_glossary(cursor) -> list:
    """Extract glossary term entries."""
    cursor.execute("""
        SELECT url, slug, title, description, body_text
        FROM pages WHERE category = 'glossary' AND slug != 'list'
        ORDER BY title
    """)
    entries = []
    for url, slug, title, desc, body in cursor.fetchall():
        excerpt = clean_text(body, 400)
        # Build search keywords from slug
        keywords = slug.replace('+', ' ').lower()
        
        entries.append({
            'term': title,
            'keywords': keywords,
            'description': desc or '',
            'excerpt': excerpt,
            'url': url,
        })
    return entries


def extract_troubles(cursor) -> list:
    """Extract troubleshooting entries."""
    cursor.execute("""
        SELECT url, slug, title, description, body_text
        FROM pages WHERE category = 'trouble' AND slug != 'list'
        ORDER BY title
    """)
    entries = []
    for url, slug, title, desc, body in cursor.fetchall():
        excerpt = clean_text(body, 500)
        
        entries.append({
            'term': title,
            'description': desc or '',
            'excerpt': excerpt,
            'url': url,
        })
    return entries


def extract_articles(cursor) -> list:
    """Extract key articles (subset — ceramic chemistry topics)."""
    cursor.execute("""
        SELECT url, slug, title, description, body_text
        FROM pages WHERE category = 'article'
        ORDER BY title
    """)
    entries = []
    for url, slug, title, desc, body in cursor.fetchall():
        excerpt = clean_text(body, 300)
        
        entries.append({
            'title': title,
            'description': desc or '',
            'excerpt': excerpt,
            'url': url,
        })
    return entries


def extract_tests(cursor) -> list:
    """Extract ceramic testing method entries."""
    cursor.execute("""
        SELECT url, slug, title, description, body_text
        FROM pages WHERE category = 'test' AND slug != 'list'
        ORDER BY title
    """)
    entries = []
    for url, slug, title, desc, body in cursor.fetchall():
        excerpt = clean_text(body, 300)
        entries.append({
            'title': title,
            'description': desc or '',
            'excerpt': excerpt,
            'url': url,
        })
    return entries


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    print('Extracting Digitalfire knowledge...')
    
    # Extract each category
    oxides = extract_oxides(cursor)
    print(f'  Oxides: {len(oxides)} entries')
    
    materials = extract_materials(cursor)
    print(f'  Materials: {len(materials)} entries')
    
    glossary = extract_glossary(cursor)
    print(f'  Glossary: {len(glossary)} entries')
    
    troubles = extract_troubles(cursor)
    print(f'  Troubles: {len(troubles)} entries')
    
    articles = extract_articles(cursor)
    print(f'  Articles: {len(articles)} entries')

    tests = extract_tests(cursor)
    print(f'  Tests: {len(tests)} entries')
    
    conn.close()
    
    # Write JSON files
    datasets = {
        'oxides.json': oxides,
        'materials.json': materials,
        'glossary.json': glossary,
        'troubles.json': troubles,
        'articles.json': articles,
        'tests.json': tests,
    }
    
    total_size = 0
    for filename, data in datasets.items():
        path = os.path.join(OUT_DIR, filename)
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=None, separators=(',', ':'))
        size = os.path.getsize(path)
        total_size += size
        print(f'  Wrote {filename}: {size / 1024:.1f} KB')
    
    print(f'\nTotal: {total_size / 1024:.1f} KB ({total_size / (1024*1024):.2f} MB)')
    print(f'Output directory: {os.path.abspath(OUT_DIR)}')
    print('Done.')


if __name__ == '__main__':
    main()
