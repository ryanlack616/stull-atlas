"""
Cross-reference our digitalfire.json oxide analyses against the 782MB
Digitalfire HTML dataset at C:\\home\\claude\\digitalfire.

Digitalfire HTML format discovered:
  <td class="label"><a href=".../oxide/sio2">SiO2</a></td>
  <td class="text-right"">47.29%</td>
"""

import json, re, os
from pathlib import Path

DATA_DIR = Path(r"C:\home\claude\digitalfire")
OUR_FILE = Path(r"c:\Users\PC\Desktop\projects\stull-atlas\src\data\materials\digitalfire.json")

# ── Load our data ──────────────────────────────────────────────
with open(OUR_FILE) as f:
    our_data = json.load(f)

our_materials = {}
for m in our_data["materials"]:
    our_materials[m["id"]] = m

# ── Map Digitalfire URL slugs to our IDs ───────────────────────
SLUG_MAP = {
    # By numeric ID (verified against actual DF page titles)
    "40": "alumina",        # Calcined Alumina
    "42": "alumina_hydrate",# Alumina Hydrate
    "86": "barium_carbonate",# Barium Carbonate
    "230": "cobalt_oxide",  # Cobalt Oxide
    "253": "custer_feldspar",# Custer Feldspar
    "273": "dolomite",      # Dolomite
    "291": "epk",           # EP Kaolin (close match for EPK)
    "349": "frit_3110",     # Ferro Frit 3110
    "350": "frit_3124",     # Ferro Frit 3124
    "351": "frit_3134",     # Ferro Frit 3134
    "356": "frit_3195",     # Ferro Frit 3195
    "369": "frit_3249",     # Ferro Frit 3249
    "806": "gerstley_borate",# Gerstley Borate
    "831": "grolleg_kaolin",# Grolleg Kaolin
    "874": "red_iron_oxide",# Iron Oxide Red
    "925": "kaolin",        # Kaolin (generic)
    "975": "lithium_carbonate",
    "1177": "petalite",
    "1204": "rutile",
    "1245": "silica",
    "1287": "spodumene",
    "1609": "strontium_carbonate",
    "1620": "talc",
    "1642": "tin_oxide",
    "1644": "titanium_dioxide",
    "1718": "zinc_oxide",
    "1722": "zircopax",
    "32": "alberta_slip",
    # By name slug
    "epk": "epk", "edgar+plastic+kaolin": "epk",
    "kaolin": "kaolin",
    "grolleg+kaolin": "grolleg_kaolin", "grolleg": "grolleg_kaolin",
    "ball+clay": "ball_clay",
    "goldart": "goldart",
    "red+art": "redart", "redart": "redart",
    "bentonite": "bentonite",
    "barnard+slip": "barnard_slip", "barnard+clay": "barnard_slip",
    "blackbird+clay": "barnard_slip",
    "albany+slip": "albany_slip",
    "alberta+slip": "alberta_slip",
    "pyrophyllite": "pyrophyllite",
    "silica": "silica", "flint": "silica", "quartz": "silica",
    "potash+feldspar": "potash_feldspar",
    "soda+feldspar": "soda_feldspar",
    "custer+feldspar": "custer_feldspar",
    "g-200+feldspar": "g200_feldspar", "g-200+hp+feldspar": "g200_feldspar",
    "minspar+200": "minspar_200",
    "nepheline+syenite": "nepheline_syenite",
    "cornwall+stone": "cornwall_stone",
    "spodumene": "spodumene",
    "petalite": "petalite",
    "whiting": "whiting",
    "wollastonite": "wollastonite",
    "dolomite": "dolomite",
    "talc": "talc",
    "magnesium+carbonate": "magnesium_carbonate",
    "ferro+frit+3134": "frit_3134",
    "ferro+frit+3110": "frit_3110",
    "ferro+frit+3124": "frit_3124",
    "ferro+frit+3195": "frit_3195",
    "ferro+frit+3249": "frit_3249",
    "gerstley+borate": "gerstley_borate",
    "gillespie+borate": "gillespie_borate",
    "borax": "borax",
    "boric+acid": "boric_acid",
    "soda+ash": "soda_ash",
    "pearl+ash": "pearl_ash", "potassium+carbonate": "pearl_ash",
    "zinc+oxide": "zinc_oxide",
    "bone+ash": "bone_ash",
    "barium+carbonate": "barium_carbonate",
    "strontium+carbonate": "strontium_carbonate",
    "lithium+carbonate": "lithium_carbonate",
    "alumina": "alumina", "calcined+alumina": "alumina",
    "alumina+hydrate": "alumina_hydrate",
    "zircopax": "zircopax",
    "tin+oxide": "tin_oxide",
    "red+iron+oxide": "red_iron_oxide",
    "cobalt+oxide": "cobalt_oxide",
    "cobalt+carbonate": "cobalt_carbonate",
    "copper+carbonate": "copper_carbonate",
    "copper+oxide": "copper_oxide", "copper+oxide+black": "copper_oxide",
    "chrome+oxide": "chrome_oxide",
    "rutile": "rutile", "ceramic+rutile": "rutile",
    "titanium+dioxide": "titanium_dioxide",
    "manganese+dioxide": "manganese_dioxide",
    "manganese+carbonate": "manganese_carbonate",
    "nickel+oxide": "nickel_oxide", "nickel+oxide+green": "nickel_oxide",
}

