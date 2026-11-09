# Supplier final prices — 9 November 2026

Source: `Jager and More 2026 Price list.pdf` supplied by the user, headed **Wholesale Price/Bottle**. All 21 supplied amounts agree with the PDF. These are final GHS prices, not inputs to the legacy 12% calculation.

## Confirmed matches (updated)

| ID | Existing name (preserved) | Previous GHS | Final GHS |
|---|---|---:|---:|
| 660 | GLENFIDICH 12 YEAR 70CL | 782 | 650.00 |
| 663 | GLENFIDDICH 15YO 70CL | 1201 | 975.40 |
| 662 | GENFIDDICH WHISKY 21 YO 3X70CL GRAN RESERVA | 5517 | 3910.60 |
| 823 | JAGERMEISTER 1L | 440 | 300.00 |
| 824 | JAGERMEISTER 6X70CL | 251 | 215.00 |

Glenfiddich brand fields confirm the two misspelled names. 100cl equals 1L; 6X70CL and 3X70CL identify 70cl bottles within packs. The supplier prices are per bottle. No duplicate exact matches were found.

## Ambiguous (not changed)

- Clan McGreggor 100cl, GHS 115.00: ID 304, CLAN MACGREGOR WHISKY, has no size. Cannot confirm 100cl.
- Hendricks Gin, GHS 575.20: ID 689 is 1L; ID 690 is 70cl. Supplier specifies no size.

## No exact match (not changed or added)

- Monkey Shoulder Blended Malt Scotch 70cl, 460.00: only ID 1085, 1L exists.
- Glenfiddich 18-year 70cl, 1545.40: only ID 661, 75cl exists.
- Glenfiddich 23-year 70cl, 5797.50.
- Balvenie 12-year 70cl, 1105.60.
- Grants Triple Wood, 150.00.
- Grants 12-year, 340.00.
- Tullamore Dew, 210.00.
- Jagermeister Herb Liqueur 175cl, 470.20.
- Jagermeister Herb Liqueur 50cl, 160.00.
- Jagermeister Herb Liqueur 35cl, 123.80.
- Jagermeister Herb Liqueur 20cl, 75.50.
- Jagermeister Sleeve 10cl, 62.00.
- Jagermeister Sleeve 4cl, 29.50.
- Sweet Lips Natural Sweet Red, 60.40.

## Implementation and verification

`lib/products.json` remains the immutable original catalogue. `lib/final-price-overrides.json` stores final prices keyed by stable product IDs, applied after/bypassing the legacy calculation. All other prices retain the original 12% policy. The shared formatter retains two decimal places for fractional prices across lists, details, orders, enquiries and PDFs; whole-cedi amounts retain their existing display. The catalogue disclaimer no longer incorrectly says all prices are whole cedis.

`npm run verify:prices` independently asserts the exact five override values, all 1,459 products, preserved original source information, unchanged prices for the other 1,454 products, decimal formatting and enquiry values. `node scripts/verify-browsing.cjs` verifies complete category reachability and no empty category links.

Verification completed: production build passes; desktop (1440px) and mobile (390px) browser checks pass for all five prices via product-code search, an unchanged product price, order total and generated enquiry decimals, Spirits → Whisky navigation, and both Jagermeister sizes under Liqueur. No browser console errors were observed in either test.
