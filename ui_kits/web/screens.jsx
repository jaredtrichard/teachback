const {Button,IconButton,Card,StateBadge,ProgressBar,StreakBadge,TeachBackBox,TopicChip,CriterionRow,ResultBanner}=window.TeachbackDesignSystem_417209;
const STORE='tb-frontend-review:v3';
const STORE_LEGACY='tb-frontend-review:v2';
const READY=new Set(['Exam-Ready','Mastered']);
const STRUGGLE=new Set(['Gap','Rusty','Misconception']);
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const WEEKDAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const COURSES=[{id:'SIE',label:'SIE',detail:'Securities Industry Essentials',enabled:true},{id:'S7',label:'Series 7',detail:'Coming later',enabled:false}];

function stateKey(s){return String(s||'Unassessed').toLowerCase().replace('-','');}
function biteOf(id){return window.TB_BITES.find(t=>t.id===id);}
function biteState(results,id){return (results[id]&&results[id].state)||'Unassessed';}
function isReady(state){return READY.has(state);}
function isStub(topic){return !topic.demo;}
function firstAuthoredBite(bites,predicate=()=>true){return bites.find(b=>!isStub(b)&&predicate(b));}
function qbankStatus(log,id){const value=log[id];return typeof value==='string'?{latest:value,everIncorrect:value==='wrong'}:value||{latest:null,everIncorrect:false};}
function ymd(d){const y=d.getFullYear();const m=String(d.getMonth()+1).padStart(2,'0');const day=String(d.getDate()).padStart(2,'0');return y+'-'+m+'-'+day;}
function parseYmd(s){const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d);}
function startOfDay(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate());}
function addDays(d,n){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate()+n);return x;}
function daysBetween(a,b){return Math.round((startOfDay(b)-startOfDay(a))/86400000);}
function fmtLong(s){if(!s)return '';const d=parseYmd(s);return WEEKDAYS[d.getDay()].slice(0,3)+' '+MONTHS[d.getMonth()].slice(0,3)+' '+d.getDate()+', '+d.getFullYear();}
function shuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function loadStore(){
  try{
    const raw=JSON.parse(localStorage.getItem(STORE)||localStorage.getItem(STORE_LEGACY)||'{}')||{};
    if(raw.view==='teach'||raw.view==='module') raw.view='work';
    if(raw.view==='login') raw.view='home';
    delete raw.xp;
    return raw;
  }catch{return {};}
}

function grade(topic,answer){
  const a=answer.toLowerCase();
  const crits=topic.criteria.map(c=>{
    const hits=c.keys.filter(k=>k.split('|').some(alt=>alt && a.includes(alt))).length;
    const outcome=hits===c.keys.length?'hit':hits>0?'partial':'missing';
    return {...c,outcome,feedback:outcome==='hit'?c.fb.hit:c.fb.miss};
  });
  const n=crits.filter(c=>c.outcome==='hit').length;
  const state=n===crits.length?'Exam-Ready':n>=Math.ceil(crits.length/2)?'Rusty':'Gap';
  return {crits,state,misses:crits.filter(c=>c.outcome!=='hit').map(c=>c.label)};
}

function sectionStats(results){
  return Object.entries(window.TB_TREE).map(([sec,s])=>{
    const ids=Object.values(s.leaves).flatMap(l=>l.ids);
    const assessed=ids.filter(id=>results[id]).length;
    const ready=ids.filter(id=>isReady(biteState(results,id))).length;
    return {sec,title:s.title,assessed,ready,total:ids.length,ids};
  });
}

function readinessCounts(results){
  const counts=Object.fromEntries(window.TB_STATES.map(s=>[s,0]));
  const assessedStates=new Set(window.TB_STATES.filter(s=>s!=='Unassessed'));
  Object.entries(results).forEach(([id,result])=>{
    if(biteOf(id)&&result&&assessedStates.has(result.state)) counts[result.state]++;
  });
  return counts;
}

function buildPlan(examDate,planStart){
  if(!examDate) return {byDay:{},days:0};
  const start=startOfDay(parseYmd(planStart||ymd(new Date())));
  const exam=startOfDay(parseYmd(examDate));
  if(exam<start) return {byDay:{},days:0};
  const span=Math.max(1,daysBetween(start,exam)+1);
  const byDay={};
  window.TB_BITES.forEach((b,i)=>{
    const idx=Math.min(span-1,Math.floor(i*span/window.TB_BITES.length));
    const day=ymd(addDays(start,idx));
    (byDay[day]||(byDay[day]=[])).push(b.id);
  });
  return {byDay,days:span};
}

function monthCells(year,month){
  const first=new Date(year,month,1);
  const lead=first.getDay();
  const daysIn=new Date(year,month+1,0).getDate();
  const prevIn=new Date(year,month,0).getDate();
  const cells=[];
  for(let i=0;i<lead;i++) cells.push({date:new Date(year,month-1,prevIn-lead+1+i),outside:true});
  for(let d=1;d<=daysIn;d++) cells.push({date:new Date(year,month,d),outside:false});
  while(cells.length%7) cells.push({date:new Date(year,month+1,cells.length-(lead+daysIn)+1),outside:true});
  return cells;
}

function GoogleMark(){
  return <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
  </svg>;
}
function FacebookMark(){
  return <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>;
}
function AppleMark(){
  return <svg width="16" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M16.365 1.43c0 1.14-.437 2.2-1.207 3.01-.8.84-2.13 1.49-3.27 1.4-.13-1.1.4-2.26 1.16-3.04.82-.85 2.23-1.46 3.32-1.37zM20.76 17.37c-.58 1.33-.85 1.92-1.59 3.1-1.03 1.63-2.48 3.66-4.28 3.68-1.6.02-2.02-1.04-4.2-1.03-2.19.01-2.64 1.05-4.24 1.03-1.8-.02-3.18-1.85-4.21-3.48-2.88-4.57-3.18-9.93-1.4-12.77 1.26-2.01 3.26-3.19 5.14-3.19 1.91 0 3.11 1.05 4.69 1.05 1.54 0 2.48-1.06 4.69-1.06 1.67 0 3.44.91 4.7 2.48-4.13 2.26-3.46 8.15.7 9.19z"/></svg>;
}

function BrandButton({kind,label,onClick}){
  const styles={
    google:{background:'#fff',color:'#1f1f1f',border:'1px solid #747775'},
    facebook:{background:'#1877F2',color:'#fff',border:'1px solid #1877F2'},
    apple:{background:'#000',color:'#fff',border:'1px solid #000'}
  };
  const mark=kind==='google'?<GoogleMark/>:kind==='facebook'?<FacebookMark/>:<AppleMark/>;
  return <button type="button" onClick={onClick} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,width:'100%',minHeight:44,padding:'10px 14px',borderRadius:varRadius(),font:'600 14px var(--font-display)',cursor:'pointer',...styles[kind]}}>
    {mark}{label}
  </button>;
}
function varRadius(){return 'var(--radius-md)';}

