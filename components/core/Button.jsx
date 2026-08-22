import React,{useState} from 'react';
const FILLS={primary:['var(--clover-500)','var(--clover-600)','var(--clover-700)','#fff'],accent:['var(--tangerine-500)','var(--tangerine-600)','var(--tangerine-700)','#fff'],info:['var(--splash-500)','var(--splash-600)','var(--splash-700)','#fff'],danger:['var(--coral-500)','var(--coral-600)','var(--coral-700)','#fff'],star:['var(--sunny-500)','var(--sunny-600)','var(--sunny-700)','#6B5200']};
const SIZES={sm:{pad:'9px 14px',font:'700 13px var(--font-display)',edge:3,rad:'var(--radius-sm)'},md:{pad:'13px 20px',font:'700 15px var(--font-display)',edge:4,rad:'var(--radius-md)'},lg:{pad:'16px 26px',font:'700 18px var(--font-display)',edge:4,rad:'var(--radius-md)'}};
export function Button({variant='primary',size='md',ghost=false,fullWidth=false,disabled=false,children,onClick,style}){
  const [hover,setHover]=useState(false),[press,setPress]=useState(false);
  const f=FILLS[variant]||FILLS.primary,s=SIZES[size]||SIZES.md;
  const base={display:fullWidth?'flex':'inline-flex',width:fullWidth?'100%':undefined,alignItems:'center',justifyContent:'center',gap:8,border:0,borderRadius:s.rad,padding:s.pad,font:s.font,letterSpacing:'.01em',cursor:disabled?'default':'pointer',userSelect:'none',minHeight:44,transition:'transform var(--dur-press) linear, box-shadow var(--dur-press) linear, background var(--dur-press) linear'};
  const sty=ghost
    ?{...base,background:hover&&!disabled?'var(--tint)':'transparent',color:disabled?'var(--text-faint)':f[0],border:'2px solid '+(disabled?'var(--border)':f[0]),boxShadow:press?'none':`0 ${s.edge-1}px 0 ${disabled?'var(--border)':f[2]}`,transform:press?`translateY(${s.edge-1}px)`:'none'}
    :{...base,background:disabled?'var(--border)':hover?f[1]:f[0],color:disabled?'var(--text-faint)':f[3],boxShadow:disabled||press?'none':`0 ${s.edge}px 0 ${f[2]}`,transform:press&&!disabled?`translateY(${s.edge}px)`:'none'};
  return <button type="button" disabled={disabled} onClick={onClick} style={{...sty,...style}}
    onMouseEnter={()=>setHover(true)} onMouseLeave={()=>{setHover(false);setPress(false);}}
    onMouseDown={()=>setPress(true)} onMouseUp={()=>setPress(false)}>{children}</button>;
}
