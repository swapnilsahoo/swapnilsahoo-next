/* Original teaching scenarios. Fixed fictional assumptions, no uploads or persistence. */
(() => {
  "use strict";
  const lab = document.getElementById("s1-resource-lab");
  if (!lab || lab.dataset.ready) return;
  lab.dataset.ready = "true";
  const find = (element, selector) => element.querySelector(selector);
  const money = (value) => `${value < 0 ? "−" : ""}₹${Math.abs(value).toLocaleString("en-IN")}`;
  const option = (value, label) => `<option value="${value}">${label}</option>`;
  const reset = (label) => `<button type="button" class="s1rl-secondary" data-s1rl-action="reset">${label}</button>`;
  const link = (anchor, label) => `<a href="#${anchor}">${label}</a>`;
  const labels = { intended: "Intended", deliberate: "Deliberate", emergent: "Emergent", unrealized: "Unrealized", realized: "Realized", trial: "Only an isolated trial" };
  const patterns = {
    learn: {
      after: "Weeks 4–6: the office lunch runs as planned. Within a small experimentation allowance, the field team develops a shared pickup slot not specified in the original plan; it repeats for three weeks. Management retires the citywide dinner project before launch.",
      strands: [
        ["Weekday office lunch", "The written plan named this service, and delivery records show it operating repeatedly.", ["intended", "deliberate", "realized"], "Its origin is intended; the executed strand is deliberate and part of what the firm actually does."],
        ["Shared pickup slot", "The team, rather than the original blueprint, worked out this format. The same format appears in three successive weeks of delivery records.", ["emergent", "realized"], "The specific format formed through repeated local actions. Permission to experiment was deliberate, but that does not make every resulting detail a preplanned strategy."],
        ["Citywide custom dinners", "This was in the original plan, but management abandoned it before any launch.", ["intended", "unrealized"], "The intended strand did not become an operating pattern. Abandoning a plan does not by itself establish commercial failure."],
      ],
      lesson: "This branch combines an executed plan with a locally formed pattern. A later written commitment could make future pickup operations deliberate; it would not rewrite how the earlier pattern arose.",
    },
    freeze: {
      after: "Weeks 4–6: managers require the original formats. Office lunches continue and citywide custom dinners launch on the planned timetable. The pickup requests are declined; no pickup activity is recorded.",
      strands: [
        ["Office lunch", "The service was planned and then delivered repeatedly.", ["intended", "deliberate", "realized"], "The records support a deliberate, realized strand."],
        ["Citywide custom dinners", "The service launches as specified and operates for three weeks, with costly routes noted in the log.", ["intended", "deliberate", "realized"], "Execution supports these labels even if the economics disappoint. Strategy labels do not certify success."],
      ],
      lesson: "Realized strategy need not contain a material emergent strand in every bounded account. Requests alone are not an organizational pattern: the firm must actually act. What evidence would justify changing this route?",
    },
    rush: {
      after: "Week 4: management abandons the office commitment and announces a national custom-meal app. One improvised delivery is completed. The announced network has not launched and no repeated delivery format is yet documented.",
      strands: [
        ["Original office commitment", "This was in the original plan, but is dropped before repeated office service begins in this branch.", ["intended", "unrealized"], "The focal commitment is unrealized. That says what happened to the plan, not why the overall business will succeed or fail."],
        ["National app network", "Managers have announced a new formal commitment; there is no operating network yet.", ["intended"], "An announcement supplies intention, not evidence of deliberate execution or a realized network."],
        ["One improvised delivery", "There is just one delivery and no repeatable format in the record.", ["trial"], "A single reaction can become useful evidence, but is insufficient to establish an emergent strategic pattern."],
      ],
      lesson: "Speed is not evidence of emergence. Look for a consistent stream of actual decisions and specify the period and organizational level you are describing.",
    },
  };
  const pattern = find(lab, '[data-s1rl="pattern"]');
  pattern.innerHTML = `
    <header><p class="s1rl-kicker">Lab 1 · Plan and pattern</p><h3>When the lunch plan meets the delivery log</h3></header>
    <p><strong>Before:</strong> fictional TiffinLoop plans weekday lunches for one Bengaluru office cluster and a citywide custom-dinner launch. The initial document is an <strong>intended strategy</strong>; no operating pattern is established simply by writing it.</p>
    <div class="s1rl-evidence"><strong>Observation log, not a forecast</strong><p>Three weekly logs record 6, 12 and 18 paid pickup requests from neighbouring workspaces. These are fictional requests, not proof that TiffinLoop has adopted a new service.</p></div>
    <form data-s1rl-form="pattern"><label for="s1rl-pattern-route">Your management response</label><select id="s1rl-pattern-route" data-s1rl-control="pattern-route">
      ${option("learn", "Give the field team bounded room to adapt")}${option("freeze", "Require the original service formats")}${option("rush", "Replace the office plan with a national app announcement")}
    </select><div class="s1rl-actions"><button type="submit" data-s1rl-action="pattern-run">Read the fictional aftermath</button>${reset("Reset plan and pattern")}</div></form>
    <div data-pattern-aftermath hidden></div><div data-pattern-classifier></div>
    <div class="s1rl-feedback" data-s1rl-output="pattern" role="status" aria-live="polite"></div>
    <p class="s1rl-bridge">Bridge to the stories: ${link("story-apple", "Apple’s planned transition")} and ${link("story-zomato", "Zomato’s changing business")}. Compare stated intention with dated actions; do not infer a founder’s original intention from the eventual outcome. ${link("note-mintzberg", "Return to the Mintzberg study note")}.</p>`;
  let patternKey = null;
  function runPattern() {
    patternKey = find(pattern, '[data-s1rl-control="pattern-route"]').value;
    const branch = patterns[patternKey];
    if (!branch) return;
    const aftermath = find(pattern, "[data-pattern-aftermath]");
    aftermath.hidden = false;
    aftermath.innerHTML = `<h4>After your decision: the fictional record</h4><p>${branch.after}</p><p><strong>Describe each focal strand below.</strong> Select all supported labels, covering both its origin and its outcome. These labels can overlap. A future plan and an executed pattern are different evidence.</p>`;
    find(pattern, "[data-pattern-classifier]").innerHTML = branch.strands.map((strand, index) => `<fieldset class="s1rl-strand"><legend>${strand[0]}</legend><p>${strand[1]}</p><div class="s1rl-labels">${Object.entries(labels).map(([key, label]) => `<label><input type="checkbox" value="${key}" data-strand="${index}"><span>${label}</span></label>`).join("")}</div></fieldset>`).join("") + `<button type="button" data-s1rl-action="pattern-check">Compare my labels with the evidence</button>`;
    find(pattern, '[data-s1rl-output="pattern"]').textContent = "The recorded consequences are ready. Classify the strands, then compare your reasoning.";
  }
  pattern.addEventListener("submit", (event) => { event.preventDefault(); runPattern(); });
  pattern.addEventListener("click", (event) => {
    const action = event.target.closest("[data-s1rl-action]")?.dataset.s1rlAction;
    if (action === "reset") {
      find(pattern, "form").reset(); patternKey = null;
      find(pattern, "[data-pattern-aftermath]").hidden = true;
      find(pattern, "[data-pattern-classifier]").replaceChildren();
      find(pattern, '[data-s1rl-output="pattern"]').textContent = "Original plan restored. Choose a response to inspect a new record.";
    }
    if (action === "pattern-check" && patterns[patternKey]) {
      const branch = patterns[patternKey];
      find(pattern, '[data-s1rl-output="pattern"]').innerHTML = branch.strands.map((strand, index) => {
        const picked = [...pattern.querySelectorAll(`[data-strand="${index}"]:checked`)].map((input) => input.value);
        const supported = picked.length === strand[2].length && strand[2].every((key) => picked.includes(key));
        return `<p><strong>${strand[0]}: ${supported ? "supported by the record" : "reconsider the evidence"}.</strong> Supported labels: ${strand[2].map((key) => labels[key]).join(", ")}. ${strand[3]}</p>`;
      }).join("") + `<p>${branch.lesson}</p>`;
    }
  });

  const fit = find(lab, '[data-s1rl="fit"]');
  const activities = [
    ["menu", "Two fixed menus", "Prep falls from ₹15 to ₹10 per meal; kitchen time falls from 4 to 3 minutes."],
    ["preorder", "Preorders by 10 am", "Waste allowance falls from ₹10 to ₹4; with fixed menus it falls a further ₹2."],
    ["routes", "One clustered delivery route", "Delivery falls from ₹25 to ₹15; route capacity rises from 150 to 180 meals."],
    ["coord", "Share orders with purchasing and dispatch", "₹300/day setup cost. With both preorders and routes, procurement falls ₹3, delivery ₹2 and route capacity rises a further 20."],
    ["extra", "Add same-price express delivery and custom menus", "Every modeled meal adds ₹8 ingredients, ₹12 prep, ₹15 delivery and ₹4 waste. Prep takes 2 extra minutes; route capacity falls by 60."],
  ];
  fit.innerHTML = `
    <header><p class="s1rl-kicker">Lab 2 · Fit among activities</p><h3>Build an activity system, then test the tempting extra</h3></header>
    <p><strong>Before:</strong> fictional TiffinLoop promises a dependable ₹120 weekday lunch to one office cluster. Its uncoordinated operation has a 600-minute kitchen budget and limited delivery capacity. Choose activities that support this particular promise.</p>
    <details class="s1rl-assumptions" open><summary>All numerical assumptions are fictional</summary><p>One unit = one meal; period = one day. Assume 140 orders for this exercise, not a demand prediction. Baseline food ₹65 + prep ₹15 + delivery ₹25 + waste ₹10 = ₹115 variable cost. Daily fixed costs are ₹2,400. Kitchen capacity is 600 ÷ minutes per meal; route capacity starts at 150. Capacity is the smaller of kitchen and route limits. Excludes taxes, acquisition, financing and other costs.</p></details>
    <fieldset><legend>Your operating choices</legend><div class="s1rl-activity-choices">${activities.map(([key, title, explanation]) => `<label class="s1rl-choice${key === "extra" ? " s1rl-choice-risk" : ""}"><input type="checkbox" data-fit="${key}"><span><strong>${title}</strong><small>${explanation}</small></span></label>`).join("")}</div></fieldset>
    <h4>What connects to what?</h4><div data-s1rl-graph="fit" class="s1rl-map" role="group" aria-label="Activity connections"></div>
    <p data-fit-connections class="s1rl-evidence"></p>
    <div class="s1rl-table-wrap"><table><caption>Before and after your choices · simplified daily model</caption><thead><tr><th scope="col">Measure</th><th scope="col">Baseline</th><th scope="col">Your system</th></tr></thead><tbody data-fit-table></tbody></table></div>
    <div class="s1rl-feedback" data-s1rl-output="fit" role="status" aria-live="polite"></div>
    <div class="s1rl-actions">${reset("Reset activity builder")}</div>
    <p class="s1rl-bridge">Bridge: inspect ${link("story-ikea", "IKEA’s connected activities")}, ${link("story-dmart", "DMart’s operating choices")} and ${link("story-nykaa", "Nykaa’s reinforcement")}. Ask which dependency a rival would need to reproduce. Fit can strengthen a position; it does not guarantee profit or make imitation impossible. ${link("note-fit", "Read the fit study note")}.</p>`;
  function calculateFit() {
    const on = Object.fromEntries(activities.map(([key]) => [key, find(fit, `[data-fit="${key}"]`).checked]));
    const reinforcement = on.menu && on.preorder;
    const optimization = on.coord && on.preorder && on.routes;
    const food = 65 - (optimization ? 3 : 0) + (on.extra ? 8 : 0);
    const prep = 15 - (on.menu ? 5 : 0) + (on.extra ? 12 : 0);
    const delivery = 25 - (on.routes ? 10 : 0) - (optimization ? 2 : 0) + (on.extra ? 15 : 0);
    const waste = 10 - (on.preorder ? 6 : 0) - (reinforcement ? 2 : 0) + (on.extra ? 4 : 0);
    const variable = food + prep + delivery + waste, contribution = 120 - variable;
    const fixed = 2400 + (on.coord ? 300 : 0);
    const kitchen = Math.floor(600 / ((on.menu ? 3 : 4) + (on.extra ? 2 : 0)));
    const route = (on.routes ? 180 : 150) + (optimization ? 20 : 0) - (on.extra ? 60 : 0);
    const capacity = Math.min(kitchen, route), quantity = Math.min(140, capacity);
    const breakeven = contribution > 0 ? Math.ceil(fixed / contribution) : null;
    const remaining = quantity * contribution - fixed;
    const rows = [
      ["Variable cost / meal", money(115), money(variable), "variable"],
      ["Contribution / meal", money(5), money(contribution), "contribution"],
      ["Fixed cost / day", money(2400), money(fixed), "fixed"],
      ["Feasible capacity / day", "150 meals", `${capacity} meals`, "capacity"],
      ["Break-even volume", "480 meals", breakeven === null ? "No finite break-even at this contribution" : `${breakeven} meals`, "breakeven"],
      ["Feasible exercise orders", "140 meals", `${quantity} meals`, "quantity"],
      ["After modeled fixed costs", money(-1700), money(remaining), "remaining"],
    ];
    find(fit, "[data-fit-table]").innerHTML = rows.map(([title, before, after, key]) => `<tr><th scope="row">${title}</th><td>${before}</td><td data-fit-metric="${key}">${after}</td></tr>`).join("");
    find(fit, '[data-s1rl-graph="fit"]').innerHTML = `<div class="s1rl-map-promise">Promise: dependable ₹120 office lunch</div><p class="s1rl-map-caption">Select the activities independently, then inspect the links that require a combination.</p><div class="s1rl-map-row">${[
      ["menu", "Fixed menus", "Stable portions and shorter prep"], ["preorder", "Preorders", "Known quantities before cooking"], ["routes", "Clustered route", "Fewer delivery stops"],
    ].map(([key, title, text], index) => `${index ? '<span class="s1rl-map-plus" aria-hidden="true">+</span>' : ""}<div class="s1rl-node${on[key] ? " is-on" : ""}"><strong>${title}</strong><small>${on[key] ? "Selected. " : "Not selected. "}${text}</small></div>`).join("")}</div><div class="s1rl-node s1rl-node-reinforcement${reinforcement ? " is-on" : ""}"><strong>Fixed menus + preorders → less waste</strong><small>${reinforcement ? "Active connection: another ₹2 waste reduction per meal, beyond the preorder saving" : "Inactive connection: the extra ₹2 reduction requires both activities"}</small></div><div class="s1rl-node s1rl-node-coordination${optimization ? " is-on" : ""}"><strong>Preorders + clustered route + shared coordination → purchasing and dispatch savings</strong><small>${optimization ? "Active connection: food falls ₹3, delivery falls ₹2 and route capacity gains 20 places" : "Inactive connection: all three activities are required; coordination alone does not deliver these savings"}</small></div>${on.extra ? '<div class="s1rl-node s1rl-node-conflict"><strong>Express + custom at the same price</strong><small>More ingredients, urgent stops and prep compete with this system.</small></div>' : ""}`;
    const connections = [
      on.menu ? "Consistency: fixed menus support the simple lunch promise." : "Consistency: consider whether each choice supports the lunch promise.",
      reinforcement ? "Reinforcement: fixed portions plus known quantities remove another ₹2 waste per meal." : "Reinforcement: the extra ₹2 waste reduction requires both fixed menus and preorders.",
      optimization ? "Optimization: shared order data coordinates buying and routing, saving ₹5 more per meal and adding 20 route places." : "Optimization: shared planning needs order data and a clustered route; buying software alone is insufficient.",
    ];
    find(fit, "[data-fit-connections]").textContent = connections.join(" ");
    const feasibility = breakeven === null ? "Each additional meal has nonpositive contribution; more volume cannot cover fixed costs in this model." : breakeven > capacity ? `Break-even needs ${breakeven} meals, above the ${capacity}-meal capacity.` : `Break-even needs ${breakeven} meals and is within capacity; actual demand and omitted costs still matter.`;
    find(fit, '[data-s1rl-output="fit"]').textContent = `After: food ${money(food)} + prep ${money(prep)} + delivery ${money(delivery)} + waste ${money(waste)} = ${money(variable)} variable cost. Kitchen ${kitchen}; route ${route}; feasible capacity ${capacity}. ${140 - quantity} of the assumed 140 orders cannot be served. ${feasibility} ${on.coord && !optimization ? "The ₹300 coordination cost is paid, but its missing dependencies prevent the modeled savings. " : ""}${on.extra ? "The express/custom extra changes the promise and consumes batching capacity. Refusing it gives up potential orders; accepting it would need a separately tested price or a redesigned system." : "Try the contradictory extra, then decide which request you would refuse and why."}`;
  }
  fit.addEventListener("change", (event) => { if (event.target.matches("[data-fit]")) calculateFit(); });
  fit.addEventListener("click", (event) => { if (event.target.closest('[data-s1rl-action="reset"]')) { fit.querySelectorAll("[data-fit]").forEach((input) => { input.checked = false; }); calculateFit(); } });
  calculateFit();

  const position = find(lab, '[data-s1rl="position"]');
  const positions = {
    variety: { name: "A breakfast specialist", before: "A fictional Bengaluru operator offers two standardized breakfast boxes to students, office workers and travellers. Its distinction begins with a narrow service range, not one customer segment.", trigger: "Which subset of services can a distinctive activity system serve well?", focused: "Two-item batch kitchen and scheduled collection", broad: "A made-to-order menu across cuisines", request: "Customers ask for ten extra custom menus at the existing price.", price: 100, fixed: 1800, cost: [70, 110], capacity: [140, 70], addCost: 25, addCapacity: 50, refusal: "Refuse the custom menus at this price; preserve standardized prep.", evidence: "Test repeat purchases, queue times and whether the two boxes meet a sufficiently large need." },
    needs: { name: "A night-shift meal bundle", before: "A fictional hospital shift team needs timed delivery, clear nutrition information and spill-resistant packaging together. A cheap meal alone leaves parts of that bundle unmet.", trigger: "Which particular group has a linked set of underserved needs?", focused: "Design the full shift-worker bundle", broad: "Sell a generic low-cost box without timed delivery or labeling", request: "The operator is asked to serve every customer group at ad hoc meal times.", price: 130, fixed: 2400, cost: [90, 68], capacity: [100, 150], addCost: 30, addCapacity: 30, refusal: "Refuse unrestricted meal windows; protect the shift team's complete bundle.", evidence: "Interview shift workers about the entire bundle, verify delivery windows and test their actual willingness to pay." },
    access: { name: "A remote factory-gate route", before: "Two fictional factory gates outside ordinary delivery coverage need familiar lunches. Reaching them economically, rather than unusual food preferences, is the central problem.", trigger: "Which otherwise familiar customers require a different way of reaching them?", focused: "Pool preorders and use fixed gate handoffs", broad: "Send an individual courier for every order", request: "Customers ask for instant home delivery at the same gate-route price.", price: 110, fixed: 2400, cost: [75, 130], capacity: [130, 50], addCost: 40, addCapacity: 50, refusal: "Refuse instant home delivery at this price; preserve consolidated gate handoffs.", evidence: "Observe access permission, route times, order density and failed handoffs; compare a small route pilot with alternatives." },
  };
  position.innerHTML = `
    <header><p class="s1rl-kicker">Lab 3 · Strategic positioning</p><h3>A position starts with a problem, then requires choices</h3></header>
    <form data-s1rl-form="position"><label for="s1rl-position-scenario">Choose a fictional situation</label><select id="s1rl-position-scenario" data-s1rl-control="position-scenario">${Object.entries(positions).map(([key, item]) => option(key, item.name)).join("")}</select>
    <div class="s1rl-evidence"><strong>Before the decision</strong><p data-position-before></p></div>
    <label for="s1rl-position-lens">Which is the primary starting point in this situation?</label><select id="s1rl-position-lens" data-s1rl-control="position-lens" required><option value="">Choose a lens</option>${option("variety", "Variety: a subset of products or services")}${option("needs", "Needs: a particular group's linked needs")}${option("access", "Access: a different way of reaching customers")}</select>
    <label for="s1rl-position-design">Which operating design will you use?</label><select id="s1rl-position-design" data-s1rl-control="position-design" required><option value="">Choose an operating design</option><option value="focused" data-position-focused></option><option value="broad" data-position-broad></option></select>
    <p data-position-request></p><label for="s1rl-position-boundary">Your response to the extra request</label><select id="s1rl-position-boundary" data-s1rl-control="position-boundary" required><option value="">Choose a boundary</option>${option("refuse", "Refuse it under the current offer")}${option("accept", "Accept it without raising the price")}</select>
    <p class="s1rl-model-note">Fictional daily model: assume 80 orders, capped by capacity. It is not a forecast. An accepted extra changes the average cost and capacity of the whole modeled operation; it is not free incremental revenue. Contribution = price − variable cost; break-even = fixed cost ÷ positive contribution, rounded up. Other costs and demand response are omitted.</p>
    <div class="s1rl-actions"><button type="submit" data-s1rl-action="position-run">Trace the consequences</button>${reset("Reset positioning journey")}</div></form>
    <div class="s1rl-feedback" data-s1rl-output="position" role="status" aria-live="polite"></div>
    <p class="s1rl-bridge">Bridge: revisit ${link("positioning-examples", "the three positioning bases")}, then compare ${link("story-ikea", "IKEA")} and ${link("story-nykaa", "Nykaa")}. Bases can combine; the task is to explain how a particular trigger changes activities, customers and refusals. ${link("note-positioning", "Read the positioning study note")}.</p>`;
  const positionControl = (name) => find(position, `[data-s1rl-control="position-${name}"]`);
  function refreshPosition() {
    const item = positions[positionControl("scenario").value];
    if (!item) return;
    find(position, "[data-position-before]").textContent = item.before;
    find(position, "[data-position-focused]").textContent = item.focused;
    find(position, "[data-position-broad]").textContent = item.broad;
    find(position, "[data-position-request]").textContent = `The tempting expansion: ${item.request}`;
    ["lens", "design", "boundary"].forEach((key) => { positionControl(key).value = ""; });
    find(position, '[data-s1rl-output="position"]').replaceChildren();
  }
  position.addEventListener("change", (event) => { if (event.target === positionControl("scenario")) refreshPosition(); });
  position.addEventListener("click", (event) => { if (event.target.closest('[data-s1rl-action="reset"]')) { find(position, "form").reset(); refreshPosition(); } });
  position.addEventListener("submit", (event) => {
    event.preventDefault();
    const key = positionControl("scenario").value, item = positions[key];
    const lens = positionControl("lens").value, design = positionControl("design").value, boundary = positionControl("boundary").value;
    if (!item || !["variety", "needs", "access"].includes(lens) || !["focused", "broad"].includes(design) || !["refuse", "accept"].includes(boundary)) return;
    const expanded = boundary === "accept", focused = design === "focused";
    const cost = item.cost[focused ? 0 : 1] + (expanded ? item.addCost : 0);
    const capacity = Math.max(0, item.capacity[focused ? 0 : 1] - (expanded ? item.addCapacity : 0));
    const contribution = item.price - cost, quantity = Math.min(80, capacity);
    const breakeven = contribution > 0 ? Math.ceil(item.fixed / contribution) : null;
    const broadRefusal = {
      variety: "You refused the extra menus, but the selected made-to-order design still lacks the two-item batch kitchen. Refusal alone does not create standardized prep.",
      needs: "You refused the extra meal windows, but the selected generic box still omits timed delivery and labeling. Refusal alone does not complete the shift-worker bundle.",
      access: "You refused the extra home-delivery promise, but the selected design still sends an individual courier for every order. Refusal alone does not create consolidated gate handoffs.",
    };
    const refusal = expanded ? "Accepting the extra reduces capacity and changes the cost structure. A new price or redesigned system would need its own evidence; the old promise cannot simply be carried over." : focused ? item.refusal : broadRefusal[key];
    find(position, '[data-s1rl-output="position"]').innerHTML = `<h4>After your choices: evidence and limits</h4><p><strong>${lens === key ? "Your primary lens fits the stated trigger." : "Revisit your primary lens."}</strong> Here the starting question is: ${item.trigger} Other bases can coexist; naming one does not exclude them.</p><dl class="s1rl-results"><div><dt>Price / variable cost</dt><dd><span data-position-metric="price">${money(item.price)}</span> / <span data-position-metric="variable">${money(cost)}</span></dd></div><div><dt>Contribution</dt><dd data-position-metric="contribution">${money(contribution)} per meal</dd></div><div><dt>Fixed cost / capacity</dt><dd><span data-position-metric="fixed">${money(item.fixed)}</span> / <span data-position-metric="capacity">${capacity}</span> meals</dd></div><div><dt>Break-even</dt><dd data-position-metric="breakeven">${breakeven === null ? "No finite volume at this contribution" : `${breakeven} meals${breakeven > capacity ? "; above capacity" : "; within capacity"}`}</dd></div><div><dt>After modeled fixed costs</dt><dd data-position-metric="remaining">${money(quantity * contribution - item.fixed)} at ${quantity} feasible assumed orders</dd></div></dl><p><strong>Refusal and cost:</strong> ${refusal} ${80 - quantity} assumed orders exceed capacity.</p><p><strong>Position check:</strong> ${focused ? "The chosen activities address the scenario's stated problem, subject to testing." : key === "needs" ? "The cheaper box omits delivery timing and labeling. Attractive arithmetic cannot establish that customers will buy an incomplete bundle." : "The broad design dilutes the specific service or reach advantage; inspect what the extra complexity displaces."}</p><p><strong>What would make you revise?</strong> ${item.evidence} These numbers illustrate a mechanism, not a business forecast or proof of competitive advantage.</p>`;
  });
  refreshPosition();
})();
