# Asset provenance

## Original Dwin branding

`public/brand/dwin-logo.png` was generated with the built-in image generation tool on 14 September 2026. It is copied into this project and does not depend on an external generation folder.

Generation prompt:

> Use case: logo-brand. Create a refined flat logo for Dwin Distribution, a premium beverage distributor. Transparent background. Horizontal lockup: a compact elegant geometric interlocking double-D monogram at left, and the exact word DWIN in large widely spaced sophisticated sans capitals at right, with DISTRIBUTION in smaller widely spaced capitals beneath DWIN. All artwork in single muted champagne gold #C6A66D. Crisp vector-like flat shapes, clean restrained luxurious feel, perfectly legible lettering. No mockup, no shadows, no lighting, no border, no extra text. Wide 3:1 composition with minimal clear margins. This will be used in a website navigation header.

`public/icon.svg` is an original small vector monogram based on the same overlapping D motif.

## Reference sample assets

The following public assets were copied from the user-specified reference website for the requested replica:

- `public/images/spirits.png`: https://imexcopricelist.app/assets/spirits-DHz0KNLe.png
- `public/images/wines.png`: https://imexcopricelist.app/assets/wines-BmNF7-xu.png
- `public/images/non-alcoholic.png`: https://imexcopricelist.app/assets/nonalchoholic-CDm8Iojh.png
- `lib/products.json`: https://imexcopricelist.app/api/products

The reference IMEXCO logo was not copied into this project. Reference photographs retain visible product packaging and their existing ownership. No asset licence or ownership transfer is implied.

DM Sans and Playfair Display are loaded from Google Fonts with local system-font fallbacks. Lucide supplies interface icons.

## Original redesign — 15 September 2026

The previous three reference-site images are no longer used by the frontend. They remain archived in `public/images`.

New hero: `public/images/original/dwin-still-life.png`, generated using the built-in image tool. Prompt: Premium editorial still life for Dwin Distribution; unbranded amber spirit bottle, dark wine bottle, sparkling water, glassware, travertine plinths, burgundy fabric and warm ivory architectural setting with natural side light. No text, logos or graphic gradients. The scene is editorial imagery, not a representation of specific stock items.

Five matched packshots were downloaded from public DrinksHero product pages. Exact source URLs and product associations are in `lib/product-images.json`. No external prices or product records were imported. Other product images are original category SVG illustrations and are labelled as illustrations in the interface.

Display typography is Libre Caslon Display; UI typography remains DM Sans. The existing Dwin logo is retained.

## September 16 dark visual upgrade
Original AI-generated, unbranded editorial bar and evening-table photography: public/images/original/dwin-night-bar.webp and dwin-evening-table.webp. Built-in image generation; compressed WebP. Prompts and dimensions: docs/dark-visual-upgrade.md. Exact product photography and its mappings are unchanged. New category silhouettes are original unbranded SVG illustrations in components/category-visual.tsx.
