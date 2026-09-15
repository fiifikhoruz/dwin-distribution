# Dwin Distribution redesign

## Architecture inspected

Next.js 15 App Router, React 19 and TypeScript. Two public routes: `/` and `/list`. Catalogue source is `lib/products.json`, with 1,459 products, 23 categories, brand and country fields, optional size, pack quantity and alcohol fields. The previous interface consisted of a three-panel photographic homepage and category accordions containing price tables. Search/filtering and sorting were client-side. A React context stored cart quantities and theme preference locally. jsPDF and AutoTable generated price lists and pro forma invoices. No live inventory, payment processing, database or backend order API is present.

## Redesign

Original ivory and burgundy editorial direction, retained Dwin logo, newly generated unbranded still-life hero, category discovery, curated featured products, occasion links, brand discovery and distributor positioning. Grid catalogue with desktop sidebar, mobile drawer, search, category, brand, region, bottle size, min/max price, occasion and new/updated filters. Global recommended/price/A–Z sorting and progressive loading keep the complete catalogue accessible. Details retain product codes, source sizes, pack quantities, known alcohol values and update status.

A global persistent order tray replaces the catalogue-only floating cart. Selections remain compatible with the existing local-storage data. Quote preparation supports WhatsApp sharing, a copyable enquiry and retained pro forma PDF download. No payment checkout or automated message sending is introduced.

## Price policy

`lib/products.json` remains the untouched baseline. Every consumer imports the normalized product list from `lib/catalogue.ts`. `exactPrice` is baseline price × 112 / 100. `price` is `Math.round(exactPrice)`, the whole-cedi selling price used for display, filtering, sorting, quantity totals and PDFs. Historical `previous_price` fields are preserved but no longer displayed as misleading sale prices.

The exact pre-rounding increase is 12%. Rounded displayed prices necessarily differ by up to GHS 0.50 from that exact calculation. The multiplier is applied exactly once from the immutable baseline, not from an already adjusted value.

Run `npm run verify:prices` to compare every record to the original Git commit, validate each of the 1,459 adjusted prices, confirm unique IDs, check retained source fields and exercise size parsing and enquiry content. See `price-verification.json` for the generated report.

## Data limitations

- There is no reliable availability field. Availability is confirmed on enquiry; no stock claims or invented availability filter is shown.
- Bottle sizes are normalized from explicit units in product descriptions or the source size field. Unitless values are retained in details without guessing.
- Five exact-product photos have been matched and stored locally. Other products use labelled category illustrations, not inaccurate product packshots. Add further confirmed mappings to `lib/product-images.json` to replace these progressively.
- Featured products are an editorial selection, not a sales-based popularity claim.
- No Dwin WhatsApp number has been supplied. `NEXT_PUBLIC_DWIN_WHATSAPP_NUMBER` enables direct business enquiries. Without it, WhatsApp opens its contact chooser and the UI honestly says “Share via WhatsApp”; copy and PDF remain available.

## Assets

The previous reference-site hero images are no longer used in the interface. They remain on disk to preserve existing assets, but no frontend references them. The original new hero is `public/images/original/dwin-still-life.png`, generated with the built-in image tool. Exact photographic sources are recorded per product in `lib/product-images.json`. Category SVGs are original illustrative interface artwork, explicitly labelled as such on product cards.
