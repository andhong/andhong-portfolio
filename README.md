# andrewhong.co

Portfolio site for Andrew Hong, built with [Astro](https://astro.build) and hosted on GitHub Pages at **https://andrewhong.co**.

## Working on the site

Requires Node 22.23+.

```bash
npm install
npm run dev       # local preview at http://localhost:4321
npm run build     # production build into dist/
npm run preview   # serve the production build
```

Pushing to `master` builds and deploys the site automatically (`.github/workflows/deploy.yml`).

## Where things live

| What | Where |
| --- | --- |
| Name, email, links, nav, home-page project list | `src/data/site.ts` |
| Home / About / Playground | `src/pages/index.astro`, `about.astro`, `playground.astro` |
| Case studies | `src/pages/project/*.astro` (URLs like `/project/hank`) |
| Page shell (header, footer, meta tags) | `src/layouts/Base.astro` |
| Case-study headline + metadata | `src/layouts/CaseStudy.astro` |
| Images | `src/assets/media/YYYY/MM/` |
| Video / animated GIF | `public/media/` |
| Fonts, colors, spacing | `src/styles/global.css` |
| Custom domain | `public/CNAME` |

## Images

Images are stored in this repo and served by GitHub Pages. At build time, Astro creates resized AVIF/WebP copies of every image, so visitors download small files even though the originals are large.

To add images:

1. Put the new files in a temporary folder, then shrink them before committing (caps at 2560px, converts huge PNGs to WebP):
   ```bash
   npm run prep-images -- ~/Downloads/new-images src/assets/media/2026/11
   ```
2. Use the image by its file name (no extension) in a page:
   ```astro
   <Figure images={[{ name: 'my-new-image', alt: 'What it shows' }]} lead="Bold first sentence.">
     Rest of the caption.
   </Figure>
   ```
   The build fails with a clear error if a name doesn't match a file.

Videos and GIFs go in `public/media/` and are referenced as `/media/file.mp4`.

## Password-protected case studies (optional)

Lumi and 1stDibs Seller Tools currently show "available on request." To publish their content behind a password:

1. Create `private/lumi/index.html` (a fragment of the case study's HTML) and put its images next to it. `private/` is gitignored, so keep a backup of it elsewhere.
2. Run `PROTECTED_PASSWORD=yourpassword npm run encrypt`. This writes `src/protected/lumi.json`, which is encrypted with AES-256-GCM and safe to commit.
3. The page will then ask visitors for the password and decrypt the content in the browser.
