(function () {
  var EX = {
    global: [
      { n: "IKEA", tag: "Variety + cost", pos: "Flat-pack, self-service furniture at a price no full-service retailer can match.",
        refuse: "Delivery, assembly, sales assistance, and city-centre locations.",
        fit: "Modular design makes flat packing possible; flat packing makes out-of-town warehouses viable; warehouses make self-selection necessary; self-selection removes the sales floor.",
        why: "A department store adding flat-pack keeps its rent, its delivery fleet and its sales staff. It gets the cost of the choice without the saving." },
      { n: "Southwest Airlines", tag: "Access + cost", pos: "Short-haul, point-to-point flying at bus-like fares.",
        refuse: "Meals, seat assignments, baggage transfers, hubs, and more than one aircraft type.",
        fit: "One fleet type speeds turnarounds; fast turnarounds raise utilisation; utilisation funds the fare; point-to-point avoids connection waits.",
        why: "Continental tried it as Continental Lite and stopped. A full-service carrier cannot drop baggage transfer on some routes without breaking the hub it depends on elsewhere." },
      { n: "Vanguard", tag: "Needs-based", pos: "Low-cost index investing owned by its own funds.",
        refuse: "Star managers, active trading, and sales commissions.",
        fit: "Mutual ownership removes the profit motive that would push fees up; index tracking removes research cost; low turnover removes trading cost.",
        why: "An active manager cutting fees to match Vanguard destroys the revenue that pays the managers who justify the fee." },
      { n: "In-N-Out Burger", tag: "Variety + focus", pos: "A tiny menu, fresh never frozen, in a handful of states.",
        refuse: "Franchising, freezers, national expansion, and menu extensions.",
        fit: "No freezers forces supply within a day's drive of a distribution centre; that limit forces geographic concentration; concentration keeps quality consistent.",
        why: "A national chain matching the menu still has a frozen supply chain, because its footprint requires one." },
      { n: "Aravind Eye Care", tag: "Access + cost", pos: "High-volume cataract surgery, free for those who cannot pay, funded by those who can.",
        refuse: "Surgeon-paced scheduling, a single price, and low throughput.",
        fit: "Assembly-line theatre design raises surgeon throughput; throughput lowers unit cost; low cost makes cross-subsidy viable; volume produces surgical quality.",
        why: "A conventional hospital adding free patients simply adds cost, because its theatres are not built to run at that rate." }
    ],
    india: [
      { n: "Reliance Jio", tag: "Access", pos: "All-IP 4G built nationwide before selling a single subscription.",
        refuse: "Legacy 2G and 3G networks, and gradual regional rollout.",
        fit: "Greenfield all-IP means no legacy maintenance; national scale at launch makes free introductory pricing survivable; data-only design fits the smartphone era.",
        why: "Incumbents carried 2G and 3G estates they could not abandon and could not cheaply match free data against." },
      { n: "Zerodha", tag: "Cost", pos: "Flat-fee discount broking with no relationship managers.",
        refuse: "Percentage brokerage, advisory services, and a branch network.",
        fit: "No advice means no advisers; no advisers means no branches; no branches means the flat fee clears cost; software substitutes for people.",
        why: "A full-service broker matching the flat fee destroys the commission that funds its advisers, who are the reason clients came." },
      { n: "Nirma", tag: "Cost", pos: "Detergent for households that had never bought detergent.",
        refuse: "Premium formulation, urban-first distribution, and expensive media.",
        fit: "Simple formulation lowers input cost; low cost enables rural pricing; rural focus avoids competing where incumbents were strong.",
        why: "An established brand cutting price cannibalises its own premium volume, which is where its profit sits." },
      { n: "Amul", tag: "Needs-based", pos: "A farmer-owned cooperative capturing the margin normally taken by intermediaries.",
        refuse: "Private ownership, and buying milk on the open market.",
        fit: "Farmer ownership secures supply; secure supply supports a national brand; brand scale funds procurement reach; procurement reach deepens ownership.",
        why: "A private dairy cannot promise farmers the surplus, because its shareholders are the ones expecting it." },
      { n: "Dabbawalas of Mumbai", tag: "Access", pos: "Home-cooked lunch delivered across a city at near-perfect reliability.",
        refuse: "Cooking, refrigeration, motorised transport for the main leg, and written tracking.",
        fit: "Not cooking removes kitchens entirely; a coded marking system removes literacy as a constraint; rail plus handcart removes traffic risk; local recruitment supplies trust.",
        why: "A logistics firm can buy vans and software and still not have the neighbourhood relationships the system runs on." }
    ]
  };

  var grid = document.getElementById("exGrid");
  var tabs = document.querySelectorAll(".ex-tab");
  if (!grid || !tabs.length) return;

  function render(set) {
    grid.innerHTML = "";
    EX[set].forEach(function (e) {
      var card = document.createElement("div");
      card.className = "rounded-2xl border border-slate-200 bg-white p-5 flex flex-col";
      card.innerHTML =
        '<div class="flex items-start justify-between gap-3">' +
          '<h3 class="font-bold text-slate-900">' + e.n + "</h3>" +
          '<span class="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600">' + e.tag + "</span>" +
        "</div>" +
        '<p class="mt-2 text-sm text-slate-600 leading-relaxed">' + e.pos + "</p>" +
        '<button type="button" class="ex-open mt-4 self-start rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">' +
          "What does it refuse?" +
        "</button>" +
        '<div class="ex-body mt-4 space-y-3 border-t border-slate-200 pt-4" hidden>' +
          '<div><p class="text-[10px] font-semibold uppercase tracking-wider text-rose-600">Refuses</p>' +
            '<p class="mt-1 text-sm text-slate-700">' + e.refuse + "</p></div>" +
          '<div><p class="text-[10px] font-semibold uppercase tracking-wider text-blue-600">The fit</p>' +
            '<p class="mt-1 text-sm text-slate-700">' + e.fit + "</p></div>" +
          '<div><p class="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">Why copying fails</p>' +
            '<p class="mt-1 text-sm text-slate-700">' + e.why + "</p></div>" +
        "</div>";
      var btn = card.querySelector(".ex-open");
      var body = card.querySelector(".ex-body");
      btn.addEventListener("click", function () {
        body.hidden = !body.hidden;
        btn.textContent = body.hidden ? "What does it refuse?" : "Hide";
      });
      grid.appendChild(card);
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute("aria-selected", on ? "true" : "false");
        x.className = "ex-tab -mb-px border-b-2 px-4 py-2.5 text-sm font-semibold " +
          (on ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-800");
      });
      render(t.dataset.ex);
    });
  });

  render("global");
})();