function TopBar({streak,user,setView,course,setCourse,onLogout}){
  const [courseOpen,setCourseOpen]=React.useState(false);
  const [profOpen,setProfOpen]=React.useState(false);
  const current=COURSES.find(c=>c.id===course)||COURSES[0];
  const initial=(user||'?').trim().charAt(0).toUpperCase();
  return <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,maxWidth:1280,margin:'auto',padding:'16px var(--page-pad)',borderBottom:'1px solid var(--border)'}}>
    <div style={{display:'flex',alignItems:'center',gap:12,minWidth:0}}>
      <a href="#" onClick={e=>{e.preventDefault();setView('home');}} style={{font:'700 24px var(--font-display)',color:'var(--text-body)',textDecoration:'none',letterSpacing:'-.02em'}}>teach<span style={{color:'var(--clover-500)'}}>back</span></a>
      <div style={{position:'relative'}}>
        <Button size="sm" variant="ghost" onClick={()=>setCourseOpen(o=>!o)}>Course · {current.label} <i className="ph-bold ph-caret-down"></i></Button>
        {courseOpen && <div style={{position:'absolute',top:'110%',left:0,zIndex:30,minWidth:280,background:'var(--paper)',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',boxShadow:'var(--edge-card)',padding:8}}>
          {COURSES.map(c=>(
            <button key={c.id} type="button" disabled={!c.enabled} onClick={()=>{if(c.enabled){setCourse(c.id);setCourseOpen(false);}}} style={{display:'grid',width:'100%',textAlign:'left',gap:2,padding:'10px 12px',minHeight:44,border:0,borderRadius:'var(--radius-md)',background:c.id===course?'var(--clover-100)':'transparent',color:c.enabled?'var(--text-body)':'var(--text-faint)',cursor:c.enabled?'pointer':'default',font:'500 13px var(--font-body)'}}>
              <strong style={{font:'600 14px var(--font-display)'}}>{c.label}</strong>
              <span>{c.detail}{c.enabled?'':' · future'}</span>
            </button>
          ))}
        </div>}
      </div>
    </div>
    <div style={{display:'flex',alignItems:'center',gap:12}}>
      <StreakBadge count={streak}/>
      {user
        ? <div style={{position:'relative'}}>
            <button type="button" aria-label={'Profile '+user} onClick={()=>setProfOpen(o=>!o)} style={{width:40,height:40,borderRadius:'50%',border:'1px solid var(--clover-700)',background:'var(--clover-500)',color:'#fff',font:'700 15px var(--font-display)',cursor:'pointer'}}>{initial}</button>
            {profOpen && <div style={{position:'absolute',top:'110%',right:0,zIndex:30,minWidth:220,background:'var(--paper)',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',boxShadow:'var(--edge-card)',padding:12,display:'grid',gap:10}}>
              <span style={{font:'500 12px var(--font-mono)',color:'var(--text-muted)',overflow:'hidden',textOverflow:'ellipsis'}}>{user}</span>
              <Button size="sm" variant="ghost" onClick={()=>{setProfOpen(false);onLogout();}}>Log out</Button>
            </div>}
          </div>
        : <Button size="sm" onClick={()=>setView('login')}>Log in</Button>}
    </div>
  </header>;
}

function LeftNav({view,setView}){
  const nav=[['home','Home','house'],['outline','Outline','tree-structure'],['qbank','QBank','exam'],['brush','Brush-up','broom']];
  return <nav className="tb-nav" aria-label="Primary">
    {nav.map(([id,label,icon])=>
      <Button key={id} size="sm" fullWidth variant={view===id?'primary':'ghost'} onClick={()=>setView(id)}>
        <i className={'ph-bold ph-'+icon}></i>{label}
      </Button>
    )}
  </nav>;
}

function OverallBar({results}){
  const rows=sectionStats(results);
  const ready=rows.reduce((a,r)=>a+r.ready,0);
  const assessed=rows.reduce((a,r)=>a+r.assessed,0);
  const total=rows.reduce((a,r)=>a+r.total,0);
  return <Card padding={18}>
    <div style={{display:'flex',justifyContent:'space-between',gap:12,marginBottom:10}}>
      <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Ready · Exam-Ready or Mastered</span>
      <span style={{font:'500 12px var(--font-mono)',color:'var(--text-faint)'}}>{ready} ready · {assessed} assessed · {total}</span>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:8}}>
      {rows.map(r=>(
        <div key={r.sec} style={{display:'grid',gap:6,minWidth:0}}>
          <ProgressBar value={r.ready} max={r.total}/>
          <span style={{font:'600 10px var(--font-body)',letterSpacing:'.06em',textTransform:'uppercase',color:'var(--text-faint)'}}>Sec {r.sec} · {r.ready}/{r.total}</span>
        </div>
      ))}
    </div>
  </Card>;
}

function StateKey(){
  return <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
    {window.TB_STATES.map(s=>(
      <span key={s} style={{display:'inline-flex',alignItems:'center',gap:6,padding:'4px 10px',borderRadius:'var(--radius-pill)',background:`var(--state-${stateKey(s)}-bg)`,color:`var(--state-${stateKey(s)})`,font:'600 11px var(--font-body)'}}>
        <span style={{width:8,height:8,borderRadius:'50%',background:`var(--state-${stateKey(s)})`}}></span>{s}
      </span>
    ))}
    <span style={{display:'inline-flex',alignItems:'center',gap:6,padding:'4px 10px',borderRadius:'var(--radius-pill)',background:'var(--state-unassessed-bg)',color:'var(--text-faint)',font:'600 11px var(--font-body)',border:'1px dashed var(--border-strong)'}}>Stub / outline only</span>
  </div>;
}

function PlanChart({ready,total,planStart,examDate,plan}){
  if(!examDate) return null;
  const today=startOfDay(new Date());
  const start=startOfDay(parseYmd(planStart||ymd(today)));
  const exam=startOfDay(parseYmd(examDate));
  if(exam<start) return null;
  const duration=Math.max(0,daysBetween(start,exam));
  const domain=Math.max(1,duration);
  const elapsed=duration===0?domain:Math.max(0,Math.min(duration,daysBetween(start,today)));
  const w=280,h=110,pad=22;
  const x=t=>pad+(t/domain)*(w-2*pad);
  const y=v=>h-pad-(v/Math.max(1,total))*(h-2*pad);
  let planned=0;
  const planPoints=[{t:0,v:0}];
  Object.entries(plan.byDay).sort((a,b)=>a[0].localeCompare(b[0])).forEach(([day,ids])=>{
    const scheduled=ids.filter(id=>!isStub(biteOf(id))).length;
    if(!scheduled) return;
    planned+=scheduled;
    const scheduledDay=duration===0?domain:Math.max(0,Math.min(domain,daysBetween(start,parseYmd(day))));
    planPoints.push({t:scheduledDay,v:planned});
  });
  return <svg viewBox={'0 0 '+w+' '+h} width="100%" height="110" role="img" aria-label="Progress versus plan">
    <rect x="0" y="0" width={w} height={h} fill="var(--cream)" rx="8"/>
    <polyline points={planPoints.map(p=>x(p.t)+','+y(p.v)).join(' ')} fill="none" stroke="var(--tangerine-500)" strokeDasharray="4 4" strokeWidth="1.5"/>
    <line x1={x(0)} y1={y(0)} x2={x(elapsed)} y2={y(ready)} stroke="var(--clover-500)" strokeWidth="2.2"/>
    <circle cx={x(elapsed)} cy={y(ready)} r="4" fill="var(--clover-500)"/>
  </svg>;
}

function DayList({ids,results,openModule,heading,empty}){
  if(!ids||ids.length===0) return <Card sunken padding={20}><p style={{margin:0,color:'var(--text-muted)'}}>{empty}</p></Card>;
  return <div style={{display:'grid',gap:8}}>
    <h3 style={{margin:0,font:'600 16px var(--font-display)',color:'var(--sunny-700)'}}>{heading}</h3>
    {ids.map(id=>{
      const t=biteOf(id);
      const st=biteState(results,id);
      return <Card key={id} padding={14} style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) auto',gap:10,alignItems:'center',background:heading==='Today'?'var(--sunny-100)':undefined}}>
        <div style={{minWidth:0}}>
          <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
            <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{t.id} · {t.leaf}</span>
            <StateBadge state={st} size="sm"/>
            {isStub(t)&&<span style={{font:'500 11px var(--font-body)',color:'var(--text-faint)'}}>stub</span>}
          </div>
          <strong style={{display:'block',marginTop:4,font:'600 15px var(--font-display)'}}>{t.title}</strong>
          <span style={{color:'var(--text-faint)',font:'500 12px var(--font-body)'}}>Teach-back · {t.read||'8 min'}</span>
        </div>
        <Button size="sm" onClick={()=>openModule(id,'home')}>Open</Button>
      </Card>;
    })}
  </div>;
}

