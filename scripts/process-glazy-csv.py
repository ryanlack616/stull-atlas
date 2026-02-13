"""
Process the full Glazy CSV dump into glazy-processed.json for Stull Atlas.

Input: glazy-data-all-20211130.csv (~36MB, ~37k rows)
Output: src/data/glazes/glazy-processed.json (glazes only, deduplicated, with UMF)

Usage: python scripts/process-glazy-csv.py
"""

import csv
import json
import sys
from collections import defaultdict

CSV_PATH = r"C:\Users\PC\Downloads\glazy-data-all-20211130.csv"
OUT_PATH = r"C:\rje\dev\stull-atlas\src\data\glazes\glazy-processed.json"

# UMF oxides we care about
UMF_OXIDES = {
    # Fluxes - R2O
    'Li2O': 'Li2O_umf',
    'Na2O': 'Na2O_umf',
    'K2O': 'K2O_umf',
    # Fluxes - RO
    'MgO': 'MgO_umf',
    'CaO': 'CaO_umf',
    'SrO': 'SrO_umf',
    'BaO': 'BaO_umf',
    'ZnO': 'ZnO_umf',
    'PbO': 'PbO_umf',
    # Stabilizers
    'Al2O3': 'Al2O3_umf',
    'B2O3': 'B2O3_umf',
    'Fe2O3': 'Fe2O3_umf',
    # Glass formers
    'SiO2': 'SiO2_umf',
    'TiO2': 'TiO2_umf',
    'ZrO2': 'ZrO2_umf',
    'SnO2': 'SnO2_umf',
    # Other colorants/additives
    'P2O5': 'P2O5_umf',
    'MnO': 'MnO_umf',
    'CuO': 'CuO_umf',
    'CoO': 'CoO_umf',
    'Cr2O3': 'Cr2O3_umf',
    'NiO': 'NiO_umf',
}

R2O = ['Li2O', 'Na2O', 'K2O']
RO = ['MgO', 'CaO', 'SrO', 'BaO', 'ZnO', 'PbO']
FLUXES = R2O + RO


def safe_float(val):
    """Parse a CSV value to float, handling NULL and empty strings."""
    if val is None or val == '' or val == 'NULL':
        return 0.0
    try:
        return float(val)
    except (ValueError, TypeError):
        return 0.0


def parse_cone(from_cone, to_cone):
    """Parse cone range into a single numeric cone value.
    
    Handles negative cones (06 → -6), ranges, etc.
    Returns (numeric_cone, raw_string)
    """
    def cone_val(s):
        if not s or s == 'NULL':
            return None
        s = s.strip()
        # Handle negative cones: "06" -> -6, "04" -> -4, etc.
        if len(s) == 2 and s.startswith('0') and s[1].isdigit():
            return -int(s[1])
        try:
            return int(s)
        except ValueError:
            try:
                return float(s)
            except ValueError:
                return None

    fc = cone_val(from_cone)
    tc = cone_val(to_cone)

    if fc is not None and tc is not None:
        cone = (fc + tc) / 2.0
        if cone == int(cone):
            cone = int(cone)
        raw = f"{from_cone}" if from_cone == to_cone else f"{from_cone}-{to_cone}"
    elif fc is not None:
        cone = fc
        raw = str(from_cone)
    elif tc is not None:
        cone = tc
        raw = str(to_cone)
    else:
        cone = None
        raw = None

    return cone, raw


def normalize_surface(s):
    """Normalize surface type to match app's SurfaceType."""
    if not s or s == 'NULL':
        return 'unknown'
    s = s.strip().lower()
    mapping = {
        'glossy': 'gloss',
        'gloss': 'gloss',
        'semi-gloss': 'semi-gloss',
        'satin': 'satin',
        'semi-matte': 'semi-matte',
        'matte': 'matte',
        'dry matte': 'dry-matte',
        'dry': 'dry-matte',
    }
    return mapping.get(s, 'unknown')


def normalize_transparency(s):
    if not s or s == 'NULL':
        return None
    s = s.strip().lower()
    if 'opaque' in s:
        return 'opaque'
    if 'translucent' in s:
        return 'translucent'
    if 'transparent' in s:
        return 'transparent'
    return None


