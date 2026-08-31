import { readFileSync } from 'node:fs';

// The exact Source Sans Pro faces the reveal.js deck ships, inlined as data
// URIs so the figure matches the slides and needs no network at render time.
const FACES = [
  ['source-sans-pro-regular.woff', 400, 'normal'],
  ['source-sans-pro-italic.woff', 400, 'italic'],
  ['source-sans-pro-semibold.woff', 600, 'normal']
];

export function sourceSansFaces() {
  return FACES.map(([file, weight, style]) => {
    const b64 = readFileSync('fonts/' + file).toString('base64');
    return "    @font-face { font-family: 'Source Sans Pro'; font-weight: " + weight
      + '; font-style: ' + style + '; font-display: block;\n'
      + "      src: url(data:font/woff;base64," + b64 + ") format('woff'); }";
  }).join('\n');
}

export const SANS = "'Source Sans Pro', Helvetica, Arial, sans-serif";
export const SVG_SANS = 'Source Sans Pro, Helvetica, Arial, sans-serif';
