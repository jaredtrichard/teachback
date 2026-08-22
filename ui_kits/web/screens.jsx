const {Button,IconButton,Card,StateBadge,ProgressBar,StreakBadge,TeachBackBox,TopicChip,CriterionRow,ResultBanner}=window.TeachbackDesignSystem_417209;
const STORE='tb-frontend-review:v2';

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

function sectionCounts(results){
  return Object.entries(window.TB_TREE).map(([sec,s])=>{
    const ids=Object.values(s.leaves).flatMap(l=>l.ids);
    const done=ids.filter(id=>results[id]).length;
    return {sec,title:s.title,done,total:ids.length};
  });
}

function TopBar({streak,xp,view,setView,user}){
  const nav=[['home','Home'],['outline','Outline'],['qbank','QBank'],['brush','Brush-up']];
  return <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,maxWidth:'var(--page-max)',margin:'auto',padding:'18px var(--page-pad)'}}>
    <a href="#" onClick={e=>{e.preventDefault();setView('home');}} style={{font:'800 26px var(--font-display)',color:'var(--text-body)',textDecoration:'none',letterSpacing:'-.02em'}}>teach<span style={{color:'var(--clover-500)'}}>back</span></a>
    <nav style={{display:'flex',gap:8,flexWrap:'wrap'}}>
      {nav.map(([id,label])=>
        <Button key={id} size="sm" variant={view===id?'primary':'ghost'} onClick={()=>setView(id)}>{label}</Button>
      )}
    </nav>
    <div style={{display:'flex',alignItems:'center',gap:12}}>
      <span style={{display:'inline-flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:'var(--radius-pill)',background:'var(--sunny-100)',border:'2px solid var(--sunny-500)',color:'var(--sunny-700)',font:'800 14px var(--font-display)'}}><i className="ph-fill ph-star" style={{color:'var(--sunny-600)'}}></i>{xp} XP</span>
      <StreakBadge count={streak}/>
      {user
        ? <span style={{font:'700 12px var(--font-body)',color:'var(--text-muted)'}}>{user}</span>
        : <Button size="sm" onClick={()=>setView('login')}>Log in</Button>}
    </div>
  </header>;
}

function OverallBar({results}){
  const rows=sectionCounts(results);
  const done=rows.reduce((a,r)=>a+r.done,0);
  const total=rows.reduce((a,r)=>a+r.total,0);
  return <Card padding={18}>
    <div style={{display:'flex',justifyContent:'space-between',gap:12,marginBottom:10}}>
      <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Progress</span>
      <span style={{font:'700 12px var(--font-mono)',color:'var(--text-faint)'}}>{done}/{total}</span>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:8}}>
      {rows.map(r=>(
        <div key={r.sec} style={{display:'grid',gap:6,minWidth:0}}>
          <ProgressBar value={r.done} max={r.total}/>
          <span style={{font:'800 10px var(--font-body)',letterSpacing:'.06em',textTransform:'uppercase',color:'var(--text-faint)'}}>Sec {r.sec} · {r.done}/{r.total}</span>
        </div>
      ))}
    </div>
  </Card>;
}

function HomeView({setView,results}){
  const rows=sectionCounts(results);
  const done=rows.reduce((a,r)=>a+r.done,0);
  return <section style={{display:'grid',gap:18}}>
    <h1 style={{margin:0,font:'var(--text-hero)',fontFamily:'var(--font-display)',color:'var(--text-body)',letterSpacing:'var(--tracking-display)'}}>Learn it. <em style={{color:'var(--clover-500)',fontStyle:'normal'}}>Teach it back.</em></h1>
    <p style={{margin:0,maxWidth:520,color:'var(--text-muted)',font:'var(--text-body-lg)'}}>Read a focused note. Explain it in your own words. Get an honest signal.</p>
    <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
      <Button size="lg" onClick={()=>setView('outline')}>Open the SIE outline</Button>
      <Button size="lg" variant="ghost" onClick={()=>setView('qbank')}>Practice the QBank</Button>
    </div>
    <OverallBar results={results}/>
    <p style={{margin:0,color:'var(--text-faint)',font:'600 13px var(--font-body)'}}>{done} taught back so far.</p>
  </section>;
}

