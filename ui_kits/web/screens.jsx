const {Button,IconButton,Card,StateBadge,ProgressBar,StreakBadge,TeachBackBox,TopicChip,CriterionRow,ResultBanner}=window.TeachbackDesignSystem_417209;
const STORE='tb-frontend-review:v3';

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

function leafNodes(){
  const out=[];
  Object.entries(window.TB_TREE).forEach(([sec,s])=>{
    Object.entries(s.leaves).forEach(([leaf,l])=>out.push({sec,sectionTitle:s.title,leaf,title:l.title,ids:l.ids}));
  });
  return out;
}

function leafState(node,results){
  const scored=node.ids.filter(id=>results[id]);
  if(!scored.length) return 'locked-or-new';
  if(scored.length===node.ids.length && scored.every(id=>['Exam-Ready','Mastered'].includes(results[id].state))) return 'done';
  return 'active';
}

function Mascot({size=88,say}){
  return <div style={{display:'grid',justifyItems:'center',gap:8}}>
    <svg width={size} height={size} viewBox="0 0 88 88" aria-hidden="true">
      <ellipse cx="44" cy="50" rx="28" ry="26" fill="var(--clover-500)"/>
      <ellipse cx="44" cy="48" rx="22" ry="20" fill="var(--clover-100)"/>
      <circle cx="36" cy="46" r="4" fill="var(--ink)"/>
      <circle cx="52" cy="46" r="4" fill="var(--ink)"/>
      <circle cx="37.2" cy="44.8" r="1.2" fill="#fff"/>
      <circle cx="53.2" cy="44.8" r="1.2" fill="#fff"/>
      <path d="M38 56c2.4 3 9.6 3 12 0" fill="none" stroke="var(--tangerine-500)" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="24" cy="58" rx="7" ry="5" fill="var(--clover-600)"/>
      <ellipse cx="64" cy="58" rx="7" ry="5" fill="var(--clover-600)"/>
    </svg>
    {say && <div style={{background:'#fff',border:'2px solid var(--border)',borderRadius:16,padding:'8px 12px',font:'800 13px var(--font-body)',boxShadow:'0 3px 0 var(--border-strong)',maxWidth:180,textAlign:'center'}}>{say}</div>}
  </div>;
}

function StatPill({icon,value,tone}){
  const map={heart:['var(--coral-100)','var(--coral-500)','ph-heart'],gem:['var(--splash-100)','var(--splash-600)','ph-diamond'],streak:['var(--tangerine-100)','var(--tangerine-600)','ph-flame'],xp:['var(--sunny-100)','var(--sunny-600)','ph-star']};
  const [bg,fg,ph]=map[tone];
  return <span style={{display:'inline-flex',alignItems:'center',gap:6,padding:'8px 12px',borderRadius:'var(--radius-pill)',background:bg,border:`2px solid ${fg}`,color:fg,font:'800 14px var(--font-display)'}}><i className={`ph-fill ${ph}`}></i>{value}</span>;
}

function AuthScreen({mode,setMode,onEnter}){
  const [id,setId]=React.useState('');
  const [pw,setPw]=React.useState('');
  return <div style={{minHeight:'100vh',background:'var(--surface-page)',display:'grid',placeItems:'center',padding:24}}>
    <div style={{width:'min(420px,100%)',display:'grid',gap:16}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{font:'800 26px var(--font-display)'}}>teach<span style={{color:'var(--clover-500)'}}>back</span></span>
        {mode==='login'
          ? <Button size="sm" onClick={()=>setMode('signup')}>Sign up</Button>
          : <Button size="sm" variant="ghost" onClick={()=>setMode('login')}>Log in</Button>}
      </div>
      <Card padding={28}>
        <Mascot say={mode==='login'?'Welcome back. Teach one bite.':'New here? Let’s learn it, then teach it back.'}/>
        <h1 style={{margin:'12px 0 16px',font:'700 28px var(--font-display)'}}>{mode==='login'?'Log in':'Create your account'}</h1>
        <label style={{display:'grid',gap:6,font:'800 11px var(--font-body)',letterSpacing:'.08em',textTransform:'uppercase',color:'var(--text-faint)'}}>Email or username
          <input value={id} onChange={e=>setId(e.target.value)} style={fieldStyle}/>
        </label>
        <label style={{display:'grid',gap:6,marginTop:12,font:'800 11px var(--font-body)',letterSpacing:'.08em',textTransform:'uppercase',color:'var(--text-faint)'}}>Password
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)} style={fieldStyle}/>
        </label>
        <div style={{marginTop:16}}><Button fullWidth size="lg" onClick={()=>onEnter(id||'you')}>{mode==='login'?'Log in':'Sign up'}</Button></div>
        <div style={{display:'grid',gap:8,marginTop:12}}>
          <Button fullWidth variant="ghost" onClick={()=>onEnter('google')}>Continue with Google</Button>
          <Button fullWidth variant="ghost" onClick={()=>onEnter('facebook')}>Continue with Facebook</Button>
        </div>
        <p style={{margin:'12px 0 0',font:'500 11px var(--font-mono)',color:'var(--text-faint)'}}>Frontend stub · no account is created</p>
      </Card>
    </div>
  </div>;
}
const fieldStyle={padding:'12px 14px',border:'2px solid var(--border-strong)',borderRadius:14,font:'600 15px var(--font-body)'};

