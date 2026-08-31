import { writeFileSync } from 'node:fs';
import {
  mulberry32, makeNoise, arcLengths, idxAtArc, pathFrom, tangents,
  serpentine, wavyLine, wobble, wobbleOct, rigid, duplex, strand, arrowHead, primer,
  fragment, downArrow, INK, GRAY, GRAY_DEEP, BLUE, TEAL
} from './geom.mjs';
import { sourceSansFaces, SANS, SVG_SANS } from './fontcss.mjs';

const SERIF = "Georgia, 'Times New Roman', 'BuckeyeSerif', serif";
const SVG_SERIF = 'Georgia, Times New Roman, serif';

// Big slow meander, medium sway, fine pencil tremor.
const OCT = [[8.5, 46], [3.6, 19], [1.3, 7.5]];
const OCT_S = [[7, 42], [3.1, 17], [1.2, 7]];

// ---------------------------------------------------------------- helpers

function fragmentsFrom(pts, arcs, rand, { avg = 86, jitter = 26, gap = 12 } = {}) {
  const total = arcs[arcs.length - 1];
  const cuts = [0];
  let s = 0;
  for (;;) {
    s += avg + (rand() * 2 - 1) * jitter;
    if (s > total - 34) break;
    cuts.push(s);
  }
  cuts.push(total);
  const segs = [];
  for (let k = 0; k < cuts.length - 1; k++) {
    const a = cuts[k] + (k === 0 ? 0 : gap / 2);
    const b = cuts[k + 1] - (k === cuts.length - 2 ? 0 : gap / 2);
    if (b - a < 20) continue;
    const i0 = idxAtArc(arcs, a), i1 = idxAtArc(arcs, b);
    if (i1 - i0 < 2) continue;
    segs.push(rigid(pts.slice(i0, i1 + 1), (rand() * 2 - 1) * 0.05,
      (rand() * 2 - 1) * 4, (rand() * 2 - 1) * 4));
  }
  return segs;
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
  const w = wobble(pts, noise, { amp: 1.8, scale: 24, phase });
  const tg = tangents(w);
  return '<path d="' + pathFrom(w) + '" fill="none" stroke="' + color + '" stroke-width="'
    + width + '" stroke-linecap="round"/>'
    + arrowHead(w[w.length - 1], tg[tg.length - 1], { color, size: head, width: width + 0.3 });
}

function sketchRule(w, noise, phase, color, width = 2.6) {
  const pts = [];
  for (let i = 0; i <= 12; i++) pts.push([2 + (w - 4) * i / 12, 4]);
  const ww = wobble(pts, noise, { amp: 1.4, scale: 14, phase });
  return '<svg width="' + w + '" height="8" viewBox="0 0 ' + w + ' 8" style="display:block">'
    + '<path d="' + pathFrom(ww) + '" fill="none" stroke="' + color + '" stroke-width="'
    + width + '" stroke-linecap="round"/></svg>';
}

function label(x, y, text, color, size = 14, style = 'italic', font = SVG_SERIF) {
  return '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" text-anchor="middle"'
    + ' font-family="' + font + '" font-size="' + size + '" font-style="' + style
    + '" fill="' + color + '">' + text + '</text>';
}

function svg(w, h, body) {
  return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h
    + '" style="display:block;overflow:visible">' + body + '</svg>';
}

function shell(root, fontCss = '') {
  return '<!doctype html>\n<html>\n<head>\n  <meta charset="utf-8">\n'
    + '  <script src="./support.js"></script>\n</head>\n<body>\n<x-dc>\n<helmet>\n  <style>\n'
    + (fontCss ? fontCss + '\n' : '')
    + '    body { margin: 0; }\n'
    + '    a { color: #1c2498; }\n'
    + '    a:hover { color: #bb0000; }\n'
    + '  </style>\n</helmet>\n' + root + '\n</x-dc>\n</body>\n</html>\n';
}

// The genome tangle. Same seed everywhere, so every panel draws the SAME molecule.
function tangle({ x0, y0, w, h, rows, seed, oct = OCT, jit = 22 }) {
  const rand = mulberry32(seed);
  const noise = makeNoise(rand);
  const base = serpentine({ x0, y0, w, h, rows, step: 6, rand: mulberry32(seed ^ 0x5f5f), jit });
  const pts = wobbleOct(base, noise, oct);
  return { pts, arcs: arcLengths(pts), rand, noise };
}

const SEED = 20260826;

// ------------------------------------------------------- A: side by side

