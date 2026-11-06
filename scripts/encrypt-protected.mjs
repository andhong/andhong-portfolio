// Encrypts password-protected case studies so they can live in a public repo.
//
//   PROTECTED_PASSWORD=... npm run encrypt
//
// Input:  private/<slug>/index.html  (an HTML fragment: the case-study body)
//         private/<slug>/*.{png,jpg,jpeg,webp,gif}  (images it references by file name)
// Output: src/protected/<slug>.json  ({ v, salt, iv, data } — safe to commit)
//
// private/ is gitignored; keep a backup of it somewhere safe (e.g. Google Drive).
// Images are resized, converted to WebP and inlined, so nothing unencrypted is published.
import { webcrypto as crypto } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ITERATIONS = 600_000;
const password = process.env.PROTECTED_PASSWORD;
if (!password) {
  console.error('Set PROTECTED_PASSWORD, e.g.  PROTECTED_PASSWORD=... npm run encrypt');
  process.exit(1);
}

const root = path.resolve('private');
const outDir = path.resolve('src/protected');
fs.mkdirSync(outDir, { recursive: true });

const b64 = (buf) => Buffer.from(buf).toString('base64');

async function inlineImages(html, dir) {
  const refs = new Set([...html.matchAll(/src="([^"]+\.(?:png|jpe?g|webp|gif))"/gi)].map((m) => m[1]));
  for (const ref of refs) {
    const file = path.join(dir, ref);
    if (!fs.existsSync(file)) throw new Error(`${dir}: missing image ${ref}`);
    const isGif = /\.gif$/i.test(ref);
    const buf = isGif
      ? fs.readFileSync(file)
      : await sharp(file).resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
    const uri = `data:image/${isGif ? 'gif' : 'webp'};base64,${b64(buf)}`;
    html = html.replaceAll(`src="${ref}"`, `src="${uri}"`);
  }
  return html;
}

if (!fs.existsSync(root)) {
  console.error('No private/ folder found. Create private/<slug>/index.html first.');
  process.exit(1);
}

for (const slug of fs.readdirSync(root)) {
  const dir = path.join(root, slug);
  const page = path.join(dir, 'index.html');
  if (!fs.statSync(dir).isDirectory() || !fs.existsSync(page)) continue;

  const html = await inlineImages(fs.readFileSync(page, 'utf8'), dir);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const baseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt'],
  );
  const data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(html));

  const out = path.join(outDir, `${slug}.json`);
  fs.writeFileSync(out, JSON.stringify({ v: 1, iterations: ITERATIONS, salt: b64(salt), iv: b64(iv), data: b64(data) }));
  console.log(`Encrypted ${slug} → ${path.relative(process.cwd(), out)} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`);
}
