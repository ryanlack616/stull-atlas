# SYNTHETIC DEMO DATA — IMPORTANT

The files:
- material_catalog.synthetic_demo.v0.json
- golden_tests.expected.*.synthetic_demo.v0.json

contain **synthetic, plausible placeholder chemistry** for demonstration/testing of the compute pipeline and golden-test harness.

They are **NOT authoritative analyses** for real materials (Custer feldspar, EPK, frits, etc.).  
Do not use these values for studio decisions.

To produce real golden expected outputs:
1) Replace the synthetic catalog with your real catalog (oxide analyses + LOI).
2) Re-run the generator (compute_expected.py) per profile, with the unity set locked in your compatibility profile.
