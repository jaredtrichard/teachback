const {Button,Card,StateBadge,ProgressBar,StreakBadge,TeachBackBox,CriterionRow,ResultBanner,IconButton}=window.TeachbackDesignSystem_417209;
const pathTopics=[
 {id:'T001',title:'SEC, FINRA & SROs',state:'Exam-Ready'},
 {id:'T004',title:'SIPC vs FDIC',state:'Rusty'},
 {id:'T005',title:'Investor categories',state:'Exam-Ready'},
 {id:'T010',title:'Primary vs secondary market',state:'Unassessed'},
 {id:'T011',title:'Offerings & dilution',state:'Unassessed',locked:true},
];
const stateColor=s=>`var(--state-${s.toLowerCase().replace('-','')})`;
function PathNode({t,i}){
  const done=t.state==='Exam-Ready'||t.state==='Mastered';
  const off=[0,44,0,-44,0][i%5];
  return <div style={{display:'grid',justifyItems:'center',gap:6,transform:`translateX(${off}px)`}}>
    <button type="button" aria-label={t.title} style={{width:74,height:74,borderRadius:'50%',border:0,cursor:'pointer',background:t.locked?'var(--surface-sunken)':done?'var(--clover-500)':t.state==='Unassessed'?'var(--splash-500)':stateColor(t.state),boxShadow:t.locked?'0 5px 0 var(--border-strong)':'0 6px 0 '+(t.locked?'var(--border-strong)':done?'var(--clover-700)':t.state==='Unassessed'?'var(--splash-700)':'var(--sunny-700)'),display:'grid',placeItems:'center',color:t.locked?'var(--text-faint)':'#fff',fontSize:30}}>
      <i className={'ph-fill '+(t.locked?'ph-lock-simple':done?'ph-check-fat':'ph-chat-circle-text')}></i>
    </button>
    <span style={{font:'800 11px var(--font-body)',color:t.locked?'var(--text-faint)':'var(--text-body)',maxWidth:120,textAlign:'center',lineHeight:1.25}}>{t.title}</span>
  </div>;
}
function HomeScreen(){
  return <div style={{padding:'8px 20px 30px',display:'grid',gap:18,background:'var(--surface-page)',minHeight:'100%'}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <span style={{font:'800 24px var(--font-display)',color:'var(--text-body)'}}>teach<span style={{color:'var(--clover-500)'}}>back</span></span>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <span style={{display:'inline-flex',alignItems:'center',gap:5,color:'var(--sunny-700)',font:'800 15px var(--font-display)'}}><i className="ph-fill ph-star" style={{color:'var(--sunny-500)',fontSize:19}}></i>340</span>
        <StreakBadge count={7} style={{padding:'5px 11px'}}/>
      </div>
    </div>
    <Card padding={16}>
      <ProgressBar value={12} max={28} label="Section 1 · Capital markets"/>
      <p style={{margin:'10px 0 0',color:'var(--text-muted)',font:'600 12px var(--font-body)'}}>12 of 28 topics exam-ready. We'll tell you when to book.</p>
    </Card>
    <div style={{display:'grid',gap:26,justifyItems:'center',paddingTop:8}}>
      {pathTopics.map((t,i)=><PathNode key={t.id} t={t} i={i}/>)}
    </div>
  </div>;
}
function LessonScreen(){
  const [v,setV]=React.useState('SIPC steps in when a brokerage fails and customer property is short…');
  return <div style={{padding:'8px 20px 30px',display:'grid',gap:14,alignContent:'start',background:'var(--surface-page)',minHeight:'100%'}}>
    <div style={{display:'flex',alignItems:'center',gap:12}}>
      <IconButton icon="x" label="Close" size={40}/>
      <div style={{flex:1}}><ProgressBar value={2} max={3} height={14}/></div>
      <span style={{color:'var(--tangerine-600)',font:'800 14px var(--font-display)'}}><i className="ph-fill ph-flame"></i> 7</span>
    </div>
    <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Your turn · T004</span>
    <h2 style={{margin:0,font:'700 24px var(--font-display)',color:'var(--text-body)'}}>Explain it to a colleague.</h2>
    <Card sunken padding={14}>
      <strong style={{color:'var(--text-body)',font:'800 13px var(--font-body)'}}>In short:</strong>
      <span style={{color:'var(--text-muted)',font:'600 13px var(--font-body)'}}> SIPC is for brokerage-firm shortfalls; FDIC is for bank deposits; neither covers market loss.</span>
    </Card>
    <TeachBackBox value={v} onChange={setV} rows={6} prompt="In your own words, explain SIPC vs FDIC—what each protects, the coverage limits, and the important exclusions." placeholder="Start with the institution each one protects…"/>
    <Button fullWidth size="lg">Grade my teach-back</Button>
  </div>;
}
function ResultScreen(){
  return <div style={{padding:'8px 20px 30px',display:'grid',gap:14,alignContent:'start',background:'var(--surface-page)',minHeight:'100%'}}>
    <div style={{display:'grid',justifyItems:'center',gap:10,padding:'18px 0 4px'}}>
      <div style={{width:92,height:92,borderRadius:'50%',background:'var(--clover-500)',boxShadow:'0 7px 0 var(--clover-700)',display:'grid',placeItems:'center',color:'#fff',fontSize:46}}><i className="ph-fill ph-check-fat"></i></div>
      <h2 style={{margin:0,font:'800 28px var(--font-display)',color:'var(--text-body)'}}>Exam-Ready!</h2>
      <p style={{margin:0,color:'var(--text-muted)',font:'600 14px var(--font-body)',textAlign:'center'}}>Come back tomorrow to push T004 toward Mastered.</p>
    </div>
    <ResultBanner state="Exam-Ready" xp={40} message="That explanation is exam-ready!"/>
    <Card padding="2px 18px">
      <CriterionRow outcome="hit" label="SIPC covers brokerage failure" feedback="Clearly stated with the shortfall mechanics."/>
      <CriterionRow outcome="hit" label="Coverage limits" feedback="Both figures landed."/>
      <CriterionRow outcome="partial" label="Market losses excluded" feedback="Implied, but say it outright next time."/>
    </Card>
    <Button fullWidth size="lg" variant="accent">Continue</Button>
  </div>;
}
window.TBAppScreens={HomeScreen,LessonScreen,ResultScreen};