function SideNav({view,setView}){
  const items=[['learn','Learn','ph-path'],['qbank','QBank','ph-cards'],['brush','Brush-up','ph-broom'],['leagues','Leagues','ph-trophy'],['quests','Quests','ph-target'],['shop','Shop','ph-storefront'],['profile','Profile','ph-user'],['courses','Courses','ph-books']];
  return <aside style={{display:'grid',gap:8,alignContent:'start',minWidth:160}}>
    {items.map(([id,label,icon])=>
      <button key={id} onClick={()=>setView(id)} style={{all:'unset',cursor:'pointer',display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:16,border:'2px solid',borderColor:view===id?'var(--clover-500)':'transparent',background:view===id?'var(--clover-100)':'transparent',font:'800 14px var(--font-body)',minHeight:44}}>
        <i className={`ph-fill ${icon}`} style={{color:view===id?'var(--clover-600)':'var(--text-faint)',fontSize:20}}></i>{label}
      </button>
    )}
    <Card padding={14} style={{marginTop:8,background:'linear-gradient(180deg,var(--sunny-100),var(--paper))'}}>
      <strong style={{font:'800 13px var(--font-display)'}}>Super</strong>
      <p style={{margin:'4px 0 10px',font:'600 12px var(--font-body)',color:'var(--text-muted)'}}>Unlimited hearts. No ads. That’s the paid unlock later.</p>
      <Button size="sm" fullWidth>Try Super</Button>
    </Card>
  </aside>;
}

function LearnPath({results,openLeaf}){
  const nodes=leafNodes();
  let lastSec='';
  return <div style={{position:'relative',padding:'8px 0 40px'}}>
    {nodes.map((n,i)=>{
      const st=leafState(n,results);
      const done=st==='done';
      const offset=(i%4===1||i%4===2)?72:i%4===3?0:0;
      const zigzag=[0,56,56,0][i%4];
      const banner=n.sec!==lastSec;
      lastSec=n.sec;
      return <React.Fragment key={n.leaf}>
        {banner && <div style={{margin:'28px auto 18px',maxWidth:420,background:'var(--clover-500)',color:'#fff',borderRadius:18,padding:'14px 18px',boxShadow:'0 4px 0 var(--clover-700)'}}>
          <div style={{font:'800 11px var(--font-body)',letterSpacing:'.08em',opacity:.85}}>SECTION {n.sec}</div>
          <div style={{font:'800 20px var(--font-display)'}}>{n.sectionTitle}</div>
        </div>}
        <div style={{display:'flex',justifyContent:'center',margin:'18px 0',transform:`translateX(${zigzag}px)`}}>
          <button onClick={()=>openLeaf(n)} title={n.title} style={{all:'unset',cursor:'pointer',width:70,height:70,borderRadius:'50%',display:'grid',placeItems:'center',background:done?'var(--clover-500)':st==='active'?'var(--sunny-500)':'var(--paper)',border:'4px solid',borderColor:done?'var(--clover-700)':st==='active'?'var(--sunny-700)':'var(--border-strong)',boxShadow:'0 5px 0 '+(done?'var(--clover-700)':st==='active'?'var(--sunny-700)':'var(--border-strong)'),color:done||st==='active'?'#fff':'var(--text-faint)'}}>
            <i className={`ph-fill ${done?'ph-check':st==='active'?'ph-star':'ph-lock-simple'}`} style={{fontSize:28}}></i>
          </button>
        </div>
      </React.Fragment>;
    })}
  </div>;
}

function LearnView({results,openLeaf}){
  return <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 200px',gap:20,alignItems:'start'}}>
    <LearnPath results={results} openLeaf={openLeaf}/>
    <div style={{position:'sticky',top:16}}><Mascot size={110} say="Tap a circle. Teach that leaf."/></div>
  </div>;
}

function QuestsView(){
  const quests=[['Teach 1 bite back','10 XP'],['Open the QBank','5 gems'],['Keep a 3-day streak','50 XP']];
  return <section style={{display:'grid',gap:12,maxWidth:480}}>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>Daily quests</h1>
    {quests.map(([q,r])=><Card key={q} padding={18} style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
      <span style={{font:'800 15px var(--font-body)'}}>{q}</span>
      <span style={{font:'800 13px var(--font-display)',color:'var(--tangerine-600)'}}>{r}</span>
    </Card>)}
  </section>;
}

