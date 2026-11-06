// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Custom domain served by GitHub Pages (see public/CNAME).
  site: 'https://andrewhong.co',
  // Keep the same URLs as the old WordPress site, e.g. /project/hank
  build: { format: 'directory' },
  trailingSlash: 'ignore',
});
