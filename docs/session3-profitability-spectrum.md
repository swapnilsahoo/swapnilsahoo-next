# Session 3 profitability spectrum

Updated 19 October 2026. The additive exhibit is at `/teaching/1-year-mba/session3.html#profitability-spectrum`. It opens with **“Why aren’t all industries equally profitable?”** Existing Porter readings, the 1992–2006 puzzle, Tesla-era exhibits, activities, outcomes and cumulative recap remain in place.

## Coverage and interpretation

The requested **1975–2026 average is not available** in the verified public sources. NYU’s US EVA and WACC archive starts in January 1999. The retrieved dedicated ROIC workbooks first contain the same explicit **Lease & R&D adjusted after-tax ROIC** column in January 2015. The exhibit therefore labels its average **2015–2026**, with 12 paired January snapshots. No earlier years are invented, backfilled or treated as zero. These are dataset vintages rather than completed fiscal years; the January 2026 release generally uses available trailing accounting data through Q3 2025.

- **83 industries:** identical-name nonfinancial categories present in all 12 years. Each mean is the arithmetic average of the 12 published industry ratios. WACC uses those same 12 observations.
- **85 industries:** the complete numeric nonfinancial January 2026 spectrum. Publishing & Newspapers and Retail (REITs) lack all 12 identical-name observations and appear only here.
- **996 paired annual observations:** public CSV and JSON allow the historical averages to be reproduced.
- **32 companies in 16 named pairs:** the company table selects the highest TTM ROIC within each disclosed two-company comparison set and shows that company’s own WACC. It does not claim to identify an industry-wide or global leader.

The spectrum orders every included category from highest to lowest unrounded ROIC. Both views share a −10% to 70% scale. Each industry has its own WACC marker. Colours distinguish ROIC above WACC, positive ROIC below WACC, and actual negative ROIC; visible numeric labels provide the same information.

There are no negative twelve-snapshot mean ROICs in the common set. Seven means are below mean WACC. The 2026 snapshot contains two negative returns: Coal & Related Energy and Electronics (Consumer & Office). Do not add artificial negative bars to the historical view.

An annual industry ROIC is based on aggregate sector adjusted earnings and book capital, rather than a simple average of company ratios. The multi-year mean weights the annual sector ratios equally; it is not a pooled earnings/capital ratio, a compounded investment return or a fixed-company panel. Financial services and market totals are excluded. Published numeric REIT and real-estate rows remain included. Source membership, classifications and providers can change across years. No speculative renamed-category joins were made.

## Sources and company limitations

Primary industry sources are Aswath Damodaran’s [ROIC workbook](https://pages.stern.nyu.edu/~adamodar/pc/datasets/roc.xls), [WACC workbook](https://pages.stern.nyu.edu/~adamodar/pc/datasets/wacc.xls), [annual archive](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/dataarchived.html), [current dataset timing](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datacurrent.html), and [methodology](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datahistory.html). Archived filenames ending 14–24 refer to the January 2015–2025 vintages, verified against internal workbook dates. The public JSON records 24 source URLs, SHA-256 hashes and annual source-cell locators.

The dedicated ROC workbook governs all returns. Its HTML footer has an obsolete 2025 date, while the analysis header and workbook identify January 2026. The EVA workbook has a mismatching Water Utility ROC, so that value is taken from the dedicated ROC file. Current WACC inputs use market weights and a 25% marginal tax assumption for debt tax shields; ROIC operating taxes use effective rates.

Company figures come from the explicitly labelled **TTM** paragraph on each linked GuruFocus ROIC page, with its same-company WACC, dated **18 October 2026** and accessed 19 October. The page headline is an annualised latest-quarter ROIC and was not used to rank companies. GuruFocus defines capital and WACC differently from NYU, including a 6% equity market premium. Industry and company estimates are labelled as separate constructions; subtracting a company ROIC from the NYU industry WACC is inappropriate.

[NYU company classifications](https://pages.stern.nyu.edu/~adamodar/pc/datasets/indname.xlsx) verify each candidate’s US industry membership. NYU’s complete underlying company financial metrics are [not publicly shared](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/databreakdown.html), so an exhaustive same-method company ranking was not available. Eligibility checks require positive disclosed prior-annual and latest-quarter average invested capital. The provider’s TTM denominator was not independently reconstructed. Negative ROIC remains valid when the capital base is positive.

## Implementation and refresh

`public/teaching/1-year-mba/data/profitability-spectrum.json` owns the reviewed numbers, metadata and comparison sets. `scripts/build-session3-profitability.mjs` renders the marked additive HTML and two CSV downloads from that data. Re-running the builder is deterministic. The browser does not fetch data or depend on a chart library for this exhibit.

`session3-profitability.js` only enhances period selection, industry search, category filtering and result counts. All 168 chart rows, matching tables, native discussions, company comparisons and sources are readable without JavaScript. Existing lesson theme variables provide light by default and manual dark mode. Scoped CSS handles mobile layouts and scrollable tables.

When refreshing, verify the new source dates, return column, WACC construction, industry labels and company accounting periods before changing the JSON. Preserve missing values and exclusions. Rebuild with `node scripts/build-session3-profitability.mjs`, then run `node scripts/check-session3-profitability.mjs` and the course/build checks. The financial validator is included in the normal course prebuild check.

## Verification

Source review independently compared all 1,992 historical ROIC/WACC metrics, 170 current metrics, 83 recomputed means, 32 company observations and 24 workbook hashes with the retained research evidence. Financial validation checks consistent years, means, category counts, source locators, snapshot agreement, complete descending HTML, downloads and comparison-set eligibility. Browser validation covers responsive layout, period/search/category controls, keyboard use, themes, no-JavaScript reading and preservation of the original lesson.

Final browser checks passed at 1440, 768, 390 and 320px, plus 390px without JavaScript: 128 filter/search cases, chart/table parity, WACC and negative-bar geometry, keyboard controls and horizontal table scrolling, light/manual-dark themes, three downloads and the existing six-industry puzzle. All 168 static chart rows and native disclosures remain readable without JavaScript. No script errors or HTTP writes occurred. Removing the three marked additions restores the exact previous Session 3 source after line-ending normalization.

A scoped border-box rule fixes the host section’s width when Tailwind’s JavaScript preflight is unavailable. Other pre-existing sections still make the full legacy page wider than a no-JavaScript phone viewport; this release does not increase that overflow, and the new exhibit itself remains contained. Whole-page no-JavaScript conformance is not asserted.

The private research downloads and QA screenshots stay under ignored `artifacts/session1-resources/session3-profitability/`; final evidence is in `qa-release/`. Raw licensed company financial datasets were not obtained or published.
