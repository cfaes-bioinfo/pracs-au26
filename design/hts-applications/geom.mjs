// Deterministic hand-drawn geometry helpers for the Sanger-vs-HTS figure.
// Everything here is pure math -> SVG path strings, so the .dc.html
// artboards stay fully static (no runtime logic, nothing to fail silently).

export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeNoise(rand, n = 512) {
  const g = Array.from({ length: n }, () => rand() * 2 - 1);
  return (x) => {
    const i = Math.floor(x), f = x - i;
    const a = g[((i % n) + n) % n], b = g[(((i + 1) % n) + n) % n];
    const u = f * f * (3 - 2 * f);
    return a + (b - a) * u;
  };
}

const f1 = (v) => Number(v.toFixed(1));

export function tangents(pts) {
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    let dx = b[0] - a[0], dy = b[1] - a[1];
    const L = Math.hypot(dx, dy) || 1;
    out.push([dx / L, dy / L]);
  }
  return out;
}

export function offset(pts, d) {
  const tg = tangents(pts);
  return pts.map((p, i) => [p[0] - tg[i][1] * d, p[1] + tg[i][0] * d]);
}

export function arcLengths(pts) {
  const a = [0];
  for (let i = 1; i < pts.length; i++) {
    a.push(a[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  return a;
}

// index of the point nearest a given arc-length position
export function idxAtArc(arcs, s) {
  let lo = 0, hi = arcs.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arcs[mid] < s) lo = mid + 1; else hi = mid;
  }
  return lo;
}

// Catmull-Rom through the points, emitted as cubic beziers
export function pathFrom(pts) {
  if (pts.length < 2) return '';
  let d = 'M' + f1(pts[0][0]) + ' ' + f1(pts[0][1]);
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i];
    const p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += 'C' + f1(c1x) + ' ' + f1(c1y) + ' ' + f1(c2x) + ' ' + f1(c2y)
       + ' ' + f1(p2[0]) + ' ' + f1(p2[1]);
  }
  return d;
}

// A serpentine "tangle" filling a box: the genome, folded back and forth.
// `rand` jitters where each run turns, so the outline is not a rectangle.
export function serpentine({ x0, y0, w, h, rows, step = 6, rand = null, jit = 22 }) {
  const j = rand ? () => (rand() * 2 - 1) * jit : () => 0;
  const rowH = h / rows, R = rowH / 2;
  const left = x0 + R, right = x0 + w - R;
  const ends = [];
  for (let r = 0; r < rows; r++) ends.push((r % 2 === 0 ? right : left) + j());
  const starts = [left + j()];
  for (let r = 1; r < rows; r++) starts.push(ends[r - 1]);

  const pts = [];
  for (let r = 0; r < rows; r++) {
    const y = y0 + r * rowH + R;
    const ax = starts[r], bx = ends[r];
    const n = Math.max(2, Math.round(Math.abs(bx - ax) / step));
    for (let i = 0; i <= n; i++) pts.push([ax + (bx - ax) * i / n, y]);
    if (r < rows - 1) {
      const goingRight = bx > ax;
      const cx = bx, cy = y + R;
      const na = Math.max(6, Math.round((Math.PI * R) / step));
      for (let i = 1; i <= na; i++) {
        const t = i / na;
        const deg = goingRight ? (-90 + 180 * t) : (270 - 180 * t);
        const rad = deg * Math.PI / 180;
        pts.push([cx + R * Math.cos(rad), cy + R * Math.sin(rad)]);
      }
    }
  }
  return pts;
}

// A long, gently meandering horizontal run.
export function wavyLine({ x0, y0, len, step = 6, amp = 9, period = 210 }) {
  const n = Math.max(2, Math.round(len / step)), pts = [];
  for (let i = 0; i <= n; i++) {
    const x = x0 + len * i / n;
    pts.push([x, y0 + amp * Math.sin((x - x0) / period * Math.PI * 2)]);
  }
  return pts;
}

// Push every point along its normal by smooth noise: the hand-drawn wobble.
export function wobble(pts, noise, { amp = 4, scale = 30, phase = 0 } = {}) {
  const tg = tangents(pts), arcs = arcLengths(pts);
  return pts.map((p, i) => {
    const s = arcs[i] / scale + phase;
    const d = amp * (noise(s) * 0.8 + noise(s * 0.37) * 0.4);
    return [p[0] - tg[i][1] * d, p[1] + tg[i][0] * d];
  });
}

// Layered noise along the normal: the difference between a neat curve and
// something that looks drawn by hand.
export function wobbleOct(pts, noise, octaves, phase = 0) {
  const tg = tangents(pts), arcs = arcLengths(pts);
  return pts.map((p, i) => {
    let d = 0;
    for (let k = 0; k < octaves.length; k++) {
      const [amp, scale] = octaves[k];
      d += amp * noise(arcs[i] / scale + phase + k * 37.5);
    }
    return [p[0] - tg[i][1] * d, p[1] + tg[i][0] * d];
  });
}

