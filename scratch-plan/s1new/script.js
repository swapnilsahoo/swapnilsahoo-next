
// ---- Q1 sorter -------------------------------------------------------------
const SORTER = [
  {t:"A hospital cuts average discharge time by 30% using the same processes as its peers.", a:"oe",
   w:"Faster execution of an activity every hospital performs. Valuable, and copyable."},
  {t:"An airline flies one aircraft type only, point to point, with no seat assignment and no baggage transfers.", a:"strategy",
   w:"A set of reinforcing choices that rules other things out. Serving connecting passengers would break several of them at once."},
  {t:"A bank adopts the same core banking software its three largest competitors already run.", a:"oe",
   w:"Adopting an industry-standard tool moves you toward rivals, not away from them."},
  {t:"A retailer refuses online sales so that its stores remain the only place the product is configured and fitted.", a:"strategy",
   w:"A genuine trade-off: revenue is given up deliberately to protect the position."},
  {t:"A manufacturer reduces defect rates to the industry's best-known benchmark.", a:"oe",
   w:"Benchmarking is convergence by definition. The target is someone else's current practice."},
  {t:"A software firm sells only to hospitals and builds compliance into every layer, making it clumsy for general business use.", a:"strategy",
   w:"Scope choice plus fit. The clumsiness elsewhere is the evidence that a real trade-off was made."}
];
const sorter = document.getElementById("sorter");
let sortScore = 0;
SORTER.forEach((item, i) => {
  const li = document.createElement("li");
  li.className = "rounded-xl border border-slate-200 p-4";
  li.innerHTML =
    '<p class="text-sm text-slate-800">' + item.t + '</p>' +
    '<div class="mt-3 flex flex-wrap gap-2">' +
      '<button class="opt rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50" data-v="strategy">Strategy</button>' +
      '<button class="opt rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50" data-v="oe">Operational effectiveness</button>' +
    '</div>' +
    '<p class="verdict mt-3 text-sm" hidden></p>';
  li.querySelectorAll(".opt").forEach(btn => {
    btn.addEventListener("click", () => {
      const done = li.dataset.done === "1";
      if (done) return;
      li.dataset.done = "1";
      const ok = btn.dataset.v === item.a;
      if (ok) { sortScore++; document.getElementById("sortScore").textContent = sortScore; }
      li.querySelectorAll(".opt").forEach(b => {
        b.disabled = true;
        if (b.dataset.v === item.a) b.className = "opt rounded-lg border border-emerald-500 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800";
        else if (b === btn) b.className = "opt rounded-lg border border-rose-400 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700";
        else b.className = "opt rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-400";
      });
      const v = li.querySelector(".verdict");
      v.hidden = false;
      v.className = "verdict mt-3 text-sm " + (ok ? "text-emerald-800" : "text-slate-700");
      v.textContent = (ok ? "Yes. " : "The answer is " + (item.a === "oe" ? "operational effectiveness" : "strategy") + ". ") + item.w;
    });
  });
  sorter.appendChild(li);
});

// ---- Q2 strategy statement -------------------------------------------------
const VAGUE = ["leading","best","world-class","synergy","innovative","customer-centric","cutting-edge","premier","excellence"];
function renderStatement(){
  const o=document.getElementById("sObj").value.trim();
  const s=document.getElementById("sScope").value.trim();
  const a=document.getElementById("sAdv").value.trim();
  const out=document.getElementById("sOut"), warn=document.getElementById("sWarn");
  if(!o && !s && !a){ out.hidden=true; warn.hidden=true; return; }
  out.hidden=false;
  const words=(o+" "+s+" "+a).trim().split(/\s+/).filter(Boolean).length;
  out.innerHTML='<strong>Objective:</strong> '+(o||'<em class="text-slate-400">missing</em>')+
    '<br><strong>Scope:</strong> '+(s||'<em class="text-slate-400">missing</em>')+
    '<br><strong>Advantage:</strong> '+(a||'<em class="text-slate-400">missing</em>')+
    '<br><span class="text-xs text-slate-500">'+words+' words</span>';
  const hits=VAGUE.filter(v=>(o+" "+s+" "+a).toLowerCase().includes(v));
  const notes=[];
  if(words>35) notes.push("Over 35 words — a statement nobody can repeat will not travel.");
  if(hits.length) notes.push("Vague word"+(hits.length>1?"s":"")+": "+hits.join(", ")+". Would a rival claim the opposite?");
  if(s && !/\bnot\b|\bexcept\b|\bonly\b|\brather than\b/i.test(s)) notes.push("Scope names who you serve but not who you refuse.");
  warn.hidden = notes.length===0;
  warn.textContent = notes.join(" ");
}
["sObj","sScope","sAdv"].forEach(id=>document.getElementById(id).addEventListener("input", renderStatement));

