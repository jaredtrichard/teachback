import React from 'react';
const FILLS={primary:'var(--clover-500)',accent:'var(--tangerine-500)',star:'var(--sunny-500)',info:'var(--splash-500)',mastered:'var(--grape-500)'};
export function ProgressBar({value,max=100,color='primary',height=16,label,style}){
  const pct=Math.max(0,Math.min(100,(value/max)*100));
  return <div style={{display:'grid',gap:6,...style}}>
    {label&&<div style={{display:'flex',justifyContent:'space-between',font:'800 11px var(--font-body)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--text-muted)'}}><span>{label}</span><span>{Math.round(pct)}%</span></div>}
    <div role="progressbar" aria-valuenow={value} aria-valuemax={max} style={{height,borderRadius:'var(--radius-pill)',background:'var(--surface-sunken)',border:'2px solid var(--border)',overflow:'hidden'}}>
      <div style={{width:pct+'%',height:'100%',borderRadius:'var(--radius-pill)',background:FILLS[color]||FILLS.primary,transition:'width var(--dur-slide) var(--ease-out)',boxShadow:'inset 0 -4px 0 rgba(0,0,0,.12)'}}></div>
    </div>
  </div>;
}
