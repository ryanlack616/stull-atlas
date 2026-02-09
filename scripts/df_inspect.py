"""Inspect HTML structure to find content container patterns."""
import json
import re

with open(r'C:\home\claude\digitalfire\digitalfire_data_part1.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

# Check a glossary entry's HTML structure
url = 'https://digitalfire.com/glossary/food+safe'
html = d[url]['html']

# Find common container patterns
patterns = [
    r'<div[^>]*class="[^"]*content[^"]*"',
    r'<div[^>]*class="[^"]*main[^"]*"',
    r'<div[^>]*class="[^"]*article[^"]*"',
    r'<div[^>]*class="[^"]*body[^"]*"',
    r'<div[^>]*class="[^"]*col-lg[^"]*"',
    r'<div[^>]*class="[^"]*container[^"]*"',
    r'<article',
    r'<main',
    r'<div[^>]*id="[^"]*content[^"]*"',
    r'<div[^>]*id="[^"]*main[^"]*"',
    r'<h1',
    r'<h2',
]

for p in patterns:
    matches = re.findall(p, html[:5000], re.IGNORECASE)
    if matches:
        print(f"Pattern: {p}")
        for m in matches[:3]:
            print(f"  {m}")

# Show structure around h1/h2 tags 
print("\n\n=== Structure around headings ===")
for m in re.finditer(r'<h[12][^>]*>.*?</h[12]>', html, re.DOTALL):
    start = max(0, m.start() - 200)
    print(f"\n--- Context at pos {m.start()} ---")
    print(html[start:m.end() + 100])
    print("...")
    if m.start() > 2000:  # only show first few
        break

# Show the first 3000 chars after </nav> or after the header
print("\n\n=== After navigation ===")
nav_end = html.find('</nav>')
if nav_end > 0:
    print(f"Nav ends at position {nav_end}")
    print(html[nav_end:nav_end+2000])
else:
    # Find after the glossary index listing
    print("No </nav> found, looking for content markers...")
    # Try finding "Food Safe" as h1/h2
    h_match = re.search(r'<h[12][^>]*>\s*Food Safe\s*</h[12]>', html)
    if h_match:
        print(f"Found heading at {h_match.start()}")
        print(html[h_match.start():h_match.start()+2000])
