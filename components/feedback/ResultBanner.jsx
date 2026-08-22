import React from 'react';
const KEY=s=>s.toLowerCase().replace('-','');
const HEADS={Gap:'Not yet — the core mechanism was absent.',Misconception:'Careful — a rule was stated incorrectly.',Rusty:'Getting there — right pieces, not enough coverage.','Exam-Ready':'Nice — that explanation is exam-ready!',Mastered:'Mastered. Confirmed across separate days.',Unassessed:'No teach-back graded yet.'};
export function ResultBanner({state,message,style}){
  const k=KEY(state);
  return <div style={{display:'flex',alignItems:'center',gap:16,padding:'18px 22px',borderRadius:'var(--radius-lg)',background:`var(--state-${k}-bg)`,border:`1px solid var(--state-${k})`,...style}}>
    <span aria-hidden="true" style={{width:44,height:44,flex:'0 0 44px',borderRadius:'50%',background:`var(--state-${k})`,color:'#fff',display:'grid',placeItems:'center',fontSize:22}}><i className={'ph-bold '+(k==='examready'||k==='mastered'?'ph-check-fat':k==='gap'?'ph-arrow-counter-clockwise':k==='misconception'?'ph-warning':'ph-arrows-clockwise')}></i></span>
    <span style={{flex:1}}>
      <strong style={{display:'block',color:`var(--state-${k})`,font:'600 19px var(--font-display)'}}>{message||HEADS[state]}</strong>
      <span style={{color:'var(--text-muted)',font:'600 13px var(--font-body)'}}>Topic state: {state}</span>
    </span>
  </div>;
}
