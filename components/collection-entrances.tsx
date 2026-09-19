import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { catalogueGroups, groupCategories } from '@/lib/browsing';
export function CollectionEntrances(){return <div className="collection-entrances">{catalogueGroups.map((group,i)=><Link className="collection-entrance" key={group.key} href={`/list?collection=${group.key}`}><Image src={group.image} alt="" fill priority={i===0} sizes="(max-width: 760px) 100vw, 92vw"/><div className="entrance-content"><span className="eyebrow">0{i+1} / {groupCategories(group.key).reduce((n,c)=>n+c.count,0)} PRODUCTS</span><h2>{group.name}</h2><p>{group.copy}</p><span className="entrance-action">Explore categories <ArrowUpRight size={21}/></span></div></Link>)}</div>}
