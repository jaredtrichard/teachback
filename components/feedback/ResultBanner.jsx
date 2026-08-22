import React from 'react';
const KEY=s=>s.toLowerCase().replace('-','');
const HEADS={Gap:'Not yet — the core mechanism was absent.',Misconception:'Careful — a rule was stated incorrectly.',Rusty:'Getting there — right pieces, not enough coverage.','Exam-Ready':'Nice — that explanation is exam-ready!',Mastered:'Mastered. Confirmed across separate days.',Unassessed:'No teach-back graded yet.'};
export function ResultBanner({state,xp,message,style}){
  const k=KEY(state);
  return <div style={{display:'flex',alignItems:'center',gap:16,padding:'18px 22px',borderRadius:'var(--radius-lg)',background:`var(--state-${k}-bg)`,border:`2px solid var(--state-${k})`,...style}}>
    <span aria-hidden="true" style={{width:44,height:44,flex:'0 0 44px',borderRadius:'50%',background:`var(--state-${k})`,color:'#fff',display:'grid',placeItems:'center',fontSize:22}}><i className={'ph-fill '+(k==='examready'||k==='mastered'?'ph-check-fat':k==='gap'?'ph-arrow-counter-clockwise':k==='misconception'?'ph-warning':'ph-arrows-clockwise')}></i></span>
    <span style={{flex:1}}>
      <strong style={{display:'block',color:`var(--state-${k})`,font:'700 19px var(--font-display)'}}>{message||HEADS[state]}</strong>
      <span style={{color:'var(--text-muted)',font:'700 13px var(--font-body)'}}>Topic state: {state}</span>
    </span>
    {xp!=null&&<span style={{padding:'8px 14px',borderRadius:'var(--radius-pill)',background:'var(--sunny-500)',color:'#6B5200',font:'800 14px var(--font-display)',boxShadow:'0 3px 0 var(--sunny-700)'}}>+{xp} XP</span>}
  </div>;
}