function optionA() {
  const PW = 614, GH = 270, RH = 110;
  const box = { x0: 32, y0: 16, w: 550, h: GH - 32, rows: 4, seed: SEED, jit: 15 };

  const g = tangle(box);
  const total = g.arcs[g.arcs.length - 1];
  const winA = total * 0.34, winB = winA + 120;
  const target = g.pts.slice(idxAtArc(g.arcs, winA), idxAtArc(g.arcs, winB) + 1);
  const mid = g.pts[idxAtArc(g.arcs, (winA + winB) / 2)];

  const sangerBody =
    strand(g.pts, { color: GRAY, width: 2.4 })
    + strand(target, { color: BLUE, width: 3.4 })
    + primer(g.pts, g.arcs, winA - 72, +1, +1, { color: BLUE, len: 52, gap: 10.5 })
    + primer(g.pts, g.arcs, winB + 72, -1, -1, { color: BLUE, len: 52, gap: 10.5 })
    + label(mid[0], mid[1] + 32, 'primers', BLUE, 17, 'italic', SVG_SANS);

  const h = tangle(box);
  const frags = fragmentsFrom(h.pts, h.arcs, mulberry32(77));
  const htsBody = frags.map((s) => strand(s, { color: TEAL, width: 2.6 })).join('');

  const arrow = (color, phase) => svg(PW, 40,
    downArrow(PW / 2, 4, 30, g.noise, phase, { color, width: 2.1 }));

  const sangerReads = svg(PW, RH,
    fragment(PW / 2 - 70, 22, 140, -0.014, g.noise, 3.1, { color: BLUE, width: 3.3 }));

  const rr = mulberry32(4242);
  let htsReads = '';
  const rowsY = [18, 41, 64, 87, 106];
  rowsY.forEach((y, ri) => {
    const op = ri === rowsY.length - 1 ? 0.42 : 1;
    for (let c = 0; c < 7; c++) {
      const slot = PW / 7;
      const len = 38 + rr() * 32;
      const x = c * slot + (slot - len) / 2 + (rr() * 2 - 1) * 15 + (ri % 2 ? 12 : -6);
      htsReads += fragment(x, y + (rr() * 2 - 1) * 5.5, len, (rr() * 2 - 1) * 0.14,
        h.noise, ri * 7 + c, { color: TEAL, width: 2.4, opacity: op });
    }
  });

  const divider = (() => {
    const pts = [];
    for (let i = 0; i <= 40; i++) pts.push([5, 6 + 618 * i / 40]);
    const w = wobble(pts, g.noise, { amp: 1.7, scale: 22, phase: 9 });
    return svg(10, 640, '<path d="' + pathFrom(w) + '" fill="none" stroke="' + GRAY
      + '" stroke-width="1.4" stroke-linecap="round"/>');
  })();

  const panel = (accent, head, drawing, caption, arrowSvg, reads, result) => `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; width: ${PW}px;">
        <div style="font-size: 34px; font-weight: 600; color: ${accent}; text-align: center;">${head}</div>
        ${sketchRule(140, g.noise, accent === BLUE ? 1 : 5, accent)}
        ${drawing}
        <div style="font-size: 21px; line-height: 1.5; color: #3c4348; text-align: center; text-wrap: pretty; max-width: 560px; min-height: 63px;">${caption}</div>
        ${arrowSvg}
        ${reads}
        <div style="font-size: 28px; font-weight: 600; color: ${accent}; text-align: center; text-wrap: balance; max-width: 560px; min-height: 74px;">${result}</div>
      </div>`;

  const root = `<div style="width: 1400px; height: 750px; box-sizing: border-box; padding: 36px; background: #ffffff; font-family: ${SANS}; color: ${INK}; display: flex; flex-direction: column; align-items: center; gap: 20px;">
    <div style="display: flex; flex-direction: row; align-items: stretch; width: 1328px;">
${panel(BLUE, 'Sanger sequencing', svg(PW, GH, sangerBody),
    'Primers pick out <strong>one</strong> specific stretch of the genome.',
    arrow(BLUE, 2), sangerReads, 'one fragment at a time')}
      <div style="width: 100px; display: flex; align-items: center; justify-content: center;">${divider}</div>
${panel(TEAL, 'High-throughput sequencing', svg(PW, GH, htsBody),
      'The genome is broken into fragments &mdash; <span style="white-space: nowrap;"><strong>no target needed</strong>.</span>',
      arrow(TEAL, 6), svg(PW, RH, htsReads),
      'hundreds of thousands to billions of fragments at a time')}
    </div>
  </div>`;

  return shell(root, sourceSansFaces());
}

// ------------------------------------------------- B: one genome, two branches

