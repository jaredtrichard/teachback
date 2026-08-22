import React,{useState} from 'react';
export function TeachBackBox({value,onChange,prompt,placeholder,minChars=20,rows=8,style}){
  const [focus,setFocus]=useState(false);
  const n=(value||'').length;
  return <div style={{display:'grid',gap:10,...style}}>
    {prompt&&<label style={{font:'600 15px var(--font-body)',color:'var(--text-body)',lineHeight:1.5}}>{prompt}</label>}
    <textarea rows={rows} value={value} placeholder={placeholder}
      onChange={e=>onChange&&onChange(e.target.value)} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
      style={{display:'block',width:'100%',boxSizing:'border-box',resize:'vertical',padding:16,border:'1px solid '+(focus?'var(--clover-500)':'var(--border)'),borderRadius:'var(--radius-md)',outline:'none',background:focus?'var(--paper)':'var(--surface-sunken)',color:'var(--text-body)',font:'600 15px/1.65 var(--font-body)',boxShadow:focus?'0 2px 0 var(--clover-700)':'none',transition:'border-color var(--dur-press) linear, box-shadow var(--dur-press) linear'}}/>
    <div style={{font:'500 11px var(--font-mono)',color:n>=minChars?'var(--clover-600)':'var(--text-faint)'}}>{n} characters{n<minChars?` · write at least a couple of sentences`:''}</div>
  </div>;
}