// ---- Q3 classifier ---------------------------------------------------------
const CLASSIFY = [
  {t:"A three-year plan sets a target of entering four new states; the firm enters all four, roughly on schedule.", a:"deliberate",
   w:"Intention stated in advance and realised close to intent."},
  {t:"Engineers keep building internal tools for one demanding client; two years later the tools are the firm's fastest-growing product.", a:"emergent",
   w:"A pattern formed through a stream of decisions nobody framed as strategy at the time."},
  {t:"A retailer's regional managers each quietly stop stocking a category because it never sells; head office later makes the exit official.", a:"emergent",
   w:"The pattern preceded the decision. Management's real contribution was recognising it and making it deliberate."},
  {t:"A board approves a documented shift to subscription pricing, and pricing changes across the portfolio that quarter.", a:"deliberate",
   w:"Articulated up front, executed as intended."}
];
const classifier = document.getElementById("classifier");
let clsScore = 0;
CLASSIFY.forEach(item => {
  const li=document.createElement("li");
  li.className="rounded-xl border border-slate-200 p-4";
  li.innerHTML='<p class="text-sm text-slate-800">'+item.t+'</p>'+
    '<div class="mt-3 flex flex-wrap gap-2">'+
      '<button class="opt rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50" data-v="deliberate">Deliberate</button>'+
      '<button class="opt rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50" data-v="emergent">Emergent</button>'+
    '</div><p class="verdict mt-3 text-sm" hidden></p>';
  li.querySelectorAll(".opt").forEach(btn=>{
    btn.addEventListener("click",()=>{
      if(li.dataset.done==="1") return;
      li.dataset.done="1";
      const ok=btn.dataset.v===item.a;
      if(ok){ clsScore++; document.getElementById("clsScore").textContent=clsScore; }
      li.querySelectorAll(".opt").forEach(b=>{
        b.disabled=true;
        if(b.dataset.v===item.a) b.className="opt rounded-lg border border-emerald-500 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800";
        else if(b===btn) b.className="opt rounded-lg border border-rose-400 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700";
        else b.className="opt rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-400";
      });
      const v=li.querySelector(".verdict"); v.hidden=false;
      v.className="verdict mt-3 text-sm "+(ok?"text-emerald-800":"text-slate-700");
      v.textContent=(ok?"Yes. ":"The answer is "+item.a+". ")+item.w;
    });
  });
  classifier.appendChild(li);
});

