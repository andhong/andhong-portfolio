// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Custom domain served by GitHub Pages (see public/CNAME).
  site: 'https://andrewhong.co',
  // Keep the same URLs as the old WordPress site, e.g. /project/hank
  build: { format: 'directory' },
  trailingSlash: 'ignore',
  // Hide Astro's floating dev toolbar (the dark pill at the bottom of local previews).
  devToolbar: { enabled: false },
  // The ClassDojo case studies moved under /project; keep old links working.
  redirects: {
    '/dojo-tutor': '/project/dojo-tutor',
    '/tutor-pricing': '/project/tutor-pricing',
  },
});
