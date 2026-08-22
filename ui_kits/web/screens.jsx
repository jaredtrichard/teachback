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
    <div style={{width:size,height:size,borderRadius:'50%',border:'3px dashed var(--border-strong)',background:'var(--tint)',display:'grid',placeItems:'center',textAlign:'center',padding:10,font:'800 11px var(--font-body)',color:'var(--text-faint)'}}>Mascot incoming</div>
    {say && <div style={{background:'#fff',border:'2px solid var(--border)',borderRadius:16,padding:'8px 12px',font:'800 13px var(--font-body)',boxShadow:'0 3px 0 var(--border-strong)',maxWidth:180,textAlign:'center'}}>{say}</div>}
  </div>;
}
function GoogleMark(){
  return <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.97 10.71A5.41 5.41 0 0 1 3.69 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3.01-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg>;
}
function FacebookMark(){
  return <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path fill="#fff" d="M17 9.05C17 4.58 13.42 1 8.95 1S.9 4.58.9 9.05c0 4.02 2.94 7.35 6.79 7.95v-5.62H5.9V9.05h1.79V7.2c0-1.77 1.05-2.75 2.67-2.75.77 0 1.58.14 1.58.14v1.74h-.89c-.88 0-1.15.54-1.15 1.1v1.62h1.96l-.31 2.33H7.9v5.62C11.75 16.4 14.7 13.07 14.7 9.05H17z"/></svg>;
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
        <div style={{display:'grid',gap:10,marginTop:14}}>
          <button type="button" onClick={()=>onEnter('google')} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,height:48,borderRadius:16,border:'1px solid #dadce0',background:'#fff',color:'#3c4043',font:'600 15px var(--font-body)',cursor:'pointer'}}><GoogleMark/> Continue with Google</button>
          <button type="button" onClick={()=>onEnter('facebook')} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,height:48,borderRadius:16,border:'none',background:'#1877F2',color:'#fff',font:'600 15px var(--font-body)',cursor:'pointer'}}><FacebookMark/> Continue with Facebook</button>
        </div>
        <p style={{margin:'12px 0 0',font:'500 11px var(--font-mono)',color:'var(--text-faint)'}}>Frontend stub · no account is created</p>
      </Card>
    </div>
  </div>;
}
const fieldStyle={padding:'12px 14px',border:'2px solid var(--border-strong)',borderRadius:14,font:'600 15px var(--font-body)'};

