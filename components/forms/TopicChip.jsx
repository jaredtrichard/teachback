import React,{useState} from 'react';
export function TopicChip({id,title,state='Unassessed',selected=false,onClick,style}){
  const [hover,setHover]=useState(false),[press,setPress]=useState(false);
  const on=selected||hover;
  return <button type="button" onClick={onClick} aria-pressed={selected}
    onMouseEnter={()=>setHover(true)} onMouseLeave={()=>{setHover(false);setPress(false);}}
    onMouseDown={()=>setPress(true)} onMouseUp={()=>setPress(false)}
    style={{display:'inline-flex',alignItems:'center',gap:9,padding:'11px 16px',minHeight:44,border:'1px solid '+(on?'var(--clover-500)':'var(--border)'),borderRadius:'var(--radius-pill)',background:selected?'var(--clover-100)':'var(--paper)',color:selected?'var(--clover-700)':'var(--text-muted)',font:'600 13px var(--font-body)',cursor:'pointer',boxShadow:press?'none':'0 2px 0 '+(on?'var(--clover-700)':'var(--border-strong)'),transform:press?'translateY(2px)':'none',transition:'all var(--dur-press) linear',...style}}>
    <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{id}</span>{title}
    {state!=='Unassessed'&&<span aria-hidden="true" style={{width:10,height:10,borderRadius:'50%',background:`var(--state-${state.toLowerCase().replace('-','')})`}}></span>}
  </button>;
}
