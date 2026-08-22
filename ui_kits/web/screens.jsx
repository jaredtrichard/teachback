const {Button,IconButton,Card,StateBadge,ProgressBar,StreakBadge,TeachBackBox,TopicChip,CriterionRow,ResultBanner}=window.TeachbackDesignSystem_417209;
const STORE='tb-frontend-review:v1';

function grade(topic,answer){
  const a=answer.toLowerCase();
  const crits=topic.criteria.map(c=>{
    const hits=c.keys.filter(k=>k.split('|').some(alt=>alt && a.includes(alt))).length;
    const outcome=hits===c.keys.length?'hit':hits>0?'partial':'missing';
    return {...c,outcome,feedback:outcome==='hit'?c.fb.hit:c.fb.miss};
  });
  const n=crits.filter(c=>c.outcome==='hit').length;
  const state=n===crits.length?'Exam-Ready':n>=Math.ceil(crits.length/2)?'Rusty':'Gap';
  return {crits,state,misses:crits.filter(c=>c.outcome!=='hit').map(c=>c.label),xp:10+n*10};
}

function StatePath({state}){
  const states=window.TB_STATES;
  const idx=state?states.indexOf(state):-1;
  return <div style={{display:'flex',alignItems:'center',gap:0,flex:1,minWidth:0}}>
    {states.map((s,i)=><React.Fragment key={s}>
      {i>0&&<div style={{flex:1,height:4,borderRadius:2,background:i<=idx?'var(--clover-500)':'var(--border)'}}></div>}
      <div title={s} style={{display:'grid',gap:4,justifyItems:'center',minWidth:0}}>
        <div style={{width:i===idx?26:18,height:i===idx?26:18,borderRadius:'50%',background:i<idx?'var(--clover-500)':i===idx?`var(--state-${s.toLowerCase().replace('-','')})`:'var(--surface-sunken)',border:'2px solid '+(i<=idx?'transparent':'var(--border-strong)'),boxShadow:i===idx?'0 3px 0 rgba(0,0,0,.18)':'none',display:'grid',placeItems:'center',color:'#fff',fontSize:12}}>{i<idx&&<i className="ph-fill ph-check"></i>}</div>
        <span style={{font:'800 9px var(--font-body)',letterSpacing:'.05em',textTransform:'uppercase',color:i===idx?'var(--text-body)':'var(--text-faint)',whiteSpace:'nowrap'}}>{s}</span>
      </div>
    </React.Fragment>)}
  </div>;
}