# Normalizer for oxide names from links
OXIDE_NORM = {
    "sio2": "SiO2", "al2o3": "Al2O3", "b2o3": "B2O3", "bao": "BaO",
    "cao": "CaO", "coo": "CoO", "cr2o3": "Cr2O3", "cu2o": "Cu2O",
    "cuo": "CuO", "fe2o3": "Fe2O3", "feo": "FeO", "k2o": "K2O",
    "li2o": "Li2O", "mgo": "MgO", "mno": "MnO", "mno2": "MnO2",
    "na2o": "Na2O", "nio": "NiO", "p2o5": "P2O5", "pbo": "PbO",
    "sno2": "SnO2", "sro": "SrO", "tio2": "TiO2", "v2o5": "V2O5",
    "zno": "ZnO", "zro2": "ZrO2", "loi": "LOI",
}


def extract_oxide_table(html):
    """Parse Digitalfire HTML for oxide analysis.
    
    Format:
    <td class="label"><a href=".../oxide/sio2">SiO2</a></td>
    <td class="text-right"">47.29%</td>
    """
    results = {}
    loi = None
    
    # Match: oxide link -> percentage cell
    # The oxide name is in the <a> href as /oxide/OXIDENAME
    pattern = re.compile(
        r'/oxide/([a-z0-9]+)"[^>]*>[^<]*</a>\s*</td>\s*'
        r'<td[^>]*>\s*([\d.]+)\s*%',
        re.IGNORECASE
    )
    
    for m in pattern.finditer(html):
        oxide_slug = m.group(1).lower()
        val = float(m.group(2))
        
        oxide_name = OXIDE_NORM.get(oxide_slug)
        if oxide_name and val > 0:
            if oxide_name == "LOI":
                loi = val
            else:
                results[oxide_name] = val
    
    # Also check for LOI without /oxide/ link
    loi_pattern = re.compile(
        r'>LOI</a>\s*</td>\s*<td[^>]*>\s*([\d.]+)\s*%',
        re.IGNORECASE
    )
    m2 = loi_pattern.search(html)
    if m2 and loi is None:
        loi = float(m2.group(1))
    
    return results, loi


def extract_title(html):
    m = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    return m.group(1).strip() if m else ""


def url_to_our_id(url):
    # Extract slug after /material/ 
    slug = url.split('/material/')[-1].lower().strip('/')
    return SLUG_MAP.get(slug)


# ── Scan all parts ─────────────────────────────────────────────
print("Scanning 163 JSON parts for material pages...")
print("=" * 80)

material_pages = {}
parts = sorted(DATA_DIR.glob("digitalfire_data_part*.json"),
               key=lambda p: int(re.search(r'part(\d+)', p.name).group(1)))