function LoginView({setUser,setView}){
  const [email,setEmail]=React.useState('');
  return <Card padding={28} style={{maxWidth:420}}>
    <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Log in</span>
    <h2 style={{margin:'8px 0 14px',font:'700 28px var(--font-display)'}}>We’ll send a magic link.</h2>
    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" style={{width:'100%',padding:'12px 14px',border:'2px solid var(--border-strong)',borderRadius:14,font:'600 15px var(--font-body)',marginBottom:14}}/>
    <Button fullWidth size="lg" onClick={()=>{setUser(email||'you@email.com');setView('home');}}>Send link</Button>
    <p style={{margin:'12px 0 0',font:'500 11px var(--font-mono)',color:'var(--text-faint)'}}>Frontend stub · no mail is sent</p>
  </Card>;
}

function OutlineView({results,openModule}){
  const [openSec,setOpenSec]=React.useState('1');
  const [openLeaf,setOpenLeaf]=React.useState('1.1.1');
  const tree=window.TB_TREE;
  const byId=Object.fromEntries(window.TB_BITES.map(b=>[b.id,b]));
  return <section style={{display:'grid',gap:16}}>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>SIE outline</h1>
    <OverallBar results={results}/>
    {Object.entries(tree).map(([sec,s])=>{
      const ids=Object.values(s.leaves).flatMap(l=>l.ids);
      const done=ids.filter(id=>results[id]).length;
      return <Card key={sec} padding={18}>
        <button onClick={()=>setOpenSec(openSec===sec?'':sec)} style={{all:'unset',cursor:'pointer',display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',gap:12,minHeight:44}}>
          <div>
            <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Section {sec}</span>
            <h2 style={{margin:'4px 0 0',font:'700 22px var(--font-display)'}}>{s.title}</h2>
          </div>
          <span style={{font:'700 12px var(--font-mono)',color:'var(--text-faint)'}}>{done}/{ids.length}</span>
        </button>
        {openSec===sec && <div style={{display:'grid',gap:14,marginTop:16}}>
          {Object.entries(s.leaves).map(([leaf,l])=>(
            <div key={leaf}>
              <button onClick={()=>setOpenLeaf(openLeaf===leaf?'':leaf)} style={{all:'unset',cursor:'pointer',font:'800 13px var(--font-body)',color:'var(--text-body)'}}>{leaf} {l.title}</button>
              {openLeaf===leaf && <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:10}}>
                {l.ids.map(id=>{
                  const t=byId[id];
                  const st=results[id]?results[id].state:'Unassessed';
                  return <TopicChip key={id} id={id} title={t.title} state={st} selected={false} onClick={()=>openModule(id)}/>;
                })}
              </div>}
            </div>
          ))}
        </div>}
      </Card>;
    })}
  </section>;
}

