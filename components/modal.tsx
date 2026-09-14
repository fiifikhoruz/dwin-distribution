"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
export function Modal({ title, onClose, children, className = "" }: { title: string; onClose: () => void; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = ref.current; dialog?.showModal(); const previous = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { dialog?.close(); document.body.style.overflow = previous; }; }, []);
  return <dialog ref={ref} className={`modal ${className}`} aria-label={title} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) { const rect = e.currentTarget.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) onClose(); } }}>
    <div className="modal-header"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={21}/></button></div>{children}
  </dialog>;
}
