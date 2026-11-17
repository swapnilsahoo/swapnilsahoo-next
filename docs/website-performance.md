# Loading performance

Verified on 17 November 2026 using isolated local production builds, not the development server or production data. Baseline runtime source: `10a5ef2`. Each route was measured three times with a fresh mobile browser context, disabled cache, 150 ms latency, 200 kB/s download throughput and 4x CPU throttling. External services were blocked.

| Measurement (median)                          | Before  | After   |
| --------------------------------------------- | ------- | ------- |
| Homepage largest contentful paint             | 3.52 s  | 1.86 s  |
| Learning Lab largest contentful paint         | 2.14 s  | 1.92 s  |
| Homepage resource bytes                       | 446,151 | 401,182 |
| Requests triggered by opening the mobile menu | 29      | 0       |
| Closed guide media/poster requests            | 1       | 0       |

The homepage's main content painted about 47% sooner in this controlled test. The full window load event did not improve consistently; these are local lab measurements, not a promise about every visitor or live Core Web Vitals.

Changes keep first-viewport content visible before hydration, mount navigation lists only while open, prefetch individual menu destinations on intent instead of entire menus, load mentor tools on demand, defer the closed guide's poster and avoid preloading the secondary monospace font. Existing scrolling animations, reduced-motion behavior, menu navigation and guide controls remain supported.

After a normal production build, start the isolated preview with `node scripts/learning-lab-preview.mjs`. In another terminal run:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
node scripts/test-loading-performance.mjs --label after
```

Reports and desktop/mobile screenshots stay in ignored `.data/qa/performance`. The check rejects non-local hosts, blocks external services and HTTP writes, measures `/` and `/learning-lab`, verifies pre-hydration visibility, scrolling sections, menu request volume, guide tools and responsive overflow. Functional regressions are also covered by the existing mentor, mocked voice and targeted navigation smoke tests. Publishing still requires the owner's explicit live/publication request.
