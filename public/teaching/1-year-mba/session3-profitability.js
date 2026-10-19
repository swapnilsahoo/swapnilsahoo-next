/* Progressive enhancement: every chart, table and source is present without JS. */
(() => {
  const root = document.getElementById('profitability-spectrum');
  if (!root) return;
  const controls = root.querySelector('[data-ps-controls]');
  const period = root.querySelector('[data-ps-period]');
  const search = root.querySelector('[data-ps-search]');
  const result = root.querySelector('[data-ps-result]');
  const views = [...root.querySelectorAll('[data-ps-view]')];
  const status = root.querySelector('[data-ps-status]');
  if (!controls || !period || !search || !result || !status || !views.length) return;
  const update = () => {
    const query = search.value.trim().toLocaleLowerCase();
    let count = 0, total = 0;
    for (const view of views) {
      const active = view.dataset.psView === period.value;
      view.hidden = !active;
      for (const row of view.querySelectorAll('[data-ps-industry]')) {
        const matches = row.dataset.psIndustry.toLocaleLowerCase().includes(query)
          && (result.value === 'all' || row.dataset.result === result.value);
        row.hidden = !matches;
        if (active && row.classList.contains('ps-row')) { total++; if (matches) count++; }
      }
      const empty = view.querySelector('[data-ps-empty]');
      if (empty) empty.hidden = !active || count !== 0;
    }
    status.textContent = `${count} of ${total} industries. Ordered from highest to lowest ROIC.`;
  };
  controls.hidden = false;
  period.addEventListener('change', update);
  result.addEventListener('change', update);
  search.addEventListener('input', update);
  update();
})();
