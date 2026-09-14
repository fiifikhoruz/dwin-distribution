# Vercel deployment

Deployment repository: https://github.com/fiifikhoruz/dwin-distribution

This repository contains the Dwin project at its root. Use `./` as the Vercel Root Directory.

## Import settings

1. Push this project to a Git repository and import that repository in Vercel.
2. If importing the existing parent repository, choose `dwin-distribution` as **Root Directory**. If this directory is the entire repository, use the repository root instead.
3. Select the **Next.js** framework preset and **Node.js 22.x**.
4. Use `npm ci` for installation and `npm run build` for the build. Leave Output Directory at the Next.js default.
5. No environment variables are needed. Deploy when ready.

The included `vercel.json` records the framework, install and build commands. Both `/` and `/list` are pre-rendered routes. Filtering, cart state and PDF generation run in the browser. Images are served through Next.js image optimization.

Alternatively, from this directory, `npx vercel` creates a preview deployment after signing in to Vercel. Use `npx vercel --prod` only when ready to publish production.

## Prepared checks

- Production build and TypeScript validation.
- Dependency audit with patched PostCSS override.
- Catalogue search and price sorting.
- Cart quantity arithmetic and persistence across reloads.
- Branded pro forma PDF generation with customer, line items, totals and QR code.
- Full 1,459-product price-list PDF generation.
- Desktop and 390px mobile layouts; light and dark themes.

## Content configuration

The site deliberately labels the imported product catalogue and prices as sample data. Replace prices with Dwin's approved values in `lib/products.json` before using the site as a live selling price list. There are no invented contact details or external order destinations to configure. A deployment automatically makes the invoice QR code point to that deployment's `/list` page.