export function rigid(pts, angle, dx, dy) {
  let cx = 0, cy = 0;
  for (const p of pts) { cx += p[0]; cy += p[1]; }
  cx /= pts.length; cy /= pts.length;
  const c = Math.cos(angle), s = Math.sin(angle);
  return pts.map(([x, y]) => {
    const X = x - cx, Y = y - cy;
    return [cx + X * c - Y * s + dx, cy + X * s + Y * c + dy];
  });
}

// Two offset strands = a schematic DNA duplex.
export function duplex(pts, { color, width = 2.1, sep = 2.5, opacity = 1 }) {
  const a = pathFrom(offset(pts, sep)), b = pathFrom(offset(pts, -sep));
  const o = opacity === 1 ? '' : ' opacity="' + opacity + '"';
  const attrs = ' fill="none" stroke="' + color + '" stroke-width="' + width
    + '" stroke-linecap="round"' + o + '/>';
  return '<path d="' + a + '"' + attrs + '<path d="' + b + '"' + attrs;
}

export function arrowHead(p, t, { color, size = 8, width = 2.2 }) {
  const [tx, ty] = t, nx = -ty, ny = tx;
  const b1 = [p[0] - tx * size + nx * size * 0.6, p[1] - ty * size + ny * size * 0.6];
  const b2 = [p[0] - tx * size - nx * size * 0.6, p[1] - ty * size - ny * size * 0.6];
  return '<path d="M' + f1(b1[0]) + ' ' + f1(b1[1]) + 'L' + f1(p[0]) + ' ' + f1(p[1])
    + 'L' + f1(b2[0]) + ' ' + f1(b2[1]) + '" fill="none" stroke="' + color
    + '" stroke-width="' + width + '" stroke-linecap="round" stroke-linejoin="round"/>';
}

// A primer: a short strand lying alongside the duplex, arrowhead pointing
// into the target region (the direction it would extend).
export function primer(pts, arcs, startArc, dirSign, side, { color, len = 34, gap = 7.5 }) {
  const i0 = idxAtArc(arcs, startArc);
  const i1 = idxAtArc(arcs, startArc + dirSign * len);
  const lo = Math.min(i0, i1), hi = Math.max(i0, i1);
  let seg = pts.slice(lo, hi + 1);
  if (seg.length < 2) return '';
  if (dirSign < 0) seg = seg.slice().reverse();
  const shifted = offset(seg, (dirSign < 0 ? -side : side) * gap);
  const tg = tangents(shifted);
  const tip = shifted[shifted.length - 1];
  return '<path d="' + pathFrom(shifted) + '" fill="none" stroke="' + color
    + '" stroke-width="3" stroke-linecap="round"/>'
    + arrowHead(tip, tg[tg.length - 1], { color, size: 7.5, width: 2.6 });
}

// A short free-floating fragment, used for the "what gets sequenced" pile.
export function fragment(x, y, len, tilt, noise, phase, { color, width = 2, sep = 2.3, opacity = 1 }) {
  const base = wavyLine({ x0: x, y0: y, len, step: 7, amp: 2.6, period: 90 });
  const w = wobble(base, noise, { amp: 2.4, scale: 18, phase });
  return strand(rigid(w, tilt, 0, 0), { color, width, opacity });
}

export function downArrow(x, y, h, noise, phase, { color, width = 2 }) {
  const pts = [];
  const n = Math.max(4, Math.round(h / 6));
  for (let i = 0; i <= n; i++) pts.push([x, y + h * i / n]);
  const w = wobble(pts, noise, { amp: 1.8, scale: 20, phase });
  const tg = tangents(w);
  return '<path d="' + pathFrom(w) + '" fill="none" stroke="' + color + '" stroke-width="'
    + width + '" stroke-linecap="round"/>'
    + arrowHead(w[w.length - 1], tg[tg.length - 1], { color, size: 8, width: width + 0.3 });
}

export const INK = '#121212';
export const GRAY = '#A7B1B7';
export const GRAY_DEEP = '#7d878e';
export const BLUE = '#0072B2';
export const TEAL = '#009E73';

// A single hand-drawn stroke. At figure scale this reads as DNA far better
// than two parallel lines, which turn into a tube outline.
export function strand(pts, { color, width = 2.6, opacity = 1 }) {
  const o = opacity === 1 ? '' : ' opacity="' + opacity + '"';
  return '<path d="' + pathFrom(pts) + '" fill="none" stroke="' + color
    + '" stroke-width="' + width + '" stroke-linecap="round"' + o + '/>';
}
