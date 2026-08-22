import React from 'react';
const ACCENTS={primary:'var(--clover-500)',accent:'var(--tangerine-500)',info:'var(--splash-500)',star:'var(--sunny-500)',danger:'var(--coral-500)',mastered:'var(--grape-500)'};
export function Card({sunken=false,accent,padding=24,children,style}){
  return <div style={{background:sunken?'var(--surface-sunken)':'var(--surface-card)',border:'2px solid '+(accent?ACCENTS[accent]||'var(--border)':'var(--border)'),borderRadius:'var(--radius-lg)',boxShadow:sunken?'none':'var(--edge-card)',padding,...style}}>{children}</div>;
}
