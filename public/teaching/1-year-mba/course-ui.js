(() => {
  'use strict';
  const source = document.querySelector('script[data-course-session]');
  const number = Number(source?.dataset.courseSession);
  if (!Number.isInteger(number) || number < 1 || number > 13) return;
  const titles = [
    'Introduction to Strategy', 'Framework for Strategic Analysis',
    'Industry Analysis: The Fundamentals', 'Beyond the Five Forces',
    'Internal Analysis & Resource-Based View', 'Shared Value and Competitive Advantage',
    'Differentiation, Cost Leadership & Blue Ocean', 'Entrepreneurship, Platforms, Technology & Innovation',
    'Vertical Integration & Diversification', 'Strategic Alliances, Mergers & Acquisitions',
    'Global Strategy & MNC', 'Organizational Design: Structure, Culture & Control',
    'Corporate Governance, Ethics & Business Models',
  ];
  const prompts = [
    'State a strategy for a firm you know. Identify its objective, scope and advantage, then name an activity it must refuse.',
    'Choose one enduring purpose or value and one measurable ambition. What strategic choice connects them without confusing the ambition with a strategy?',
    'Choose the force that most constrains an industry’s profit potential. What evidence supports the mechanism, and what action could change your firm’s position?',
    'Choose one player, rule or relationship you could change in a business ecosystem. How might another player respond, and what uncertainty matters most?',
    'Name a candidate core competence. Explain the customer benefit, markets it could open, and why rivals would struggle to reproduce it.',
    'Choose a way to widen the gap between willingness to pay and cost. Explain who creates the value, who captures it, and what would erode it.',
    'Propose a change to the offer: what will you eliminate, reduce, raise or create? Explain the value–cost logic and the commitment that makes it durable.',
    'Choose a side of a platform to support, or an emerging customer need to pursue. Explain the cross-side effect or disruption mechanism and how you would test it.',
    'Choose a business or activity to own. Explain why this parent adds more value than alternative owners, and where ownership could destroy value.',
    'Choose whether to ally, acquire or build for a particular strategic need. Explain the interdependence, uncertainty and integration choice behind your recommendation.',
    'Choose a cross-border move. Identify the distance that matters most and the balance of adaptation, aggregation and arbitrage you would use.',
    'Choose an execution problem. Explain whether decision rights, information, incentives, structure or culture is the constraint, and propose a specific change.',
    'Choose a governance or ethics dilemma. Name the affected stakeholders, the incentive or blind spot at work, and the safeguard you would put in place.',
  ];
  const node = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  };
  const lessonHref = n => `/teaching/1-year-mba/session${n}.html`;
  const phase = number < 7 ? 'Analysis' : number < 12 ? 'Formulation' : 'Implementation';
  const skip = node('a', 'course-skip', 'Skip to the lesson');
  skip.href = '#top';
  document.body.prepend(skip);
  const top = document.getElementById('top');
  if (top) top.tabIndex = -1;
  const nav = node('nav', 'course-path');
  nav.setAttribute('aria-label', 'Navigate the 13-session course');
  const inner = node('div', 'course-path-inner');
  const map = node('a', 'course-map-link', '← Course map');
  map.href = '/teaching/1-year-mba#course-map';
  inner.append(map, node('span', 'course-phase', `${phase} · Session ${number} of 13`));
  const switcher = node('div', 'course-switcher');
  const label = node('label', '', 'Go to');
  label.htmlFor = 'course-session-select';
  const select = node('select');
  select.id = 'course-session-select';
  titles.forEach((title, i) => {
    const option = node('option', '', `${String(i + 1).padStart(2, '0')} · ${title}`);
    option.value = String(i + 1);
    option.selected = number === i + 1;
    select.append(option);
  });
  select.addEventListener('change', () => location.assign(lessonHref(Number(select.value))));
  switcher.append(label, select);
  for (const [n, text, prefix] of [[number - 1, '←', 'Previous'], [number + 1, '→', 'Next']]) {
    if (n < 1 || n > 13) continue;
    const a = node('a', 'course-step', text);
    a.href = lessonHref(n);
    a.setAttribute('aria-label', `${prefix}: Session ${n}, ${titles[n - 1]}`);
    a.title = `${prefix}: ${titles[n - 1]}`;
    switcher.append(a);
  }
  inner.append(switcher);
  nav.append(inner);
  const header = document.getElementById('main-header');
  if (header) header.after(nav);
  const sectionLinks = header?.querySelector('.nav-link')?.parentElement;
  if (sectionLinks) {
    sectionLinks.classList.add('course-section-links');
    const fitHeader = () => {
      header.classList.remove('course-compact');
      if (!sectionLinks.getClientRects().length) return;
      const row = sectionLinks.parentElement;
      const children = [...row.children];
      const otherWidth = children.filter(child => child !== sectionLinks)
        .reduce((width, child, i) => width + (i === 0 ? Math.min(280, child.scrollWidth) : child.scrollWidth), 0);
      header.classList.toggle('course-compact', sectionLinks.scrollWidth + otherWidth + 40 > row.clientWidth);
    };
    fitHeader();
    window.addEventListener('resize', fitHeader, { passive: true });
    document.fonts?.ready.then(fitHeader);
  }

  // Existing lesson scripts own the theme toggle. Reflect its state accessibly.
  const theme = document.getElementById('themeBtn');
  const syncTheme = () => {
    const dark = document.documentElement.classList.contains('dark');
    if (!theme) return;
    theme.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    theme.setAttribute('aria-pressed', String(dark));
  };
  syncTheme();
  new MutationObserver(syncTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  // Add focus containment to the shared mobile menu without duplicating its controls.
  const drawer = document.getElementById('drawer');
  const drawerButton = document.getElementById('drawerBtn');
  const dialog = drawer?.querySelector('aside');
  if (drawer && dialog) {
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-label', `Session ${number} contents`);
    dialog.setAttribute('aria-modal', 'true');
    drawerButton?.setAttribute('aria-controls', 'drawer');
    const priorInert = new Map();
    let wasOpen = false;
    const updateDrawer = () => {
      const open = !drawer.classList.contains('hidden');
      if (open === wasOpen) return;
      wasOpen = open;
      if (open) {
        for (const el of document.body.children) {
          if (el === drawer || /^(SCRIPT|STYLE|LINK)$/.test(el.tagName)) continue;
          priorInert.set(el, el.inert);
          el.inert = true;
        }
        dialog.querySelector('button, a[href]')?.focus();
      } else {
        priorInert.forEach((inert, el) => { el.inert = inert; });
        priorInert.clear();
        drawerButton?.focus({ preventScroll: true });
      }
    };
    new MutationObserver(updateDrawer).observe(drawer, { attributes: true, attributeFilter: ['class'] });
    drawer.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll('button, a[href], select, textarea, input, [tabindex="0"]')]
        .filter(el => !el.disabled && el.getClientRects().length);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    });
  }
  // Arrow keys follow the existing click behaviour in every reading tab group.
  document.querySelectorAll('[role="tablist"]').forEach(list => {
    list.addEventListener('keydown', event => {
      if (event.defaultPrevented) return;
      const tabs = [...list.querySelectorAll('[role="tab"]')];
      const index = tabs.indexOf(document.activeElement);
      if (index < 0) return;
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus(); tabs[next].click();
    });
  });

  // An optional reflection is private to this browser and can be downloaded by its author.
  const memo = node('section', 'course-memo');
  memo.setAttribute('aria-label', 'My strategy memo');
  const details = node('details');
  details.append(node('summary', '', 'Keep a strategy memo'));
  const body = node('div', 'course-memo-body');
  body.append(node('p', 'course-memo-prompt', prompts[number - 1]), node('p', 'course-memo-hint', 'Use the readings and case evidence. Your notes stay in this browser; they are not submitted or graded.'));
  const grid = node('div', 'course-memo-grid');
  const fields = ['My decision', 'Evidence and trade-off', 'What would change my mind?'];
  const key = `pgpm-v02-session${number}-memo`;
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(key) || '[]'); } catch { /* empty memo */ }
  if (!Array.isArray(saved)) saved = [];
  const inputs = fields.map((name, i) => {
    const label = node('label', '', name);
    const textarea = node('textarea');
    textarea.id = `course-memo-${i}`;
    textarea.rows = 4; textarea.maxLength = 4000;
    textarea.value = typeof saved[i] === 'string' ? saved[i] : '';
    label.htmlFor = textarea.id;
    label.append(textarea); grid.append(label);
    return textarea;
  });
  const status = node('p', 'course-memo-status');
  status.setAttribute('role', 'status');
  const save = () => {
    try {
      localStorage.setItem(key, JSON.stringify(inputs.map(input => input.value)));
      status.textContent = 'Saved in this browser.';
    } catch { status.textContent = 'This browser could not save your notes. Download your memo to keep it.'; }
  };
  inputs.forEach(input => input.addEventListener('input', save));
  const actions = node('div', 'course-memo-actions');
  const download = node('button', '', 'Download my memo');
  download.type = 'button';
  download.addEventListener('click', () => {
    const text = [`PGPM 2026–27 · Session ${number}: ${titles[number - 1]}`, prompts[number - 1], ...fields.map((field, i) => `${field}\n${inputs[i].value}`)].join('\n\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = node('a'); link.href = url; link.download = `session-${number}-strategy-memo.txt`;
    link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'Memo prepared for download.';
  });
  const clear = node('button', '', 'Clear this memo');
  clear.type = 'button';
  clear.addEventListener('click', () => {
    inputs.forEach(input => { input.value = ''; }); save();
    status.textContent = 'This session’s memo is empty.';
  });
  actions.append(download, clear);
  body.append(grid, actions, status); details.append(body); memo.append(details);
  const readings = document.getElementById('readings');
  if (readings) readings.before(memo);
})();