function HomeView({results,examDate,setExamDate,planStart,setPlanStart,openModule}){
  const today=startOfDay(new Date());
  const todayStr=ymd(today);
  const [cursor,setCursor]=React.useState({y:today.getFullYear(),m:today.getMonth()});
  const [selected,setSelected]=React.useState(todayStr);
  const plan=buildPlan(examDate,planStart);
  const remaining=window.TB_BITES.filter(b=>!isReady(biteState(results,b.id))).length;
  const exam=examDate?startOfDay(parseYmd(examDate)):null;
  const countdown=exam?Math.max(0,daysBetween(today,exam)):null;
  const studyDaysLeft=exam?countdown+1:null;
  const past=exam&&daysBetween(today,exam)<0;
  const pace=(!exam||past||studyDaysLeft===0)?null:remaining/Math.max(1,studyDaysLeft);
  const counts=readinessCounts(results);
  const authored=window.TB_BITES.filter(b=>b.demo);
  const authoredReady=authored.filter(b=>isReady(biteState(results,b.id))).length;
  const authoredLine=authored.map(b=>biteState(results,b.id)).reduce((acc,st)=>{acc[st]=(acc[st]||0)+1;return acc;},{});
  const selectedIds=plan.byDay[selected]||[];
  const todayIds=plan.byDay[todayStr]||[];
  const nextEntry=Object.entries(plan.byDay).sort((a,b)=>a[0].localeCompare(b[0])).find(([day,ids])=>day>=todayStr&&firstAuthoredBite(ids.map(biteOf),b=>!isReady(biteState(results,b.id))));
  const nextBite=nextEntry&&firstAuthoredBite(nextEntry[1].map(biteOf),b=>!isReady(biteState(results,b.id)));
  const cells=monthCells(cursor.y,cursor.m);

  const onDate=e=>{
    const v=e.target.value;
    if(v&&v<todayStr) return;
    setExamDate(v);
    setPlanStart(v?todayStr:'');
    if(v) setSelected(todayStr);
  };

  return <section style={{display:'grid',gap:22}}>
    <div className="tb-home">
      <div style={{display:'grid',gap:16,minWidth:0}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
          <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>{MONTHS[cursor.m]} {cursor.y}</h1>
          <div style={{display:'flex',gap:8}}>
            <IconButton icon="caret-left" label="Previous month" onClick={()=>setCursor(c=>c.m===0?{y:c.y-1,m:11}:{y:c.y,m:c.m-1})}/>
            <IconButton icon="caret-right" label="Next month" onClick={()=>setCursor(c=>c.m===11?{y:c.y+1,m:0}:{y:c.y,m:c.m+1})}/>
          </div>
        </div>
        {!examDate && <Card sunken padding={20}><p style={{margin:0,color:'var(--text-muted)'}}>Set an exam date to spread the modules. Stubs stay on the calendar.</p></Card>}
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,minmax(0,1fr))',gap:6}}>
          {WEEKDAYS.map(d=><div key={d} style={{font:'600 11px var(--font-body)',color:'var(--text-faint)',textAlign:'center',padding:'4px 0'}}>{d}</div>)}
          {cells.map((cell,i)=>{
            const key=ymd(cell.date);
            const ids=plan.byDay[key]||[];
            const isToday=key===todayStr;
            const isSel=key===selected;
            const shown=ids.slice(0,3);
            const extra=ids.length-shown.length;
            const authoredIds=ids.filter(id=>!isStub(biteOf(id)));
            const allReady=authoredIds.length>0&&authoredIds.every(id=>isReady(biteState(results,id)));
            const behind=!cell.outside&&key<todayStr&&authoredIds.some(id=>!isReady(biteState(results,id)));
            return <button key={i} type="button" onClick={()=>setSelected(key)} style={{display:'grid',alignContent:'start',gap:4,minHeight:92,padding:6,textAlign:'left',border:isSel?'1px solid var(--clover-500)':'1px solid var(--border)',borderRadius:'var(--radius-sm)',background:isToday?'var(--sunny-100)':'var(--paper)',boxShadow:isToday?'inset 0 3px 0 var(--sunny-500)':'none',cursor:'pointer',opacity:cell.outside?.5:1}}>
              <span style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{font:'600 12px var(--font-display)',color:behind?'var(--coral-700)':isToday?'var(--sunny-700)':'var(--text-body)',background:behind?'var(--coral-100)':'transparent',borderRadius:6,padding:behind?'0 5px':0}}>{cell.date.getDate()}</span>
                {allReady&&<i className="ph-bold ph-check" style={{color:'var(--clover-600)',fontSize:12}}></i>}
              </span>
              {shown.map(id=>{
                const t=biteOf(id);
                const st=biteState(results,id);
                const done=isReady(st);
                const overdueAuthored=!cell.outside&&key<todayStr&&!isStub(t)&&!done;
                return <span key={id} style={{display:'block',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',font:'500 10px var(--font-body)',padding:'2px 4px',borderRadius:4,background:isToday?'var(--sunny-500)':overdueAuthored?'var(--coral-100)':done?'var(--clover-100)':'var(--cream)',color:overdueAuthored?'var(--coral-700)':done?'var(--clover-700)':'var(--text-muted)',border:'1px solid var(--border)'}}>{t.title}</span>;
              })}
              {extra>0&&<span style={{font:'600 10px var(--font-body)',color:'var(--text-faint)'}}>+{extra}</span>}
            </button>;
          })}
        </div>
        {examDate
          ? <DayList ids={selectedIds} results={results} openModule={openModule} heading={selected===todayStr?'Today':fmtLong(selected)} empty={selected===todayStr&&todayIds.length===0?(nextEntry?`Nothing scheduled. The next authored bite is ${nextBite.title} on ${fmtLong(nextEntry[0])}.`:'Nothing scheduled.'):'No modules on this day.'}/>
          : <DayList ids={[]} results={results} openModule={openModule} heading="Today" empty="Set an exam date to spread the modules."/>}
      </div>
      <aside style={{display:'grid',gap:14,alignContent:'start'}}>
        <Card padding={18}>
          <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Exam</span>
          <h2 style={{margin:'6px 0 10px',font:'600 20px var(--font-display)'}}>{examDate?('SIE · '+fmtLong(examDate)):'Set your exam date.'}</h2>
          <input className="tb-field" type="date" name="exam-date" min={todayStr} value={examDate} onChange={onDate} aria-label="Exam date"/>
        </Card>
        <Card padding={18}>
          <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--text-faint)'}}>Days until exam</span>
          <div style={{font:'700 32px var(--font-display)'}}>{examDate&&!past?countdown:'—'}</div>
        </Card>
        <Card padding={18}>
          <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--text-faint)'}}>Pace</span>
          <div style={{font:'700 28px var(--font-display)'}}>{pace==null?'—':(pace.toFixed(1)+' / day')}</div>
          <p style={{margin:'6px 0 0',color:'var(--text-muted)',font:'500 12px var(--font-body)'}}>{pace==null?'Remaining modules ÷ remaining days.':'Remaining '+remaining+' modules ÷ '+studyDaysLeft+' study days'+(pace>=7?(' · '+(pace*7).toFixed(1)+' / week'):'')+'.'}</p>
        </Card>
        <Card padding={18}>
          <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--text-faint)'}}>Progress vs plan</span>
          {examDate
            ? <>
                <PlanChart ready={authoredReady} total={authored.length} planStart={planStart} examDate={examDate} plan={plan}/>
                <p style={{margin:'8px 0 0',font:'500 12px var(--font-body)',color:'var(--text-muted)'}}><strong>{authored.length} authored notes</strong> — {Object.entries(authoredLine).map(([k,v])=>v+' '+k).join(', ')||'all Unassessed'}.</p>
                <p style={{margin:'4px 0 0',font:'500 12px var(--font-body)',color:'var(--text-faint)'}}>{window.TB_BITE_COUNT-authored.length} title stubs stay on the calendar.</p>
              </>
            : <p style={{margin:'8px 0 0',color:'var(--text-muted)'}}>No plan until a date is set.</p>}
        </Card>
        <Card padding={18}>
          <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--text-faint)'}}>Readiness</span>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:10}}>
            {window.TB_STATES.map(s=>(
              <span key={s} style={{padding:'4px 8px',borderRadius:'var(--radius-pill)',background:`var(--state-${stateKey(s)}-bg)`,color:`var(--state-${stateKey(s)})`,font:'600 11px var(--font-body)'}}>{s} {counts[s]}</span>
            ))}
          </div>
        </Card>
      </aside>
    </div>
    <div style={{display:'grid',gap:12}}>
      <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap',alignItems:'end'}}>
        <h2 style={{margin:0,font:'var(--text-h2)',fontFamily:'var(--font-display)'}}>181 bites</h2>
        <StateKey/>
      </div>
      {sectionStats(results).map(sec=>(
        <div key={sec.sec} style={{display:'grid',gap:8}}>
          <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
            <strong style={{font:'600 14px var(--font-display)'}}>Section {sec.sec} · {sec.title}</strong>
            <span style={{font:'500 12px var(--font-mono)',color:'var(--text-faint)'}}>{sec.ready} ready · {sec.assessed} assessed · {sec.total}</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(44px,1fr))',gap:6}}>
            {sec.ids.map(id=>{
              const t=biteOf(id);
              const st=biteState(results,id);
              const k=stateKey(st);
              const todayHit=(plan.byDay[todayStr]||[]).includes(id);
              return <button key={id} type="button" title={t.id+' '+t.title+' · '+st+(isStub(t)?' · stub':'')} onClick={()=>openModule(id,'home')} style={{minHeight:44,minWidth:44,padding:4,border:todayHit?'2px solid var(--sunny-500)':(isStub(t)?'1px dashed var(--border-strong)':'1px solid var(--state-'+k+')'),borderRadius:8,background:`var(--state-${k}-bg)`,color:`var(--state-${k})`,font:'500 10px var(--font-mono)',cursor:'pointer'}}>{t.id.replace('B','')}</button>;
            })}
          </div>
        </div>
      ))}
    </div>
  </section>;
}

