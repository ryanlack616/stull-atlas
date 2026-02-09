"""List all event titles with their exact characters."""
import re

with open(r'src\pages\timelineData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

titles = re.findall(r"title: '((?:[^'\\]|\\.)*)',", content)
for t in titles:
    print(repr(t))