function ModuleView({topic,state,goTeach,back}){
  return <section style={{display:'grid',gap:16,maxWidth:720}}>
    <button onClick={back} style={{all:'unset',cursor:'pointer',font:'800 13px var(--font-body)',color:'var(--clover-600)'}}>← SIE outline</button>
    <div style={{display:'flex',gap:10,alignItems:'center'}}>
      <StateBadge state={state||'New'}/>
      <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{topic.id} · {topic.leaf}</span>
    </div>
    <Card padding={30}>
      <h1 style={{margin:'0 0 8px',font:'700 32px var(--font-display)'}}>{topic.title}</h1>
      <p style={{margin:'0 0 18px',color:'var(--text-muted)'}}>{topic.subtitle}</p>
      <Card sunken padding={16} style={{marginBottom:18}}>
        <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>In short</span>
        <div style={{display:'grid',gap:6,marginTop:8}}>
          {topic.inShort.map(p=><strong key={p} style={{font:'800 14px var(--font-body)'}}>{p}</strong>)}
        </div>
      </Card>
      <h3 style={{margin:'0 0 8px',font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--clover-600)'}}>Core</h3>
      {topic.core.map(p=><p key={p} style={{margin:'0 0 12px',color:'var(--text-muted)',font:'600 14px/1.7 var(--font-body)'}}>{p}</p>)}
      <h3 style={{margin:'16px 0 8px',font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--clover-600)'}}>Precision</h3>
      <ul style={{margin:0,padding:0,listStyle:'none',display:'grid',gap:8}}>
        {topic.precision.map(p=><li key={p} style={{paddingLeft:22,position:'relative',color:'var(--text-muted)',font:'600 13px/1.55 var(--font-body)'}}><i className="ph-fill ph-arrow-fat-right" style={{position:'absolute',left:0,top:2,color:'var(--tangerine-500)'}}></i>{p}</li>)}
      </ul>
    </Card>
    <Button size="lg" onClick={goTeach}>Teach it back →</Button>
  </section>;
}

function TeachView({topic,answer,setAnswer,result,err,submit,back}){
  return <section style={{display:'grid',gap:16}}>
    <button onClick={back} style={{all:'unset',cursor:'pointer',font:'800 13px var(--font-body)',color:'var(--clover-600)'}}>← {topic.title}</button>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>Teach it back</h1>
    <div style={{display:'grid',gridTemplateColumns:result?'minmax(0,1fr) minmax(0,1fr)':'minmax(0,1fr)',gap:22,alignItems:'start'}}>
      <Card padding={24}>
        <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>{topic.id}</span>
        <h2 style={{margin:'6px 0 14px',font:'700 24px var(--font-display)'}}>Explain it to a colleague.</h2>
        <TeachBackBox value={answer} onChange={setAnswer} prompt={topic.prompt} placeholder={topic.placeholder} rows={8}/>
        <div style={{marginTop:14}}><Button fullWidth size="lg" onClick={submit}>Grade my teach-back</Button></div>
        {err&&<p role="alert" style={{margin:'10px 0 0',color:'var(--coral-700)',font:'700 12px var(--font-body)'}}>{err}</p>}
      </Card>
      {result && <div style={{display:'grid',gap:16}}>
        <ResultBanner state={result.state} xp={result.xp}/>
        <Card padding="4px 22px">
          {result.crits.map(c=><CriterionRow key={c.id} outcome={c.outcome} label={c.label} feedback={c.feedback}/>)}
        </Card>
      </div>}
    </div>
  </section>;
}

function QBankView({openModule}){
  const items=window.TB_BITES.filter(t=>t.demo);
  return <section style={{display:'grid',gap:16}}>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>QBank</h1>
    <p style={{margin:0,color:'var(--text-muted)',maxWidth:520}}>Random practice. Right/wrong only — this does not write Gap / Rusty / Exam-ready / Mastered.</p>
    {items.map(t=><Card key={t.id} padding={20}>
      <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{t.id}</span>
      <h3 style={{margin:'6px 0',font:'700 20px var(--font-display)'}}>{t.title}</h3>
      <p style={{margin:'0 0 12px',color:'var(--text-muted)'}}>{t.prompt}</p>
      <Button size="sm" onClick={()=>openModule(t.id)}>Open the module</Button>
    </Card>)}
    <Card sunken padding={20}><p style={{margin:0,color:'var(--text-faint)'}}>Full authored bank lands with the content pass. These three are the demo pool.</p></Card>
  </section>;
}

function BrushView({results,openModule}){
  const misses=[];
  for(const [id,r] of Object.entries(results)){
    const topic=window.TB_BITES.find(t=>t.id===id);
    (r.misses||[]).forEach(m=>misses.push({id,title:topic.title,miss:m,state:r.state}));
  }
  const byState={Gap:[],Rusty:[],'Exam-Ready':[],Mastered:[]};
  misses.forEach(m=>{ (byState[m.state]||(byState[m.state]=[])).push(m); });
  return <section style={{display:'grid',gap:16}}>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>Brush-up</h1>
    <p style={{margin:0,color:'var(--text-muted)',maxWidth:540}}>Not the official outline. Grouped by how you missed. We’ll thicken this once the struggle bank has real traffic.</p>
    {misses.length===0
      ? <Card sunken padding={28}><p style={{margin:0,color:'var(--text-muted)'}}>No struggle data yet. Teach a bite back and misses land here.</p></Card>
      : ['Gap','Rusty'].map(bucket=> byState[bucket]&&byState[bucket].length>0 && <div key={bucket} style={{display:'grid',gap:10}}>
          <h2 style={{margin:0,font:'700 18px var(--font-display)'}}>{bucket}</h2>
          {byState[bucket].map((m,i)=><Card key={i} padding={18} style={{cursor:'pointer'}} onClick={()=>openModule(m.id)}>
            <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{m.id}</span>
            <h3 style={{margin:'4px 0',font:'700 18px var(--font-display)'}}>{m.title}</h3>
            <p style={{margin:0,color:'var(--text-muted)'}}>Miss: {m.miss}</p>
          </Card>)}
        </div>)}
  </section>;
}

function App(){
  const saved=React.useMemo(()=>{try{return JSON.parse(localStorage.getItem(STORE))||{}}catch{return{}}},[]);
  const firstDemo=window.TB_BITES.find(t=>t.demo)?.id || window.TB_BITES[0].id;
  const [topicId,setTopicId]=React.useState(saved.topicId||firstDemo);
  const [answers,setAnswers]=React.useState(saved.answers||{});
  const [results,setResults]=React.useState(saved.results||{});
  const [xp,setXp]=React.useState(saved.xp||0);
  const [view,setView]=React.useState(saved.view||'home');
  const [user,setUser]=React.useState(saved.user||'');
  const [err,setErr]=React.useState('');
  const topic=window.TB_BITES.find(t=>t.id===topicId);
  const answer=answers[topicId]||'';
  const result=results[topicId];
  const persist=(patch)=>{try{localStorage.setItem(STORE,JSON.stringify({topicId,answers,results,xp,view,user,...patch}))}catch{}};
  const submit=()=>{
    if(answer.trim().length<20){setErr('Write at least a couple of sentences so the rubric has something to assess.');return;}
    setErr('');
    const r=grade(topic,answer);
    const nextResults={...results,[topicId]:r};
    const nextXp=xp+r.xp;
    setResults(nextResults);setXp(nextXp);
    persist({results:nextResults,xp:nextXp});
  };
  const openModule=(id)=>{setTopicId(id);setView('module');setErr('');persist({topicId:id,view:'module'});};
  const goTeach=()=>{setView('teach');persist({view:'teach'});};
  const setAnswer=(v)=>{const na={...answers,[topicId]:v};setAnswers(na);persist({answers:na});};
  const changeView=(v)=>{setView(v);persist({view:v});};
  return <div style={{minHeight:'100vh',background:'var(--surface-page)'}}>
    <TopBar streak={3} xp={xp} view={view} setView={changeView} user={user}/>
    <main style={{maxWidth:'var(--page-max)',margin:'auto',padding:'26px var(--page-pad) 80px',display:'grid',gap:22}}>
      {view==='home' && <HomeView setView={changeView} results={results}/>}
      {view==='login' && <LoginView setUser={u=>{setUser(u);persist({user:u});}} setView={changeView}/>}
      {view==='outline' && <OutlineView results={results} openModule={openModule}/>}
      {view==='module' && topic && <ModuleView topic={topic} state={result?result.state:'Unassessed'} goTeach={goTeach} back={()=>changeView('outline')}/>}
      {view==='teach' && topic && <TeachView topic={topic} answer={answer} setAnswer={setAnswer} result={result} err={err} submit={submit} back={()=>changeView('module')}/>}
      {view==='qbank' && <QBankView openModule={openModule}/>}
      {view==='brush' && <BrushView results={results} openModule={openModule}/>}
    </main>
  </div>;
}
window.TBWebApp=App;
