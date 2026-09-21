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

Homepage panels now use full-width photography, a light overall scrim and dark backing local to the shorter text. Motion is transform-only: slow image drift on desktop, a small scale change on mobile, and a fine-pointer-only hover perspective. IntersectionObserver pauses off-screen panels. A pause/resume control is available. Homepage motion starts enabled on every load regardless of prefers-reduced-motion. The manual pause/resume control remains visible. Reduced-motion rules outside the homepage gallery are preserved.

Browser checks: desktop and 390px mobile layout; search returned two Jameson products; ascending sorting; add/remove quantity updates order count; zero price-list image elements; visible-only animation and pause/resume states; no console errors. Homepage-specific reduced-motion overrides and the observer preference check were removed on 2026-09-21. Desktop and 390px mobile auto-start and pause/resume were verified; off-screen panels pause. Real-device frame-rate profiling was not performed.

## Autonomous ambient motion — 2026-09-21

Visible panels now run 10-second desktop / 12-second mobile drift-and-scale loops independently of pointer input. Image animation and the outer depth transform are separate, so pointer leave returns to ambient motion rather than a static state. Desktop pointer enhancement is bounded to 5px horizontal / 3px vertical and less than one degree of tilt. Scroll depth is bounded to 12px desktop / 7px mobile. Transform responses take 450ms desktop and 300ms mobile.

Input events schedule at most one pending animation frame; geometry reads are batched before writes, and there are no per-frame React updates. Off-screen CSS animations pause. Manual pause freezes the current interpolated outer transform and image animation, disconnects observers/listeners and cancels pending frame work. Resume reattaches them.

Validation: production build and all 1,459 price/reachability checks passed. Browser checks covered autonomous desktop/mobile transforms, pointer enhancement, scroll depth, pause/resume, and off-screen suspension. No console errors observed. Visual scrolling showed no layout jumps; physical-device frame-rate profiling was not performed. Catalogue code, source products, prices, category definitions, homepage copy and imagery were not edited.
