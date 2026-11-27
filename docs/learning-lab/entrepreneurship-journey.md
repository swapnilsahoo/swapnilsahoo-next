# From Startup Idea to Venture Growth (entrepreneurship journey)

Updated 27 November 2026.

The Lab's free seven-module entrepreneurship journey lives at `/learning-lab/entrepreneurship`. Its text lives in `src/features/learning-lab/entrepreneurship-journey.ts`, which the page, the Lab homepage summary and the sitemap read. The top menu and footer (`LabShell.tsx`) and the AI mentor's prepared answer (`knowledge.ts`) repeat the path and the module themes by hand, so update them whenever a module title or the path changes. `scripts/test-learning-lab-entrepreneurship.mjs` (`pnpm lab:test:entrepreneurship`) keeps the published text in step with the founder's wording and checks the page's anchors.

## What it is

The journey is a free, self-paced learning map, not a programme anyone enrols in. It has no account, fee, assessment or certificate. Each module links free resources that already exist: the 14-day venture experiment, the founder toolkit, the free courses, a weekly note, the catalogue's Entrepreneurship Under Constraint path and the founder's public teaching and research pages. Each module is marked:

- **Open now:** you can practise its core today (01 and 07).
- **Partly open:** free resources cover part of it (02, 03, 05 and 06).
- **Planned:** early resources only (04).

Each module that is not fully open names what is "Not covered yet". Modules 05 and 06 carry a caution: general education only. Module 05 is not investment, legal or tax advice, and Module 06 is not legal or tax advice. The Lab does not arrange funding or introduce investors. The journey is separate from the catalogue's four learning paths, its 25 resources and the proposed live programmes. It does not change their counts.

## Source wording and publication edits

On 26 November 2026 the founder supplied the seven modules, a problem statement, "The gap we are trying to solve" table, a proposed value proposition and a differentiation statement, and asked for them to become part of the Lab. The module titles and descriptions, the problem statement, the "How might we" question, the five gaps, the one-line statement, the value proposition and the differentiation are published as written. Only these edits were made:

| Founder's text | Published | Why |
| --- | --- | --- |
| "Expensive accelerator programmes" | "Selective, often costly accelerator programmes" | Many accelerators are selective rather than fee-charging. The Lab does not describe other providers' prices as fact. |
| "Accessible, affordable entrepreneurial learning" | "Accessible, free entrepreneurial learning" | Everything the Lab offers is free; "affordable" implies a price. |
| "Two additional modules worth incorporating" (heading before 06 and 07) | Not published; 06 and 07 appear as ordinary modules | Advice to the founder, not public copy. |
| "I have interpreted your outline as the foundation of an entrepreneurship learning programme…" and "The two additional modules address…" | Not published | Advice to the founder. |
| "For your EdTech initiative, I would position this as addressing the entrepreneurial knowing–doing gap…" | Not published; the knowing–doing gap framing is used throughout | Advice to the founder. |
| "This is a proposed problem hypothesis that should subsequently be validated through customer discovery." and "This needs to be validated through customer discovery before developing the platform." | "This is a proposed problem hypothesis, not a finding. We will test it through customer discovery, the way we ask you to test an idea: by talking to aspiring entrepreneurs about what they actually did, before we build more of the journey." | The Lab already exists, so "before developing the platform" would contradict the page. "Should be validated" is published as a commitment ("We will test it"), not as a claim that interviews are under way. Change it to "We are testing it" only once discovery conversations are actually happening. (The first release on 27 November 2026 said "We are testing it"; corrected the same day.) |

Additions that are not the founder's wording:

- the open/partly open/planned labels, the "Start with" resource lists and "Not covered yet";
- the hero line "Seven free modules. Start with one honest test with real customers." and the scope sentence ("This is a free, self-paced learning map…");
- the modules lead paragraph, the section titles ("Seven modules, one journey.", "The problem we are working on.", "From intent to action.", "What makes this different.") and the "Begin with Module 01 this week" band;
- the "Today:" line under each of the five gaps and the cautions on Modules 05 and 06;
- "Stopping after an honest test is a valid result too.";
- the callout heading "We test our own idea too" and "Continue, change or stop applies to us too.";
- the Lab's existing line "This is a new pilot. No completion rates, learning gains or comparisons are claimed yet." (reused, not new);
- the source citations and "The Lab is independent of these authors and publishers."

The page is for adults aged 18 and over, like the rest of the Lab.

The testing sentence describes customer-discovery conversations only. It does not use learners' pilot data, which the privacy notice (`policies.ts`) does not cover for research. If the Lab later reports anything from the pilot as evidence for this hypothesis, update the privacy notice first and report totals only.

## Sources

- Jeffrey Pfeffer and Robert I. Sutton, *The Knowing-Doing Gap* (Harvard Business School Press, 2000; released late 1999): the source of the phrase. [Stanford GSB book page](https://www.gsb.stanford.edu/faculty-research/books/knowing-doing-gap-how-smart-companies-turn-knowledge-action).
- Saras D. Sarasvathy, *Causation and Effectuation* (2001), as already cited in `programmes.ts`.
- Ted Baker and Reed E. Nelson, "Creating Something from Nothing: Resource Construction through Entrepreneurial Bricolage", *Administrative Science Quarterly* 50(3), 2005, [doi:10.2189/asqu.2005.50.3.329](https://doi.org/10.2189/asqu.2005.50.3.329).

Citation details were checked on 26 November 2026. The Lab is independent of these authors and publishers.

## Where it appears

- The page, with its share card at `src/app/learning-lab/entrepreneurship/opengraph-image.tsx`.
- A summary section on the Lab homepage after "Four stages, one experiment". The later homepage sections swapped their alternating background so the bands still alternate.
- The first item in the Lab's top menu ("Entrepreneurship") and the first footer link.
- The purpose page's entrepreneurship link (previously the Entrepreneurship Under Constraint learning path, which Module 07 still links).
- `src/app/sitemap.ts` and the browser test's route list.
- An AI mentor prepared answer for questions about the journey itself ("seven modules", "entrepreneurship journey", "knowing–doing gap", "module 5"). It sits before the 14-day answer and does not take over "How do I test a business idea?" or the student questions. `scripts/test-digital-mentor-routing.mjs` asserts both.

## Keeping it honest

- When a gap is filled (for example a go-to-market module), add the resource, update "Not covered yet" and change the module's status. Do not mark a module open because a page is planned.
- Keep the founder's module titles and descriptions unchanged unless the founder edits them; the test compares them word for word.
- Do not add completion rates, learning gains, learner counts or comparisons without evidence.
