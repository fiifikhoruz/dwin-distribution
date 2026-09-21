"use client";
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';

export function MotionGallery({children}:{children:ReactNode}) {
 const root=useRef<HTMLDivElement>(null);
 const [paused,setPaused]=useState(false);
 function toggleMotion(){
  // Freeze the current interpolated transform, without snapping back to centre.
  root.current?.querySelectorAll<HTMLElement>('.entrance-media').forEach(media=>{
   if(!paused) media.style.transform=getComputedStyle(media).transform;
   else media.style.removeProperty('transform');
  });
  setPaused(value=>!value);
 }
 useEffect(()=>{
  const panels=Array.from(root.current?.querySelectorAll<HTMLElement>('.collection-entrance')||[]);
  panels.forEach(panel=>panel.classList.remove('in-view'));
  if(paused)return;
  const visible=new Set<HTMLElement>();
  const pointers=new Map<HTMLElement,{x:number;y:number}>();
  const fine=window.matchMedia('(hover: hover) and (pointer: fine)');
  let frame=0;
  const render=()=>{
   frame=0;
   // Read geometry together before writing compositor-only transform variables.
   const updates=Array.from(visible).map(panel=>{
    const rect=panel.getBoundingClientRect();
    const progress=Math.max(-1,Math.min(1,(window.innerHeight/2-rect.top-rect.height/2)/((window.innerHeight+rect.height)/2)));
    const pointer=fine.matches?pointers.get(panel):undefined;
    const x=pointer?Math.max(-1,Math.min(1,(pointer.x-rect.left)/rect.width*2-1)):0;
    const y=pointer?Math.max(-1,Math.min(1,(pointer.y-rect.top)/rect.height*2-1)):0;
    return {panel,x,y,scroll:progress*(window.innerWidth<=760?7:12)};
   });
   updates.forEach(({panel,x,y,scroll})=>{
    panel.style.setProperty('--motion-x',`${x*5}px`);
    panel.style.setProperty('--motion-y',`${scroll+y*3}px`);
    panel.style.setProperty('--motion-rx',`${-y*.65}deg`);
    panel.style.setProperty('--motion-ry',`${x*.8}deg`);
   });
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(render);};
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    const panel=entry.target as HTMLElement;
    panel.classList.toggle('in-view',entry.isIntersecting);
    if(entry.isIntersecting)visible.add(panel);else{visible.delete(panel);pointers.delete(panel);}
   });
   schedule();
  },{threshold:0});
  const move=(event:PointerEvent)=>{
   if(!fine.matches||event.pointerType==='touch')return;
   pointers.set(event.currentTarget as HTMLElement,{x:event.clientX,y:event.clientY});schedule();
  };
  const leave=(event:PointerEvent)=>{pointers.delete(event.currentTarget as HTMLElement);schedule();};
  panels.forEach(panel=>{observer.observe(panel);panel.addEventListener('pointermove',move,{passive:true});panel.addEventListener('pointerleave',leave);});
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
  return ()=>{
   observer.disconnect();cancelAnimationFrame(frame);
   window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);
   panels.forEach(panel=>{panel.removeEventListener('pointermove',move);panel.removeEventListener('pointerleave',leave);});
  };
 },[paused]);
 return <div ref={root} className={`motion-gallery${paused?' motion-paused':''}`}><div className="motion-toolbar"><button className="motion-toggle" aria-pressed={paused} onClick={toggleMotion}>{paused?<Play size={14}/>:<Pause size={14}/>} {paused?'Resume motion':'Pause motion'}</button></div><div className="collection-entrances">{children}</div></div>;
}
