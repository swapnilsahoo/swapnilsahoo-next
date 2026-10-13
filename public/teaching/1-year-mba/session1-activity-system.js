/* A simplified teaching map of Southwest's historical activity system (Porter, 1996). */
(() => {
  const svg = document.getElementById('porterMap');
  const edges = document.getElementById('porterEdges');
  const nodes = document.getElementById('porterNodes');
  const info = document.getElementById('porterNodeInfo');
  const message = document.getElementById('porterCopyMsg');
  const chooser = document.getElementById('porterActivitySelect');
  if (!svg || !edges || !nodes || !info) return;

  const activities = [
    { id: 'price', x: 260, y: 40, r: 42, core: true, label: 'Very low\nticket prices' },
    { id: 'freq', x: 100, y: 130, r: 40, core: true, label: 'Frequent,\nreliable\ndepartures' },
    { id: 'util', x: 420, y: 130, r: 38, core: true, label: 'High aircraft\nutilisation' },
    { id: 'crew', x: 260, y: 175, r: 40, core: true, label: 'Lean, productive\nground crews' },
    { id: 'fleet', x: 420, y: 265, r: 36, core: false, label: 'Standard\n737 fleet' },
    { id: 'nomeal', x: 90, y: 250, r: 32, core: false, label: 'No meals' },
    { id: 'noseat', x: 175, y: 305, r: 34, core: false, label: 'No seat\nassignments' },
    { id: 'nobag', x: 300, y: 330, r: 36, core: false, label: 'No baggage\ntransfers' },
    { id: 'point', x: 55, y: 190, r: 34, core: false, label: 'Point-to-point\nshort haul' },
    { id: 'auto', x: 410, y: 355, r: 34, core: false, label: 'Automated\nticketing' },
  ];
  const connections = [
    ['price', 'freq'], ['price', 'crew'], ['price', 'nomeal'], ['price', 'noseat'], ['price', 'auto'],
    ['freq', 'crew'], ['freq', 'point'], ['freq', 'util'],
    ['crew', 'util'], ['crew', 'nobag'], ['crew', 'noseat'], ['crew', 'fleet'],
    ['util', 'fleet'], ['util', 'nobag'], ['point', 'nobag'],
  ];
  const explanations = {
    price: 'Lower service and distribution costs, combined with productive aircraft use, can support low fares. A low price by itself does not establish a distinctive position.',
    freq: 'In this historical model, point-to-point routes and faster turnarounds support frequent departures. Reliability still depends on execution and operating conditions.',
    util: 'Aircraft utilisation connects turnaround decisions, fleet coordination and scheduling. More flying time can spread aircraft costs over more services; it is not a guarantee of profit.',
    crew: 'Productive ground crews connect fleet simplicity and reduced ground handling to shorter turnarounds. Those links matter more than treating a lean crew as an isolated cost cut.',
    fleet: 'A common aircraft type can simplify training, maintenance and scheduling, helping coordinated ground work and aircraft use. The effect depends on how those activities are organised.',
    nomeal: 'Removing meals reduces catering work and its associated costs. Copying that choice may create some efficiency gains without reproducing the airline\'s wider system.',
    noseat: 'The historical open-seating choice was intended to simplify boarding and support the low-cost system. Boarding speed is a claim to investigate, not an automatic consequence or a current Southwest policy.',
    nobag: 'Avoiding baggage transfers reduces connection-related handling and coordination. This supports a point-to-point scope while giving up some convenience for connecting passengers.',
    point: 'Short-haul point-to-point routing reduces dependence on connecting flights and baggage transfers. It supports the selected travel scope while limiting some network journeys.',
    auto: 'Automated ticketing can reduce distribution work and cost. Similar technology is also available to rivals; its role here is consistency with the broader low-cost system.',
  };
  const byId = new Map(activities.map(activity => [activity.id, activity]));
  const nodeElements = new Map();
  const namespace = 'http://www.w3.org/2000/svg';
  const label = id => byId.get(id).label.replaceAll('\n', ' ');
  if (chooser) {
    chooser.replaceChildren();
    [['', 'Choose an activity'], ...activities.map(activity => [activity.id, label(activity.id)])].forEach(([value, name]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = name;
      chooser.append(option);
    });
    chooser.addEventListener('change', () => chooser.value ? select(chooser.value) : reset());
  }
  function element(tag, attributes) {
    const item = document.createElementNS(namespace, tag);
    Object.entries(attributes).forEach(([key, value]) => item.setAttribute(key, String(value)));
    return item;
  }

  edges.replaceChildren();
  nodes.replaceChildren();
  connections.forEach(([a, b]) => {
    const start = byId.get(a), end = byId.get(b);
    const line = element('line', {
      x1: start.x, y1: start.y, x2: end.x, y2: end.y,
      stroke: '#cbd5e1', 'stroke-width': 1.5, class: 'porter-edge',
    });
    line.dataset.a = a;
    line.dataset.b = b;
    edges.append(line);
  });

  function paint(selected = null, copied = []) {
    const adjacent = selected ? connections.flatMap(([a, b]) => a === selected ? [b] : b === selected ? [a] : []) : [];
    nodeElements.forEach(({ group, circle }, id) => {
      const isSelected = id === selected;
      const isLinked = adjacent.includes(id);
      const isCopied = copied.includes(id);
      group.setAttribute('aria-pressed', String(isSelected));
      group.dataset.state = isSelected ? 'selected' : isCopied ? 'copied' : isLinked ? 'connected' : 'rest';
      circle.setAttribute('stroke', isSelected ? '#b45309' : isLinked || isCopied ? '#2563eb' : byId.get(id).core ? '#1e3a8a' : '#a5b4fc');
      circle.setAttribute('stroke-width', isSelected ? '4' : isLinked || isCopied ? '3' : '1.5');
    });
    edges.querySelectorAll('line').forEach(line => {
      const highlighted = selected ? line.dataset.a === selected || line.dataset.b === selected : copied.includes(line.dataset.a) && copied.includes(line.dataset.b);
      line.setAttribute('stroke', highlighted ? '#2563eb' : '#cbd5e1');
      line.setAttribute('stroke-width', highlighted ? '2.5' : '1.5');
    });
    return adjacent;
  }

  function select(id) {
    const adjacent = paint(id);
    if (chooser) chooser.value = id;
    if (message) message.textContent = '';
    info.textContent = `Selected: ${label(id)}. ${explanations[id]} Direct links shown in this simplified map: ${adjacent.map(label).join('; ')}.`;
  }

  activities.forEach(activity => {
    const group = element('g', {
      class: 'porter-node', tabindex: 0, role: 'button',
      'aria-label': `Explore ${label(activity.id)} in the historical activity system`, 'aria-pressed': 'false',
    });
    group.dataset.id = activity.id;
    group.style.cursor = 'pointer';
    const focus = element('circle', {
      cx: activity.x, cy: activity.y, r: activity.r + 6,
      fill: 'none', stroke: '#b45309', 'stroke-width': 3, visibility: 'hidden', 'aria-hidden': 'true',
    });
    const circle = element('circle', {
      cx: activity.x, cy: activity.y, r: activity.r,
      fill: activity.core ? '#1e3a8a' : '#e0e7ff',
      stroke: activity.core ? '#1e3a8a' : '#a5b4fc', 'stroke-width': 1.5,
    });
    group.append(focus, circle);
    const lines = activity.label.split('\n');
    lines.forEach((line, index) => {
      const text = element('text', {
        x: activity.x, y: activity.y + (index - (lines.length - 1) / 2) * 10 + 3,
        'text-anchor': 'middle', 'font-size': 8.5,
        fill: activity.core ? '#ffffff' : '#1e3a8a', 'font-weight': activity.core ? 600 : 500,
      });
      text.textContent = line;
      group.append(text);
    });
    group.addEventListener('click', () => select(activity.id));
    group.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        group.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });
    group.addEventListener('focus', () => focus.setAttribute('visibility', 'visible'));
    group.addEventListener('blur', () => focus.setAttribute('visibility', 'hidden'));
    nodeElements.set(activity.id, { group, circle });
    nodes.append(group);
  });

  function reset() {
    paint();
    if (chooser) chooser.value = '';
    info.textContent = 'Select any activity to trace its direct links. This simplified 1996 model illustrates possible reinforcement, not measured causal effects or the airline\'s current service policies.';
    if (message) message.textContent = '';
  }
  function copy(ids, explanation) {
    paint(null, ids);
    if (chooser) chooser.value = '';
    info.textContent = `Copied activities: ${ids.map(label).join('; ')}. Outlined nodes show the copied subset; highlighted lines connect copied activities. Other activities remain readable for comparison.`;
    if (message) message.textContent = explanation;
  }
  document.getElementById('porterCopyOne')?.addEventListener('click', () => copy(['nomeal'], 'A rival removes meals. It may save catering and handling costs, but fleet, routing, crew coordination and scheduling remain different. An isolated efficiency gain does not demonstrate that the whole position has been copied.'));
  document.getElementById('porterCopyThree')?.addEventListener('click', () => copy(['nomeal', 'noseat', 'auto'], 'A rival copies three historical choices: no meals, no assigned seats and automated ticketing. Some cost or process gains are possible. Their effect on turnaround, utilisation, customer value and the rival\'s existing commitments still needs evidence; the complete advantage is unproven.'));
  document.getElementById('porterReset')?.addEventListener('click', reset);
  reset();
})();
