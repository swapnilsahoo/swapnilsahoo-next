(function () {
  // ---------- tab switching ----------
  var tabs = document.querySelectorAll(".author-tab");
  var panels = document.querySelectorAll(".author-panel");
  if (!tabs.length) return;
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      var key = t.dataset.author;
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute("aria-selected", on ? "true" : "false");
        x.className = "author-tab -mb-px border-b-2 px-4 py-2.5 text-sm font-semibold " +
          (on ? "border-blue-600 text-blue-700"
              : "border-transparent text-slate-500 hover:text-slate-800");
      });
      panels.forEach(function (p) {
        p.classList.toggle("hidden", p.dataset.panel !== key);
      });
    });
  });

  // ---------- Porter activity system ----------
  var NODES = [
    { id: "price",  x: 260, y: 40,  r: 42, core: true,  label: "Very low\nticket prices" },
    { id: "freq",   x: 100, y: 130, r: 40, core: true,  label: "Frequent,\nreliable\ndepartures" },
    { id: "util",   x: 420, y: 130, r: 38, core: true,  label: "High aircraft\nutilisation" },
    { id: "crew",   x: 260, y: 175, r: 40, core: true,  label: "Lean, productive\nground crews" },
    { id: "fleet",  x: 420, y: 265, r: 36, core: false, label: "Standard\n737 fleet" },
    { id: "nomeal", x: 90,  y: 250, r: 32, core: false, label: "No meals" },
    { id: "noseat", x: 175, y: 305, r: 34, core: false, label: "No seat\nassignments" },
    { id: "nobag",  x: 300, y: 330, r: 36, core: false, label: "No baggage\ntransfers" },
    { id: "point",  x: 55,  y: 190, r: 34, core: false, label: "Point-to-point\nshort haul" },
    { id: "auto",   x: 410, y: 355, r: 34, core: false, label: "Automated\nticketing" }
  ];
  var EDGES = [
    ["price","freq"],["price","crew"],["price","nomeal"],["price","noseat"],["price","auto"],
    ["freq","crew"],["freq","point"],["freq","util"],
    ["crew","util"],["crew","nobag"],["crew","noseat"],["crew","fleet"],
    ["util","fleet"],["util","nobag"],
    ["point","nobag"],["fleet","crew"]
  ];
  var REINFORCES = {
    price:  "Low fares are only sustainable because meals, seat assignments and baggage transfers were removed, and because automated ticketing cut distribution cost.",
    freq:   "Frequent departures need fast turnarounds, which need lean crews; point-to-point routing avoids waiting on connecting traffic.",
    util:   "Aircraft earn only when flying. Utilisation depends on turnaround speed, which depends on the crew and on one aircraft type.",
    crew:   "The crew is the hinge of the whole system: it enables turnaround speed, which enables utilisation, which enables the fare.",
    fleet:  "One aircraft type simplifies maintenance, training and scheduling, which is what lets a small crew turn a plane quickly.",
    nomeal: "No catering means no galley loading, which removes minutes from every turnaround.",
    noseat: "No seat assignments speeds boarding, which shortens the turnaround.",
    nobag:  "No baggage transfers is what makes point-to-point viable, and removes the slowest step in a turnaround.",
    point:  "Point-to-point routing avoids the connection waits a hub imposes, protecting departure reliability.",
    auto:   "Automated ticketing removes agent commission, supporting the fare directly."
  };
  var svg = document.getElementById("porterMap");
  if (svg) {
    var gE = document.getElementById("porterEdges");
    var gN = document.getElementById("porterNodes");
    var byId = {};
    NODES.forEach(function (n) { byId[n.id] = n; });
    var NS = "http://www.w3.org/2000/svg";

    EDGES.forEach(function (e, i) {
      var a = byId[e[0]], b = byId[e[1]];
      var l = document.createElementNS(NS, "line");
      l.setAttribute("x1", a.x); l.setAttribute("y1", a.y);
      l.setAttribute("x2", b.x); l.setAttribute("y2", b.y);
      l.dataset.a = e[0]; l.dataset.b = e[1];
      l.setAttribute("class", "porter-edge");
      gE.appendChild(l);
    });

    NODES.forEach(function (n) {
      var g = document.createElementNS(NS, "g");
      g.setAttribute("class", "porter-node");
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.dataset.id = n.id;
      g.style.cursor = "pointer";

      var c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", n.x); c.setAttribute("cy", n.y); c.setAttribute("r", n.r);
      c.setAttribute("fill", n.core ? "#1e3a8a" : "#e0e7ff");
      c.setAttribute("stroke", n.core ? "#1e3a8a" : "#a5b4fc");
      c.setAttribute("stroke-width", "1.5");
      g.appendChild(c);

      var lines = n.label.split("\n");
      lines.forEach(function (ln, i) {
        var t = document.createElementNS(NS, "text");
        t.setAttribute("x", n.x);
        t.setAttribute("y", n.y + (i - (lines.length - 1) / 2) * 10 + 3);
        t.setAttribute("text-anchor", "middle");
        t.setAttribute("font-size", "8.5");
        t.setAttribute("fill", n.core ? "#ffffff" : "#1e3a8a");
        t.setAttribute("font-weight", n.core ? "600" : "500");
        t.textContent = ln;
        g.appendChild(t);
      });
      gN.appendChild(g);

      function select() {
        gE.querySelectorAll("line").forEach(function (l) {
          var on = l.dataset.a === n.id || l.dataset.b === n.id;
          l.setAttribute("stroke", on ? "#2563eb" : "#e2e8f0");
          l.setAttribute("stroke-width", on ? "2.5" : "1.2");
        });
        gN.querySelectorAll("g").forEach(function (o) {
          var connected = EDGES.some(function (e) {
            return (e[0] === n.id && e[1] === o.dataset.id) || (e[1] === n.id && e[0] === o.dataset.id);
          });
          o.style.opacity = (o.dataset.id === n.id || connected) ? "1" : "0.35";
        });
        var info = document.getElementById("porterNodeInfo");
        if (info) info.textContent = REINFORCES[n.id];
      }
      g.addEventListener("click", select);
      g.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); select(); }
      });
    });

    function resetMap() {
      gE.querySelectorAll("line").forEach(function (l) {
        l.setAttribute("stroke", "#cbd5e1"); l.setAttribute("stroke-width", "1.5");
      });
      gN.querySelectorAll("g").forEach(function (o) { o.style.opacity = "1"; });
      var msg = document.getElementById("porterCopyMsg");
      if (msg) msg.textContent = "";
      var info = document.getElementById("porterNodeInfo");
      if (info) info.textContent = "Select any activity in the map to trace its connections.";
    }

    function dim(ids, message) {
      resetMap();
      gN.querySelectorAll("g").forEach(function (o) {
        if (ids.indexOf(o.dataset.id) === -1) o.style.opacity = "0.25";
      });
      gE.querySelectorAll("line").forEach(function (l) {
        var on = ids.indexOf(l.dataset.a) > -1 && ids.indexOf(l.dataset.b) > -1;
        l.setAttribute("stroke", on ? "#16a34a" : "#e2e8f0");
        l.setAttribute("stroke-width", on ? "2.5" : "1.2");
      });
      var msg = document.getElementById("porterCopyMsg");
      if (msg) msg.textContent = message;
    }

    var b1 = document.getElementById("porterCopyOne");
    var b3 = document.getElementById("porterCopyThree");
    var br = document.getElementById("porterReset");
    if (b1) b1.addEventListener("click", function () {
      dim(["nomeal"], "Copied: no meals. It buys a few minutes of turnaround and nothing else, because the crew, the fleet and the routing that convert those minutes into utilisation are all still missing. One node, almost no gain.");
    });
    if (b3) b3.addEventListener("click", function () {
      dim(["nomeal", "noseat", "auto"], "Copied: no meals, no seat assignments, automated ticketing. Three real cost savings — and still no fare advantage, because none of them touches utilisation. Porter's point: partial imitation buys partial cost and none of the position.");
    });
    if (br) br.addEventListener("click", resetMap);
  }

  // ---------- Collis & Rukstad statement tester ----------
  var SAMPLES = [
    { t: "To be the world's most customer-centric company.",
      o: false, s: false, a: false,
      v: "A mission, not a strategy. No measurable objective, no scope, and 'customer-centric' is something every rival also claims." },
    { t: "Grow revenue 20% a year by serving conservative individual investors in suburban and rural areas, through face-to-face advisers in local one-broker offices.",
      o: true, s: true, a: true,
      v: "All three. A dated objective, a scope that names who is served and by implication who is not, and an advantage that is delivered by a specific activity choice rather than asserted." },
    { t: "To deliver world-class quality and innovation across all our markets.",
      o: false, s: false, a: false,
      v: "None of the three. 'All our markets' is the opposite of scope, and no rival would claim the reverse." },
    { t: "Double market share in urban India by 2029, in entry-level two-wheelers only, by being the lowest-cost manufacturer in the segment.",
      o: true, s: true, a: true,
      v: "All three, and the scope does the hardest work: 'entry-level only' is a refusal a product manager can act on." }
  ];
  var wrap = document.getElementById("collisSamples");
  if (wrap) {
    SAMPLES.forEach(function (s, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "w-full rounded-lg border border-slate-300 p-3 text-left text-sm hover:bg-slate-50";
      b.textContent = s.t;
      b.addEventListener("click", function () {
        wrap.querySelectorAll("button").forEach(function (x) {
          x.className = "w-full rounded-lg border border-slate-300 p-3 text-left text-sm hover:bg-slate-50";
        });
        b.className = "w-full rounded-lg border-2 border-blue-500 bg-blue-50 p-3 text-left text-sm";
        function chip(on, label) {
          return '<span class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ' +
            (on ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-700") + '">' +
            (on ? "✓ " : "✗ ") + label + "</span>";
        }
        document.getElementById("collisVerdict").innerHTML =
          '<div class="flex flex-wrap gap-2">' + chip(s.o, "Objective") + chip(s.s, "Scope") + chip(s.a, "Advantage") + "</div>" +
          '<p class="mt-3 leading-relaxed">' + s.v + "</p>";
      });
      wrap.appendChild(b);
    });
  }

  // ---------- Mintzberg slider ----------
  var slider = document.getElementById("mintzSlider");
  var mSvg = document.getElementById("mintzMap");
  if (slider && mSvg) {
    var NS2 = "http://www.w3.org/2000/svg";
    function draw(pct) {
      var del = pct / 100;
      var eme = 1 - del;
      mSvg.innerHTML = "";
      function box(x, y, w, h, fill, stroke, label, sub) {
        var g = document.createElementNS(NS2, "g");
        var r = document.createElementNS(NS2, "rect");
        r.setAttribute("x", x); r.setAttribute("y", y);
        r.setAttribute("width", w); r.setAttribute("height", h);
        r.setAttribute("rx", 8);
        r.setAttribute("fill", fill); r.setAttribute("stroke", stroke); r.setAttribute("stroke-width", 1.5);
        g.appendChild(r);
        var t = document.createElementNS(NS2, "text");
        t.setAttribute("x", x + w / 2); t.setAttribute("y", y + (sub ? h / 2 - 2 : h / 2 + 4));
        t.setAttribute("text-anchor", "middle"); t.setAttribute("font-size", "11");
        t.setAttribute("font-weight", "600"); t.setAttribute("fill", "#0f172a");
        t.textContent = label; g.appendChild(t);
        if (sub) {
          var t2 = document.createElementNS(NS2, "text");
          t2.setAttribute("x", x + w / 2); t2.setAttribute("y", y + h / 2 + 12);
          t2.setAttribute("text-anchor", "middle"); t2.setAttribute("font-size", "9");
          t2.setAttribute("fill", "#475569"); t2.textContent = sub; g.appendChild(t2);
        }
        mSvg.appendChild(g);
      }
      function arrow(x1, y1, x2, y2, w, colour, label) {
        var l = document.createElementNS(NS2, "line");
        l.setAttribute("x1", x1); l.setAttribute("y1", y1);
        l.setAttribute("x2", x2); l.setAttribute("y2", y2);
        l.setAttribute("stroke", colour); l.setAttribute("stroke-width", Math.max(1.5, w));
        l.setAttribute("stroke-linecap", "round");
        mSvg.appendChild(l);
        if (label) {
          var t = document.createElementNS(NS2, "text");
          t.setAttribute("x", (x1 + x2) / 2); t.setAttribute("y", (y1 + y2) / 2 - 6);
          t.setAttribute("text-anchor", "middle"); t.setAttribute("font-size", "9");
          t.setAttribute("fill", colour); t.setAttribute("font-weight", "600");
          t.textContent = label; mSvg.appendChild(t);
        }
      }
      box(20, 30, 120, 44, "#dbeafe", "#3b82f6", "Intended", "strategy");
      box(360, 110, 130, 48, "#dcfce7", "#16a34a", "Realised", "what the firm did");
      box(20, 200, 120, 44, "#fee2e2", "#ef4444", "Unrealised", "never happened");
      box(150, 240, 150, 44, "#fef3c7", "#f59e0b", "Emergent", "patterns that formed");

      arrow(140, 52, 360, 128, 1.5 + del * 7, "#2563eb", "deliberate");
      arrow(80, 74, 80, 200, 1.5 + eme * 5, "#ef4444", "");
      arrow(300, 262, 400, 158, 1.5 + eme * 7, "#f59e0b", "emergent");
    }
    function verdict(p) {
      if (p >= 95) return "A purely deliberate strategy requires the world to behave exactly as forecast and the organisation to learn nothing along the way. Mintzberg's point is that this almost never happens.";
      if (p <= 5) return "A purely emergent strategy means no intention at all — the firm is only ever reacting. Also rare, and not something to aspire to.";
      if (p >= 70) return "Plan-led, with some learning. Typical of stable industries. The risk is that the firm stops noticing the patterns forming outside the plan.";
      if (p <= 30) return "Learning-led. Typical of young firms and fast-moving markets. The risk is that nobody can say what the firm is refusing to do.";
      return "The realistic case: roughly half the realised strategy was intended, the rest formed through action and was adopted once it worked. Recognising which is which is the managerial skill.";
    }
    function update() {
      var p = Number(slider.value);
      document.getElementById("mintzPct").textContent = p;
      document.getElementById("mintzVerdict").textContent = verdict(p);
      draw(p);
    }
    slider.addEventListener("input", update);
    update();
  }
})();