def main():
    print(f"Reading CSV: {CSV_PATH}")

    glazes = []
    skipped = defaultdict(int)
    duplicates = 0
    seen_names = {}  # name+cone → best entry (prefer one with more UMF data)

    with open(CSV_PATH, 'r', encoding='utf-8', errors='replace') as f:
        reader = csv.DictReader(f)
        total = 0

        for row in reader:
            total += 1

            # Filter: only glazes (material_type_id for Glaze)
            mat_type = (row.get('material_type') or '').strip()
            mat_type_concat = (row.get('material_type_concatenated') or '').strip()

            # Only keep glazes
            if 'Glaze' not in mat_type and 'Glaze' not in mat_type_concat:
                skipped['not_glaze'] += 1
                continue

            # Skip analyses (raw materials breakdown) and primitives
            is_analysis = row.get('is_analysis', '0')
            is_primitive = row.get('is_primitive', '0')
            is_private = row.get('is_private', '0')
            if is_analysis == '1' or is_primitive == '1' or is_private == '1':
                skipped['analysis_or_primitive'] += 1
                continue

            # Extract UMF values
            umf = {}
            for oxide, col in UMF_OXIDES.items():
                val = safe_float(row.get(col, 0))
                if val > 0:
                    umf[oxide] = round(val, 4)

            # Must have SiO2 and Al2O3 for Stull chart
            sio2 = umf.get('SiO2', 0)
            al2o3 = umf.get('Al2O3', 0)

            if sio2 < 0.5 or sio2 > 12:
                skipped['sio2_range'] += 1
                continue
            if al2o3 > 2:
                skipped['al2o3_range'] += 1
                continue

            # Calculate flux sum
            flux_sum = sum(umf.get(ox, 0) for ox in FLUXES)
            if flux_sum < 0.3 or flux_sum > 2.0:
                skipped['flux_range'] += 1
                continue

            # R2O / RO ratio
            r2o = sum(umf.get(ox, 0) for ox in R2O)
            ro = sum(umf.get(ox, 0) for ox in RO)
            r2o_ro_ratio = round(r2o / flux_sum, 4) if flux_sum > 0 else 0

            # SiO2:Al2O3 ratio
            sio2_al2o3 = round(sio2 / al2o3, 2) if al2o3 > 0 else 0

            # Parse cone
            cone, cone_raw = parse_cone(
                row.get('from_orton_cone', ''),
                row.get('to_orton_cone', '')
            )

            # Surface & transparency
            surface = normalize_surface(row.get('surface_type', ''))
            transparency = normalize_transparency(row.get('transparency_type', ''))

            glaze_id = row.get('id', str(total))
            name = (row.get('name') or f'Glazy #{glaze_id}').strip()

            # Deduplication key: name (lowered) + cone
            dedup_key = f"{name.lower()}|{cone}"
            oxide_count = len(umf)

            if dedup_key in seen_names:
                prev_idx, prev_count = seen_names[dedup_key]
                if oxide_count > prev_count:
                    # Replace with this one (more data)
                    glazes[prev_idx] = None  # mark old for removal
                    seen_names[dedup_key] = (len(glazes), oxide_count)
                else:
                    duplicates += 1
                    continue
            else:
                seen_names[dedup_key] = (len(glazes), oxide_count)

            # Color from RGB
            r = safe_float(row.get('rgb_r', 255))
            g = safe_float(row.get('rgb_g', 255))
            b = safe_float(row.get('rgb_b', 255))

            entry = {
                'id': f'glazy_{glaze_id}',
                'name': name,
                'source': 'glazy',
                'cone': cone,
                'coneRaw': cone_raw,
                'surface': surface,
                'transparency': transparency,
                'atmosphere': 'unknown',
                'ingredients': [],  # CSV doesn't have recipe ingredients
                'umf': umf,
                'SiO2_Al2O3_ratio': sio2_al2o3,
                'R2O_RO_ratio': r2o_ro_ratio,
                'fluxSum': round(flux_sum, 4),
                'x': sio2,    # SiO2 on X axis (Stull)
                'y': al2o3,   # Al2O3 on Y axis (Stull)
                'imageUrl': None,
                'thumbnailUrl': None,
                'scrapedAt': None,
            }

            glazes.append(entry)

    # Remove None entries (replaced duplicates)
    glazes = [g for g in glazes if g is not None]

    # Sort by cone then name for consistency
    glazes.sort(key=lambda g: (g['cone'] if g['cone'] is not None else 999, g['name']))

    print(f"\n--- Processing Summary ---")
    print(f"Total CSV rows:     {total:,}")
    print(f"Skipped:")
    for reason, count in sorted(skipped.items()):
        print(f"  {reason}: {count:,}")
    print(f"Duplicates removed: {duplicates:,}")
    print(f"Final glazes:       {len(glazes):,}")

    # Stats
    cones = [g['cone'] for g in glazes if g['cone'] is not None]
    surfaces = defaultdict(int)
    for g in glazes:
        surfaces[g['surface']] += 1

    print(f"\nCone range: {min(cones)} to {max(cones)}")
    print(f"Surface distribution:")
    for s, c in sorted(surfaces.items(), key=lambda x: -x[1]):
        print(f"  {s}: {c:,}")

    # Write output
    print(f"\nWriting {len(glazes):,} glazes to {OUT_PATH}")
    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(glazes, f, separators=(',', ':'))

    size_mb = len(json.dumps(glazes, separators=(',', ':'))) / 1024 / 1024
    print(f"Output size: {size_mb:.1f} MB")
    print("Done!")


if __name__ == '__main__':
    main()
