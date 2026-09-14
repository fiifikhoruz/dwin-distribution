# Dwin Distribution

A complete, standalone Next.js drinks catalogue inspired by https://imexcopricelist.app/.

Includes a photographic three-collection homepage, original Dwin logo, 1,459 sample products, search, category/brand/country filters, price sorting, new/updated product filters, persistent cart, quantity controls, light/dark themes, downloadable price lists, and customer-labelled pro forma invoice PDFs with catalogue QR codes.

## Run locally

Requires Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3001. For a production build, run `npm run build`, then `npm start`.

## Deploy to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md). For `fiifikhoruz/dwin-distribution`, use **Root Directory** `./`. No environment variables, authentication service, or database are required.

## Catalogue data

`lib/products.json` is the public reference catalogue snapshot retrieved on 14 September 2026. The source site reported its last update as 14 July 2026. The data is bundled with the application; the site never connects to the reference service at runtime. Prices remain sample prices, not verified Dwin selling prices.

Change this file and redeploy to update the catalogue. Preserve unique numeric IDs, product codes, names, categories, brands, regions, prices and optional previous prices. Collection membership is defined in `lib/catalogue.ts`.

Cart and theme preferences are stored only in the visitor's browser. Customer names are used only to generate PDFs locally. No order, payment, email, or notification is sent. The invoice is explicitly a sample pro forma quotation, not a tax invoice. Taxes, delivery charges and stock availability are not calculated.

## Branding and assets

The generated Dwin logo is in `public/brand/dwin-logo.png`; the matching favicon is `public/icon.svg`. Asset provenance and the logo generation brief are recorded in [ASSETS.md](./ASSETS.md).

This project is isolated from the existing Ghanaman Time application in the parent folder. It does not use or change the parent's Convex deployment, Clerk configuration or environment variables.
