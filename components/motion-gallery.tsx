"use client";
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';

// Only the visible panels animate. Motion uses composited transforms, never layout.
export function MotionGallery({children}:{children:ReactNode}) {
 const root=useRef<HTMLDivElement>(null);
 const [paused,setPaused]=useState(false);
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer:IntersectionObserver|undefined;
  const sync=()=>{
   observer?.disconnect();
   const panels=root.current?.querySelectorAll('.collection-entrance');
   panels?.forEach(panel=>panel.classList.remove('in-view'));
   if(media.matches||paused)return;
   observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('in-view',entry.isIntersecting)),{threshold:0.05});
   panels?.forEach(panel=>observer?.observe(panel));
  };
  sync();media.addEventListener('change',sync);
  return ()=>{observer?.disconnect();media.removeEventListener('change',sync);};
 },[paused]);
 return <div ref={root} className={`motion-gallery${paused?' motion-paused':''}`}><div className="motion-toolbar"><button className="motion-toggle" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?<Play size={14}/>:<Pause size={14}/>} {paused?'Resume motion':'Pause motion'}</button></div><div className="collection-entrances">{children}</div></div>;
}
