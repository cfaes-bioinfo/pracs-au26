import { writeFileSync } from 'node:fs';
import {
  mulberry32, makeNoise, pathFrom, tangents, wavyLine, wobble, wobbleOct,
  rigid, strand, arrowHead, fragment, downArrow, INK, GRAY, BLUE, TEAL
} from './geom.mjs';
import { sourceSansFaces, SANS, SVG_SANS } from './fontcss.mjs';

// Deck palette. AMBER matches .amber in theme_slides.scss; SLATE is the
// neutral the raw reads are drawn in -- the same reads in every panel, so
// only the thing each analysis EXTRACTS carries an accent colour.
const AMBER = '#CC7A00';
const SLATE = '#6f787e';

const W = 1400, H = 734, PAD = 22;
const PW = 420, PGAP = 40;          // 3*420 + 2*40 = 1340 = W - 2*PAD
const DW = PW, DH = 250;            // per-panel drawing box

// ---------------------------------------------------------------- helpers

function svg(w, h, body) {
  return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h
    + '" style="display:block;overflow:visible">' + body + '</svg>';
}

function shell(root, fontCss = '') {
  return '<!doctype html>\n<html>\n<head>\n  <meta charset="utf-8">\n'
    + '  <script src="./support.js"></script>\n</head>\n<body>\n<x-dc>\n<helmet>\n  <style>\n'
    + (fontCss ? fontCss + '\n' : '')
    + '    body { margin: 0; }\n'
    + '  </style>\n</helmet>\n' + root + '\n</x-dc>\n</body>\n</html>\n';
}

function label(x, y, text, color, size = 17, style = 'italic', anchor = 'middle') {
  return '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" text-anchor="' + anchor
    + '" font-family="' + SVG_SANS + '" font-size="' + size + '" font-style="' + style
    + '" fill="' + color + '">' + text + '</text>';
}

function sketchRule(w, noise, phase, color, width = 2.6) {
  const pts = [];
  for (let i = 0; i <= 12; i++) pts.push([2 + (w - 4) * i / 12, 4]);
  const ww = wobble(pts, noise, { amp: 1.4, scale: 14, phase });
  return svg(w, 8, '<path d="' + pathFrom(ww) + '" fill="none" stroke="' + color
    + '" stroke-width="' + width + '" stroke-linecap="round"/>');
}

function curveArrow(p0, p1, bulge, noise, phase, { color, width = 2.2, head = 8.5 }) {
  const cx = (p0[0] + p1[0]) / 2, cy = (p0[1] + p1[1]) / 2;
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
  const L = Math.hypot(dx, dy) || 1;
  const ctrl = [cx - (dy / L) * bulge, cy + (dx / L) * bulge];
  const pts = [];
  const n = Math.max(8, Math.round(L / 8));
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t;
    pts.push([
      u * u * p0[0] + 2 * u * t * ctrl[0] + t * t * p1[0],
      u * u * p0[1] + 2 * u * t * ctrl[1] + t * t * p1[1]
    ]);
  }
  const w = wobble(pts, noise, { amp: 1.7, scale: 24, phase });
  const tg = tangents(w);
  return '<path d="' + pathFrom(w) + '" fill="none" stroke="' + color + '" stroke-width="'
    + width + '" stroke-linecap="round"/>'
    + arrowHead(w[w.length - 1], tg[tg.length - 1], { color, size: head, width: width + 0.3 });
}

// A near-horizontal read: the ordered counterpart of a read in the pile.
function read(x, y, len, noise, phase, { color = SLATE, width = 2.5, opacity = 1 } = {}) {
  return fragment(x, y, len, (noise(phase * 1.7) || 0) * 0.02, noise, phase,
    { color, width, opacity });
}