function ShopView({buy}){
  return <section style={{display:'grid',gap:12,maxWidth:480}}>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>Shop</h1>
    <Card padding={18} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div><strong>Refill hearts</strong><p style={{margin:0,color:'var(--text-muted)'}}>Back to 5</p></div>
      <Button size="sm" onClick={()=>buy('hearts')}>80 gems</Button>
    </Card>
    <Card padding={18} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div><strong>Streak freeze</strong><p style={{margin:0,color:'var(--text-muted)'}}>Miss a day, keep the flame</p></div>
      <Button size="sm" onClick={()=>buy('freeze')}>200 gems</Button>
    </Card>
  </section>;
}

function LeaguesView(){
  const rows=[['you','You','42'],['Pip','Pip','38'],['Ada','Ada','21']];
  return <section style={{display:'grid',gap:12,maxWidth:480}}>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>Clover league</h1>
    {rows.map(([k,n,xp])=><Card key={k} padding={16} style={{display:'flex',justifyContent:'space-between'}}>
      <span style={{font:'800 15px var(--font-body)'}}>{n}</span>
      <span style={{font:'800 14px var(--font-display)',color:'var(--sunny-700)'}}>{xp} XP</span>
    </Card>)}
  </section>;
}

function ProfileView({user,xp,streak,logout}){
  return <section style={{display:'grid',gap:12,maxWidth:480}}>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>{user}</h1>
    <Card padding={18}><p style={{margin:0}}>XP {xp} · streak {streak} · course SIE</p></Card>
    <Button variant="ghost" onClick={logout}>Log out</Button>
  </section>;
}

function CoursesView(){
  return <section style={{display:'grid',gap:12,maxWidth:480}}>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>My courses</h1>
    <Card padding={18}><strong>SIE</strong><p style={{margin:'4px 0 0',color:'var(--text-muted)'}}>Active · 34 leaves</p></Card>
    <Card sunken padding={18}><p style={{margin:0,color:'var(--text-faint)'}}>Series 7 and others unlock later. One exam first.</p></Card>
  </section>;
}

function LeafPicker({node,results,openModule,back}){
  const byId=Object.fromEntries(window.TB_BITES.map(b=>[b.id,b]));
  return <section style={{display:'grid',gap:12,maxWidth:640}}>
    <button onClick={back} style={{all:'unset',cursor:'pointer',font:'800 13px var(--font-body)',color:'var(--clover-600)'}}>← Path</button>
    <h1 style={{margin:0,font:'var(--text-h2)',fontFamily:'var(--font-display)'}}>{node.leaf} {node.title}</h1>
    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
      {node.ids.map(id=>{
        const t=byId[id];
        const st=results[id]?results[id].state:'Unassessed';
        return <TopicChip key={id} id={id} title={t.title} state={st} selected={false} onClick={()=>openModule(id)}/>;
      })}
    </div>
  </section>;
}

function ModuleView({topic,state,goTeach,back}){
  return <section style={{display:'grid',gap:16,maxWidth:720}}>
    <button onClick={back} style={{all:'unset',cursor:'pointer',font:'800 13px var(--font-body)',color:'var(--clover-600)'}}>← Back</button>
    <div style={{display:'flex',gap:10,alignItems:'center'}}>
      <StateBadge state={state||'Unassessed'}/>
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
    <p style={{margin:0,color:'var(--text-muted)',maxWidth:520}}>Random practice. Does not write Gap / Rusty / Exam-ready / Mastered.</p>
    {items.map(t=><Card key={t.id} padding={20}>
      <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{t.id}</span>
      <h3 style={{margin:'6px 0',font:'700 20px var(--font-display)'}}>{t.title}</h3>
      <p style={{margin:'0 0 12px',color:'var(--text-muted)'}}>{t.prompt}</p>
      <Button size="sm" onClick={()=>openModule(t.id)}>Open the module</Button>
    </Card>)}
  </section>;
}

function BrushView({results,openModule}){
  const misses=[];
  for(const [id,r] of Object.entries(results)){
    const topic=window.TB_BITES.find(t=>t.id===id);
    (r.misses||[]).forEach(m=>misses.push({id,title:topic.title,miss:m,state:r.state}));
  }
  return <section style={{display:'grid',gap:16}}>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>Brush-up</h1>
    {misses.length===0
      ? <Card sunken padding={28}><p style={{margin:0,color:'var(--text-muted)'}}>No struggle data yet.</p></Card>
      : misses.map((m,i)=><Card key={i} padding={18} style={{cursor:'pointer'}} onClick={()=>openModule(m.id)}>
          <h3 style={{margin:'4px 0',font:'700 18px var(--font-display)'}}>{m.title}</h3>
          <p style={{margin:0,color:'var(--text-muted)'}}>Miss: {m.miss}</p>
        </Card>)}
  </section>;
}

