"""Quick peek at actual Digitalfire material HTML to understand table format."""
import json, re
from pathlib import Path

DATA_DIR = Path(r"C:\home\claude\digitalfire")

# Find a known material page - let's find EPK or Silica
target_urls = [
    "digitalfire.com/material/925",    # EPK
    "digitalfire.com/material/1245",   # Silica
    "digitalfire.com/material/silica",
    "digitalfire.com/material/alumina+hydrate",
    "digitalfire.com/material/wollastonite",
]

parts = sorted(DATA_DIR.glob("digitalfire_data_part*.json"),
               key=lambda p: int(re.search(r'part(\d+)', p.name).group(1)))

found = False
for part_path in parts:
    with open(part_path, encoding='utf-8') as f:
        data = json.load(f)
    
    for url, entry in data.items():
        if any(t in url for t in target_urls):
            html = entry.get('html', '')
            print(f"URL: {url}")
            print(f"HTML length: {len(html)}")
            
            # Find section around oxide analysis table
            # Look for common oxide names in the HTML
            for oxide in ['SiO', 'Al2O3', 'CaO', 'Analysis']:
                idx = html.find(oxide)
                if idx > 0:
                    # Print surrounding context
                    start = max(0, idx - 200)
                    end = min(len(html), idx + 500)
                    snippet = html[start:end]
                    print(f"\n--- Context around '{oxide}' (char {idx}) ---")
                    print(snippet)
                    print("---")
                    break
            
            found = True
            break
    if found:
        break

if not found:
    # Try finding ANY material page
    print("Target URLs not found. Looking for any material page...")
    for part_path in parts[:5]:
        with open(part_path, encoding='utf-8') as f:
            data = json.load(f)
        for url in data:
            if '/material/' in url and '/material/list' not in url:
                html = data[url].get('html', '')
                print(f"\nURL: {url}")
                print(f"HTML length: {len(html)}")
                # Search for oxide-related content
                for term in ['SiO', 'oxide', 'analysis', 'LOI', 'Al2O']:
                    idx = html.find(term)
                    if idx > 0:
                        start = max(0, idx - 100)
                        end = min(len(html), idx + 600)
                        print(f"\n--- Context around '{term}' ---")
                        print(html[start:end])
                        break
                break
        break
