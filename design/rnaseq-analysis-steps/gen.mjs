import { writeFileSync } from 'node:fs';
import {
  mulberry32, makeNoise, wavyLine, wobble, wobbleOct, tangents, arrowHead,
  rigid, strand, INK, GRAY_DEEP, BLUE, TEAL
} from './geom.mjs';
import { sourceSansFaces, SANS, SVG_SANS } from './fontcss.mjs';

// Same grammar as img/hts-applications.png: reads are drawn in ONE neutral
// slate everywhere, and colour marks only what a step acts on -- the red
// junk that trimming removes, the two genes that alignment assigns reads to.
// RED is $primary and BLUE/TEAL are the accent trio, all from theme_web.scss.
const SLATE = '#6f787e';
const RED = '#bb0000';

const W = 1400, PAD = 26;
const CW = 980, GAP = 40, LW = 328;   // 26 + 980 + 40 + 328 + 26 = 1400
const H1 = 220, H2 = 220, H3 = 254, H4 = 140, HT = 128;
const H = PAD * 2 + H1 + H2 + H3 + H4 + HT * 3;

// --------------------------------------------------------------- helpers

function svg(w, h, body) {
  return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h
    + '" style="display:block;overflow:visible">' + body + '</svg>';
}

function shell(root, fontCss = '') {
  return '<!doctype html>\n<html>\n<head>\n  <meta charset="utf-8">\n'
    + '  <script src="./support.js"></script>\n</head>\n<body>\n<x-dc>\n<helmet>\n  <style>\n'
    + (fontCss ? fontCss + '\n' : '')
    + '    body { margin: 0; }\n'
    + '    a { color: #1c2498; } a:hover { color: #bb0000; }\n'
    + '  </style>\n</helmet>\n' + root + '\n</x-dc>\n</body>\n</html>\n';
}

function label(x, y, text, color, size = 19, style = 'italic', anchor = 'middle', weight = 400) {
  return '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" text-anchor="' + anchor
    + '" font-family="' + SVG_SANS + '" font-size="' + size + '" font-style="' + style
    + '" font-weight="' + weight + '" fill="' + color + '">' + text + '</text>';
}

// A flow arrow, sized to carry the eye down the full figure.
function bigArrow(w, h, noise, phase) {
  const x = w / 2, len = h - 18;
  const pts = [];
  const n = Math.max(8, Math.round(len / 6));
  for (let i = 0; i <= n; i++) pts.push([x, 4 + len * i / n]);
  const ww = wobble(pts, noise, { amp: 1.8, scale: 22, phase });
  const tg = tangents(ww);
  return svg(w, h, strand(ww, { color: SLATE, width: 5.4 })
    + arrowHead(ww[ww.length - 1], tg[tg.length - 1], { color: SLATE, size: 21, width: 6 }));
}

// A read as POINTS, so a stretch of it can be redrawn in another colour.
function readPts(x, y, len, noise, phase, tilt = 0) {
  const base = wavyLine({ x0: x, y0: y, len, step: 7, amp: 2.6, period: 90 });
  return rigid(wobble(base, noise, { amp: 2.4, scale: 18, phase }), tilt, 0, 0);
}

function seg(pts, f0, f1, opts) {
  const i0 = Math.max(0, Math.floor(pts.length * f0));
  const i1 = Math.min(pts.length, Math.ceil(pts.length * f1));
  return strand(pts.slice(i0, i1), opts);
}

// ------------------------------------------------------- the read library
// One set of reads, drawn twice: with its junk in stage 1, trimmed in
// stage 2 at the same positions -- so the eye sees the SAME reads cleaned
// up rather than a fresh random scatter.

const JUNK = 34;

function readLibrary(seed) {
  const rand = mulberry32(seed);
  const out = [];
  for (let r = 0; r < 8; r++) {
    let x = 4 + rand() * 190;
    for (;;) {
      const len = 104 + rand() * 136;
      if (x + len > CW - 4) break;
      const u = rand();
      const junk = u < 0.17 ? "tail" : u < 0.30 ? "head" : u < 0.38 ? "all" : null;
      const y = 16 + r * 26 + (rand() * 2 - 1) * 4.5;
      out.push({ x, y, len, junk, phase: out.length * 3.3, tilt: (rand() * 2 - 1) * 0.022 });
      x += len + 22 + rand() * 132;
    }
  }
  return out;
}

function rawDrawing(reads, noise) {
  let body = '';
  for (const rd of reads) {
    const pts = readPts(rd.x, rd.y, rd.len, noise, rd.phase, rd.tilt);
    if (rd.junk === 'all') { body += strand(pts, { color: RED, width: 3.2 }); continue; }
    body += strand(pts, { color: SLATE, width: 3 });
    if (rd.junk === 'tail') body += seg(pts, 1 - JUNK / rd.len, 1, { color: RED, width: 3.2 });
    if (rd.junk === 'head') body += seg(pts, 0, JUNK / rd.len, { color: RED, width: 3.2 });
  }
  return svg(CW, H1, body);
}

function trimmedDrawing(reads, noise) {
  let body = '';
  for (const rd of reads) {
    if (rd.junk === 'all') continue;                     // discarded entirely
    const cut = rd.junk ? JUNK : 0;
    const x = rd.junk === 'head' ? rd.x + cut : rd.x;
    body += strand(readPts(x, rd.y, rd.len - cut, noise, rd.phase, rd.tilt), { color: SLATE, width: 3 });
  }
  return svg(CW, H2, body);
}

// ----------------------------------------------------------- the genome