// A hand-drawn X, struck through a read at the variant column.
function cross(x, y, noise, phase, { color, r = 11, width = 3.4 }) {
  const halo = '<circle cx="' + x + '" cy="' + y + '" r="' + (r + 2)
    + '" fill="#ffffff"/>';
  const arm = (a) => {
    const pts = [];
    for (let i = 0; i <= 6; i++) {
      const t = -1 + 2 * i / 6;
      pts.push([x + Math.cos(a) * r * t, y + Math.sin(a) * r * t]);
    }
    return strand(wobble(pts, noise, { amp: 0.7, scale: 9, phase }), { color, width });
  };
  return halo + arm(Math.PI / 4) + arm(-Math.PI / 4);
}

function dashedGuide(x, y0, y1, color) {
  return '<path d="M' + x + ' ' + y0 + 'L' + x + ' ' + y1 + '" stroke="' + color
    + '" stroke-width="1.6" stroke-dasharray="5 6" stroke-linecap="round" fill="none"/>';
}

// ------------------------------------------------------------ the read pile

// Unstructured: every read lands at a random point in an ellipse at a random
// tilt, so the eye finds no order in it at all.
function readPile({ cx, cy, rx, ry, n, seed }) {
  const rand = mulberry32(seed);
  const noise = makeNoise(rand);
  let out = '';
  for (let i = 0; i < n; i++) {
    let ux, uy;
    do { ux = rand() * 2 - 1; uy = rand() * 2 - 1; } while (ux * ux + uy * uy > 1);
    const len = 36 + rand() * 30;
    const tilt = (rand() * 2 - 1) * 1.15;
    out += fragment(cx + ux * rx - len / 2, cy + uy * ry, len, tilt, noise, i * 3.7,
      { color: SLATE, width: 2.5, opacity: 0.6 + rand() * 0.4 });
  }
  return { body: out, noise };
}

// -------------------------------------------------------------- the panels

// 1. Genome assembly -- reads laid out as a tiling path, so the OVERLAPS are
// the point: each read starts partway into the one above it.
function assemblyDrawing(noise) {
  const LEN = 152, STEP = 58;
  let body = '';
  for (let i = 0; i < 5; i++) {
    body += read(6 + i * STEP, 22 + i * 22, LEN, noise, 10 + i * 2.3, { width: 2.7 });
  }
  body += downArrow(DW / 2, 130, 32, noise, 5, { color: BLUE, width: 2.2 });
  const contig = wobbleOct(wavyLine({ x0: 4, y0: 196, len: DW - 8, step: 6, amp: 3, period: 260 }),
    noise, [[3, 60], [1.2, 20]], 4);
  body += strand(contig, { color: BLUE, width: 4.4 });
  body += label(DW / 2, 232, 'one long, continuous sequence', BLUE, 19);
  return svg(DW, DH, body);
}

// 2. Variant analysis -- the same column, read differently in some reads.
function variantDrawing(noise) {
  const COL = 206, REF_Y = 196;
  const rows = [
    [10, 268, false], [34, 296, true], [22, 250, false],
    [8, 284, true], [46, 262, true], [30, 240, false]
  ];
  let body = dashedGuide(COL, 4, REF_Y - 14, '#9aa4aa');
  rows.forEach(([x, len, hasVar], i) => {
    const y = 16 + i * 26;
    body += read(x, y, len, noise, 40 + i * 3.1, { width: 2.7 });
    if (hasVar) body += cross(COL, y, noise, 60 + i, { color: AMBER });
  });
  const ref = wobbleOct(wavyLine({ x0: 4, y0: REF_Y, len: DW - 8, step: 6, amp: 2.5, period: 260 }),
    noise, [[2.4, 60], [1, 20]], 9);
  body += strand(ref, { color: SLATE, width: 4.2 });
  body += label(DW / 2, 232, 'reference genome', SLATE, 19);
  return svg(DW, DH, body);
}

