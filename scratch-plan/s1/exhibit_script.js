(function(){
  var FIRMS = [
    ["Audi",72199.8,12109.8,4310.8,6624.6],
    ["BMW",118489.4,22055.7,4423.6,11642.7],
    ["Daimler",197322.3,39440.4,7084.5,15563.2],
    ["Fiat Chrysler",133028.3,20359.0,3746.4,8447.4],
    ["Ford",156776.0,16579.0,8000.0,5052.0],
    ["GM",145588.0,20164.0,7300.0,10703.0],
    ["Honda",125553.4,28101.8,6429.3,7540.0],
    ["Nissan",105112.5,20605.3,6240.7,6656.8],
    ["Tesla",11758.8,2222.5,1378.1,-1606.3]
  ];
  var SEG = [
    ["Tesla Model S",16698,29421],["Mercedes-Benz S-Class",24524,18803],
    ["BMW 7-Series",9744,12918],["Lexus LS",8559,5514],["Audi A7",8133,6558],
    ["BMW 6-Series",8647,3950],["Mercedes-Benz CLS-Class",7595,2571],
    ["Audi A8",5904,4149],["Porsche Panamera",5740,4403],["Jaguar XJ",4329,3834]
  ];
  var body = document.getElementById("marginBody");
  var segBody = document.getElementById("segBody");
  if (!body || !segBody) return;

  function fmt(n){ return n.toLocaleString("en-US",{maximumFractionDigits:0}); }
  function pct(n){ return n.toFixed(1) + "%"; }

  FIRMS.forEach(function(f){
    var name=f[0], rev=f[1], gp=f[2], rd=f[3], oi=f[4];
    var isT = name === "Tesla";
    var tr = document.createElement("tr");
    if (isT) tr.className = "bg-amber-50";
    tr.innerHTML =
      '<td class="px-4 py-2.5 font-medium' + (isT ? " text-amber-900" : "") + '">' + name + '</td>' +
      '<td class="px-4 py-2.5 text-right tabular-nums">' + fmt(rev) + '</td>' +
      '<td class="px-4 py-2.5 text-right tabular-nums">' + fmt(gp) + '</td>' +
      '<td class="px-4 py-2.5 text-right tabular-nums">' + fmt(rd) + '</td>' +
      '<td class="px-4 py-2.5 text-right tabular-nums">' + fmt(oi) + '</td>' +
      '<td class="px-4 py-2.5 text-right tabular-nums calc-col text-slate-400">&mdash;</td>' +
      '<td class="px-4 py-2.5 text-right tabular-nums calc-col text-slate-400">&mdash;</td>' +
      '<td class="px-4 py-2.5 text-right tabular-nums calc-col text-slate-400">&mdash;</td>';
    body.appendChild(tr);
  });

  var seg16 = SEG.reduce(function(a,r){ return a + r[2]; }, 0);
  SEG.forEach(function(r){
    var isT = r[0].indexOf("Tesla") === 0;
    var chg = (r[2]/r[1] - 1) * 100;
    var tr = document.createElement("tr");
    if (isT) tr.className = "bg-amber-50";
    tr.innerHTML =
      '<td class="px-4 py-2.5 font-medium' + (isT ? " text-amber-900" : "") + '">' + r[0] + '</td>' +
      '<td class="px-4 py-2.5 text-right tabular-nums">' + fmt(r[1]) + '</td>' +
      '<td class="px-4 py-2.5 text-right tabular-nums">' + fmt(r[2]) + '</td>' +
      '<td class="px-4 py-2.5 text-right tabular-nums ' +
        (chg >= 0 ? "text-emerald-700" : "text-rose-600") + '">' +
        (chg >= 0 ? "+" : "") + chg.toFixed(0) + '%</td>' +
      '<td class="px-4 py-2.5 text-right tabular-nums">' + (100*r[2]/seg16).toFixed(1) + '%</td>';
    segBody.appendChild(tr);
  });

  function median(a){
    var s = a.slice().sort(function(x,y){ return x-y; });
    var m = Math.floor(s.length/2);
    return s.length % 2 ? s[m] : (s[m-1]+s[m])/2;
  }

  var btn = document.getElementById("revealMargins");
  if (!btn) return;
  btn.addEventListener("click", function(){
    var rows = body.querySelectorAll("tr");
    var gms=[], oms=[], rds=[];
    FIRMS.forEach(function(f,i){
      var rev=f[1], gm=f[2]/rev*100, om=f[4]/rev*100, rd=f[3]/rev*100;
      if (f[0] !== "Tesla"){ gms.push(gm); oms.push(om); rds.push(rd); }
      var cells = rows[i].querySelectorAll(".calc-col");
      cells[0].innerHTML = pct(gm);
      cells[1].innerHTML = pct(om);
      cells[2].innerHTML = pct(rd);
      cells[0].className = "px-4 py-2.5 text-right tabular-nums calc-col font-semibold";
      cells[1].className = "px-4 py-2.5 text-right tabular-nums calc-col font-semibold " +
        (om < 0 ? "text-rose-600" : "");
      cells[2].className = "px-4 py-2.5 text-right tabular-nums calc-col font-semibold " +
        (rd > 8 ? "text-amber-700" : "");
    });
    document.getElementById("medGM").innerHTML = pct(median(gms));
    document.getElementById("medOM").innerHTML = pct(median(oms));
    document.getElementById("medRD").innerHTML = pct(median(rds));
    var f = document.getElementById("findings");
    if (f) f.hidden = false;
    btn.disabled = true;
    btn.textContent = "Revealed";
    btn.className = "rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500";
  });
})();