for i, part_path in enumerate(parts):
    if (i + 1) % 20 == 0:
        print(f"  ...scanning part {i+1}/{len(parts)}")
    
    with open(part_path, encoding='utf-8') as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            continue
    
    for url, entry in data.items():
        if '/material/' not in url or '/material/list' in url:
            continue
        
        html = entry.get('html', '')
        if not html:
            continue
        
        analysis, loi = extract_oxide_table(html)
        title = extract_title(html)
        
        if analysis:
            material_pages[url] = {
                'title': title,
                'analysis': analysis,
                'loi': loi
            }

print(f"\nFound {len(material_pages)} material pages with oxide analysis data")
print("=" * 80)

# ── Cross-reference ────────────────────────────────────────────
print("\nCROSS-REFERENCE REPORT")
print("=" * 80)

matched = 0
perfect = 0
discrepancies = []

for url, page in sorted(material_pages.items()):
    our_id = url_to_our_id(url)
    if our_id is None or our_id not in our_materials:
        continue
    
    matched += 1
    our_mat = our_materials[our_id]
    our_analysis = our_mat.get('analysis', {})
    our_loi = our_mat.get('loi')
    df_analysis = page['analysis']
    df_loi = page['loi']
    
    all_oxides = set(list(our_analysis.keys()) + list(df_analysis.keys()))
    mat_issues = []
    
    for oxide in sorted(all_oxides):
        our_val = our_analysis.get(oxide, 0)
        df_val = df_analysis.get(oxide, 0)
        delta = abs(our_val - df_val)
        
        if delta > 0.3:  # report >0.3% differences
            flag = " <<<" if delta > 1.0 else ""
            mat_issues.append(
                f"  {oxide:8s} ours={our_val:7.2f}  DF={df_val:7.2f}  "
                f"delta={delta:5.2f}{flag}"
            )
    
    if df_loi is not None and our_loi is not None:
        loi_delta = abs(our_loi - df_loi)
        if loi_delta > 0.3:
            flag = " <<<" if loi_delta > 1.0 else ""
            mat_issues.append(
                f"  {'LOI':8s} ours={our_loi:7.2f}  DF={df_loi:7.2f}  "
                f"delta={loi_delta:5.2f}{flag}"
            )
    elif df_loi is not None and our_loi is None:
        mat_issues.append(
            f"  {'LOI':8s} ours=  NONE  DF={df_loi:7.2f}  MISSING"
        )
    
    if mat_issues:
        discrepancies.append((our_id, our_mat['primaryName'], page['title'], url, mat_issues))
    else:
        perfect += 1

print(f"\nMatched {matched} materials against Digitalfire HTML dataset")
print(f"  Perfect/near-perfect (delta <= 0.3%): {perfect}")
print(f"  With discrepancies (delta > 0.3%): {len(discrepancies)}")

if discrepancies:
    print(f"\n{'─' * 80}")
    print("DISCREPANCIES (delta > 0.3%, <<< marks > 1.0%):")
    print(f"{'─' * 80}")
    for our_id, our_name, df_title, url, issues in discrepancies:
        print(f"\n  {our_name} (id: {our_id})")
        print(f"  Digitalfire: {df_title} — {url}")
        for issue in issues:
            print(issue)

# ── Unmatched materials ────────────────────────────────────────
our_ids_matched = set()
for url in material_pages:
    oid = url_to_our_id(url)
    if oid:
        our_ids_matched.add(oid)

unmatched = [m for m in our_materials if m not in our_ids_matched]
if unmatched:
    print(f"\n{'─' * 80}")
    print(f"Our materials NOT found in DF dataset ({len(unmatched)}):")
    for uid in sorted(unmatched):
        print(f"  - {uid} ({our_materials[uid]['primaryName']})")

# ── Also show ALL material pages found ─────────────────────────
print(f"\n{'─' * 80}")
print(f"All {len(material_pages)} DF material pages with oxide data:")
for url in sorted(material_pages.keys()):
    pg = material_pages[url]
    oid = url_to_our_id(url)
    tag = f" -> {oid}" if oid else ""
    print(f"  {pg['title'][:50]:50s} ...{url.split('/material/')[-1]:30s}{tag}")

print(f"\n{'=' * 80}")
print("DONE")
