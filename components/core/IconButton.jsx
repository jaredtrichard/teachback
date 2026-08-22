import React,{useState} from 'react';
export function IconButton({icon,label,variant='ghost',size=44,onClick,style}){
  const [hover,setHover]=useState(false),[press,setPress]=useState(false);
  const filled=variant==='primary';
  return <button type="button" aria-label={label} onClick={onClick}
    onMouseEnter={()=>setHover(true)} onMouseLeave={()=>{setHover(false);setPress(false);}}
    onMouseDown={()=>setPress(true)} onMouseUp={()=>setPress(false)}
    style={{width:size,height:size,display:'inline-grid',placeItems:'center',border:'1px solid '+(filled?'transparent':'var(--border)'),borderRadius:'var(--radius-md)',background:filled?(hover?'var(--clover-600)':'var(--clover-500)'):(hover?'var(--tint)':'var(--paper)'),color:filled?'#fff':'var(--text-muted)',fontSize:Math.round(size*.45),cursor:'pointer',boxShadow:press?'none':`0 3px 0 ${filled?'var(--clover-700)':'var(--border-strong)'}`,transform:press?'translateY(2px)':'none',transition:'transform var(--dur-press) linear, box-shadow var(--dur-press) linear',...style}}>
    {typeof icon==='string'?<i className={`ph-bold ph-${icon}`} aria-hidden="true"></i>:icon}
  </button>;
}