function SideNav({view,setView}){
  const items=[['learn','Learn','ph-path'],['qbank','QBank','ph-cards'],['brush','Brush-up','ph-broom'],['quests','Quests','ph-target'],['leagues','Leagues','ph-trophy']];
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

const SEC_COLOR={
  '1':{fill:'var(--clover-500)',edge:'var(--clover-700)',soft:'var(--clover-100)'},
  '2':{fill:'var(--tangerine-500)',edge:'var(--tangerine-700)',soft:'var(--tangerine-100)'},
  '3':{fill:'var(--splash-500)',edge:'var(--splash-700)',soft:'var(--splash-100)'},
  '4':{fill:'var(--grape-500)',edge:'var(--grape-700)',soft:'var(--grape-100)'},
};
function pathChunks(){
  const chunks=[];
  Object.entries(window.TB_TREE).forEach(([sec,s])=>{
    const ids=Object.values(s.leaves).flatMap(l=>l.ids);
    for(let i=0;i<ids.length;i+=10){
      chunks.push({sec,sectionTitle:s.title,part:Math.floor(i/10)+1,parts:Math.ceil(ids.length/10),ids:ids.slice(i,i+10)});
    }
  });
  return chunks;
}
function CutePlay({color}){
  return <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="18" fill="#fff" opacity=".35"/>
    <path d="M16 11c0-1.1 1.2-1.75 2.1-1.15l13 8.15c.85.53.85 1.77 0 2.3l-13 8.15c-.9.56-2.1-.05-2.1-1.15V11z" fill={color}/>
    <circle cx="15" cy="15" r="2.6" fill="#fff" opacity=".7"/>
  </svg>;
}
function Pad({kind,color,children}){
  if(kind==='lily') return <div style={{position:'relative',width:108,height:92,display:'grid',placeItems:'center'}}>
    <svg width="108" height="92" viewBox="0 0 108 92" style={{position:'absolute',inset:0}}><ellipse cx="54" cy="50" rx="48" ry="28" fill={color} opacity=".35"/><ellipse cx="54" cy="46" rx="40" ry="22" fill={color} opacity=".55"/><path d="M54 24v22" stroke={color} strokeWidth="4"/></svg>
    {children}
  </div>;
  if(kind==='stone') return <div style={{position:'relative',width:96,height:84,display:'grid',placeItems:'center'}}>
    <svg width="96" height="84" viewBox="0 0 96 84" style={{position:'absolute'}}><ellipse cx="48" cy="50" rx="40" ry="18" fill={color} opacity=".25"/><ellipse cx="48" cy="40" rx="36" ry="26" fill={color} opacity=".4"/></svg>
    {children}
  </div>;
  if(kind==='star') return <div style={{position:'relative',width:100,height:100,display:'grid',placeItems:'center'}}>
    <svg width="100" height="100" viewBox="0 0 100 100" style={{position:'absolute'}}><path d="M50 8 60 38h32L66 56l10 32-26-18-26 18 10-32L8 38h32z" fill={color} opacity=".28"/></svg>
    {children}
  </div>;
  return <div style={{width:88,height:88,display:'grid',placeItems:'center'}}>{children}</div>;
}
function LearnPath({results,openModule}){
  const [bubble,setBubble]=React.useState(null);
  const chunks=pathChunks();
  const kinds={1:'path',2:'lily',3:'stone',4:'star'};
  let global=0;
  return <div style={{padding:'8px 0 40px'}}>
    <style>{`.tb-node{appearance:none;display:grid;place-items:center;transition:transform .14s ease,box-shadow .14s ease;transform:translateY(-5px) rotate(var(--tb-tilt));box-shadow:0 10px 0 var(--tb-edge)}
.tb-node:hover{transform:translateY(-1px) rotate(var(--tb-tilt));box-shadow:0 6px 0 var(--tb-edge)}
.tb-node:active{transform:translateY(6px) rotate(var(--tb-tilt));box-shadow:0 0 0 var(--tb-edge)}`}</style>
    {chunks.map((ch,ci)=>{
      const c=SEC_COLOR[ch.sec];
      return <div key={ch.sec+'-'+ch.part} style={{marginBottom:28}}>
        <div style={{margin:'20px auto 14px',maxWidth:440,background:c.fill,color:'#fff',borderRadius:18,padding:'14px 18px',boxShadow:`0 4px 0 ${c.edge}`}}>
          <div style={{font:'800 11px var(--font-body)',letterSpacing:'.08em',opacity:.85}}>SECTION {ch.sec}{ch.parts>1?` · PATH ${ch.part}/${ch.parts}`:''}</div>
          <div style={{font:'800 20px var(--font-display)'}}>{ch.sectionTitle}</div>
        </div>
        {ch.ids.map((id,i)=>{
          const idx=global++;
          const topic=window.TB_BITES.find(t=>t.id===id);
          const scored=!!results[id];
          const done=scored && ['Exam-Ready','Mastered'].includes(results[id].state);
          const open=idx===0 || scored || (idx>0 && !!results[ch.ids[i-1]]);
          const firstOpen=idx===0 && !scored;
          const zigzag=[0,64,64,0, -20][i%5];
          const ready=open||firstOpen;
          const tilt=[-8,6,-4,9,-6][i%5];
          return <div key={id} style={{display:'grid',justifyItems:'center',margin:'10px 0',transform:`translateX(${zigzag}px)`,position:'relative'}}>
            <Pad kind={kinds[ch.sec]} color={c.fill}>
              <button className="tb-node" onClick={()=>ready && setBubble(bubble===id?null:id)} title={topic.title} style={{cursor:ready?'pointer':'default',width:76,height:76,borderRadius:'50%',background:done?c.fill:ready?c.soft:'var(--paper)',border:'4px solid',borderColor:done||ready?c.edge:'var(--border-strong)',color:done?'#fff':c.edge,'--tb-edge':done||ready?c.edge:'var(--border-strong)','--tb-tilt':tilt+'deg',padding:0}}>
                {done?<i className="ph-fill ph-check" style={{fontSize:30}}></i>:ready?<CutePlay color={c.edge}/>:<i className="ph-fill ph-lock-simple" style={{fontSize:26,color:'var(--text-faint)'}}></i>}
              </button>
            </Pad>
            {bubble===id && <div style={{position:'relative',marginTop:14,background:'#fff',border:'2px solid var(--border)',borderRadius:18,boxShadow:'0 4px 0 var(--border-strong)',padding:12,width:228,zIndex:3}}>
              <div style={{position:'absolute',top:-10,left:'50%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'10px solid transparent',borderRight:'10px solid transparent',borderBottom:'10px solid #fff',filter:'drop-shadow(0 -2px 0 var(--border))'}}></div>
              <div style={{font:'800 12px var(--font-body)',marginBottom:8,color:'var(--text-muted)'}}>{topic.title}</div>
              <button type="button" onClick={()=>openModule(id,'practice')} style={{width:'100%',marginBottom:8,padding:'10px 12px',borderRadius:14,border:'2px solid var(--clover-600)',background:'var(--clover-100)',color:'var(--clover-700)',font:'800 14px var(--font-display)',cursor:'pointer'}}>Practice · simpler</button>
              <button type="button" onClick={()=>openModule(id,'legendary')} style={{width:'100%',padding:'10px 12px',borderRadius:14,border:'2px solid #C99212',background:'linear-gradient(180deg,#FFE9A0 0%,#F5C542 48%,#D4A017 100%)',color:'#6B4A00',font:'800 14px var(--font-display)',cursor:'pointer',boxShadow:'inset 0 1px 0 rgba(255,255,255,.7), 0 3px 0 #A8740C'}}>Legendary · mastery</button>
            </div>}
          </div>;
        })}
      </div>;
    })}
  </div>;
}

function QuestCard({onOpen}){
  const quests=[
    ['ph-microphone-stage','var(--clover-100)','var(--clover-600)','Teach 1 bite','0/1','10 XP'],
    ['ph-flame','var(--tangerine-100)','var(--tangerine-600)','3-day streak','1/3','50 XP'],
    ['ph-target','var(--splash-100)','var(--splash-600)','One practice','0/1','5 gems'],
  ];
  return <div style={{background:'#fff',border:'3px solid var(--border)',borderRadius:24,boxShadow:'0 5px 0 var(--border-strong)',overflow:'hidden'}}>
    <div style={{background:'var(--sunny-100)',padding:'14px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <strong style={{font:'800 20px var(--font-display)'}}>Quests</strong>
      <button type="button" onClick={onOpen} style={{all:'unset',cursor:'pointer',font:'800 12px var(--font-body)',color:'var(--tangerine-700)'}}>See all</button>
    </div>
    <div style={{padding:12,display:'grid',gap:10}}>
      {quests.map(([icon,bg,fg,q,prog,r])=>(
        <div key={q} style={{display:'grid',gridTemplateColumns:'44px 1fr',gap:10,alignItems:'center',background:bg,borderRadius:16,padding:'10px 12px'}}>
          <div style={{width:44,height:44,borderRadius:14,background:'#fff',display:'grid',placeItems:'center',border:'2px solid '+fg}}><i className={'ph-fill '+icon} style={{fontSize:22,color:fg}}></i></div>
          <div>
            <div style={{font:'800 14px var(--font-body)'}}>{q}</div>
            <div style={{height:8,borderRadius:99,background:'#fff',margin:'6px 0',overflow:'hidden'}}><div style={{width:prog.startsWith('1')?'33%':'8%',height:'100%',background:fg}}></div></div>
            <div style={{font:'800 12px var(--font-display)',color:fg}}>{r} · {prog}</div>
          </div>
        </div>
      ))}
    </div>
  </div>;
}
function LearnView({results,openModule,openQuests}){
  return <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 300px',gap:16,alignItems:'start'}}>
    <LearnPath results={results} openModule={openModule}/>
    <div style={{position:'sticky',top:16,display:'grid',justifyItems:'center',gap:16,width:'100%'}}>
      <div style={{transform:'translateX(18px)'}}><Mascot size={108} say="First pad is open. Hop on."/></div>
      <div style={{width:'100%'}}><QuestCard onOpen={openQuests}/></div>
    </div>
  </div>;
}

function QuestsView(){
  return <section style={{display:'grid',gap:16,maxWidth:520}}>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>Daily quests</h1>
    <div style={{maxWidth:560}}><QuestCard onOpen={()=>{}}/></div>
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
    <p style={{margin:0,color:'var(--text-muted)',maxWidth:560}}>Authored multiple-choice, written like the real exam. Not AI. Does not write Gap / Rusty / Exam-ready / Mastered. Bank is a stub until those items are written.</p>
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
  const [courseOpen,setCourseOpen]=React.useState(false);
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
  const openModule=(id,mode)=>{setTopicId(id);setView(mode==='practice'?'teach':'module');setErr('');persist({topicId:id,view:mode==='practice'?'teach':'module',mode:mode||'legendary'});};
  const goTeach=()=>{setView('teach');persist({view:'teach'});};
  const setAnswer=(v)=>{const na={...answers,[topicId]:v};setAnswers(na);persist({answers:na});};
  const changeView=(v)=>{setView(v);persist({view:v});};
  const enter=(name)=>{setUser(name);setView('learn');persist({user:name,view:'learn'});};

  if(!user) return <AuthScreen mode={authMode} setMode={setAuthMode} onEnter={enter}/>;

  const shell=['learn','leagues','profile','quests','qbank','brush'].includes(view);
  return <div style={{minHeight:'100vh',background:'var(--surface-page)'}}>
    <style>{`.tb-3d{transition:transform .14s ease,box-shadow .14s ease;transform:translateY(-2px);box-shadow:0 5px 0 var(--tb-edge)}
.tb-3d:hover{transform:translateY(1px);box-shadow:0 2px 0 var(--tb-edge)}
.tb-3d:active{transform:translateY(5px);box-shadow:0 0 0 var(--tb-edge)}`}</style>
    <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,maxWidth:1100,margin:'auto',padding:'14px var(--page-pad)'}}>
      <span style={{font:'800 22px var(--font-display)'}}>teach<span style={{color:'var(--clover-500)'}}>back</span></span>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
        <div style={{position:'relative'}}>
          <button type="button" className="tb-3d" onClick={()=>setCourseOpen(!courseOpen)} style={{padding:'10px 18px',borderRadius:16,border:'2px solid var(--tangerine-700)',background:'var(--tangerine-500)',color:'#fff',font:'800 16px var(--font-display)',cursor:'pointer','--tb-edge':'var(--tangerine-700)'}}>Courses</button>
          {courseOpen && <div style={{position:'absolute',top:'calc(100% + 12px)',right:0,background:'#fff',border:'2px solid var(--border)',borderRadius:18,boxShadow:'0 4px 0 var(--border-strong)',padding:12,minWidth:220,zIndex:5}}>
            <div style={{position:'absolute',top:-10,right:28,width:0,height:0,borderLeft:'10px solid transparent',borderRight:'10px solid transparent',borderBottom:'10px solid #fff',filter:'drop-shadow(0 -2px 0 var(--border))'}}></div>
            <button type="button" onClick={()=>setCourseOpen(false)} style={{width:'100%',textAlign:'left',padding:'10px 12px',border:'none',background:'var(--clover-100)',borderRadius:12,font:'800 14px var(--font-body)',cursor:'pointer'}}>SIE · active</button>
            <div style={{padding:'10px 12px',color:'var(--text-faint)',font:'700 13px var(--font-body)'}}>Series 7 · later</div>
          </div>}
        </div>
        <StatPill tone="streak" value={3}/>
        <StatPill tone="gem" value={gems}/>
        <StatPill tone="heart" value={hearts}/>
        <StatPill tone="xp" value={xp}/>
        <button type="button" aria-label="Profile" onClick={()=>changeView('profile')} style={{width:44,height:44,borderRadius:'50%',border:'3px solid var(--border-strong)',background:'var(--clover-100)',cursor:'pointer',display:'grid',placeItems:'center'}}><i className="ph-fill ph-user" style={{fontSize:20,color:'var(--clover-700)'}}></i></button>
      </div>
    </header>
    <div style={{maxWidth:1100,margin:'auto',padding:'8px var(--page-pad) 60px',display:shell?'grid':'block',gridTemplateColumns:'180px minmax(0,1fr)',gap:24}}>
      {shell && <SideNav view={view} setView={changeView}/>}
      <main>
        {view==='learn' && <LearnView results={results} openModule={openModule} openQuests={()=>changeView('quests')}/>}
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
