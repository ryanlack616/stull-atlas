# Tools

This folder contains zero-dependency helper scripts.

## spec_lint.py
Runs repository hygiene checks:
- Document Status header required in normative docs
- RFC-2119 keywords forbidden in illustrative example files
- JSON parse checks

Run:
```bash
python tools/spec_lint.py .
```

## validate_data.py
Validates shipped molar mass tables and golden expected outputs for sanity and JSON validity.

Run:
```bash
python tools/validate_data.py .
```

## update_normative_hashes.py
Regenerates `NORMATIVE_HASHES.json`.

Run:
```bash
python tools/update_normative_hashes.py .
```

If you update hashes, add a CHANGELOG entry:
`Normative hashes updated: YYYY-MM-DD`
