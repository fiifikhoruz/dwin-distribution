# Dwin Distribution

An original, mobile-first drinks distributor website built with Next.js, React and TypeScript. Warm ivory, burgundy and elegant display typography support product, category, brand and occasion discovery.

## Run

Node.js 22 and npm:

```sh
npm ci
npm run dev
```

Open http://localhost:3001. Run `npm run build` and `npm start` for a production preview.

## Catalogue and pricing

All 1,459 original products are preserved in `lib/products.json`. This file is the immutable price baseline. `lib/catalogue.ts` applies the one-time 12% increase centrally: exact price = baseline × 112 / 100, selling price = nearest whole Ghana cedi. All cards, filters, order totals and PDFs use that selling price.

```sh
npm run verify:prices
```

The verification compares every product to the original Git revision `d1ac18e` and writes `docs/price-verification.json`. The audit checks product count, unique IDs, every increased price and original source fields. Clone full Git history to run this historical comparison.

Source data includes category, brand, country/region, product code, size, pack information, alcohol values and update status. Explicit bottle units are normalized without guessing unitless sizes. No reliable stock data exists, so availability is confirmed on enquiry.

## Discovery and orders

- Homepage: category discovery, featured selection, occasions, brands and distributor positioning.
- Catalogue: grid, desktop filter sidebar, mobile filter drawer, search, category, brand, price, bottle size, country, occasion and updates filters.
- Global sorting: recommended, price ascending/descending and A–Z. Progressive loading exposes every product.
- Product details preserve source codes, size and pack information.
- Persistent order tray, quantity controls, WhatsApp enquiry text, clipboard copy, price-list and pro forma PDFs. No full checkout, payment or automatic message sending.

The existing `dwin-cart` browser storage format is preserved. PDFs and enquiry messages are created on the visitor's device.

## WhatsApp

Set optional `NEXT_PUBLIC_DWIN_WHATSAPP_NUMBER` to the verified business number in international digits-only format and rebuild. Without a confirmed number, the UI offers WhatsApp contact selection and copying instead of pretending to send directly to Dwin.

## Photography

The original editorial hero is generated for Dwin. Five genuine packshots are matched to exact products and stored locally. Other cards use labelled category illustrations. Add verified image mappings in `lib/product-images.json` to expand photography coverage without changing any product records. Sources are recorded there and in `ASSETS.md`.

## Deployment

The existing repository is `fiifikhoruz/dwin-distribution`; Vercel Root Directory is `./`, framework is Next.js. See `DEPLOYMENT.md`. The parent Ghanaman Time app and its Convex backend are unrelated and unchanged.

See `docs/redesign-notes.md` for the architecture review, changes, pricing policy and data limitations.
