import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { MotionGallery } from './motion-gallery';
import { catalogueGroups } from '@/lib/browsing';
export function CollectionEntrances(){return <MotionGallery>{catalogueGroups.map((group,i)=><Link className="collection-entrance" key={group.key} href={`/list?collection=${group.key}`}><div className="entrance-media"><Image src={group.image} alt="" fill priority={i===0} sizes="100vw"/></div><div className="entrance-content"><span className="eyebrow">0{i+1} / DWIN COLLECTION</span><h2>{group.name}</h2><span className="entrance-action">Explore categories <ArrowUpRight size={21}/></span></div></Link>)}</MotionGallery>}