// ---- Quiz ------------------------------------------------------------------
const QUIZ = [
  {q:"A firm matches the industry's best delivery times and lowest defect rate. In Porter's terms this is:",
   o:["A sustainable competitive advantage","Operational effectiveness","A strategic trade-off","A distinct strategic position"],a:1,
   w:"Matching a benchmark is doing the same activities better. It tends to diffuse, pushing the industry toward convergence and price rivalry."},
  {q:"Which single feature most reliably indicates that a real strategic trade-off has been made?",
   o:["The firm has a documented five-year plan","The firm invests more than rivals in technology","Adopting the position makes some other valuable position harder to occupy","The firm's margins are above average this year"],a:2,
   w:"A trade-off means something is genuinely given up. If a rival can add your move without sacrificing anything, it protects nothing."},
  {q:"Porter argues durability comes mainly from:",
   o:["Fit among many mutually reinforcing activities","A single proprietary technology","Being first to enter the market","Superior execution of standard activities"],a:0,
   w:"Any one activity can be copied. A system of dozens of interlocking choices must be copied as a whole, and partial copying gains a rival little."},
  {q:"In Collis and Rukstad's framework, which trio makes up a strategy statement?",
   o:["Mission, vision, values","Objective, scope, advantage","Strengths, weaknesses, opportunities","Plan, ploy, pattern"],a:1,
   w:"Mission, vision and values are useful but do not tell anyone what to refuse. Objective, scope and advantage do."},
  {q:"The sharpest practical test of whether a sentence is a strategy statement is:",
   o:["Whether it appears in the annual report","Whether it can be used to refuse an otherwise attractive opportunity","Whether it inspires employees","Whether it names a growth target"],a:1,
   w:"Strategy is about choice. A statement that cannot justify a 'no' is doing no strategic work."},
  {q:"Realised strategy, in Mintzberg's account, is:",
   o:["Whatever the plan said","Usually a combination of deliberate and emergent strategy","Only what emerged unplanned","The same as intended strategy in well-run firms"],a:1,
   w:"Purely deliberate strategy requires an improbably predictable world; purely emergent implies no intention at all. Real firms sit between."},
  {q:"A pattern of decisions becomes an emergent strategy when:",
   o:["It is approved by the board in advance","It is written into the annual plan","It forms consistently through action without prior intention","It is announced to investors"],a:2,
   w:"Emergence is defined by the absence of prior intention. Management's contribution is recognising the pattern and choosing whether to make it deliberate."},
  {q:"A rival copies your loyalty programme within a quarter and your margin advantage disappears. The most defensible conclusion is:",
   o:["Your advantage rested on an easily imitated activity, not a system","Loyalty programmes never create advantage","The rival must have violated your intellectual property","You should reduce prices to respond"],a:0,
   w:"Rapid, cheap imitation is the diagnostic. Had the programme been embedded in a system of reinforcing choices, copying one piece would have gained the rival little."}
];
const quizEl=document.getElementById("quiz");
document.getElementById("quizTotal").textContent=QUIZ.length;
let quizScore=0;
QUIZ.forEach((item,i)=>{
  const card=document.createElement("div");
  card.className="card p-5";
  let opts="";
  item.o.forEach((text,j)=>{
    opts+='<button class="opt w-full text-left rounded-lg border border-slate-300 px-3 py-2.5 text-sm hover:bg-slate-50" data-j="'+j+'">'+
      '<span class="font-mono text-xs text-slate-500 mr-2">'+String.fromCharCode(65+j)+'</span>'+text+'</button>';
  });
  card.innerHTML='<p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Question '+(i+1)+'</p>'+
    '<p class="mt-2 font-semibold text-slate-900">'+item.q+'</p>'+
    '<div class="mt-3 grid gap-2">'+opts+'</div>'+
    '<div class="verdict mt-3 rounded-lg p-3 text-sm" hidden></div>';
  card.querySelectorAll(".opt").forEach(btn=>{
    btn.addEventListener("click",()=>{
      if(card.dataset.done==="1") return;
      card.dataset.done="1";
      const j=Number(btn.dataset.j), ok=j===item.a;
      if(ok){ quizScore++; document.getElementById("quizScore").textContent=quizScore; }
      card.querySelectorAll(".opt").forEach(b=>{
        b.disabled=true;
        const bj=Number(b.dataset.j);
        if(bj===item.a) b.className="opt w-full text-left rounded-lg border border-emerald-500 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-900";
        else if(b===btn) b.className="opt w-full text-left rounded-lg border border-rose-400 bg-rose-50 px-3 py-2.5 text-sm text-rose-800";
        else b.className="opt w-full text-left rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-400";
      });
      const v=card.querySelector(".verdict");
      v.hidden=false;
      v.className="verdict mt-3 rounded-lg p-3 text-sm "+(ok?"bg-emerald-50 text-emerald-900":"bg-amber-50 text-amber-900");
      v.innerHTML='<strong>'+(ok?"Correct.":"The answer is "+String.fromCharCode(65+item.a)+".")+'</strong> '+item.w;
    });
  });
  quizEl.appendChild(card);
});

// ---- nav highlight ---------------------------------------------------------
const links=[...document.querySelectorAll(".nav-link")];
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    links.forEach(l=>l.classList.toggle("active-nav", l.getAttribute("href")==="#"+e.target.id));
  });
},{rootMargin:"-40% 0px -55% 0px"});
["q1","q2","q3","tesla","studio","check"].forEach(id=>{
  const el=document.getElementById(id); if(el) obs.observe(el);
});
