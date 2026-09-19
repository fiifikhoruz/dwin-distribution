# Catalogue navigation

Homepage contains three photographic entrances. Collection links open non-empty source categories; category links open product results. Breadcrumbs and category navigation provide return paths. All-products search and legacy category, brand and occasion links remain available.

Source taxonomy preserved: Spirits 356, Wines & Champagnes 707, Non-Alcoholics & Cocktails 396. No product, price policy or image mapping changes.

Source limitations: Wine does not distinguish red/white/rosé as structured fields and includes four beers. RTD includes cider. Non-alcoholic group includes 73 machines/accessories, clearly labelled Equipment & accessories. These remain reachable without inventing category membership.

Real homepage photography from Pexels, sourced 2026-09-19 (decorative category imagery only, never individual product mappings):
- Spirits: https://www.pexels.com/photo/bottles-of-various-alcoholic-beverages-displayed-on-shelves-in-a-bar-17541188/
- Wines: https://www.pexels.com/photo/wine-glasses-on-the-table-14846857/
- Non-alcoholics: https://www.pexels.com/photo/close-up-photo-of-lemonade-in-drinking-glasses-8042740/

Checks: node scripts/verify-browsing.cjs; npm run verify:prices; npm run build.

## Text price list and photographic homepage

Product results and details now omit all photography and illustration slots. Desktop rows align product/category, size, price and quantity controls; mobile uses compact stacked rows. Exact source names are displayed. All image files and mappings remain preserved for future use.

Homepage panels now use full-width photography, a light overall scrim and dark backing local to the shorter text. Motion is transform-only: slow image drift on desktop, a small scale change on mobile, and a fine-pointer-only hover perspective. IntersectionObserver pauses off-screen panels. A pause/resume control is available. Both CSS and the observer honor prefers-reduced-motion, including changes while the page is open; reduced motion removes all transforms/animations and hides the unnecessary toggle.

Browser checks: desktop and 390px mobile layout; search returned two Jameson products; ascending sorting; add/remove quantity updates order count; zero price-list image elements; visible-only animation and pause/resume states; no console errors. Reduced-motion behavior reviewed in both CSS and observer cleanup logic. Real-device frame-rate profiling was not performed.
