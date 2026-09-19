import { collections, products, titleCase } from './catalogue';
export const catalogueGroups = [
 { key: 'spirits', name: 'Spirits', copy: 'Whisky, cognac, gin and the essentials of a well-stocked bar.', image: '/images/collections/spirits.webp' },
 { key: 'wines', name: 'Wines & Champagnes', copy: 'From everyday pours to bottles for a celebration.', image: '/images/collections/wines.webp' },
 { key: 'non-alcoholic', name: 'Non-Alcoholics & Cocktails', copy: 'Refreshments, cocktail ingredients and hospitality essentials.', image: '/images/collections/non-alcoholic.webp' }
];
export const categoryName = (category: string) => ({'NON ALCOHOLIC':'Non-alcoholic drinks','COCKTAIL FLAVORS':'Cocktail ingredients','MACHINES':'Equipment & accessories','RTD':'Ready-to-drink & cider','WINE':'Wine'}[category] || titleCase(category));
export function groupCategories(group: string) {
 return [...new Set(products.filter(p => collections[group]?.includes(p.category)).map(p => p.category))].sort().map(category => ({category, name: categoryName(category), count: products.filter(p => p.category === category).length}));
}
export function groupForCategory(category: string) { return catalogueGroups.find(group => collections[group.key].includes(category)); }