function LoginView({setUser,setView}){
  const [mode,setMode]=React.useState('login');
  const [email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');
  const finish=u=>{setUser(u);setView('home');};
  const primary=()=>finish(email.trim()||'you@email.com');
  const social=kind=>finish(email.trim()||kind+'.user@example.com');
  return <Card padding={28} style={{maxWidth:420,margin:'12px auto',position:'relative'}}>
    <div style={{display:'flex',justifyContent:'flex-end'}}>
      <Button size="sm" variant="ghost" onClick={()=>setMode(mode==='login'?'signup':'login')}>{mode==='login'?'Sign up':'Log in'}</Button>
    </div>
    <a href="#" onClick={e=>e.preventDefault()} style={{font:'700 26px var(--font-display)',color:'var(--text-body)',textDecoration:'none',letterSpacing:'-.02em'}}>teach<span style={{color:'var(--clover-500)'}}>back</span></a>
    <p style={{margin:'8px 0 18px',font:'600 16px var(--font-display)',color:'var(--text-muted)'}}>Learn it. Teach it back.</p>
    <label style={{display:'grid',gap:6,marginBottom:12,font:'600 12px var(--font-body)',color:'var(--text-muted)'}}>Email
      <input className="tb-field" type="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" autoComplete="username"/>
    </label>
    <label style={{display:'grid',gap:6,marginBottom:16,font:'600 12px var(--font-body)',color:'var(--text-muted)'}}>Password
      <input className="tb-field" type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" autoComplete={mode==='login'?'current-password':'new-password'}/>
    </label>
    <Button fullWidth size="lg" onClick={primary}>{mode==='login'?'Log in':'Create account'}</Button>
    <div style={{display:'flex',alignItems:'center',gap:10,margin:'16px 0',color:'var(--text-faint)',font:'500 11px var(--font-body)'}}><span style={{flex:1,height:1,background:'var(--border)'}}></span>or<span style={{flex:1,height:1,background:'var(--border)'}}></span></div>
    <div style={{display:'grid',gap:8}}>
      <BrandButton kind="google" label={mode==='login'?'Continue with Google':'Sign up with Google'} onClick={()=>social('google')}/>
      <BrandButton kind="facebook" label={mode==='login'?'Continue with Facebook':'Sign up with Facebook'} onClick={()=>social('facebook')}/>
      <BrandButton kind="apple" label={mode==='login'?'Continue with Apple':'Sign up with Apple'} onClick={()=>social('apple')}/>
    </div>
    <p style={{margin:'14px 0 0',font:'500 11px var(--font-mono)',color:'var(--text-faint)'}}>Frontend stub · nothing is sent</p>
  </Card>;
}

function OutlineView({results,openModule,openSecs,setOpenSecs,openLeaves,setOpenLeaves}){
  const tree=window.TB_TREE;
  const toggleSec=sec=>setOpenSecs(openSecs.includes(sec)?openSecs.filter(s=>s!==sec):openSecs.concat(sec));
  const toggleLeaf=leaf=>setOpenLeaves(openLeaves.includes(leaf)?openLeaves.filter(s=>s!==leaf):openLeaves.concat(leaf));
  return <section style={{display:'grid',gap:16}}>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>SIE outline</h1>
    <StateKey/>
    <OverallBar results={results}/>
    {Object.entries(tree).map(([sec,s])=>{
      const ids=Object.values(s.leaves).flatMap(l=>l.ids);
      const assessed=ids.filter(id=>results[id]).length;
      const ready=ids.filter(id=>isReady(biteState(results,id))).length;
      return <Card key={sec} padding={18}>
        <button onClick={()=>toggleSec(sec)} style={{all:'unset',cursor:'pointer',display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',gap:12,minHeight:44}}>
          <div>
            <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Section {sec}</span>
            <h2 style={{margin:'4px 0 0',font:'600 22px var(--font-display)'}}>{s.title}</h2>
          </div>
          <span style={{font:'500 12px var(--font-mono)',color:'var(--text-faint)'}}>{ready} ready · {assessed} assessed · {ids.length}</span>
        </button>
        {openSecs.includes(sec) && <div style={{display:'grid',gap:14,marginTop:16}}>
          {Object.entries(s.leaves).map(([leaf,l])=>(
            <div key={leaf}>
              <button onClick={()=>toggleLeaf(leaf)} style={{all:'unset',cursor:'pointer',font:'600 13px var(--font-body)',color:'var(--text-body)',minHeight:44,display:'inline-flex',alignItems:'center'}}>{leaf} {l.title}</button>
              {openLeaves.includes(leaf) && <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:10}}>
                {l.ids.map(id=>{
                  const t=biteOf(id);
                  const st=biteState(results,id);
                  return <TopicChip key={id} id={id} title={t.title+(isStub(t)?' · stub':'')} state={st} selected={false} onClick={()=>openModule(id,'outline')}/>;
                })}
              </div>}
            </div>
          ))}
        </div>}
      </Card>;
    })}
  </section>;
}

function WorkView({topic,state,answer,setAnswer,result,err,submit,back,goHome,openModule,goBrush,results,examDate}){
  const [openSecs,setOpenSecs]=React.useState(()=>[topic.section]);
  const [openLeaves,setOpenLeaves]=React.useState(()=>[topic.leaf]);
  React.useEffect(()=>{
    setOpenSecs(s=>s.includes(topic.section)?s:s.concat(topic.section));
    setOpenLeaves(s=>s.includes(topic.leaf)?s:s.concat(topic.leaf));
  },[topic.id,topic.section,topic.leaf]);
  const next=firstAuthoredBite(window.TB_BITES.slice(window.TB_BITES.indexOf(topic)+1));
  const pop=result&&(result.state==='Exam-Ready'||result.state==='Mastered');
  return <section style={{display:'grid',gap:16}}>
    <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap',alignItems:'center'}}>
      <button onClick={back} style={{all:'unset',cursor:'pointer',font:'600 13px var(--font-body)',color:'var(--clover-600)'}}>← Back</button>
      <span style={{font:'500 12px var(--font-mono)',color:'var(--text-faint)'}}>SIE{examDate?' · '+fmtLong(examDate):''}</span>
    </div>
    <div className="tb-work">
      <Card padding={14} style={{maxHeight:'78vh',overflow:'auto'}}>
        {Object.entries(window.TB_TREE).map(([sec,s])=>{
          const ids=Object.values(s.leaves).flatMap(l=>l.ids);
          const authored=ids.filter(id=>biteOf(id).demo);
          const stubs=ids.length-authored.length;
          const assessed=authored.filter(id=>results[id]).length;
          return <div key={sec} style={{marginBottom:10}}>
            <button type="button" onClick={()=>setOpenSecs(o=>o.includes(sec)?o.filter(x=>x!==sec):o.concat(sec))} style={{all:'unset',cursor:'pointer',display:'block',width:'100%',padding:'8px 4px'}}>
              <strong style={{font:'600 13px var(--font-display)'}}>Sec {sec} · {s.title}</strong>
              <div style={{font:'500 11px var(--font-mono)',color:'var(--text-faint)'}}>{assessed}/{authored.length} authored · stubs {stubs}</div>
            </button>
            {openSecs.includes(sec)&&Object.entries(s.leaves).map(([leaf,l])=>(
              <div key={leaf} style={{marginLeft:6}}>
                <button type="button" onClick={()=>setOpenLeaves(o=>o.includes(leaf)?o.filter(x=>x!==leaf):o.concat(leaf))} style={{all:'unset',cursor:'pointer',font:'600 12px var(--font-body)',padding:'6px 4px',display:'block'}}>{leaf} {l.title}</button>
                {openLeaves.includes(leaf)&&l.ids.map(id=>{
                  const t=biteOf(id);
                  const on=id===topic.id;
                  return <button key={id} type="button" onClick={()=>openModule(id,'work')} style={{display:'block',width:'100%',textAlign:'left',padding:'8px 8px',minHeight:40,border:0,borderRadius:8,background:on?'var(--clover-100)':'transparent',color:on?'var(--clover-700)':'var(--text-muted)',font:'500 12px var(--font-body)',cursor:'pointer'}}>{t.id} {t.title}</button>;
                })}
              </div>
            ))}
          </div>;
        })}
      </Card>
      <div style={{display:'grid',gap:16,minWidth:0}}>
        <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
          <StateBadge state={state||'Unassessed'}/>
          <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{topic.id} · {topic.leaf}</span>
        </div>
        <Card padding={28}>
          <h1 style={{margin:'0 0 8px',font:'600 28px var(--font-display)'}}>{topic.title}</h1>
          <p style={{margin:'0 0 16px',color:'var(--text-muted)'}}>{topic.subtitle}</p>
          {isStub(topic)&&<Card sunken padding={14} style={{marginBottom:16}}><p style={{margin:0,color:'var(--text-muted)',font:'500 13px var(--font-body)'}}>Title stub — the official bullet is the note. Full prose ships in the content pass.</p></Card>}
          <Card sunken padding={16} style={{marginBottom:16}}>
            <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>In short</span>
            <div style={{display:'grid',gap:6,marginTop:8}}>
              {topic.inShort.map(p=><strong key={p} style={{font:'700 14px var(--font-body)'}}>{p}</strong>)}
            </div>
          </Card>
          <h3 style={{margin:'0 0 8px',font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--clover-600)'}}>Core</h3>
          {topic.core.map(p=><p key={p} style={{margin:'0 0 12px',color:'var(--text-muted)',font:'500 14px/1.7 var(--font-body)'}}>{p}</p>)}
          <h3 style={{margin:'16px 0 8px',font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--clover-600)'}}>Precision</h3>
          <ul style={{margin:0,padding:0,listStyle:'none',display:'grid',gap:8}}>
            {topic.precision.map(p=><li key={p} style={{paddingLeft:22,position:'relative',color:'var(--text-muted)',font:'500 13px/1.55 var(--font-body)'}}><i className="ph-bold ph-arrow-fat-right" style={{position:'absolute',left:0,top:2,color:'var(--tangerine-500)'}}></i>{p}</li>)}
          </ul>
        </Card>
        <Card padding={24}>
          <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Your turn</span>
          <h2 style={{margin:'6px 0 14px',font:'600 22px var(--font-display)'}}>Explain it to a colleague.</h2>
          <TeachBackBox value={answer} onChange={setAnswer} prompt={topic.prompt} placeholder={topic.placeholder} rows={8}/>
          <div style={{marginTop:14}}><Button fullWidth size="lg" onClick={submit}>Grade my teach-back</Button></div>
          {err&&<p role="alert" style={{margin:'10px 0 0',color:'var(--coral-700)',font:'600 12px var(--font-body)'}}>{err}</p>}
        </Card>
      </div>
      <div style={{display:'grid',gap:14,alignContent:'start'}}>
        {!result
          ? <Card sunken padding={26} style={{border:'1px dashed var(--border-strong)'}}>
              <i className="ph-bold ph-arrow-elbow-down-right" style={{fontSize:26,color:'var(--tangerine-500)'}}></i>
              <h3 style={{margin:'10px 0 6px',font:'600 20px var(--font-display)'}}>Your signal will appear here.</h3>
              <p style={{margin:0,color:'var(--text-muted)',font:'500 13px/1.6 var(--font-body)'}}>We’ll compare your explanation with the {topic.criteria.length} things an exam-ready answer needs.</p>
            </Card>
          : <>
              <div className={pop?'tb-pop':undefined}><ResultBanner state={result.state}/></div>
              <Card padding="4px 22px">
                {result.crits.map(c=><CriterionRow key={c.id} outcome={c.outcome} label={c.label} feedback={c.feedback}/>)}
              </Card>
              <p style={{margin:0,font:'500 12px var(--font-mono)',color:'var(--text-faint)'}}>{result.attempts||1} · Available</p>
              {STRUGGLE.has(result.state)
                ? <Button variant="ghost" onClick={goBrush}>Review this miss in Brush-up</Button>
                : pop && <div style={{display:'grid',gap:8}}>
                    {next&&<Button onClick={()=>openModule(next.id,'work')}>Open the next authored bite</Button>}
                    <Button variant="ghost" onClick={goHome}>Back to today</Button>
                  </div>}
            </>}
      </div>
    </div>
  </section>;
}

function makeQuizItems(bites,count,styles){
  const wantTF=styles.includes('tf');
  const wantMC=styles.includes('mc');
  const pool=shuffle(bites).slice(0,Math.max(1,count));
  return pool.map((b,i)=>{
    const useTF=wantTF&&(!wantMC||i%2===1);
    if(useTF){
      return {id:'Q'+(i+1),biteId:b.id,style:'tf',stub:true,stem:'Stub item · '+b.id+' '+b.title+'. No authored QBank item yet. Is this bite on the official SIE outline?',choices:['True','False'],correct:0};
    }
    const otherTitles=Array.from(new Set(window.TB_BITES.filter(x=>x.id!==b.id&&x.title!==b.title).map(x=>x.title)));
    const others=shuffle(otherTitles).slice(0,3);
    const choices=shuffle([b.title,...others]);
    return {id:'Q'+(i+1),biteId:b.id,style:'mc',stub:true,stem:'Stub item · '+b.id+'. No authored QBank item yet. Which outline bite is this?',choices,correct:choices.indexOf(b.title)};
  });
}

function QBankView({results,openModule,quizzes,setQuizzes,qbankLog,setQbankLog}){
  const [pane,setPane]=React.useState('list');
  const [run,setRun]=React.useState(null);
  const [now,setNow]=React.useState(Date.now());
  React.useEffect(()=>{if(!(run&&run.quiz&&run.quiz.prefs&&run.quiz.prefs.timer)) return; const t=setInterval(()=>setNow(Date.now()),1000);return ()=>clearInterval(t);},[run&&run.quiz&&run.quiz.prefs&&run.quiz.prefs.timer]);
  const items=window.TB_BITES.filter(t=>t.demo);
  const [name,setName]=React.useState('Custom quiz');
  const [count,setCount]=React.useState(10);
  const [styles,setStyles]=React.useState(['mc']);
  const [include,setInclude]=React.useState('all');
  const [pool,setPool]=React.useState('all');
  const [prefs,setPrefs]=React.useState({explain:true,scores:true,timer:false});
  const [picked,setPicked]=React.useState(()=>Object.values(window.TB_TREE).flatMap(s=>Object.keys(s.leaves)));

  const toggleStyle=id=>setStyles(s=>s.includes(id)?s.filter(x=>x!==id):s.concat(id));
  const toggleLeaf=id=>setPicked(p=>p.includes(id)?p.filter(x=>x!==id):p.concat(id));
  const selectAll=()=>setPicked(Object.values(window.TB_TREE).flatMap(s=>Object.keys(s.leaves)));
  const selectNone=()=>setPicked([]);
  const toggleSec=sec=>{
    const leaves=Object.keys(window.TB_TREE[sec].leaves);
    const allOn=leaves.every(l=>picked.includes(l));
    setPicked(allOn?picked.filter(l=>!leaves.includes(l)):Array.from(new Set(picked.concat(leaves))));
  };

  const selectedBites=window.TB_BITES.filter(b=>picked.includes(b.leaf));
  const struggleBites=selectedBites.filter(b=>STRUGGLE.has(biteState(results,b.id)));
  const sourceBites=pool==='struggle'?struggleBites:selectedBites;
  const availableBites=sourceBites.filter(b=>include==='unused'?!qbankLog[b.id]:include==='incorrect'?qbankStatus(qbankLog,b.id).everIncorrect:true);
  const requestedCount=Math.max(1,Number.parseInt(count,10)||1);
  const quizCount=Math.min(requestedCount,availableBites.length);

  const create=()=>{
    if(availableBites.length===0||styles.length===0){setRun({empty:true,reason:pool==='struggle'&&struggleBites.length===0?'No struggle topics yet (Gap / Rusty / Misconception).':styles.length===0?'Pick at least one question style.':'No questions in that pool. Authored QBank items land with the content pass.'});setPane('run');return;}
    const quiz={id:'quiz-'+Date.now(),name:name.trim()||'Custom quiz',count:quizCount,styles,include,pool,prefs:{...prefs},items:makeQuizItems(availableBites,quizCount,styles)};
    setQuizzes(quizzes.concat(quiz));
    setRun({quiz,index:0,picked:null,graded:null,answers:{},started:Date.now()});
    setPane('run');
  };

  if(pane==='create'){
    return <section style={{display:'grid',gap:16}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>Create quiz</h1>
        <Button variant="ghost" size="sm" onClick={()=>setPane('list')}>Cancel</Button>
      </div>
      <Card padding={22} style={{display:'grid',gap:20}}>
        <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 140px',gap:12}}>
          <label style={{display:'grid',gap:6,font:'600 12px var(--font-body)',color:'var(--text-muted)'}}>Name<input className="tb-field" value={name} onChange={e=>setName(e.target.value)}/></label>
          <label style={{display:'grid',gap:6,font:'600 12px var(--font-body)',color:'var(--text-muted)'}}>Questions<input className="tb-field" type="number" min="1" max={Math.max(1,availableBites.length)} value={count} onChange={e=>setCount(e.target.value)}/><span aria-live="polite" style={{font:'500 11px var(--font-body)',color:'var(--text-faint)'}}>{availableBites.length===0?'0 questions available for these settings.':requestedCount>availableBites.length?`Capped at ${quizCount} questions · ${availableBites.length} available.`:`${quizCount} questions will be created · ${availableBites.length} available.`}</span></label>
        </div>
        <div>
          <h3 style={{margin:'0 0 8px',font:'600 16px var(--font-display)'}}>Pool source</h3>
          <label style={{display:'flex',gap:8,alignItems:'center',minHeight:36}}><input type="radio" name="pool" checked={pool==='all'} onChange={()=>setPool('all')}/> All topics</label>
          <label style={{display:'flex',gap:8,alignItems:'center',minHeight:36}}><input type="radio" name="pool" checked={pool==='struggle'} onChange={()=>setPool('struggle')}/> Struggle topics (Gap / Rusty / Misconception)</label>
        </div>
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
            <h3 style={{margin:0,font:'600 16px var(--font-display)'}}>Topics</h3>
            <div style={{display:'flex',gap:8}}>
              <Button size="sm" variant="ghost" onClick={selectAll}>Select all</Button>
              <Button size="sm" variant="ghost" onClick={selectNone}>Clear</Button>
            </div>
          </div>
          {Object.entries(window.TB_TREE).map(([sec,s])=>{
            const leaves=Object.keys(s.leaves);
            const on=leaves.every(l=>picked.includes(l));
            return <div key={sec} style={{marginBottom:12}}>
              <label style={{display:'flex',gap:8,alignItems:'center',minHeight:36,font:'600 13px var(--font-body)'}}>
                <input type="checkbox" checked={on} onChange={()=>toggleSec(sec)}/> Section {sec} · {s.title}
              </label>
              <div style={{marginLeft:22,display:'grid',gap:4}}>
                {Object.entries(s.leaves).map(([leaf,l])=>(
                  <label key={leaf} style={{display:'flex',gap:8,alignItems:'center',minHeight:32,font:'500 13px var(--font-body)'}}>
                    <input type="checkbox" checked={picked.includes(leaf)} onChange={()=>toggleLeaf(leaf)}/> {leaf} {l.title}
                  </label>
                ))}
              </div>
            </div>;
          })}
        </div>
        <div>
          <h3 style={{margin:'0 0 8px',font:'600 16px var(--font-display)'}}>Question style</h3>
          <label style={{display:'flex',gap:8,alignItems:'center',minHeight:36}}><input type="checkbox" checked={styles.includes('mc')} onChange={()=>toggleStyle('mc')}/> Multiple choice</label>
          <label style={{display:'flex',gap:8,alignItems:'center',minHeight:36}}><input type="checkbox" checked={styles.includes('tf')} onChange={()=>toggleStyle('tf')}/> True / false</label>
          <p style={{margin:'6px 0 0',color:'var(--text-faint)',font:'500 12px var(--font-body)'}}>No applied or video questions.</p>
        </div>
        <div>
          <h3 style={{margin:'0 0 8px',font:'600 16px var(--font-display)'}}>Include</h3>
          {[['unused','Unused'],['incorrect','Previously incorrect'],['all','All']].map(([id,label])=>(
            <label key={id} style={{display:'flex',gap:8,alignItems:'center',minHeight:36}}><input type="radio" name="include" checked={include===id} onChange={()=>setInclude(id)}/> {label}</label>
          ))}
        </div>
        <div>
          <h3 style={{margin:'0 0 8px',font:'600 16px var(--font-display)'}}>Preferences</h3>
          <label style={{display:'flex',gap:8,alignItems:'center',minHeight:36}}><input type="checkbox" checked={prefs.explain} onChange={e=>setPrefs({...prefs,explain:e.target.checked})}/> Show explanation</label>
          <label style={{display:'flex',gap:8,alignItems:'center',minHeight:36}}><input type="checkbox" checked={prefs.scores} onChange={e=>setPrefs({...prefs,scores:e.target.checked})}/> Show scores as you go</label>
          <label style={{display:'flex',gap:8,alignItems:'center',minHeight:36}}><input type="checkbox" checked={prefs.timer} onChange={e=>setPrefs({...prefs,timer:e.target.checked})}/> Show timer</label>
        </div>
        <Button size="lg" onClick={create}>Create quiz</Button>
      </Card>
    </section>;
  }

  if(pane==='run'&&run){
    if(run.empty){
      return <section style={{display:'grid',gap:16}}>
        <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>QBank</h1>
        <Card sunken padding={24}><p style={{margin:0,color:'var(--text-muted)'}}>{run.reason}</p></Card>
        <Button variant="ghost" onClick={()=>setPane('create')}>Back to create</Button>
      </section>;
    }
    const quiz=run.quiz;
    const item=quiz.items[run.index];
    const done=run.index>=quiz.items.length;
    const rights=Object.values(run.answers).filter(a=>a.ok).length;
    const tick=quiz.prefs.timer?Math.max(0,Math.floor((now-(run.started||now))/1000)):null;
    if(done){
      return <section style={{display:'grid',gap:16}}>
        <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>{quiz.name}</h1>
        <Card padding={24}>
          <p style={{margin:0,font:'600 22px var(--font-display)'}}>{rights} / {quiz.items.length} right</p>
          <p style={{margin:'8px 0 0',color:'var(--text-muted)'}}>Right/wrong only — this does not write Gap / Rusty / Exam-Ready / Mastered.</p>
        </Card>
        <Button onClick={()=>{setRun(null);setPane('list');}}>Back to QBank</Button>
      </section>;
    }
    const gradeItem=()=>{
      if(run.picked==null) return;
      const ok=run.picked===item.correct;
      const answers={...run.answers,[item.id]:{pick:run.picked,ok}};
      const prior=qbankStatus(qbankLog,item.biteId);
      setQbankLog({...qbankLog,[item.biteId]:{latest:ok?'right':'wrong',everIncorrect:prior.everIncorrect||!ok}});
      setRun({...run,graded:{ok},answers});
    };
    const next=()=>setRun({...run,index:run.index+1,picked:null,graded:null});
    return <section style={{display:'grid',gap:16}}>
      <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
        <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>{quiz.name}</h1>
        <span style={{font:'500 12px var(--font-mono)',color:'var(--text-faint)'}}>{run.index+1} / {quiz.items.length}{quiz.prefs.scores?' · '+rights+' right':''}{tick!=null?' · '+tick+'s':''}</span>
      </div>
      <Card padding={22}>
        <p style={{margin:'0 0 6px',font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{item.biteId} · stub</p>
        <h2 style={{margin:'0 0 16px',font:'600 20px var(--font-display)'}}>{item.stem}</h2>
        <div style={{display:'grid',gap:8}}>
          {item.choices.map((c,i)=>{
            const show=run.graded;
            const good=i===item.correct;
            const mine=i===run.picked;
            const bg=show&&good?'var(--clover-100)':show&&mine&&!good?'var(--coral-100)':'var(--paper)';
            return <button key={i} type="button" onClick={()=>!run.graded&&setRun({...run,picked:i})} style={{textAlign:'left',padding:'12px 14px',minHeight:44,border:'1px solid '+(mine?'var(--clover-500)':'var(--border)'),borderRadius:'var(--radius-md)',background:bg,cursor:run.graded?'default':'pointer',font:'500 14px var(--font-body)'}}>{c}</button>;
          })}
        </div>
        {run.graded&&quiz.prefs.explain&&<p style={{margin:'14px 0 0',color:'var(--text-muted)'}}>{run.graded.ok?'Right.':'Wrong. '}This is a placeholder item. Authored questions land with the content pass.</p>}
        <div style={{marginTop:16}}>{run.graded?<Button onClick={next}>{run.index+1===quiz.items.length?'See score':'Next'}</Button>:<Button onClick={gradeItem} disabled={run.picked==null}>Check</Button>}</div>
      </Card>
      <p style={{margin:0,color:'var(--text-faint)',font:'500 12px var(--font-body)'}}>Right/wrong only — this does not write Gap / Rusty / Exam-Ready / Mastered.</p>
    </section>;
  }

  return <section style={{display:'grid',gap:16}}>
    <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap',alignItems:'center'}}>
      <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>QBank</h1>
      <Button onClick={()=>setPane('create')}>Create quiz</Button>
    </div>
    <p style={{margin:0,color:'var(--text-muted)',maxWidth:520}}>Random practice. Right/wrong only — this does not write Gap / Rusty / Exam-ready / Mastered.</p>
    {items.map(t=><Card key={t.id} padding={20}>
      <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{t.id}</span>
      <h3 style={{margin:'6px 0',font:'600 20px var(--font-display)'}}>{t.title}</h3>
      <p style={{margin:'0 0 12px',color:'var(--text-muted)'}}>{t.prompt}</p>
      <Button size="sm" onClick={()=>openModule(t.id,'qbank')}>Open the module</Button>
    </Card>)}
    {quizzes.length>0&&<div style={{display:'grid',gap:10}}>
      <h2 style={{margin:0,font:'600 18px var(--font-display)'}}>Your quizzes</h2>
      {quizzes.map(q=><Card key={q.id} padding={16} style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'center'}}>
        <div>
          <strong style={{font:'600 16px var(--font-display)'}}>{q.name}</strong>
          <p style={{margin:'4px 0 0',color:'var(--text-faint)',font:'500 12px var(--font-body)'}}>{q.items.length} stub items · right/wrong only</p>
        </div>
        <Button size="sm" onClick={()=>{setRun({quiz:q,index:0,picked:null,graded:null,answers:{},started:Date.now()});setPane('run');}}>Open</Button>
      </Card>)}
    </div>}
    <Card sunken padding={20}><p style={{margin:0,color:'var(--text-faint)'}}>Full authored bank lands with the content pass. These three are the demo pool.</p></Card>
  </section>;
}

function BrushView({results,openModule}){
  const byBite={};
  for(const [id,r] of Object.entries(results)){
    if(!STRUGGLE.has(r.state)) continue;
    const topic=biteOf(id);
    byBite[id]={id,title:topic.title,state:r.state,misses:r.misses||[]};
  }
  const cards=Object.values(byBite);
  const buckets=['Gap','Misconception','Rusty'];
  return <section style={{display:'grid',gap:16}}>
    <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>Brush-up</h1>
    <p style={{margin:0,color:'var(--text-muted)',maxWidth:540}}>Not the official outline. Grouped by how you missed. We’ll thicken this once the struggle bank has real traffic.</p>
    {cards.length===0
      ? <Card sunken padding={28}><p style={{margin:0,color:'var(--text-muted)'}}>No struggle data yet. Teach a bite back and misses land here.</p></Card>
      : buckets.map(bucket=>{
          const rows=cards.filter(c=>c.state===bucket);
          if(!rows.length) return null;
          return <div key={bucket} style={{display:'grid',gap:10}}>
            <h2 style={{margin:0,font:'600 18px var(--font-display)'}}>{bucket}</h2>
            {rows.map(m=><Card key={m.id} padding={18}>
              <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{m.id}</span>
              <h3 style={{margin:'4px 0',font:'600 18px var(--font-display)'}}>{m.title}</h3>
              <ul style={{margin:'0 0 12px',paddingLeft:18,color:'var(--text-muted)'}}>{(m.misses.length?m.misses:['Missed criteria not stored']).map(x=><li key={x}>{x}</li>)}</ul>
              <Button size="sm" onClick={()=>openModule(m.id,'brush')}>Open teach-back</Button>
            </Card>)}
          </div>;
        })}
  </section>;
}

function App(){
  const saved=React.useMemo(()=>loadStore(),[]);
  const todayStr=ymd(new Date());
  const savedExamDate=saved.examDate&&saved.examDate>=todayStr?saved.examDate:'';
  const savedPlanStart=savedExamDate&&saved.planStart&&saved.planStart<=savedExamDate?saved.planStart:'';
  const firstDemo=window.TB_BITES.find(t=>t.demo)?.id || window.TB_BITES[0].id;
  const [topicId,setTopicId]=React.useState(saved.topicId||firstDemo);
  const [answers,setAnswers]=React.useState(saved.answers||{});
  const [results,setResults]=React.useState(saved.results||{});
  const [view,setView]=React.useState(saved.view||'home');
  const [fromView,setFromView]=React.useState(saved.fromView||'home');
  const [user,setUser]=React.useState(saved.user||'');
  const [course,setCourse]=React.useState(saved.course||'SIE');
  const [examDate,setExamDate]=React.useState(savedExamDate);
  const [planStart,setPlanStart]=React.useState(savedPlanStart);
  const [openSecs,setOpenSecs]=React.useState(saved.openSecs||['1']);
  const [openLeaves,setOpenLeaves]=React.useState(saved.openLeaves||['1.1.1']);
  const [quizzes,setQuizzes]=React.useState(saved.quizzes||[]);
  const [qbankLog,setQbankLog]=React.useState(saved.qbankLog||{});
  const [err,setErr]=React.useState('');
  const topic=window.TB_BITES.find(t=>t.id===topicId);
  const answer=answers[topicId]||'';
  const result=results[topicId];

  React.useEffect(()=>{
    try{
      localStorage.setItem(STORE,JSON.stringify({topicId,answers,results,view,fromView,user,course,examDate,planStart,openSecs,openLeaves,quizzes,qbankLog}));
    }catch{}
  },[topicId,answers,results,view,fromView,user,course,examDate,planStart,openSecs,openLeaves,quizzes,qbankLog]);

  const submit=()=>{
    if(answer.trim().length<20){setErr('Write at least a couple of sentences so the rubric has something to assess.');return;}
    setErr('');
    const r=grade(topic,answer);
    const prev=results[topicId];
    const next={...r,attempts:(prev&&prev.attempts||0)+1};
    setResults({...results,[topicId]:next});
  };
  const openModule=(id,from)=>{
    setTopicId(id);
    setFromView(from||view);
    setView('work');
    setErr('');
  };
  const setAnswer=v=>setAnswers({...answers,[topicId]:v});
  const back=()=>setView(fromView==='work'?'home':fromView);
  const changeView=v=>{setView(v);if(v!=='work') setErr('');};

  return <div className="tb-shell">
    <TopBar streak={3} user={user} setView={changeView} course={course} setCourse={setCourse} onLogout={()=>setUser('')}/>
    {view==='login'
      ? <main className="tb-main" style={{maxWidth:1280,margin:'auto'}}>
          <LoginView setUser={setUser} setView={changeView}/>
        </main>
      : <div className="tb-body">
          <LeftNav view={view} setView={changeView}/>
          <main className="tb-main">
            {view==='home' && <HomeView results={results} examDate={examDate} setExamDate={setExamDate} planStart={planStart} setPlanStart={setPlanStart} openModule={openModule}/>}
            {view==='outline' && <OutlineView results={results} openModule={openModule} openSecs={openSecs} setOpenSecs={setOpenSecs} openLeaves={openLeaves} setOpenLeaves={setOpenLeaves}/>}
            {view==='work' && topic && <WorkView topic={topic} state={result?result.state:'Unassessed'} answer={answer} setAnswer={setAnswer} result={result} err={err} submit={submit} back={back} goHome={()=>changeView('home')} openModule={openModule} goBrush={()=>changeView('brush')} results={results} examDate={examDate}/>} 
            {view==='qbank' && <QBankView results={results} openModule={openModule} quizzes={quizzes} setQuizzes={setQuizzes} qbankLog={qbankLog} setQbankLog={setQbankLog}/>}
            {view==='brush' && <BrushView results={results} openModule={openModule}/>}
          </main>
        </div>}
  </div>;
}
window.TBWebApp=App;