function App(){
  const saved=React.useMemo(()=>{try{return JSON.parse(localStorage.getItem(STORE))||{}}catch{return{}}},[]);
  const firstDemo=window.TB_BITES.find(t=>t.demo)?.id || window.TB_BITES[0].id;
  const [user,setUser]=React.useState(saved.user||'');
  const [authMode,setAuthMode]=React.useState('login');
  const [topicId,setTopicId]=React.useState(saved.topicId||firstDemo);
  const [leaf,setLeaf]=React.useState(saved.leaf||null);
  const [answers,setAnswers]=React.useState(saved.answers||{});
  const [results,setResults]=React.useState(saved.results||{});
  const [xp,setXp]=React.useState(saved.xp||0);
  const [gems,setGems]=React.useState(saved.gems||120);
  const [hearts,setHearts]=React.useState(saved.hearts??5);
  const [view,setView]=React.useState(saved.view||'learn');
  const [err,setErr]=React.useState('');
  const topic=window.TB_BITES.find(t=>t.id===topicId);
  const answer=answers[topicId]||'';
  const result=results[topicId];
  const persist=(patch)=>{try{localStorage.setItem(STORE,JSON.stringify({user,topicId,leaf,answers,results,xp,gems,hearts,view,...patch}))}catch{}};
  const submit=()=>{
    if(answer.trim().length<20){setErr('Write at least a couple of sentences so the rubric has something to assess.');return;}
    setErr('');
    const r=grade(topic,answer);
    const nextResults={...results,[topicId]:r};
    const nextXp=xp+r.xp;
    const nextHearts=r.state==='Gap'?Math.max(0,hearts-1):hearts;
    setResults(nextResults);setXp(nextXp);setHearts(nextHearts);
    persist({results:nextResults,xp:nextXp,hearts:nextHearts});
  };
  const openLeaf=(n)=>{setLeaf(n);setView('leaf');persist({leaf:n,view:'leaf'});};
  const openModule=(id)=>{setTopicId(id);setView('module');setErr('');persist({topicId:id,view:'module'});};
  const goTeach=()=>{setView('teach');persist({view:'teach'});};
  const setAnswer=(v)=>{const na={...answers,[topicId]:v};setAnswers(na);persist({answers:na});};
  const changeView=(v)=>{setView(v);persist({view:v});};
  const enter=(name)=>{setUser(name);setView('learn');persist({user:name,view:'learn'});};

  if(!user) return <AuthScreen mode={authMode} setMode={setAuthMode} onEnter={enter}/>;

  const shell=['learn','leagues','quests','shop','profile','courses','qbank','brush'].includes(view);
  return <div style={{minHeight:'100vh',background:'var(--surface-page)'}}>
    <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,maxWidth:1100,margin:'auto',padding:'14px var(--page-pad)'}}>
      <span style={{font:'800 22px var(--font-display)'}}>teach<span style={{color:'var(--clover-500)'}}>back</span></span>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        <StatPill tone="streak" value={3}/>
        <StatPill tone="gem" value={gems}/>
        <StatPill tone="heart" value={hearts}/>
        <StatPill tone="xp" value={xp}/>
      </div>
    </header>
    <div style={{maxWidth:1100,margin:'auto',padding:'8px var(--page-pad) 60px',display:shell?'grid':'block',gridTemplateColumns:'180px minmax(0,1fr)',gap:24}}>
      {shell && <SideNav view={view} setView={changeView}/>}
      <main>
        {view==='learn' && <LearnView results={results} openLeaf={openLeaf}/>}
        {view==='leaf' && leaf && <LeafPicker node={leaf} results={results} openModule={openModule} back={()=>changeView('learn')}/>}
        {view==='module' && topic && <ModuleView topic={topic} state={result?result.state:'Unassessed'} goTeach={goTeach} back={()=>changeView('leaf')}/>}
        {view==='teach' && topic && <TeachView topic={topic} answer={answer} setAnswer={setAnswer} result={result} err={err} submit={submit} back={()=>changeView('module')}/>}
        {view==='qbank' && <QBankView openModule={openModule}/>}
        {view==='brush' && <BrushView results={results} openModule={openModule}/>}
        {view==='quests' && <QuestsView/>}
        {view==='shop' && <ShopView buy={item=>{if(item==='hearts'&&gems>=80){setHearts(5);setGems(gems-80);persist({hearts:5,gems:gems-80});}}}/>}
        {view==='leagues' && <LeaguesView/>}
        {view==='profile' && <ProfileView user={user} xp={xp} streak={3} logout={()=>{setUser('');persist({user:''});}}/>}
        {view==='courses' && <CoursesView/>}
      </main>
    </div>
  </div>;
}
window.TBWebApp=App;
