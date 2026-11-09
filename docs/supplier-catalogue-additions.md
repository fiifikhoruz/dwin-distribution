# Supplier catalogue additions

Source: Jager and More 2026 Price list.pdf and the user's explicit second-update instructions. Prices are final per-bottle selling prices. This update supersedes the earlier decision to leave unmatched supplier items out of the catalogue.

16 entries appended to lib/products.json with IDs 1460–1475. Every original record from release 2092bba remains unchanged.

| ID | Product | Category | Final GHS |
|---|---|---|---:|
| 1460 | CLAN MCGREGGOR 100CL | WHISKY | 115.00 |
| 1461 | GLENFIDDICH 23 YEARS 70CL | WHISKY | 5,797.50 |
| 1462 | THE BALVENIE 12 YEARS 70CL | WHISKY | 1,105.60 |
| 1463 | GRANTS TRIPLE WOOD | WHISKY | 150.00 |
| 1464 | GRANTS 12 YEARS | WHISKY | 340.00 |
| 1465 | TULLAMORE DEW | WHISKY | 210.00 |
| 1466 | HENDRICKS GIN | GIN | 575.20 |
| 1467 | JAGERMEISTER HERB LIQUEUR 175CL | LIQUEUR | 470.20 |
| 1468 | JAGERMEISTER HERB LIQUEUR 50CL | LIQUEUR | 160.00 |
| 1469 | JAGERMEISTER HERB LIQUEUR 35CL | LIQUEUR | 123.80 |
| 1470 | JAGERMEISTER HERB LIQUEUR 20CL | LIQUEUR | 75.50 |
| 1471 | JAGERMEISTER SLEEVE 10CL | LIQUEUR | 62.00 |
| 1472 | JAGERMEISTER SLEEVE 4CL | LIQUEUR | 29.50 |
| 1473 | SWEET LIPS NATURAL SWEET RED | WINE | 60.40 |
| 1474 | MONKEY SHOULDER BLENDED MALT SCOTCH 70CL | WHISKY | 460.00 |
| 1475 | GLENFIDDICH 18 YEARS 70CL | WHISKY | 1,545.40 |

## Data policy

- Final count: 1,475; existing products: 1,459; additions: 16.
- New source prices equal supplied prices, with matching final-price overrides that bypass the legacy multiplier and rounding. The five existing supplier overrides are preserved.
- Unknown region, code, alcohol percentage, quantity, status, previous price and update timestamp use null. Unknown bottle sizes stay null; supplied sizes use explicit CL units. No product codes or pack sizes were invented.
- Existing brand labels are reused where applicable (CLAN and HENDRICK'S GIN) for consistent brand filtering.
- New Hendricks Gin has an unspecified size, distinct from the original 70cl and 1L entries. Clan McGreggor 100cl is distinct from the original unspecified-size entry.
- Monkey Shoulder 1L (1085, GHS 643) and Glenfiddich 18 Years 75cl (661, GHS 1,921) are preserved. New 70cl versions have IDs 1474 and 1475.
- Missing product codes are omitted from details/enquiries and blank in PDF code columns. Existing coded products retain the same behavior.
- Homepage, category mappings and image mappings are unchanged.

## Verification

- npm run verify:prices: checks all original records and prices against 2092bba, all 21 final-price overrides, unique IDs, schema, null metadata, bottle sizes and enquiry amounts.
- node scripts/verify-browsing.cjs: verifies all 1,475 products are reachable exactly once, no empty category links, and original data/image mappings remain unchanged.
- npm run build: production compilation and type checking.
- scripts/verify-supplier-browser.cjs: desktop/mobile checks for all 16 searches, prices and category paths; 16-item order and enquiry; old size variants and five prior prices; brand and unknown-size filters; console errors. Set PLAYWRIGHT_MODULE and CHROME_PATH if using an external Playwright installation, and BASE_URL for production checks.

Local verification results: all data, category reachability, build, desktop and mobile checks passed. Catalogue and pro forma PDF downloads were also tested with a new uncoded product; both retain GHS 29.50 and contain no null/undefined product code.