function optionB() {
  const g = tangle({ x0: 24, y0: 18, w: 592, h: 250, rows: 4, seed: SEED, oct: OCT_S, jit: 14 });
  const genome = svg(640, 286, strand(g.pts, { color: GRAY_DEEP, width: 2.5 }));

  const branches = svg(1092, 152,
    curveArrow([500, 10], [186, 136], -70, g.noise, 11, { color: BLUE, width: 2.4 })
    + curveArrow([592, 10], [906, 136], 70, g.noise, 17, { color: TEAL, width: 2.4 })
    + label(252, 46, 'PCR with specific primers', BLUE, 17, 'normal')
    + label(840, 46, 'random fragmentation', TEAL, 17, 'normal'));

  const one = (() => {
    const base = wavyLine({ x0: 108, y0: 32, len: 284, step: 6, amp: 6, period: 210 });
    const pts = wobbleOct(base, g.noise, [[4, 70], [1.6, 22]], 21);
    return strand(pts, { color: BLUE, width: 3.2 });
  })();

  const rr = mulberry32(31337);
  let many = '';
  for (let row = 0; row < 5; row++) {
    for (let c = 0; c < 9; c++) {
      const slot = 476 / 9;
      const len = 26 + rr() * 24;
      const x = 12 + c * slot + (slot - len) / 2 + (rr() * 2 - 1) * 11 + (row % 2 ? 9 : -5);
      many += fragment(x, 24 + row * 22 + (rr() * 2 - 1) * 4.5, len, (rr() * 2 - 1) * 0.15,
        g.noise, row * 9 + c, { color: TEAL, width: 2.3, opacity: row === 4 ? 0.42 : 1 });
    }
  }

  const leaf = (accent, head, drawing, result) => `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 14px; width: 500px;">
          <div style="font-size: 25px; font-weight: 700; color: ${accent}; text-align: center;">${head}</div>
          ${drawing}
          <div style="font-size: 19px; font-weight: 700; color: ${accent}; text-align: center; text-wrap: pretty; max-width: 440px;">${result}</div>
        </div>`;

  const root = `<div style="width: 1180px; height: 830px; box-sizing: border-box; padding: 36px 40px; background: #ffffff; font-family: ${SERIF}; color: ${INK}; display: flex; flex-direction: column; align-items: center; gap: 10px;">
    <div style="font-size: 16px; letter-spacing: 0.09em; text-transform: uppercase; color: #6b7378;">genomic DNA</div>
    ${genome}
    ${branches}
    <div style="display: flex; flex-direction: row; gap: 92px; align-items: flex-start;">
${leaf(BLUE, 'Sanger sequencing', svg(500, 140, one), 'one fragment sequenced')}
${leaf(TEAL, 'High-throughput sequencing', svg(500, 140, many), 'hundreds of thousands to billions of fragments sequenced')}
    </div>
  </div>`;

  return shell(root);
}

// --------------------------------------- C: the same molecule, two treatments

function optionC() {
  const LW = 862;
  const mk = () => {
    const rand = mulberry32(SEED);
    const noise = makeNoise(rand);
    const base = wavyLine({ x0: 14, y0: 78, len: LW - 28, step: 6, amp: 15, period: 235 });
    const pts = wobbleOct(base, noise, [[7, 52], [3, 22], [1.2, 8]]);
    return { pts, arcs: arcLengths(pts), noise };
  };

  const a = mk();
  const totA = a.arcs[a.arcs.length - 1];
  const winA = totA * 0.45, winB = winA + 140;
  const target = a.pts.slice(idxAtArc(a.arcs, winA), idxAtArc(a.arcs, winB) + 1);
  const midA = a.pts[idxAtArc(a.arcs, (winA + winB) / 2)];

  const rowSanger = svg(LW, 160,
    strand(a.pts, { color: GRAY, width: 2.5 })
    + strand(target, { color: BLUE, width: 3.5 })
    + primer(a.pts, a.arcs, winA - 64, +1, +1, { color: BLUE, len: 52, gap: 10.5 })
    + primer(a.pts, a.arcs, winB + 64, -1, -1, { color: BLUE, len: 52, gap: 10.5 })
    + label(midA[0], midA[1] - 34, 'primers pick out one stretch', BLUE, 16));

  const b = mk();
  const frags = fragmentsFrom(b.pts, b.arcs, mulberry32(909), { avg: 74, jitter: 22, gap: 13 });
  const rowHts = svg(LW, 160, frags.map((s) => strand(s, { color: TEAL, width: 2.8 })).join(''));

  const side = (accent, head, note) => `
        <div style="display: flex; flex-direction: column; gap: 8px; width: 220px; padding-top: 30px;">
          <div style="font-size: 25px; font-weight: 700; color: ${accent}; line-height: 1.15;">${head}</div>
          <div style="font-size: 17px; line-height: 1.45; color: #3c4348; text-wrap: pretty;">${note}</div>
        </div>`;

  const root = `<div style="width: 1200px; height: 500px; box-sizing: border-box; padding: 40px; background: #ffffff; font-family: ${SERIF}; color: ${INK}; display: flex; flex-direction: column; gap: 24px;">
    <div style="display: flex; flex-direction: row; gap: 6px; align-items: flex-start;">
${side(BLUE, 'Sanger', 'one targeted fragment is sequenced')}
      ${rowSanger}
    </div>
    <div style="height: 1px; background: ${GRAY}; width: 100%;"></div>
    <div style="display: flex; flex-direction: row; gap: 6px; align-items: flex-start;">
${side(TEAL, 'HTS', 'the same DNA, fragmented &mdash; all of it is sequenced')}
      ${rowHts}
    </div>
    <div style="font-size: 20px; font-style: italic; color: #5c6469; text-align: center;">The same molecule, drawn twice &mdash; only the selection differs.</div>
  </div>`;

  return shell(root);
}

writeFileSync('Main.dc.html', optionA());
writeFileSync('Branch.dc.html', optionB());
writeFileSync('Rows.dc.html', optionC());
console.log('wrote Main.dc.html, Branch.dc.html, Rows.dc.html');
