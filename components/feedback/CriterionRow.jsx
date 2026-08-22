import React from 'react';
const OUT={hit:{mark:'✓',fill:'var(--clover-100)',fg:'var(--clover-700)'},partial:{mark:'·',fill:'var(--sunny-100)',fg:'var(--sunny-700)'},missing:{mark:'·',fill:'var(--surface-sunken)',fg:'var(--text-faint)'},wrong:{mark:'!',fill:'var(--coral-100)',fg:'var(--coral-700)'},hedged:{mark:'~',fill:'var(--splash-100)',fg:'var(--splash-700)'}};
export function CriterionRow({label,feedback,outcome='missing',style}){
  const o=OUT[outcome]||OUT.missing;
  return <div style={{display:'grid',gridTemplateColumns:'26px minmax(0,1fr) auto',gap:11,alignItems:'start',padding:'12px 0',...style}}>
    <span aria-hidden="true" style={{width:24,height:24,borderRadius:'50%',background:o.fill,color:o.fg,font:'800 13px/24px var(--font-body)',textAlign:'center',border:'2px solid '+o.fg}}>{o.mark}</span>
    <span><strong style={{display:'block',color:'var(--text-body)',font:'800 13px/1.35 var(--font-body)'}}>{label}</strong>
    {feedback&&<span style={{display:'block',marginTop:3,color:'var(--text-muted)',font:'600 12px/1.5 var(--font-body)'}}>{feedback}</span>}</span>
    <span style={{color:o.fg,font:'800 10px var(--font-body)',letterSpacing:'.08em',textTransform:'uppercase',paddingTop:5}}>{outcome}</span>
  </div>;
}
