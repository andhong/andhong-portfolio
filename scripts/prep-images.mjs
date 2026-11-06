// Prepares source images before they're committed to src/assets/media.
// Usage: node scripts/prep-images.mjs <input-dir> <output-dir>
//
// - Caps the longest side at 2560px (2x the widest layout slot).
// - Keeps the original bytes when re-encoding wouldn't make it smaller.
// - Converts PNGs that are still over 1.5MB into high-quality WebP.
// Astro then generates responsive, compressed variants at build time,
// so these files are "masters", not what visitors download.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const [src, dst] = process.argv.slice(2);
if (!src || !dst) {
  console.error('Usage: node scripts/prep-images.mjs <input-dir> <output-dir>');
  process.exit(1);
}

const MAX = 2560;
const BIG_PNG = 1.5 * 1024 * 1024;

for (const rel of fs.readdirSync(src, { recursive: true })) {
  const from = path.join(src, rel);
  if (fs.statSync(from).isDirectory()) continue;
  const ext = path.extname(rel).toLowerCase();
  let to = path.join(dst, rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });

  if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
    fs.copyFileSync(from, to);
    continue;
  }

  const meta = await sharp(from, { limitInputPixels: false }).metadata();
  const needsResize = Math.max(meta.width, meta.height) > MAX;
  let pipeline = sharp(from, { limitInputPixels: false }).rotate();
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX, height: MAX, fit: 'inside' });
  }

  let buf =
    ext === '.png'
      ? await pipeline.clone().png({ compressionLevel: 9 }).toBuffer()
      : await pipeline.clone().jpeg({ quality: 88, mozjpeg: true }).toBuffer();

  const original = fs.statSync(from).size;
  if (!needsResize && buf.length >= original) buf = fs.readFileSync(from);

  if (ext === '.png' && buf.length > BIG_PNG) {
    buf = await pipeline.clone().webp({ quality: 90, alphaQuality: 100 }).toBuffer();
    to = to.replace(/\.png$/i, '.webp');
  }

  fs.writeFileSync(to, buf);
}
