const ts=require('typescript'), fs=require('fs'),assert=require('assert/strict'),cp=require('child_process'),Module=require('module');
require.extensions['.ts']=(mod,file)=>mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText,file);
const {products,collections}=require('../lib/catalogue.ts');
const {catalogueGroups,groupCategories}=require('../lib/browsing.ts');
assert.equal(products.length,1459);
const visited=[];
for(const group of catalogueGroups){const categories=groupCategories(group.key);assert(categories.length>0);for(const c of categories){const matches=products.filter(p=>collections[group.key].includes(p.category)&&p.category===c.category);assert(matches.length>0);assert.equal(matches.length,c.count);visited.push(...matches.map(p=>p.id));}}
assert.equal(new Set(visited).size,1459);assert.equal(visited.length,1459);
for(const path of ['lib/products.json','lib/product-images.json']) assert.equal(fs.readFileSync(path,'utf8'),cp.execFileSync('git',['show','HEAD:'+path],{encoding:'utf8'}));
console.log('PASS: all 1,459 products reachable exactly once; all category links non-empty; product data and image mappings unchanged.');
