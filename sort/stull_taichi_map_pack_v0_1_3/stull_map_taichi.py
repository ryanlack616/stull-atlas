#!/usr/bin/env python3
"""Taichi Stull Map Viewer (v0.1.3)

Adds:
- "Vertical" encoding as an on-map lift (draw a stem line proportional to height metric)
- Severity filtering (All / Warn+Error / Error only)
- Screenshot save (S)
- On-screen legend + selected metrics readout

Run:
  python stull_map_taichi.py --points stull_points.json --guides stull_guides.v1.json

Controls:
- LMB drag: pan
- Wheel: zoom
- Click: select nearest point
- P: pin/unpin selected
- C: clear pins
- G: toggle guides
- L: toggle LOD density mode
- H: toggle height stems (vertical encoding)
- F: cycle severity filter (all / warn+error / error)
- S: save screenshot (stull_map.png)

Metric presets:
- 1: color=ratio, height=b2o3
- 2: color=b2o3, height=total_flux
- 3: color=severity, height=0
"""

import argparse, json, math
import taichi as ti

try:
    ti.init(arch=ti.gpu)
except Exception:
    ti.init(arch=ti.cpu)

def load_points(path: str):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    pts = data.get("points", [])
    xs = [p["sio2"] for p in pts]
    ys = [p["al2o3"] for p in pts]
    def rng(a):
        return (min(a), max(a)) if a else (0.0, 1.0)
    return pts, rng(xs), rng(ys)

def load_guides(path: str):
    if not path:
        return []
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data.get("guides", [])

def norm(v, r):
    lo, hi = r
    if hi - lo <= 1e-9:
        return 0.5
    return (v - lo) / (hi - lo)