const BAR_Y = 186;
const GENES = [
  { x0: 70, x1: 440, rx0: 52, rx1: 458, name: 'Gene A', color: BLUE, rows: [2, 2, 2, 1, 1] },
  { x0: 552, x1: 912, rx0: 534, rx1: 930, name: 'Gene B', color: TEAL, rows: [2, 2, 2, 2, 1] }
];

function alignedDrawing(noise, seed) {
  const rand = mulberry32(seed);
  let body = '';

  // intergenic backbone, then the two genes drawn thick on top of it
  const back = wobbleOct(wavyLine({ x0: 8, y0: BAR_Y, len: 964, step: 6, amp: 2, period: 300 }),
    noise, [[2, 60], [0.8, 20]], 3);
  body += strand(back, { color: SLATE, width: 5.6 });

  for (const g of GENES) {
    const f0 = (g.x0 - 8) / 964, f1 = (g.x1 - 8) / 964;
    body += seg(back, f0, f1, { color: g.color, width: 14 });
  }

  // pileups: exactly the number of reads the count table reports
  for (const g of GENES) {
    const span = g.rx1 - g.rx0;
    g.rows.forEach((n, ri) => {
      const y = BAR_Y - 30 - ri * 26;
      const lens = [];
      for (let c = 0; c < n; c++) lens.push(126 + rand() * 54);
      const slack = Math.max(0, span - lens.reduce((a, b) => a + b, 0) - (n - 1) * 16);
      const cuts = [];
      for (let c = 0; c <= n; c++) cuts.push(0.25 + rand());
      const sum = cuts.reduce((a, b) => a + b, 0) || 1;
      let x = g.rx0 + slack * cuts[0] / sum;
      lens.forEach((len, c) => {
        body += strand(readPts(x, y, len, noise, 200 + ri * 7 + c * 3 + g.x0),
          { color: g.color, width: 3.2 });
        x += len + 16 + slack * cuts[c + 1] / sum;
      });
    });
    body += label((g.x0 + g.x1) / 2, BAR_Y + 42, g.name, g.color, 27, 'normal', 'middle', 600);
  }
  return svg(CW, H3, body);
}

// ------------------------------------------------------------- the counts

function countsDrawing() {
  const rows = [
    { name: 'Sample 1', vals: ['8', '9'], color: INK },
    { name: 'Sample 2', vals: ['15', '7'], color: GRAY_DEEP }
  ];
  let body = '';
  rows.forEach((r, i) => {
    const y = 52 + i * 56;
    body += label(20, y, r.name, r.color, 31, 'normal', 'start');
    GENES.forEach((g, gi) => {
      body += label((g.x0 + g.x1) / 2, y, r.vals[gi], r.color, 34, 'normal', 'middle', 600);
    });
  });
  return svg(CW, H4, body);
}

// ---------------------------------------------------------------- layout

function stageLabel(text, noise, phase, extra = '', h) {
  return `
      <div style="width: ${LW}px; height: ${h}px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 14px; position: relative;">
        <div style="font-size: 36px; font-weight: 600; color: ${INK}; line-height: 1.15;">${text}</div>${extra}
      </div>`;
}

function stage(drawing, labelBlock, h) {
  return `
    <div style="display: flex; flex-direction: row; gap: ${GAP}px; align-items: flex-start; width: ${CW + GAP + LW}px; height: ${h}px;">
      <div style="width: ${CW}px;">${drawing}</div>${labelBlock}
    </div>`;
}

function transition(text, noise, phase) {
  const arrow = bigArrow(64, 116, noise, phase);
  return `
    <div style="display: flex; flex-direction: row; align-items: center; gap: 34px; width: ${CW + GAP + LW}px; height: ${HT}px;">
      <div style="width: 420px; display: flex; justify-content: center;">${arrow}</div>
      <div style="font-size: 36px; font-style: italic; color: ${SLATE}; max-width: 400px; text-wrap: pretty;">${text}</div>
    </div>`;
}

function figure() {
  const rand = mulberry32(20260912);
  const noise = makeNoise(rand);
  const reads = readLibrary(5478);

  const legend = `
        <div style="display: flex; flex-direction: row; align-items: flex-start; gap: 13px; margin-top: 8px;">
          ${svg(52, 34, strand(wobble([[2, 22], [18, 22], [34, 22], [50, 22]], noise, { amp: 1.2, scale: 12, phase: 71 }), { color: RED, width: 3.6 }))}
          <div style="font-size: 30px; font-style: italic; color: ${SLATE}; line-height: 1.25;">low-quality bases<br>and adapters</div>
        </div>`;

  const refLabel = `
        <div style="position: absolute; left: 0; top: 176px; font-size: 30px; font-style: italic; color: ${SLATE};">reference genome</div>`;

  const root = `<div style="width: ${W}px; height: ${H}px; box-sizing: border-box; padding: ${PAD}px; background: #ffffff; font-family: ${SANS}; color: ${INK}; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
${stage(rawDrawing(reads, noise), stageLabel('Raw reads', noise, 1, legend, H1), H1)}
${transition('Quality trimming and adapter removal', noise, 41)}
${stage(trimmedDrawing(reads, noise), stageLabel('Processed reads', noise, 5, '', H2), H2)}
${transition('Read alignment', noise, 47)}
${stage(alignedDrawing(noise, 90210), stageLabel('Aligned reads', noise, 9, refLabel, H3), H3)}
${transition('Alignment counting', noise, 53)}
${stage(countsDrawing(), stageLabel('Read counts<br>per gene', noise, 13, '', H4), H4)}
  </div>`;

  return shell(root, sourceSansFaces());
}

writeFileSync('Main.dc.html', figure());
console.log('wrote Main.dc.html  ' + W + 'x' + H);
