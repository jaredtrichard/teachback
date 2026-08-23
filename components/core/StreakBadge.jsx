import React from 'react';
export function StreakBadge({count,active=true,style}){
  return <span style={{display:'inline-flex',alignItems:'center',gap:7,padding:'8px 14px',borderRadius:'var(--radius-pill)',background:active?'var(--tangerine-100)':'var(--surface-sunken)',border:'1px solid '+(active?'var(--tangerine-500)':'var(--border)'),color:active?'var(--tangerine-700)':'var(--text-faint)',font:'700 15px var(--font-display)',...style}}>
    <i className="ph-bold ph-flame" aria-hidden="true" style={{fontSize:18,color:active?'var(--tangerine-500)':'var(--text-faint)'}}></i>
    {count}<span style={{font:'700 11px var(--font-body)',letterSpacing:'.06em'}}>DAY{count===1?'':'S'}</span>
  </span>;
}
