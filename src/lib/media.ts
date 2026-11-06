import type { ImageMetadata } from 'astro';

// Every image in src/assets/media, keyed by file name without extension,
// e.g. media('hank-screenshots'). Astro optimizes these at build time.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/media/**/*.{png,jpg,jpeg,webp}',
  { eager: true },
);

const byName = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  const name = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  if (byName.has(name)) throw new Error(`Duplicate media name: ${name}`);
  byName.set(name, mod.default);
}

export function media(name: string): ImageMetadata {
  const img = byName.get(name);
  if (!img) throw new Error(`Missing image "${name}" in src/assets/media`);
  return img;
}
