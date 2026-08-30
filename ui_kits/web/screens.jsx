const {Button,IconButton,Card,StateBadge,ProgressBar,StreakBadge,TeachBackBox,CriterionRow,ResultBanner}=window.TeachbackDesignSystem_417209;
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
    if(raw.view==='qbank') raw.view='brush';
    if(raw.fromView==='qbank') raw.fromView='brush';
    if(raw.workStep!=='note'&&raw.workStep!=='teach') raw.workStep='note';
    delete raw.xp;
    return raw;
  }catch{return {};}
}
function nextBite(id){
  const i=window.TB_BITES.findIndex(b=>b.id===id);
  return i>=0?window.TB_BITES[i+1]||null:null;
}
function authoredPlannedBy(plan,dayStr){
  let n=0;
  Object.keys(plan.byDay).sort().forEach(day=>{
    if(day<=dayStr) n+=plan.byDay[day].filter(id=>biteOf(id)&&!isStub(biteOf(id))).length;
  });
  return n;
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

function weekStrip(start){return Array.from({length:7},(_,i)=>addDays(start,i));}
function weekdayLabels(start){return weekStrip(start).map(d=>WEEKDAYS[d.getDay()]);}
function fmtRange(start,end){
  const sameYear=start.getFullYear()===end.getFullYear();
  const sameMonth=sameYear&&start.getMonth()===end.getMonth();
  const a=MONTHS[start.getMonth()].slice(0,3)+' '+start.getDate();
  const b=(sameMonth?'':MONTHS[end.getMonth()].slice(0,3)+' ')+end.getDate();
  return a+' – '+b+(sameYear?'':', '+end.getFullYear());
}
function daysInSpan(start,end){
  const n=Math.max(0,daysBetween(start,end)+1);
  return Array.from({length:n},(_,i)=>addDays(start,i));
}
function calendarRows(start,end,col0){
  const lead=(start.getDay()-col0.getDay()+7)%7;
  const cells=Array.from({length:lead},()=>null).concat(daysInSpan(start,end));
  const rows=[];
  for(let i=0;i<cells.length;i+=7){
    const row=cells.slice(i,i+7);
    while(row.length<7) row.push(null);
    rows.push(row);
  }
  return rows;
}
function rowMonthLabel(row,isFirst){
  const days=row.filter(Boolean);
  if(!days.length) return null;
  const hit=days.find(d=>d.getDate()===1);
  if(hit) return MONTHS[hit.getMonth()]+' '+hit.getFullYear();
  if(isFirst) return MONTHS[days[0].getMonth()]+' '+days[0].getFullYear();
  return null;
}
const CARD_LADDER=[0,1,3,7,14,30];
function cardInterval(box,rating){
  if(rating==='again') return {box:0,days:0};
  const top=CARD_LADDER.length-1;
  const step=rating==='easy'?2:1;
  const n=Math.min(top,Math.max(step,(box||0)+step));
  return {box:n,days:CARD_LADDER[n]};
}
function flashPool(results,qbankLog){
  return window.TB_BITES.filter(b=>{
    if(isStub(b)) return false;
    const st=biteState(results,b.id);
    return STRUGGLE.has(st)||st==='Unassessed'||qbankStatus(qbankLog,b.id).everIncorrect;
  });
}
function flashWhy(b,results,qbankLog){
  const st=biteState(results,b.id);
  if(STRUGGLE.has(st)) return st;
  if(qbankStatus(qbankLog,b.id).everIncorrect) return 'Missed in a quiz';
  return st==='Unassessed'?'Unassessed':st;
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
  const nav=[['home','Home','house'],['outline','Outline','tree-structure'],['calendar','Calendar','calendar-blank'],['brush','Brush-up','broom']];
  return <nav className="tb-nav" aria-label="Primary">
    {nav.map(([id,label,icon])=>
      <Button key={id} size="sm" fullWidth variant={view===id?'primary':'ghost'} onClick={()=>setView(id)}>
        <i className={'ph-bold ph-'+icon}></i>{label}
      </Button>
    )}
  </nav>;
}

function ReadinessSummary({results}){
  const rows=sectionStats(results);
  const ready=rows.reduce((a,r)=>a+r.ready,0);
  const assessed=rows.reduce((a,r)=>a+r.assessed,0);
  const total=rows.reduce((a,r)=>a+r.total,0);
  const counts=readinessCounts(results);
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
    <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:12}}>
      {window.TB_STATES.map(s=>(
        <span key={s} style={{padding:'4px 8px',borderRadius:'var(--radius-pill)',background:`var(--state-${stateKey(s)}-bg)`,color:`var(--state-${stateKey(s)})`,font:'600 11px var(--font-body)'}}>{s} {counts[s]}</span>
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

function DayList({ids,results,openModule,heading,empty,today}){
  if(!ids||ids.length===0) return <Card sunken padding={20}><p style={{margin:0,color:'var(--text-muted)'}}>{empty}</p></Card>;
  return <div style={{display:'grid',gap:8}}>
    {heading?<h3 style={{margin:0,font:'600 16px var(--font-display)',color:'var(--sunny-700)'}}>{heading}</h3>:null}
    {ids.map(id=>{
      const t=biteOf(id);
      const st=biteState(results,id);
      return <Card key={id} padding={14} style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) auto',gap:10,alignItems:'center',background:today?'var(--sunny-100)':undefined}}>
        <div style={{minWidth:0}}>
          <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
            <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{t.id} · {t.leaf}</span>
            <StateBadge state={st} size="sm"/>
            {isStub(t)&&<span style={{font:'500 11px var(--font-body)',color:'var(--text-faint)'}}>stub</span>}
          </div>
          <strong style={{display:'block',marginTop:4,font:'600 15px var(--font-display)'}}>{t.title}</strong>
          <span style={{color:'var(--text-faint)',font:'500 12px var(--font-body)'}}>Teach-back · {t.read||'8 min'}</span>
        </div>
        <Button size="sm" onClick={()=>openModule(id)}>Open</Button>
      </Card>;
    })}
  </div>;
}

function DayCell({date,todayStr,selected,onSelect,plan,results,compact}){
  const key=ymd(date);
  const ids=plan.byDay[key]||[];
  const isToday=key===todayStr;
  const isSel=key===selected;
  const shown=ids.slice(0,compact?2:3);
  const extra=ids.length-shown.length;
  const authoredIds=ids.filter(id=>!isStub(biteOf(id)));
  const allReady=authoredIds.length>0&&authoredIds.every(id=>isReady(biteState(results,id)));
  const behind=key<todayStr&&authoredIds.some(id=>!isReady(biteState(results,id)));
  return <button type="button" onClick={()=>onSelect(key)} style={{display:'grid',alignContent:'start',gap:4,minHeight:compact?72:104,padding:6,textAlign:'left',border:isSel?'1px solid var(--clover-500)':'1px solid var(--border)',borderRadius:'var(--radius-sm)',background:isToday?'var(--sunny-100)':'var(--paper)',boxShadow:isToday?'inset 0 3px 0 var(--sunny-500)':'none',cursor:'pointer'}}>
    <span style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <span style={{font:'600 12px var(--font-display)',color:behind?'var(--coral-700)':isToday?'var(--sunny-700)':'var(--text-body)',background:behind?'var(--coral-100)':'transparent',borderRadius:6,padding:behind?'0 5px':0}}>{date.getDate()}</span>
      {allReady&&<i className="ph-bold ph-check" style={{color:'var(--clover-600)',fontSize:12}}></i>}
    </span>
    {shown.map(id=>{
      const t=biteOf(id);
      const st=biteState(results,id);
      const done=isReady(st);
      const overdueAuthored=key<todayStr&&!isStub(t)&&!done;
      return <span key={id} style={{display:'block',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',font:'500 10px var(--font-body)',padding:'2px 4px',borderRadius:4,background:isToday?'var(--sunny-500)':overdueAuthored?'var(--coral-100)':done?'var(--clover-100)':'var(--cream)',color:overdueAuthored?'var(--coral-700)':done?'var(--clover-700)':'var(--text-muted)',border:'1px solid var(--border)'}}>{t.title}</span>;
    })}
    {extra>0&&<span style={{font:'600 10px var(--font-body)',color:'var(--text-faint)'}}>+{extra}</span>}
  </button>;
}

function HomeView({results,examDate,planStart,openModule,goCalendar}){
  const today=startOfDay(new Date());
  const todayStr=ymd(today);
  const plan=buildPlan(examDate,planStart);
  const remaining=window.TB_BITES.filter(b=>!isReady(biteState(results,b.id))).length;
  const exam=examDate?startOfDay(parseYmd(examDate)):null;
  const countdown=exam?Math.max(0,daysBetween(today,exam)):null;
  const studyDaysLeft=exam?countdown+1:null;
  const past=exam&&daysBetween(today,exam)<0;
  const pace=(!exam||past||studyDaysLeft===0)?null:remaining/Math.max(1,studyDaysLeft);
  const authored=window.TB_BITES.filter(b=>b.demo);
  const authoredReady=authored.filter(b=>isReady(biteState(results,b.id))).length;
  const authoredLine=authored.map(b=>biteState(results,b.id)).reduce((acc,st)=>{acc[st]=(acc[st]||0)+1;return acc;},{});
  const todayIds=plan.byDay[todayStr]||[];
  const nextEntry=Object.entries(plan.byDay).sort((a,b)=>a[0].localeCompare(b[0])).find(([day,ids])=>day>=todayStr&&firstAuthoredBite(ids.map(biteOf),b=>!isReady(biteState(results,b.id))));
  const upcoming=nextEntry&&firstAuthoredBite(nextEntry[1].map(biteOf),b=>!isReady(biteState(results,b.id)));
  const plannedByToday=authoredPlannedBy(plan,todayStr);
  const emptyToday=todayIds.length===0?(nextEntry?`Nothing scheduled. The next bite is ${upcoming.title} on ${fmtLong(nextEntry[0])}.`:'Nothing scheduled.'):'No modules on this day.';
  return <section style={{display:'grid',gap:22}}>
    <div className="tb-home">
      <div style={{display:'grid',gap:16,minWidth:0}}>
        <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>Today</h1>
        {examDate
          ? <DayList ids={todayIds} results={results} openModule={openModule} today empty={emptyToday}/>
          : <Card sunken padding={20}>
              <p style={{margin:'0 0 12px',color:'var(--text-muted)'}}>Set an exam date to spread the modules. Stubs stay on the calendar.</p>
              <Button size="sm" onClick={goCalendar}>Open Calendar</Button>
            </Card>}
      </div>
      <aside style={{display:'grid',gap:14,alignContent:'start'}}>
        <Card padding={18}>
          <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--text-faint)'}}>Days until exam</span>
          <div style={{font:'700 32px var(--font-display)'}}>{examDate&&!past?countdown:'—'}</div>
          {!examDate&&<Button size="sm" variant="ghost" onClick={goCalendar} style={{marginTop:10}}>Set exam date</Button>}
        </Card>
        <Card padding={18}>
          <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--text-faint)'}}>Pace</span>
          <div style={{font:'700 28px var(--font-display)'}}>{pace==null?'—':(pace.toFixed(1)+' / day')}</div>
          <p style={{margin:'6px 0 0',color:'var(--text-muted)',font:'500 12px var(--font-body)'}}>{pace==null?'Remaining modules ÷ remaining days.':'Remaining '+remaining+' modules ÷ '+studyDaysLeft+' study days'+(pace>=7?(' · '+(pace*7).toFixed(1)+' / week'):'')+'.'}</p>
          {examDate
            ? <>
                <PlanChart ready={authoredReady} total={authored.length} planStart={planStart} examDate={examDate} plan={plan}/>
                <p style={{margin:'8px 0 0',font:'500 12px var(--font-body)',color:'var(--text-muted)'}}><strong>{authoredReady} of {authored.length} authored notes ready</strong>{plannedByToday?` · plan called for ${plannedByToday} by today`:''}. {Object.entries(authoredLine).map(([k,v])=>v+' '+k).join(', ')||'all Unassessed'}.</p>
                <p style={{margin:'4px 0 0',font:'500 12px var(--font-body)',color:'var(--text-faint)'}}>{window.TB_BITE_COUNT-authored.length} title stubs stay on the calendar.</p>
              </>
            : <p style={{margin:'8px 0 0',color:'var(--text-muted)'}}>No plan until a date is set.</p>}
        </Card>
        <ReadinessSummary results={results}/>
      </aside>
    </div>
  </section>;
}

function CalendarView({results,examDate,setExamDate,planStart,setPlanStart,openModule}){
  const today=startOfDay(new Date());
  const todayStr=ymd(today);
  const [weekStart,setWeekStart]=React.useState(today);
  const [calMode,setCalMode]=React.useState('week');
  const [selected,setSelected]=React.useState(todayStr);
  const plan=buildPlan(examDate,planStart);
  const exam=examDate?startOfDay(parseYmd(examDate)):null;
  const selectedIds=plan.byDay[selected]||[];
  const todayIds=plan.byDay[todayStr]||[];
  const nextEntry=Object.entries(plan.byDay).sort((a,b)=>a[0].localeCompare(b[0])).find(([day,ids])=>day>=todayStr&&firstAuthoredBite(ids.map(biteOf),b=>!isReady(biteState(results,b.id))));
  const upcoming=nextEntry&&firstAuthoredBite(nextEntry[1].map(biteOf),b=>!isReady(biteState(results,b.id)));
  const weekDays=weekStrip(weekStart);
  const monthFrom=planStart&&planStart<todayStr?parseYmd(planStart):today;
  const monthTo=exam||addDays(today,27);
  const monthRows=calendarRows(monthFrom,monthTo,today);

  const shiftWeek=n=>{
    setWeekStart(s=>{
      const next=addDays(s,n);
      const from=ymd(next);
      const to=ymd(addDays(next,6));
      setSelected(sel=>sel>=from&&sel<=to?sel:from);
      return next;
    });
  };

  const onDate=e=>{
    const v=e.target.value;
    if(v&&v<todayStr) return;
    setExamDate(v);
    setPlanStart(v?todayStr:'');
    if(v) setSelected(todayStr);
  };

  return <section style={{display:'grid',gap:22}}>
    <div className="tb-cal">
      <div style={{display:'grid',gap:16,minWidth:0}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
          <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>{calMode==='week'?fmtRange(weekStart,addDays(weekStart,6)):(examDate?('Through '+fmtLong(examDate)):'Look-ahead')}</h1>
          <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
            <Button size="sm" variant="ghost" onClick={()=>setCalMode(m=>m==='week'?'month':'week')}>{calMode==='week'?'Month view':'Week view'}</Button>
            {calMode==='week'&&<>
              <IconButton icon="caret-left" label="Previous week" onClick={()=>shiftWeek(-7)}/>
              <IconButton icon="caret-right" label="Next week" onClick={()=>shiftWeek(7)}/>
            </>}
          </div>
        </div>
        {!examDate && <Card sunken padding={20}><p style={{margin:0,color:'var(--text-muted)'}}>Set an exam date to spread the modules. Stubs stay on the calendar.</p></Card>}
        {calMode==='week'
          ? <div style={{display:'grid',gridTemplateColumns:'repeat(7,minmax(0,1fr))',gap:6}}>
              {weekdayLabels(weekStart).map((d,i)=><div key={i} style={{font:'600 11px var(--font-body)',color:'var(--text-faint)',textAlign:'center',padding:'4px 0'}}>{d}</div>)}
              {weekDays.map(date=><DayCell key={ymd(date)} date={date} todayStr={todayStr} selected={selected} onSelect={setSelected} plan={plan} results={results}/>)}
            </div>
          : <div className="tb-cal-month" style={{display:'grid',gap:10,maxHeight:560,overflow:'auto',paddingRight:4}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(7,minmax(0,1fr))',gap:6,position:'sticky',top:0,zIndex:1,background:'var(--surface-page)',paddingBottom:4}}>
                {weekdayLabels(today).map((d,i)=><div key={i} style={{font:'600 11px var(--font-body)',color:'var(--text-faint)',textAlign:'center',padding:'4px 0'}}>{d}</div>)}
              </div>
              {monthRows.map((row,ri)=>{
                const label=rowMonthLabel(row,ri===0);
                return <div key={ri} style={{display:'grid',gap:6}}>
                  {label&&<strong style={{font:'600 13px var(--font-display)',color:'var(--text-muted)',padding:'4px 2px'}}>{label}</strong>}
                  <div style={{display:'grid',gridTemplateColumns:'repeat(7,minmax(0,1fr))',gap:6}}>
                    {row.map((date,di)=>date
                      ? <DayCell key={ymd(date)} date={date} todayStr={todayStr} selected={selected} onSelect={setSelected} plan={plan} results={results} compact/>
                      : <div key={'e'+ri+'-'+di}/>)}
                  </div>
                </div>;
              })}
            </div>}
        {examDate
          ? <DayList ids={selectedIds} results={results} openModule={(id)=>openModule(id,'calendar')} heading={selected===todayStr?'Today':fmtLong(selected)} today={selected===todayStr} empty={selected===todayStr&&todayIds.length===0?(nextEntry?`Nothing scheduled. The next bite is ${upcoming.title} on ${fmtLong(nextEntry[0])}.`:'Nothing scheduled.'):'No modules on this day.'}/>
          : <DayList ids={[]} results={results} openModule={openModule} heading="Today" empty="Set an exam date to spread the modules."/>}
      </div>
      <aside style={{display:'grid',gap:14,alignContent:'start'}}>
        <Card padding={18}>
          <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Exam date</span>
          <h2 style={{margin:'6px 0 10px',font:'600 20px var(--font-display)'}}>{examDate?('SIE · '+fmtLong(examDate)):'Set your exam date.'}</h2>
          <input className="tb-field" type="date" name="exam-date" min={todayStr} value={examDate} onChange={onDate} aria-label="Exam date"/>
        </Card>
      </aside>
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

function OutlineView({results,openModule,examDate,planStart}){
  const todayStr=ymd(new Date());
  const plan=buildPlan(examDate,planStart);
  const todayIds=new Set(plan.byDay[todayStr]||[]);
  return <section style={{display:'grid',gap:16}}>
    <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap',alignItems:'end'}}>
      <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>SIE outline</h1>
      <StateKey/>
    </div>
    {Object.entries(window.TB_TREE).map(([sec,s])=>{
      const ids=Object.values(s.leaves).flatMap(l=>l.ids);
      const assessed=ids.filter(id=>results[id]).length;
      const ready=ids.filter(id=>isReady(biteState(results,id))).length;
      return <div key={sec} style={{display:'grid',gap:10}}>
        <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap',alignItems:'baseline'}}>
          <div>
            <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Section {sec}</span>
            <h2 style={{margin:'4px 0 0',font:'600 20px var(--font-display)'}}>{s.title}</h2>
          </div>
          <span style={{font:'500 12px var(--font-mono)',color:'var(--text-faint)'}}>{ready} ready · {assessed} assessed · {ids.length}</span>
        </div>
        {Object.entries(s.leaves).map(([leaf,l])=>(
          <div key={leaf} style={{display:'grid',gap:6}}>
            <strong style={{font:'600 13px var(--font-body)',color:'var(--text-muted)'}}>{leaf} {l.title}</strong>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(44px,1fr))',gap:6}}>
              {l.ids.map(id=>{
                const t=biteOf(id);
                const st=biteState(results,id);
                const k=stateKey(st);
                const todayHit=todayIds.has(id);
                return <button key={id} type="button" title={t.id+' '+t.title+' · '+st+(isStub(t)?' · stub':'')} onClick={()=>openModule(id,'outline')} style={{minHeight:44,minWidth:44,padding:4,border:todayHit?'2px solid var(--sunny-500)':(isStub(t)?'1px dashed var(--border-strong)':'1px solid var(--state-'+k+')'),borderRadius:8,background:`var(--state-${k}-bg)`,color:`var(--state-${k})`,font:'500 10px var(--font-mono)',cursor:'pointer'}}>{t.id.replace('B','')}</button>;
              })}
            </div>
          </div>
        ))}
      </div>;
    })}
  </section>;
}

function BiteNote({topic}){
  return <>
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
  </>;
}

function NoteView({topic,state,back,onTeach}){
  return <section className="tb-note">
    <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap',alignItems:'center'}}>
      <button onClick={back} style={{all:'unset',cursor:'pointer',font:'600 13px var(--font-body)',color:'var(--clover-600)'}}>← Back</button>
      <span style={{font:'500 12px var(--font-mono)',color:'var(--text-faint)'}}>Note</span>
    </div>
    <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
      <StateBadge state={state||'Unassessed'}/>
      <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{topic.id} · {topic.leaf}</span>
    </div>
    <Card padding={28}>
      <h1 style={{margin:'0 0 8px',font:'600 28px var(--font-display)'}}>{topic.title}</h1>
      <p style={{margin:'0 0 16px',color:'var(--text-muted)'}}>{topic.subtitle}</p>
      <BiteNote topic={topic}/>
    </Card>
    <Button fullWidth size="lg" onClick={onTeach}>Teach it back</Button>
  </section>;
}

function TeachView({topic,state,answer,setAnswer,result,err,submit,onNote,goHome,openNext,goBrush}){
  const next=nextBite(topic.id);
  const pop=result&&(result.state==='Exam-Ready'||result.state==='Mastered');
  return <section style={{display:'grid',gap:16}}>
    <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap',alignItems:'center'}}>
      <button onClick={onNote} style={{all:'unset',cursor:'pointer',font:'600 13px var(--font-body)',color:'var(--clover-600)'}}>← Note</button>
      <span style={{font:'500 12px var(--font-mono)',color:'var(--text-faint)'}}>Teach-back</span>
    </div>
    <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
      <StateBadge state={result?result.state:(state||'Unassessed')}/>
      <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{topic.id} · {topic.leaf}</span>
    </div>
    <div className="tb-teach">
      <Card padding={24}>
        <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Your turn</span>
        <h2 style={{margin:'6px 0 14px',font:'600 22px var(--font-display)'}}>Explain it to a colleague.</h2>
        <p style={{margin:'0 0 14px',color:'var(--text-muted)',font:'500 14px var(--font-body)'}}>{topic.title}</p>
        <TeachBackBox value={answer} onChange={setAnswer} prompt={topic.prompt} placeholder={topic.placeholder} rows={8}/>
        <div style={{marginTop:14}}><Button fullWidth size="lg" onClick={submit}>Grade my teach-back</Button></div>
        {err&&<p role="alert" style={{margin:'10px 0 0',color:'var(--coral-700)',font:'600 12px var(--font-body)'}}>{err}</p>}
      </Card>
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
              <div style={{display:'grid',gap:8}}>
                {next&&<Button onClick={()=>openNext(next.id)}>Next · {next.title}</Button>}
                {STRUGGLE.has(result.state)&&<Button variant="ghost" onClick={goBrush}>Review this miss in Brush-up</Button>}
                <Button variant="ghost" onClick={goHome}>{next?'Back to today':'Done for now'}</Button>
              </div>
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

function QBankView({results,quizzes,setQuizzes,qbankLog,setQbankLog,onClose,launch}){
  const [pane,setPane]=React.useState(launch&&launch.quiz?'run':'create');
  const [run,setRun]=React.useState(()=>launch&&launch.quiz?{quiz:launch.quiz,index:0,picked:null,graded:null,answers:{},started:Date.now()}:null);
  const [now,setNow]=React.useState(Date.now());
  React.useEffect(()=>{if(!(run&&run.quiz&&run.quiz.prefs&&run.quiz.prefs.timer)) return; const t=setInterval(()=>setNow(Date.now()),1000);return ()=>clearInterval(t);},[run&&run.quiz&&run.quiz.prefs&&run.quiz.prefs.timer]);
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
        <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
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
        <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>Create quiz</h1>
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
        <Button onClick={onClose}>Back to Brush-up</Button>
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
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <span style={{font:'500 12px var(--font-mono)',color:'var(--text-faint)'}}>{run.index+1} / {quiz.items.length}{quiz.prefs.scores?' · '+rights+' right':''}{tick!=null?' · '+tick+'s':''}</span>
          <Button size="sm" variant="ghost" onClick={onClose}>Exit quiz</Button>
        </div>
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

  return null;
}

function Flashcards({results,qbankLog,schedule,setSchedule,openModule}){
  const todayStr=ymd(new Date());
  const pool=flashPool(results,qbankLog);
  const poolKey=pool.map(b=>b.id).sort().join('|');
  const rank=id=>{
    const st=biteState(results,id);
    if(st==='Gap') return 0;
    if(st==='Misconception') return 1;
    if(st==='Rusty') return 2;
    if(qbankStatus(qbankLog,id).everIncorrect) return 3;
    return 4;
  };
  const dueIds=pool.filter(b=>{const s=schedule[b.id];return !s||s.due<=todayStr;}).sort((a,b)=>rank(a.id)-rank(b.id)).map(b=>b.id);
  const [queue,setQueue]=React.useState(dueIds);
  const [flipped,setFlipped]=React.useState(false);
  React.useEffect(()=>{setQueue(dueIds);setFlipped(false);},[poolKey,todayStr]);
  const nextFuture=pool.map(b=>schedule[b.id]).filter(s=>s&&s.due>todayStr).sort((a,b)=>a.due.localeCompare(b.due))[0];
  if(pool.length===0){
    return <Card sunken padding={28}><p style={{margin:0,color:'var(--text-muted)'}}>No struggle data yet. Teach a bite back or miss a quiz item and a card lands here. Unassessed authored notes also join the deck.</p></Card>;
  }
  if(queue.length===0){
    return <Card sunken padding={28}><p style={{margin:0,color:'var(--text-muted)'}}>{nextFuture?('Caught up. Next card due '+fmtLong(nextFuture.due)+'.'):'Caught up for today.'}</p></Card>;
  }
  const topic=biteOf(queue[0]);
  const st=biteState(results,topic.id);
  const why=flashWhy(topic,results,qbankLog);
  const grade=rating=>{
    const prev=schedule[topic.id]||{box:0,reps:0};
    const next=cardInterval(prev.box,rating);
    setSchedule({...schedule,[topic.id]:{box:next.box,reps:(prev.reps||0)+1,due:ymd(addDays(parseYmd(todayStr),next.days))}});
    setFlipped(false);
    setQueue(q=>rating==='again'?q.slice(1).concat(q[0]):q.slice(1));
  };
  return <div style={{display:'grid',gap:14,maxWidth:640}}>
    <div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'center'}}>
      <span style={{font:'500 12px var(--font-mono)',color:'var(--text-faint)'}}>{queue.length} due</span>
      <StateBadge state={st} size="sm"/>
    </div>
    <Card padding={28} style={{minHeight:280,display:'grid',alignContent:'start',gap:12}}>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
        <span style={{font:'500 11px var(--font-mono)',color:'var(--tangerine-600)'}}>{topic.id} · {topic.leaf}</span>
        <span style={{font:'600 11px var(--font-body)',color:'var(--text-faint)'}}>{why}</span>
      </div>
      <h2 style={{margin:0,font:'600 24px var(--font-display)'}}>{topic.title}</h2>
      {flipped
        ? <>
            <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Answer</span>
            <div style={{display:'grid',gap:8}}>
              {topic.inShort.map(p=><strong key={p} style={{font:'600 15px var(--font-body)'}}>{p}</strong>)}
            </div>
            {topic.precision.slice(0,2).map(p=><p key={p} style={{margin:0,color:'var(--text-muted)',font:'500 13px/1.55 var(--font-body)'}}>{p}</p>)}
          </>
        : <>
            <span style={{font:'var(--text-label)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--tangerine-600)'}}>Recall</span>
            <p style={{margin:0,color:'var(--text-muted)',font:'500 15px/1.6 var(--font-body)'}}>{topic.prompt}</p>
            <p style={{margin:0,color:'var(--text-faint)',font:'500 12px var(--font-body)'}}>Flip when you’ve said it out loud. Grading only schedules the next due date — it does not write readiness.</p>
          </>}
    </Card>
    {flipped
      ? <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:8}}>
          <Button variant="ghost" onClick={()=>grade('again')}>Again</Button>
          <Button onClick={()=>grade('good')}>Good</Button>
          <Button variant="ghost" onClick={()=>grade('easy')}>Easy</Button>
        </div>
      : <Button size="lg" onClick={()=>setFlipped(true)}>Flip</Button>}
    <Button size="sm" variant="ghost" onClick={()=>openModule(topic.id,'brush')}>Open teach-back</Button>
  </div>;
}

function BrushView({results,openModule,quizzes,setQuizzes,qbankLog,setQbankLog,cards,setCards}){
  const [quiz,setQuiz]=React.useState(null);
  if(quiz) return <QBankView results={results} quizzes={quizzes} setQuizzes={setQuizzes} qbankLog={qbankLog} setQbankLog={setQbankLog} onClose={()=>setQuiz(null)} launch={quiz==='create'?null:quiz}/>;
  return <section style={{display:'grid',gap:16}}>
    <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap',alignItems:'center'}}>
      <h1 style={{margin:0,font:'var(--text-h1)',fontFamily:'var(--font-display)'}}>Brush-up</h1>
      <Button onClick={()=>setQuiz('create')}>Create quiz</Button>
    </div>
    <p style={{margin:0,color:'var(--text-muted)',maxWidth:560}}>Spaced recall from Gap, Rusty, quiz misses, and unassessed authored notes. No invented mastery.</p>
    <Flashcards results={results} qbankLog={qbankLog} schedule={cards} setSchedule={setCards} openModule={openModule}/>
    {quizzes.length>0&&<div style={{display:'grid',gap:10}}>
      <h2 style={{margin:0,font:'600 18px var(--font-display)'}}>Your quizzes</h2>
      {quizzes.map(q=><Card key={q.id} padding={16} style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'center'}}>
        <div>
          <strong style={{font:'600 16px var(--font-display)'}}>{q.name}</strong>
          <p style={{margin:'4px 0 0',color:'var(--text-faint)',font:'500 12px var(--font-body)'}}>{q.items.length} stub items · right/wrong only</p>
        </div>
        <Button size="sm" onClick={()=>setQuiz({quiz:q})}>Open</Button>
      </Card>)}
    </div>}
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
  const [workStep,setWorkStep]=React.useState(saved.workStep||'note');
  const [user,setUser]=React.useState(saved.user||'');
  const [course,setCourse]=React.useState(saved.course||'SIE');
  const [examDate,setExamDate]=React.useState(savedExamDate);
  const [planStart,setPlanStart]=React.useState(savedPlanStart);
  const [quizzes,setQuizzes]=React.useState(saved.quizzes||[]);
  const [qbankLog,setQbankLog]=React.useState(saved.qbankLog||{});
  const [cards,setCards]=React.useState(saved.cards||{});
  const [err,setErr]=React.useState('');
  const topic=window.TB_BITES.find(t=>t.id===topicId);
  const answer=answers[topicId]||'';
  const result=results[topicId];
  const inFlow=view==='work';

  React.useEffect(()=>{
    try{
      localStorage.setItem(STORE,JSON.stringify({topicId,answers,results,view,fromView,workStep,user,course,examDate,planStart,quizzes,qbankLog,cards}));
    }catch{}
  },[topicId,answers,results,view,fromView,workStep,user,course,examDate,planStart,quizzes,qbankLog,cards]);

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
    setWorkStep('note');
    setErr('');
  };
  const openNext=id=>{
    setTopicId(id);
    setWorkStep('note');
    setErr('');
  };
  const setAnswer=v=>setAnswers({...answers,[topicId]:v});
  const back=()=>setView(fromView==='work'||fromView==='teach'?'home':fromView);
  const changeView=v=>{setView(v);if(v!=='work') setErr('');};

  return <div className="tb-shell">
    <TopBar streak={3} user={user} setView={changeView} course={course} setCourse={setCourse} onLogout={()=>setUser('')}/>
    {view==='login'
      ? <main className="tb-main" style={{maxWidth:1280,margin:'auto'}}>
          <LoginView setUser={setUser} setView={changeView}/>
        </main>
      : inFlow && topic
        ? <main className="tb-main tb-flow">
            {workStep==='teach'
              ? <TeachView topic={topic} state={result?result.state:'Unassessed'} answer={answer} setAnswer={setAnswer} result={result} err={err} submit={submit} onNote={()=>{setWorkStep('note');setErr('');}} goHome={()=>changeView('home')} openNext={openNext} goBrush={()=>changeView('brush')}/>
              : <NoteView topic={topic} state={result?result.state:'Unassessed'} back={back} onTeach={()=>setWorkStep('teach')}/>}
          </main>
        : <div className="tb-body">
          <LeftNav view={view} setView={changeView}/>
          <main className="tb-main">
            {view==='home' && <HomeView results={results} examDate={examDate} planStart={planStart} openModule={openModule} goCalendar={()=>changeView('calendar')}/>}
            {view==='outline' && <OutlineView results={results} openModule={openModule} examDate={examDate} planStart={planStart}/>}
            {view==='calendar' && <CalendarView results={results} examDate={examDate} setExamDate={setExamDate} planStart={planStart} setPlanStart={setPlanStart} openModule={openModule}/>}
            {view==='brush' && <BrushView results={results} openModule={openModule} quizzes={quizzes} setQuizzes={setQuizzes} qbankLog={qbankLog} setQbankLog={setQbankLog} cards={cards} setCards={setCards}/>}
          </main>
        </div>}
  </div>;
}
window.TBWebApp=App;
