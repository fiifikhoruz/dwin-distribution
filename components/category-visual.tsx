// Original, unbranded category silhouettes. Never presented as exact product photography.
export function visualKind(category: string, name = '') {
 const text = `${category} ${name}`.toUpperCase();
 if (/WATER|ACQUA PANNA|VOLTiC|PELLEGRINO/i.test(text)) return 'water';
 if (/JUICE|DEWLANDS|BEYTI|ALMARAI/.test(text)) return 'juice';
 if (/ENERGY|RED BULL|REIGN/.test(text)) return 'energy';
 if (/BEER|HEINEKEN|GUINNESS/.test(text)) return 'beer';
 if (/CHAMPAGNE|PROSECCO|SPARKLING WINE/.test(text)) return 'champagne';
 if (/WHISKY/.test(category)) return 'whisky';
 if (/COGNAC|BRANDY/.test(category)) return 'cognac';
 if (/GIN/.test(category)) return 'gin';
 if (/VODKA/.test(category)) return 'vodka';
 if (/RUM/.test(category)) return 'rum';
 if (/TEQUILA/.test(category)) return 'tequila';
 if (/WINE|VERMOUTH/.test(category)) return 'wine';
 if (/NON ALCOHOLIC|RTD/.test(category)) return 'soft drinks';
 if (/COFFEE|TEA|DAIRY|MACHINES/.test(category)) return category.toLowerCase();
 return 'spirits';
}
export function CategoryVisual({category,name = ''}:{category:string;name?:string}) {
 const kind=visualKind(category,name);
 const color:Record<string,string>={whisky:'#a77c44',cognac:'#bc8550',gin:'#587f78',vodka:'#8195ac',rum:'#896247',tequila:'#91a2a0',wine:'#71545f',champagne:'#a79969',water:'#6a93ac',juice:'#bc9563',energy:'#8776ac','soft drinks':'#749597',beer:'#a88c53'};
 const fill=color[kind]||'#7c8095';
 const path:Record<string,string>={whisky:'M76 28H104V79L128 104Q136 111 136 125V226Q136 235 126 235H54Q44 235 44 226V125Q44 111 52 104L76 79Z',cognac:'M78 27H102V82C102 107 139 111 139 159V208Q139 235 110 235H70Q41 235 41 208V159C41 111 78 107 78 82Z',gin:'M73 31H107V80L135 105V224Q135 235 124 235H56Q45 235 45 224V105L73 80Z',vodka:'M79 22H101V76Q120 92 120 113V228Q120 236 112 236H68Q60 236 60 228V113Q60 92 79 76Z',rum:'M77 27H103V87Q136 107 136 131V219Q136 235 119 235H61Q44 235 44 219V131Q44 107 77 87Z',tequila:'M77 34H103V93L135 116V220Q135 234 121 234H59Q45 234 45 220V116L77 93Z',wine:'M80 18H100V83Q119 96 119 123V229Q119 237 111 237H69Q61 237 61 229V123Q61 96 80 83Z',champagne:'M78 18H102V75C102 94 126 109 126 139V226Q126 237 115 237H65Q54 237 54 226V139C54 109 78 94 78 75Z',water:'M79 24H101V68Q122 88 122 111V225Q122 237 110 237H70Q58 237 58 225V111Q58 88 79 68Z',beer:'M78 25H102V85Q123 103 123 125V226Q123 236 113 236H67Q57 236 57 226V125Q57 103 78 85Z'};
 const can=['energy','soft drinks'].includes(kind);const carton=kind==='juice'||kind==='dairy';const bag=['coffee','tea'].includes(kind);
 return <svg className="bottle-illustration" viewBox="0 0 180 260" role="img" aria-label={`${kind} category illustration`}>
 <ellipse cx="90" cy="244" rx="51" ry="5" fill="#060911" opacity=".24"/>
 {kind==='machines'?<><rect x="40" y="65" width="100" height="160" rx="6" fill="#3d4d66"/><path d="M53 83H126V146H53Z" fill="#18263c"/><path d="M90 146V168M56 218H128" stroke="#b7bfce" strokeWidth="6"/><path d="M72 170H108V194Q90 211 72 194Z" fill="#9eabbf"/></>:can?<><rect x="54" y="48" width="72" height="186" rx="13" fill={fill}/><ellipse cx="90" cy="49" rx="34" ry="6" fill="#c6cad3"/><path d="M63 68V212M75 58H105" stroke="#d7dde9" strokeOpacity=".45" strokeWidth="3"/><path d="M66 143L112 104M68 158L114 119" stroke="#172642" strokeWidth="7"/></>:carton||bag?<><path d={carton?'M52 72L68 47H113L129 72V234H52Z':'M48 53H132L124 234H56Z'} fill={fill}/><path d={carton?'M52 72H129M113 47V212':'M53 66H126M60 220H119'} stroke="#172642" strokeWidth="4"/><circle cx="90" cy="148" r="22" fill="#172642" opacity=".6"/></>:<><path d={path[kind]||path.whisky} fill={fill}/><path d={path[kind]||path.whisky} fill="none" stroke="#d6dce6" strokeOpacity=".25" strokeWidth="2"/><rect x="77" y={kind==='wine'||kind==='champagne'?18:26} width="26" height={kind==='champagne'?52:24} rx="2" fill="#24334c"/><path d="M69 119V215" stroke="#e5e9ed" strokeOpacity=".4" strokeWidth="3"/><path d="M77 146H112M77 154H103" stroke="#182438" strokeOpacity=".55" strokeWidth="3"/>{kind==='water'&&<path d="M62 174H118M62 187H118M62 200H118" stroke="#d9e4eb" strokeOpacity=".4" strokeWidth="3"/>}</>}
 </svg>;
}