function TopBar({streak,xp,view,setView,done,total}){
  return <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,maxWidth:'var(--page-max)',margin:'auto',padding:'18px var(--page-pad)'}}>
    <a href="#" onClick={e=>{e.preventDefault();setView('map');}} style={{font:'800 26px var(--font-display)',color:'var(--text-body)',textDecoration:'none',letterSpacing:'-.02em'}}>teach<span style={{color:'var(--clover-500)'}}>back</span></a>
    <nav style={{display:'flex',gap:8,flexWrap:'wrap'}}>
      {[['map','Outline'],['study','Tutor'],['brush','Brush-up']].map(([id,label])=>
        <Button key={id} size="sm" variant={view===id?'primary':'ghost'} onClick={()=>setView(id)}>{label}</Button>
      )}
    </nav>
    <div style={{display:'flex',alignItems:'center',gap:12}}>
      <span style={{font:'700 12px var(--font-body)',color:'var(--text-muted)'}}>{done}/{total}</span>
      <span style={{display:'inline-flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:'var(--radius-pill)',background:'var(--sunny-100)',border:'2px solid var(--sunny-500)',color:'var(--sunny-700)',font:'800 14px var(--font-display)'}}><i className="ph-fill ph-star" style={{color:'var(--sunny-600)'}}></i>{xp} XP</span>
      <StreakBadge count={streak}/>
      <IconButton icon="gear" label="Settings"/>
    </div>
  </header>;
}

function NoteCard({topic}){
  return <Card padding={30}>
    <div style={{display:'flex',justifyContent:'space-between',gap:16,paddingBottom:18,borderBottom:'2px solid var(--border)'}}>
      <div style={{minWidth:0}}>
        <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{topic.id} · {topic.leaf} {topic.leafTitle}</span>
        <h2 style={{margin:'6px 0 3px',font:'700 28px var(--font-display)',color:'var(--text-body)'}}>{topic.title}</h2>
        <p style={{margin:0,color:'var(--text-muted)',font:'600 14px var(--font-body)'}}>{topic.subtitle}</p>
      </div>
      <span style={{font:'500 11px var(--font-mono)',color:'var(--text-faint)',whiteSpace:'nowrap',paddingTop:4}}>{topic.demo?'demo note':'stub note'}</span>
    </div>
    <Card sunken padding={16} style={{margin:'18px 0'}}>
      <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>In short</span>
      <div style={{display:'grid',gap:6,marginTop:8}}>
        {topic.inShort.map(p=><strong key={p} style={{color:'var(--text-body)',font:'800 14px var(--font-body)'}}>{p}</strong>)}
      </div>
    </Card>
    <h3 style={{margin:'0 0 8px',font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--clover-600)'}}>Core</h3>
    {topic.core.map(p=><p key={p} style={{margin:'0 0 12px',color:'var(--text-muted)',font:'600 14px/1.7 var(--font-body)'}}>{p}</p>)}
    <h3 style={{margin:'16px 0 8px',font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--clover-600)'}}>Precision</h3>
    <ul style={{margin:0,padding:0,listStyle:'none',display:'grid',gap:8}}>
      {topic.precision.map(p=><li key={p} style={{position:'relative',paddingLeft:22,color:'var(--text-muted)',font:'600 13px/1.55 var(--font-body)'}}><i className="ph-fill ph-arrow-fat-right" style={{position:'absolute',left:0,top:2,color:'var(--tangerine-500)'}}></i>{p}</li>)}
    </ul>
  </Card>;
}

function MapView({results,pick}){
  const [openSec,setOpenSec]=React.useState('1');
  const [openLeaf,setOpenLeaf]=React.useState('1.1.1');
  const tree=window.TB_TREE;
  const byId=Object.fromEntries(window.TB_BITES.map(b=>[b.id,b]));
  return <section style={{display:'grid',gap:16}}>
    <h1 style={{margin:0,font:'var(--text-hero)',fontFamily:'var(--font-display)',color:'var(--text-body)',letterSpacing:'var(--tracking-display)'}}>Learn it. <em style={{color:'var(--clover-500)',fontStyle:'normal'}}>Teach it back.</em></h1>
    <p style={{margin:0,maxWidth:560,color:'var(--text-muted)',font:'var(--text-body-lg)'}}>{window.TB_BITE_COUNT} official bites under 34 FINRA leaves. Tutor sits on the same page as the note — no read-gate.</p>
    {Object.entries(tree).map(([sec,s])=>{
      const ids=Object.values(s.leaves).flatMap(l=>l.ids);
      const done=ids.filter(id=>results[id]).length;
      return <Card key={sec} padding={18}>
        <button onClick={()=>setOpenSec(openSec===sec?'':sec)} style={{all:'unset',cursor:'pointer',display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',gap:12,minHeight:44}}>
          <div>
            <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Section {sec}</span>
            <h2 style={{margin:'4px 0 0',font:'700 22px var(--font-display)'}}>{s.title}</h2>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <ProgressBar value={done} max={ids.length} style={{width:120}}/>
            <span style={{font:'700 12px var(--font-mono)',color:'var(--text-faint)'}}>{done}/{ids.length}</span>
          </div>
        </button>
        {openSec===sec && <div style={{display:'grid',gap:14,marginTop:16}}>
          {Object.entries(s.leaves).map(([leaf,l])=>(
            <div key={leaf}>
              <button onClick={()=>setOpenLeaf(openLeaf===leaf?'':leaf)} style={{all:'unset',cursor:'pointer',font:'800 13px var(--font-body)',color:'var(--text-body)'}}>{leaf} {l.title}</button>
              {openLeaf===leaf && <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:10}}>
                {l.ids.map(id=>{
                  const t=byId[id];
                  const st=results[id]?results[id].state:undefined;
                  return <TopicChip key={id} id={id} title={t.title} state={st||'Unassessed'} selected={false} onClick={()=>pick(id)}/>;
                })}
              </div>}
            </div>
          ))}
        </div>}
      </Card>;
    })}
  </section>;
}

function StudyView({topic,answer,setAnswer,result,err,submit}){
  return <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.05fr) minmax(320px,.8fr)',gap:22,alignItems:'start'}}>
    <NoteCard topic={topic}/>
    <div style={{display:'grid',gap:16}}>
      <Card padding={24}>
        <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Tutor · {topic.id}</span>
        <h2 style={{margin:'6px 0 14px',font:'700 24px var(--font-display)',color:'var(--text-body)'}}>Explain it to a colleague.</h2>
        <TeachBackBox value={answer} onChange={setAnswer} prompt={topic.prompt} placeholder={topic.placeholder} rows={8}/>
        <div style={{marginTop:14}}><Button fullWidth size="lg" onClick={submit}>Grade my teach-back</Button></div>
        {err&&<p role="alert" style={{margin:'10px 0 0',color:'var(--coral-700)',font:'700 12px var(--font-body)'}}>{err}</p>}
        <p style={{margin:'14px 0 0',font:'500 10px var(--font-mono)',color:'var(--text-faint)'}}><i className="ph-fill ph-sparkle" style={{color:'var(--tangerine-500)'}}></i> Fake local grader for frontend review · no API</p>
      </Card>
      {result?<>
        <ResultBanner state={result.state} xp={result.xp}/>
        <Card padding="4px 22px">
          {result.crits.map(c=><CriterionRow key={c.id} outcome={c.outcome} label={c.label} feedback={c.feedback}/>)}
        </Card>
      </>:<Card sunken padding={26} style={{border:'2px dashed var(--border-strong)'}}>
        <i className="ph-fill ph-arrow-elbow-down-right" style={{fontSize:26,color:'var(--tangerine-500)'}}></i>
        <h3 style={{margin:'10px 0 6px',font:'700 20px var(--font-display)',color:'var(--text-body)'}}>Your signal will appear here.</h3>
        <p style={{margin:0,color:'var(--text-muted)',font:'600 13px/1.6 var(--font-body)',maxWidth:300}}>We'll compare your explanation with the {topic.criteria.length} things an exam-ready answer needs to make clear.</p>
      </Card>}
    </div>
  </div>;
}

function BrushView({results,pick}){
  const misses=[];
  for(const [id,r] of Object.entries(results)){
    const topic=window.TB_BITES.find(t=>t.id===id);
    (r.misses||[]).forEach(m=>misses.push({id,title:topic.title,miss:m,state:r.state}));
  }
  return <section style={{display:'grid',gap:16}}>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>Brush-up</h1>
    <p style={{margin:0,color:'var(--text-muted)',font:'var(--text-body-lg)',maxWidth:540}}>Not the official 181. Custom drills from what you missed. Empty until the tutor has real misses.</p>
    {misses.length===0
      ? <Card sunken padding={28}><p style={{margin:0,color:'var(--text-muted)'}}>No struggle data yet. Grade a teach-back and misses land here.</p></Card>
      : misses.map((m,i)=><Card key={i} padding={18} style={{cursor:'pointer'}} onClick={()=>pick(m.id)}>
          <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{m.id}</span>
          <h3 style={{margin:'4px 0',font:'700 18px var(--font-display)'}}>{m.title}</h3>
          <p style={{margin:0,color:'var(--text-muted)'}}>Miss: {m.miss}</p>
        </Card>)}
  </section>;
}

function App(){
  const saved=React.useMemo(()=>{try{return JSON.parse(localStorage.getItem(STORE))||{}}catch{return{}}},[]);
  const firstDemo=window.TB_BITES.find(t=>t.demo)?.id || window.TB_BITES[0].id;
  const [topicId,setTopicId]=React.useState(saved.topicId||firstDemo);
  const [answers,setAnswers]=React.useState(saved.answers||{});
  const [results,setResults]=React.useState(saved.results||{});
  const [xp,setXp]=React.useState(saved.xp||0);
  const [view,setView]=React.useState(saved.view||'map');
  const [err,setErr]=React.useState('');
  const topic=window.TB_BITES.find(t=>t.id===topicId);
  const answer=answers[topicId]||'';
  const result=results[topicId];
  const persist=(patch)=>{try{localStorage.setItem(STORE,JSON.stringify({topicId,answers,results,xp,view,...patch}))}catch{}};
  const submit=()=>{
    if(answer.trim().length<20){setErr('Write at least a couple of sentences so the rubric has something to assess.');return;}
    setErr('');
    const r=grade(topic,answer);
    const nextResults={...results,[topicId]:r};
    const nextXp=xp+r.xp;
    setResults(nextResults);setXp(nextXp);
    persist({results:nextResults,xp:nextXp});
  };
  const pick=(id)=>{setTopicId(id);setView('study');setErr('');persist({topicId:id,view:'study'});};
  const setAnswer=(v)=>{const na={...answers,[topicId]:v};setAnswers(na);persist({answers:na});};
  const changeView=(v)=>{setView(v);persist({view:v});};
  const done=Object.keys(results).length;
  return <div style={{minHeight:'100vh',background:'var(--surface-page)'}}>
    <TopBar streak={3} xp={xp} view={view} setView={changeView} done={done} total={window.TB_BITE_COUNT}/>
    <main style={{maxWidth:'var(--page-max)',margin:'auto',padding:'26px var(--page-pad) 80px',display:'grid',gap:22}}>
      {view!=='map' && topic && <Card padding={20} style={{display:'flex',alignItems:'center',gap:28,flexWrap:'wrap'}}>
        <div style={{display:'grid',gap:8}}>
          <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--text-faint)'}}>This bite</span>
          {result?<StateBadge state={result.state}/>:<span style={{font:'700 13px var(--font-body)',color:'var(--text-faint)'}}>No score yet</span>}
        </div>
        <StatePath state={result?result.state:null}/>
        <p style={{margin:0,color:'var(--text-muted)',font:'600 12px var(--font-body)',maxWidth:200}}>{result?window.TB_STATE_DESC[result.state]:'Empty is empty. Tutor writes the first score.'}</p>
      </Card>}
      {view==='map' && <MapView results={results} pick={pick}/>}
      {view==='study' && topic && <StudyView topic={topic} answer={answer} setAnswer={setAnswer} result={result} err={err} submit={submit}/>}
      {view==='brush' && <BrushView results={results} pick={pick}/>}
    </main>
    <footer style={{maxWidth:'var(--page-max)',margin:'auto',padding:'0 var(--page-pad) 30px',font:'500 11px var(--font-mono)',color:'var(--text-faint)'}}>
      <span style={{color:'var(--tangerine-600)'}}>Explanation first.</span> {window.TB_BITE_COUNT} bites · 34 leaves · frontend review · not the product ship.
    </footer>
  </div>;
}
window.TBWebApp=App;
