# Product photography sourcing

This is a partial sourcing pass, not a completed search of all 1,459 products.

62 new reviewed photographs have been imported, preserving all 5 existing verified photographs. 1,392 products still use placeholders, including 360 outside the requested categories. No prices or product data were edited.

## Records

- `product-image-inventory.json`: every catalogue product and current image status, with category totals.
- `products-needing-images.json`: remaining sourcing queue. A missing image does not mean every possible source has been exhausted.
- `product-image-candidates.json`: reviewed, pending, and rejected candidates. Only reviewed, high-confidence candidates without a rejection reason can be imported.
- `product-image-sources.json`: product identity, local file, source page, source image URL, source type, evidence, sourcing date, dimensions and checksum. Dates for the five legacy images are unknown and explicitly null.
- `product-image-verification.json`: automated preservation, decoding, file and duplicate checks.

## Matching policy

Prefer official brand assets, then manufacturer/distributor assets, then official media libraries, then reputable retailers. Match the exact brand, expression, edition and available bottle size. No generated or visually similar substitute bottles. No vintage substitution for products with a stated vintage. Leave uncertain matches unmapped.

Imported sources include Glenmorangie, The Botanist, Johnnie Walker, Patron, Remy Martin, Gerard Bertrand, Moet, Laurent-Perrier, 32 Via dei Birrai and Bushmills. Copperhead, Bottega, Chavin and Red Bull also supplied exact official packshots. KUBA’s distributor page supplied six exact Beyti 1-litre carton photographs after the manufacturer site failed certificate validation. Master of Malt supplied two exact 700 ml spirits after official assets could not be confidently obtained. Waitrose supplied one exact 750 ml glass water bottle; the official primary asset was rejected because it was lifestyle photography. The Waitrose photo is 400px, suitable for a catalogue card but not a high-resolution export.

Ten Chapoutier distributor candidates remain pending: their expressions were visually checked, but exact depicted size was not established sufficiently for import. Four additional official water candidates remain pending. The small Grey Goose and Nikka assets were rejected for insufficient size-verification detail. Special gift packs, luminous editions, vintage-specific wines, and ambiguous sizes retain placeholders.

Some official pages returned 403 or timeouts to direct retrieval. Normal browser inspection recovered several sources; no age gate, CAPTCHA or security warning was bypassed. External sourcing was briefly interrupted by automatic approval review reporting the account usage limit. Following the user’s continuation request, approvals resumed and further official Bushmills photos were imported. Remaining candidates are unresolved, not evidence that photos do not exist.

## Continue safely

1. Find exact source pages for remaining products and record evidence.
2. Download candidate assets to a staging folder under their product IDs.
3. Visually review each asset and verify expression, size, packaging and any stated vintage.
4. Mark only confirmed candidates `reviewed: true` and `verificationConfidence: "high"`.
5. Run `node scripts/import-product-images.cjs <staging-folder>`; existing mappings are preserved.
6. Run `node scripts/audit-product-images.cjs`, `node scripts/verify-product-images.cjs`, `npm run verify:prices`, and `npm run build`.

The importer resizes and encodes images as WebP without enlarging or altering product labels. Automatic checks cannot establish product identity; the documented manual review is required.