// 3. Gene expression -- reads binned by gene, then stacked so the two piles
// can be compared by eye.
function rnaDrawing(noise) {
  const BAR_Y = 196, LEN = 50, GAP = 6, ROW = 22;
  const genes = [
    { x0: 18, x1: 188, name: 'gene A', rows: [3, 3, 3, 2, 2] },
    { x0: 232, x1: 402, name: 'gene B', rows: [3, 2] }
  ];
  let body = '';
  genes.forEach((g, gi) => {
    const mid = (g.x0 + g.x1) / 2;
    g.rows.forEach((count, ri) => {
      const y = BAR_Y - 26 - ri * ROW;
      const total = count * LEN + (count - 1) * GAP;
      for (let c = 0; c < count; c++) {
        const len = LEN + ((ri * 3 + c * 5) % 4) * 3 - 4;
        body += read(mid - total / 2 + c * (LEN + GAP), y, len,
          noise, 80 + gi * 20 + ri * 4 + c, { width: 2.7 });
      }
    });
    const bar = wobbleOct(wavyLine({ x0: g.x0, y0: BAR_Y, len: g.x1 - g.x0, step: 6, amp: 1.6, period: 200 }),
      noise, [[1.6, 50]], 12 + gi * 6);
    body += strand(bar, { color: TEAL, width: 10 });
    body += label(mid, 232, g.name, TEAL, 20, 'normal');
  });
  return svg(DW, DH, body);
}

// ---------------------------------------------------------------- assembly

function figure() {
  const pileSeed = 20260831;
  const { body: pileBody, noise } = readPile({ cx: 380, cy: 100, rx: 330, ry: 54, n: 106, seed: pileSeed });
  const pileSvg = svg(760, 186, pileBody);

  // Fan: pile bottom -> each panel heading.
  const cx = [PAD + PW / 2, PAD + PW + PGAP + PW / 2, PAD + 2 * (PW + PGAP) + PW / 2];
  const fanH = 84;
  const fan = svg(W - 2 * PAD, fanH,
    curveArrow([W / 2 - PAD - 96, 6], [cx[0] - PAD, fanH - 12], -62, noise, 21, { color: SLATE, width: 2.4 })
    + curveArrow([W / 2 - PAD, 6], [cx[1] - PAD, fanH - 12], 0, noise, 27, { color: SLATE, width: 2.4 })
    + curveArrow([W / 2 - PAD + 96, 6], [cx[2] - PAD, fanH - 12], 62, noise, 33, { color: SLATE, width: 2.4 }));

  const panel = (accent, head, drawing, caption, rulePhase) => `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: ${PW}px;">
        <div style="font-size: 34px; font-weight: 600; color: ${accent}; text-align: center;">${head}</div>
        ${sketchRule(150, noise, rulePhase, accent)}
        ${drawing}
        <div style="font-size: 22px; line-height: 1.45; color: #3c4348; text-align: center; text-wrap: pretty; max-width: 400px; min-height: 64px;">${caption}</div>
      </div>`;

  const root = `<div style="width: ${W}px; height: ${H}px; box-sizing: border-box; padding: ${PAD}px; background: #ffffff; font-family: ${SANS}; color: ${INK}; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <div style="font-size: 22px; letter-spacing: 0.09em; text-transform: uppercase; color: ${SLATE}; margin-bottom: 0;">millions of reads from one HTS run</div>
    ${pileSvg}
    ${fan}
    <div style="display: flex; flex-direction: row; gap: ${PGAP}px; align-items: flex-start; width: ${W - 2 * PAD}px;">
${panel(BLUE, 'Genome assembly', assemblyDrawing(noise),
    'Overlapping reads are stitched into long, continuous sequences.', 1)}
${panel(AMBER, 'Variant analysis', variantDrawing(noise),
      'Reads are aligned to a reference &mdash; positions where they disagree are variants.', 5)}
${panel(TEAL, 'Gene expression', rnaDrawing(noise),
      'Reads are assigned to genes and counted &mdash; <span style="white-space: nowrap;">this is RNA-Seq</span>.', 9)}
    </div>
  </div>`;

  return shell(root, sourceSansFaces());
}

writeFileSync('Main.dc.html', figure());
console.log('wrote Main.dc.html');
