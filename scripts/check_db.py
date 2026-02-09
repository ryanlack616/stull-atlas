"""Quick DB check"""
import sqlite3

conn = sqlite3.connect(r'C:\home\claude\digitalfire\digitalfire.db')
c = conn.cursor()

# Category counts
c.execute('SELECT category, COUNT(*) FROM pages GROUP BY category ORDER BY COUNT(*) DESC')
print("=== Category Counts ===")
for row in c.fetchall():
    print(f"  {row[0]}: {row[1]}")

# Sample oxide
print("\n=== Sample Oxide ===")
c.execute("SELECT url, title, substr(body_text, 1, 200) FROM pages WHERE category='oxide' LIMIT 2")
for row in c.fetchall():
    print(f"  URL: {row[0]}")
    print(f"  Title: {row[1]}")
    print(f"  Text: {row[2][:150]}...")
    print()

# Sample material
print("=== Sample Material ===")
c.execute("SELECT url, title, substr(body_text, 1, 200) FROM pages WHERE category='material' LIMIT 2")
for row in c.fetchall():
    print(f"  URL: {row[0]}")
    print(f"  Title: {row[1]}")
    print(f"  Text: {row[2][:150]}...")
    print()

# Sample glossary
print("=== Sample Glossary ===")
c.execute("SELECT url, title, substr(body_text, 1, 200) FROM pages WHERE category='glossary' LIMIT 2")
for row in c.fetchall():
    print(f"  URL: {row[0]}")
    print(f"  Title: {row[1]}")
    print(f"  Text: {row[2][:150]}...")
    print()

# Sample trouble
print("=== Sample Trouble ===")
c.execute("SELECT url, title, substr(body_text, 1, 200) FROM pages WHERE category='trouble' LIMIT 2")
for row in c.fetchall():
    print(f"  URL: {row[0]}")
    print(f"  Title: {row[1]}")
    print(f"  Text: {row[2][:150]}...")
    print()

# Column names
c.execute("PRAGMA table_info(pages)")
print("=== Pages Columns ===")
for col in c.fetchall():
    print(f"  {col[1]} ({col[2]})")

conn.close()