def clamp01(x):
    return max(0.0, min(1.0, x))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--points", required=True)
    ap.add_argument("--guides", default="")
    ap.add_argument("--w", type=int, default=1100)
    ap.add_argument("--h", type=int, default=800)
    ap.add_argument("--lod-grid", type=int, default=140)
    ap.add_argument("--lod-threshold", type=float, default=1.6)
    ap.add_argument("--pick-radius", type=float, default=0.02, help="Pick radius in normalized screen units")
    ap.add_argument("--stem-scale", type=float, default=0.12, help="Stem length scale in normalized units (pre-zoom)")
    ap.add_argument("--screenshot", default="stull_map.png")
    args = ap.parse_args()

    pts, xr, yr = load_points(args.points)
    guides = load_guides(args.guides)
    n = len(pts)
    if n == 0:
        raise SystemExit("No points found.")

    def metric(p, key, default=0.0):
        m = p.get("metrics", {})
        if key in ("ratio","b2o3","total_flux"):
            return float(m.get(key, default))
        if key == "severity":
            return float(p.get("severity", 0))
        return float(p.get(key, default))

    # Fields
    x = ti.field(dtype=ti.f32, shape=n)
    y = ti.field(dtype=ti.f32, shape=n)
    ratio = ti.field(dtype=ti.f32, shape=n)
    b2o3 = ti.field(dtype=ti.f32, shape=n)
    total_flux = ti.field(dtype=ti.f32, shape=n)
    sev = ti.field(dtype=ti.i32, shape=n)

    for i, p in enumerate(pts):
        x[i] = float(p["sio2"])
        y[i] = float(p["al2o3"])
        ratio[i] = metric(p, "ratio", 0.0)
        b2o3[i] = metric(p, "b2o3", 0.0)
        total_flux[i] = metric(p, "total_flux", 0.0)
        sev[i] = int(p.get("severity", 0))

    # CPU ranges per metric
    def range_for(metric_name):
        arr = []
        for i in range(n):
            if metric_name == "ratio": arr.append(float(ratio[i]))
            elif metric_name == "b2o3": arr.append(float(b2o3[i]))
            elif metric_name == "total_flux": arr.append(float(total_flux[i]))
            elif metric_name == "severity": arr.append(float(sev[i]))
        if not arr:
            return (0.0, 1.0)
        return (min(arr), max(arr))

    def ranges_for_preset(p):
        if p == 1:
            return range_for("ratio"), range_for("b2o3")
        if p == 2:
            return range_for("b2o3"), range_for("total_flux")
        return range_for("severity"), (0.0, 1.0)

    # Camera
    pan = ti.Vector([0.0, 0.0])
    zoom = 1.0
    x_min, x_max = xr
    y_min, y_max = yr

    def world_to_screen(wx, wy):
        nx = norm(wx, (x_min, x_max))
        ny = norm(wy, (y_min, y_max))
        v = ti.Vector([nx, ny])
        v = (v - 0.5) * zoom + 0.5 + pan
        return float(v[0]), float(v[1])

    # Density grid
    G = max(16, int(args.lod_grid))
    density = ti.field(dtype=ti.i32, shape=(G, G))

    @ti.kernel
    def clear_density():
        for i, j in density:
            density[i, j] = 0

    @ti.kernel
    def accumulate_density(sev_mode: ti.i32):
        # sev_mode: 0=all, 1=warn+error, 2=error
        for i in range(n):
            s = sev[i]
            ok = True
            if sev_mode == 1:
                ok = s >= 1
            elif sev_mode == 2:
                ok = s >= 2
            if not ok:
                continue

            nx = (x[i] - x_min) / max(1e-6, (x_max - x_min))
            ny = (y[i] - y_min) / max(1e-6, (y_max - y_min))
            vx = (nx - 0.5) * zoom + 0.5 + pan[0]
            vy = (ny - 0.5) * zoom + 0.5 + pan[1]
            if 0.0 <= vx <= 1.0 and 0.0 <= vy <= 1.0:
                gx = ti.cast(vx * (G - 1), ti.i32)
                gy = ti.cast(vy * (G - 1), ti.i32)
                ti.atomic_add(density[gx, gy], 1)

    # Toggles
    show_guides = True if guides else False
    use_lod = True
    show_stems = True

    # Severity filter: 0=all, 1=warn+error, 2=error
    sev_mode = 0
    sev_mode_names = ["all", "warn+error", "error"]

    # Mapping presets
    preset = 1
    color_r, height_r = ranges_for_preset(preset)

    def get_color_height(i):
        if preset == 1:
            return float(ratio[i]), float(b2o3[i])
        if preset == 2:
            return float(b2o3[i]), float(total_flux[i])
        return float(sev[i]), 0.0

    # Selection + pins
    selected = -1
    pinned = []

    # Debounce density recompute
    last_pan = (0.0, 0.0)
    last_zoom = zoom
    last_sev_mode = sev_mode
    cam_eps = 1e-3

    gui = ti.GUI("Stull Map (Taichi)", res=(args.w, args.h))
    dragging = False
    last_mouse = None

    def pick_nearest(mx, my):
        nonlocal selected
        best = -1
        best_d2 = 1e9
        for i in range(n):
            # apply severity filter to picking too
            s = int(sev[i])
            if sev_mode == 1 and s < 1:
                continue
            if sev_mode == 2 and s < 2:
                continue
            sx, sy = world_to_screen(float(x[i]), float(y[i]))
            dx = sx - mx
            dy = sy - my
            d2 = dx*dx + dy*dy
            if d2 < best_d2:
                best_d2 = d2
                best = i
        if best >= 0 and math.sqrt(best_d2) <= float(args.pick_radius):
            selected = best

    def pin_toggle():
        nonlocal pinned
        if selected < 0:
            return
        if selected in pinned:
            pinned = [i for i in pinned if i != selected]
        else:
            pinned = pinned + [selected]
            if len(pinned) > 8:
                pinned = pinned[-8:]

    def nrm(v, lo, hi):
        if hi - lo <= 1e-9:
            return 0.5
        return (v - lo) / (hi - lo)

    while gui.running:
        click_select = False

        for e in gui.get_events(ti.GUI.PRESS, ti.GUI.RELEASE):
            if e.key == ti.GUI.LMB:
                dragging = e.type == ti.GUI.PRESS
                last_mouse = gui.get_cursor_pos()
                if e.type == ti.GUI.RELEASE:
                    click_select = True
            elif e.key == 'g' and e.type == ti.GUI.PRESS:
                show_guides = not show_guides
            elif e.key == 'l' and e.type == ti.GUI.PRESS:
                use_lod = not use_lod
            elif e.key == 'h' and e.type == ti.GUI.PRESS:
                show_stems = not show_stems
            elif e.key == 'f' and e.type == ti.GUI.PRESS:
                sev_mode = (sev_mode + 1) % 3
            elif e.key == 'c' and e.type == ti.GUI.PRESS:
                pinned = []
            elif e.key == 'p' and e.type == ti.GUI.PRESS:
                pin_toggle()
            elif e.key in ('1','2','3') and e.type == ti.GUI.PRESS:
                preset = int(e.key)
                color_r, height_r = ranges_for_preset(preset)
            elif e.key == 's' and e.type == ti.GUI.PRESS:
                gui.show(args.screenshot)

        for e in gui.get_events():
            if e.key == ti.GUI.WHEEL:
                if e.delta_y > 0:
                    zoom *= 1.08
                else:
                    zoom /= 1.08
                zoom = max(0.25, min(12.0, zoom))

        if dragging:
            mx, my = gui.get_cursor_pos()
            if last_mouse is not None:
                dx = mx - last_mouse[0]
                dy = my - last_mouse[1]
                pan += ti.Vector([dx, dy]) * 0.8
            last_mouse = (mx, my)

        if click_select and not dragging:
            mx, my = gui.get_cursor_pos()
            pick_nearest(mx, my)

        gui.clear(0x000000)

        # Guides
        if show_guides and guides:
            for g in guides:
                gtype = g.get("type")
                if gtype == "polygon":
                    pts2 = g.get("points", [])
                    if len(pts2) >= 2:
                        for i in range(len(pts2)):
                            a = pts2[i]
                            b = pts2[(i + 1) % len(pts2)]
                            ax, ay = world_to_screen(float(a["sio2"]), float(a["al2o3"]))
                            bx, by = world_to_screen(float(b["sio2"]), float(b["al2o3"]))
                            gui.line((ax, ay), (bx, by), radius=1, color=0x2E86C1)
                elif gtype == "band":
                    band = g.get("band", {})
                    x0, x1 = float(band.get("xMin", 0)), float(band.get("xMax", 0))
                    y0, y1 = float(band.get("yMin", 0)), float(band.get("yMax", 0))
                    p = [(x0,y0),(x1,y0),(x1,y1),(x0,y1)]
                    for i in range(4):
                        ax, ay = world_to_screen(p[i][0], p[i][1])
                        bx, by = world_to_screen(p[(i+1)%4][0], p[(i+1)%4][1])
                        gui.line((ax, ay), (bx, by), radius=1, color=0x27AE60)

        lod_active = use_lod and (zoom < float(args.lod_threshold))

        if lod_active:
            # recompute density if camera/filter changed
            if (abs(float(pan[0]) - last_pan[0]) > cam_eps or
                abs(float(pan[1]) - last_pan[1]) > cam_eps or
                abs(float(zoom) - last_zoom) > cam_eps or
                int(sev_mode) != int(last_sev_mode)):
                clear_density()
                accumulate_density(int(sev_mode))
                last_pan = (float(pan[0]), float(pan[1]))
                last_zoom = float(zoom)
                last_sev_mode = int(sev_mode)

            den = density.to_numpy()
            maxv = int(den.max()) if den.size else 1
            maxv = max(1, maxv)
            for i in range(G):
                for j in range(G):
                    v = int(den[i, j])
                    if v <= 0:
                        continue
                    shade = int(30 + 225 * (v / maxv))
                    col = (shade << 16) + (shade << 8) + shade
                    sx = (i + 0.5) / G
                    sy = (j + 0.5) / G
                    gui.circle(pos=(sx, sy), radius=1.5/args.w, color=col)
        else:
            c_lo, c_hi = color_r
            h_lo, h_hi = height_r

            # Vectors from selected to pinned
            if selected >= 0 and len(pinned) > 0:
                sx0, sy0 = world_to_screen(float(x[selected]), float(y[selected]))
                for pi in pinned:
                    if pi == selected:
                        continue
                    sx1, sy1 = world_to_screen(float(x[pi]), float(y[pi]))
                    gui.line((sx0, sy0), (sx1, sy1), radius=1, color=0xF1C40F)

            for i in range(n):
                s = int(sev[i])
                if sev_mode == 1 and s < 1:
                    continue
                if sev_mode == 2 and s < 2:
                    continue

                sx, sy = world_to_screen(float(x[i]), float(y[i]))
                if 0.0 <= sx <= 1.0 and 0.0 <= sy <= 1.0:
                    colv, hv = get_color_height(i)
                    cn = clamp01(nrm(colv, c_lo, c_hi))
                    shade = int(50 + 205 * cn)
                    col = (shade << 16) + (shade << 8) + shade

                    hn = clamp01(nrm(hv, h_lo, h_hi))
                    r = 1.5 + 5.5 * hn

                    if i in pinned:
                        r *= 1.35
                    if i == selected:
                        r *= 1.75

                    if s == 1:
                        r *= 1.15
                    elif s >= 2:
                        r *= 1.35

                    # "Vertical" stems: draw a small line upwards proportional to height metric
                    if show_stems and (preset in (1,2)) and (hv != 0.0):
                        stem = float(args.stem_scale) * hn / max(0.25, zoom)
                        gui.line((sx, sy), (sx, sy + stem), radius=1, color=0xAAAAAA)

                    gui.circle(pos=(sx, sy), radius=r/args.w, color=col)

            # Selected readout
            if selected >= 0:
                pid = pts[selected].get("id","")
                pname = pts[selected].get("name","")
                gui.text(f"selected: {pid}", pos=(0.01, 0.94), color=0xFFFFFF)
                gui.text(f"name: {pname[:60]}", pos=(0.01, 0.91), color=0xFFFFFF)
                gui.text(f"SiO2={float(x[selected]):.3f}  Al2O3={float(y[selected]):.3f}", pos=(0.01, 0.88), color=0xFFFFFF)
                gui.text(f"ratio={float(ratio[selected]):.3f}  B2O3={float(b2o3[selected]):.3f}  flux={float(total_flux[selected]):.3f}  sev={int(sev[selected])}",
                         pos=(0.01, 0.85), color=0xFFFFFF)

        # Legend
        preset_name = {1:"ratio/b2o3", 2:"b2o3/flux", 3:"severity/0"}[preset]
        gui.text(
            f"points={n} zoom={zoom:.2f} pan=({float(pan[0]):+.2f},{float(pan[1]):+.2f}) "
            f"guides={'on' if show_guides else 'off'} lod={'on' if use_lod else 'off'} "
            f"mode={'density' if lod_active else 'points'} preset={preset}({preset_name}) "
            f"filter={sev_mode_names[int(sev_mode)]} stems={'on' if show_stems else 'off'} pins={len(pinned)}",
            pos=(0.01, 0.98),
            color=0xFFFFFF
        )
        gui.show()

if __name__ == "__main__":
    main()
