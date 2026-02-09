"""Sample digitalfire data to understand structure before building DB."""
import json
import re
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.skip = False
        self.skip_tags = {'script', 'style', 'head', 'nav', 'footer'}

    def handle_starttag(self, tag, attrs):
        if tag in self.skip_tags:
            self.skip = True

    def handle_endtag(self, tag):
        if tag in self.skip_tags:
            self.skip = False

    def handle_data(self, data):
        if not self.skip:
            t = data.strip()
            if t:
                self.text.append(t)

def extract_text(html):
    p = TextExtractor()
    p.feed(html)
    return ' '.join(p.text)

def get_meta(html, name):
    m = re.search(rf'<meta name="{name}" content="(.*?)"', html)
    return m.group(1) if m else None

def get_title(html):
    m = re.search(r'<title>(.*?)</title>', html)
    return m.group(1) if m else None

# Load first file and sample one entry per category
with open(r'C:\home\claude\digitalfire\digitalfire_data_part1.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

# Group by category
cats = {}
for url in d:
    path = url.replace('https://digitalfire.com/', '')
    cat = path.split('/')[0] if '/' in path else 'root'
    if cat not in cats:
        cats[cat] = url

# Sample each category
for cat, url in sorted(cats.items()):
    html = d[url]['html']
    title = get_title(html)
    desc = get_meta(html, 'description')
    text = extract_text(html)
    
    print(f"\n{'='*60}")
    print(f"CATEGORY: {cat}")
    print(f"URL: {url}")
    print(f"TITLE: {title}")
    print(f"DESCRIPTION: {desc[:200] if desc else 'N/A'}")
    print(f"TEXT LENGTH: {len(text)} chars")
    print(f"SAMPLE TEXT: {text[:500]}")
    print(f"{'='*60}")
