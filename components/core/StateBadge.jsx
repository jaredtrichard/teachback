import React from 'react';
const KEY=s=>s.toLowerCase().replace('-','');
export function StateBadge({state,size='md',style}){
  const k=KEY(state);
  const pad=size==='lg'?'10px 18px':size==='sm'?'4px 10px':'6px 13px';
  const fs=size==='lg'?15:size==='sm'?11:13;
  return <span style={{display:'inline-block',padding:pad,borderRadius:'var(--radius-pill)',background:`var(--state-${k}-bg)`,color:`var(--state-${k})`,font:`800 ${fs}px var(--font-body)`,whiteSpace:'nowrap',...style}}>{state}</span>;
}
