// Runs after `astro build`. Astro copies every original image it imports into
// dist/_astro, even when pages only use the resized AVIF/WebP versions. Those
// unused originals made up a large share of the upload (and slowed GitHub Pages
// publishing), so delete any image in dist/_astro that no built file references.
import fs from 'node:fs';
import path from 'node:path';

const dist = 'dist';
const assets = path.join(dist, '_astro');
const isImage = (f) => /\.(png|jpe?g|webp|avif|gif)$/i.test(f);
const isText = (f) => /\.(html|css|js|mjs|json|xml|txt|webmanifest)$/i.test(f);

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const text = walk(dist)
  .filter(isText)
  .map((f) => fs.readFileSync(f, 'utf8'))
  .join('\n');

let removed = 0;
let bytes = 0;
for (const name of fs.existsSync(assets) ? fs.readdirSync(assets) : []) {
  if (!isImage(name) || text.includes(name)) continue;
  const p = path.join(assets, name);
  bytes += fs.statSync(p).size;
  fs.rmSync(p);
  removed++;
}
console.log(`prune-unused-assets: removed ${removed} unreferenced images (${(bytes / 1048576).toFixed(1)} MB)`);
