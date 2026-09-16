# Dwin dark visual upgrade — 16 September 2026

## Image audit
1,459 products: five exact real product photographs and 1,454 category fallbacks. All five public/products files and lib/product-images.json mappings are preserved. Products contain no image fields. Next/Image uses local image sources; there was no remote image configuration to preserve. The older public/images category scenes and ivory still life remain intact, but are not used in this dark direction. Other sizes, editions and gift packs have not been assigned misleading brand-only matches.

## Design
Black #0E0E12, deep navy #101A2F, secondary navy #172642, purple #6A3FD9 for CTAs and lighter violet for readable text accents. Original full-width bar photography and an evening-table band, six visual category links, larger featured bottles and consistent slate image stages with object-contain. Native SVG fallback silhouettes now distinguish whisky, cognac, gin, vodka, rum, tequila, wine, champagne, water, juice, energy drinks, soft drinks, beer, coffee/tea, dairy and machines. All remain explicitly illustrations. Image failures fall back gracefully.

## Generated assets
Created using built-in image generation, then compressed to WebP with Sharp. Originals remain preserved.
- public/images/original/dwin-night-bar.webp: 110,996 bytes, 1536 × 1024.
- public/images/original/dwin-evening-table.webp: 85,654 bytes, 1536 × 1024.

Hero prompt: Photorealistic editorial hospitality photograph, premium intimate bar at night, near-black and deep navy interior, restrained purple reflections, warm amber drinks. Unbranded spirit bottles, wine bottle, crystal lowball and sparkling water on black stone. Objects towards the right, dark negative space left. No people, labels, text, logos, watermark or fake brands. Mobile-friendly crop; atmospheric imagery, not product photography.

Table prompt: Photorealistic editorial evening dinner table, navy linen, dark wood, red wine glasses, champagne coupe, candle, water carafe and understated tableware. Objects middle/right, black negative space left. Navy shadows, warm candle highlights, restrained violet reflections. No people, labels, text or watermark.

## Verification
- Production build and TypeScript passed.
- All 1,459 original records, price transformation source and five photo mappings byte-identical to commit 29ffdd6.
- Existing full price audit: 1,459 verified, zero failures.
- Seven image paths exist and decode successfully.
- Desktop 1440px and mobile 390px layouts inspected; no horizontal overflow.
- Search, ascending price sort, mobile min/max filters and order enquiry checked.
- Campari 700ml remains GHS 231; generated WhatsApp message retains name, code, quantity and total.
- No console warnings/errors observed. No enquiry sent.

Direct WhatsApp routing still requires the business number; without it WhatsApp opens its recipient chooser.
