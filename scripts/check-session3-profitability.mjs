import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

export async function checkSession3Profitability() {
  const root = 'public/teaching/1-year-mba';
  const data = JSON.parse(await fs.readFile(`${root}/data/profitability-spectrum.json`,'utf8'));
  const html = await fs.readFile(`${root}/session3.html`,'utf8');
  const approximately = (actual,expected,label) => assert.ok(Math.abs(actual-expected)<1e-12,label);
  const sources = new Map(data.sources.map(source=>[source.file,source]));
  assert.equal(sources.size,24,'Twelve distinct ROIC and WACC source pairs');
  for (const source of sources.values()) {
    assert.match(source.url,/^https:\/\/pages\.stern\.nyu\.edu\/~adamodar\/pc\/(archives|datasets)\/\w+\.xls$/);
    assert.match(source.sha256,/^[a-f\d]{64}$/);
  }
  assert.equal(data.requested_window_available,false,'No invented 1975–2026 coverage');
  assert.equal(data.history.length,83);
  assert.equal(data.snapshot.length,85);
  assert.equal(data.companies.groups.length,16);
  assert.equal(data.historical_window.observations,12);
  const years = Array.from({length:12},(_,i)=>2015+i);
  const snapshot = new Map(data.snapshot.map(row=>[row.industry,row]));
  assert.equal(snapshot.size,85);
  for (const row of [...data.history,...data.snapshot]) {
    assert.ok(!data.exclusions.includes(row.industry),`Excluded financial industry: ${row.industry}`);
    assert.ok(!row.industry.startsWith('Total Market'),'Market totals are not industries');
    assert.ok(Number.isFinite(row.roic) && Number.isFinite(row.wacc));
    assert.ok(row.wacc>0);
  }
  for (const row of data.history) {
    assert.deepEqual(row.observations.map(observation=>observation.year),years,`${row.industry}: same annual observations for both means`);
    approximately(row.roic,row.observations.reduce((sum,o)=>sum+o.roic,0)/12,`${row.industry}: ROIC arithmetic mean`);
    approximately(row.wacc,row.observations.reduce((sum,o)=>sum+o.wacc,0)/12,`${row.industry}: WACC arithmetic mean`);
    for (const observation of row.observations) {
      assert.equal(observation.industry,row.industry,'Identical-name panel, no silent industry mappings');
      assert.ok(Number.isInteger(observation.firms) && observation.firms>0);
      for (const [metric,column] of [['roic','H'],['wacc','K']]) {
        const locator = observation[metric+'_cell'];
        assert.match(locator,new RegExp(` / ${column}\\d+$`));
        const source = sources.get(locator.split(' / ')[0]);
        assert.ok(source,`${locator}: traceable workbook`);
        assert.equal(Number(source.internal_date.slice(0,4)),observation.year,'Workbook internal year matches the snapshot label');
      }
    }
    approximately(row.observations.at(-1).roic,snapshot.get(row.industry).roic,`${row.industry}: 2026 return agrees`);
    approximately(row.observations.at(-1).wacc,snapshot.get(row.industry).wacc,`${row.industry}: 2026 capital cost agrees`);
  }
  assert.equal(data.history.filter(row=>row.roic<0).length,0);
  assert.equal(data.history.filter(row=>row.roic<row.wacc).length,7);
  assert.deepEqual(data.snapshot.filter(row=>row.roic<0).map(row=>row.industry).sort(),['Coal & Related Energy','Electronics (Consumer & Office)']);
  const rowMatches=[...html.matchAll(/<li\b[^>]*class="ps-row"[^>]*data-ps-industry="([^"]+)"[^>]*>([\s\S]*?)<\/li>/g)];
  assert.equal(rowMatches.length,168,'Every industry is present as readable static chart content');
  assert.equal((html.match(/<tr data-ps-industry=/g)||[]).length,168,'Every chart value has a data-table row');
  const decode = value=>value.replaceAll('&amp;','&').replaceAll('&#39;',"'");
  for (const [index,rows] of [data.history,data.snapshot].entries()) {
    const ordered = [...rows].sort((a,b)=>b.roic-a.roic||a.industry.localeCompare(b.industry));
    const rendered = rowMatches.slice(index===0?0:83,index===0?83:168);
    rendered.forEach((match,i)=>{
      assert.equal(decode(match[1]),ordered[i].industry,'Full highest-to-lowest spectrum');
      assert.ok(match[2].includes((ordered[i].roic*100).toFixed(2)+'%'));
      assert.ok(match[2].includes((ordered[i].wacc*100).toFixed(2)+'%'));
    });
  }
  const symbols = new Set();
  for (const group of data.companies.groups) {
    assert.ok(snapshot.has(group.industry));
    assert.equal(group.candidates.length,2,'Named two-company screen is disclosed');
    for (const candidate of group.candidates) {
      assert.ok(!symbols.has(candidate.ticker));symbols.add(candidate.ticker);
      assert.equal(candidate.industry,group.industry);
      assert.ok(Number.isFinite(candidate.roic) && Number.isFinite(candidate.wacc));
      assert.equal(candidate.as_of,'2026-10-18');
      assert.ok(candidate.average_capital_checks.prior_annual_millions>0 && candidate.average_capital_checks.latest_quarter_millions>0);
      assert.equal(candidate.source,`https://www.gurufocus.com/term/roic/${candidate.ticker}`);
    }
  }
  assert.equal(symbols.size,32);
  const annual = await fs.readFile(`${root}/data/profitability-annual-observations.csv`,'utf8');
  const summary = await fs.readFile(`${root}/data/profitability-spectrum.csv`,'utf8');
  assert.equal(annual.trim().split(/\r?\n/).length,997,'996 annual observations plus header');
  assert.equal(summary.trim().split(/\r?\n/).length,169,'168 industry summaries plus header');
  assert.ok(html.includes('Why aren’t all industries equally profitable?'));
  assert.ok(html.includes('not a 1975–2026 average'));
  assert.ok(html.includes('not completed FY2026'));
  assert.ok(html.includes('does not identify an industry-wide or global leader'));
  assert.ok(html.includes('id="puzzle"'),'Existing historical puzzle retained');
  return '83 twelve-observation averages, 85 current industries, 32 company comparisons, traceable sources and complete static charts';
}

if (process.argv[1]?.replaceAll('\\','/').endsWith('/check-session3-profitability.mjs')) {
  console.log(`Profitability check passed: ${await checkSession3Profitability()}.`);
}
