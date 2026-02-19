"""Check which assets are live vs 404 on stullatlas.app"""
import requests, os

DIST = os.path.join(os.path.dirname(__file__), "dist", "assets")
BASE = "https://stullatlas.app/assets/"

assets = sorted(os.listdir(DIST))
ok = 0
missing = []
for a in assets:
    try:
        r = requests.head(BASE + a, timeout=30)
        code = r.status_code
    except Exception as e:
        code = f"ERR:{e.__class__.__name__}"
    status = "OK" if code == 200 else f"**{code}**"
    if code != 200:
        missing.append(a)
    else:
        ok += 1
    print(f"  {status:8s}  {a}")

print(f"\n{ok} OK, {len(missing)} MISSING")
if missing:
    print("Missing files:")
    for m in missing:
        print(f"  - {m}")
