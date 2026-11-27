# Services and purpose of Swapnil Sahoo Learning Lab Private Limited

Updated 27 November 2026.

On 27 November 2026 the founder asked for a proper service offering and a purpose for the company. Two pages hold them:

- `/learning-lab/services`: every service, by audience, with its status and terms. Data: `src/features/learning-lab/services.ts`.
- `/learning-lab/purpose`: the company's purpose, mission, vision and values, followed by the existing learning philosophy, the four pathways and who runs the Lab. Data: `labPurpose` in `src/features/learning-lab/mission.ts`.

`scripts/test-learning-lab-services.mjs` (`pnpm lab:test:services`) checks both. It confirms the founder's original lines are unchanged, statuses stay honest, no fee wording appears and every link and `#fragment` resolves. Fragment checks need `LAB_BASE_URL` set to a local server.

## Purpose, mission, vision and values

These build on the founder's own lines, which stay unchanged: "Making learning freely accessible to everyone" and "Learn freely. Think independently. Build your future." They also draw on the founder's knowing–doing gap problem statement (see [the entrepreneurship journey](entrepreneurship-journey.md)).

- **Headline:** Make learning free. Help people act on it.
- **Purpose:** Swapnil Sahoo Learning Lab Private Limited exists to make learning freely accessible to everyone, and to help people turn what they learn into action.
- **Mission (what we do now):** Help aspiring entrepreneurs aged 18 and over move from knowing entrepreneurship to doing it, with free tools, short courses, a 14-day customer experiment and a seven-module journey from startup idea to venture growth.
- **Vision (where we are going):** Free, practical learning from school to doctoral study, across entrepreneurship, management, engineering and research.
- **Values:** free for every learner; learning by doing; evidence over opinion; honest promises; independent thinking.

The mission describes today's focus only. The vision repeats the long-term school-to-doctoral ambition, which the purpose page already labels as planned.

## Services by audience

| Audience | Service | Status |
| --- | --- | --- |
| Aspiring entrepreneurs and students | Free 14-day venture experiment | Open now |
| | Written founder feedback (up to 20 learners at a time; turnaround not guaranteed) | Pilot · limited places |
| | From Startup Idea to Venture Growth (seven modules) | Open now |
| | Free founder toolkit | Open now |
| | Six free short courses | Open now |
| | Open catalogue and learning paths | Open now |
| | AI learning mentor | Open now |
| Colleges, E-Cells and faculty | Kit for E-Cells and faculty | Open now |
| | AI Viva Bot | Working prototype |
| | Institution pilot programmes | Proposed |
| Professionals and adult learners | AI for Managers; Strategy and Case Thinking Lab; Entrepreneurship Under Constraint Bootcamp | Proposed (sample lessons open now) |
| On our roadmap | School learning (KG 1 to Class 12); Engineering (B.Tech level) | Planned (not open; current services are not for children) |

## How the services page is organised

The page is laid out the way a learner chooses a service, from "where do I start?" to the fine print:

1. **Hero:** "What we offer, and who it is for", with two actions: start the 14-day experiment, or ask the AI mentor.
2. **Facts at a glance:** ₹0 fees, adults 18+, seven modules, a 14-day experiment, eight tools and six short courses. These are facts about the offering, counted from the same data that renders it. The page shows no learner numbers, testimonials or results; none are claimed until there is evidence.
3. **Services by audience:** aspiring entrepreneurs and students; colleges, E-Cells and faculty; professionals; and the roadmap (planned school and engineering pathways).
4. **Why learn with the Lab:** learn by doing; a plan that fits you; feedback from the founder (up to 20 learners at a time); an AI mentor on hand; evidence over opinion; free for everyone.
5. **How it works:** choose your goal, learn the essentials, apply it for real, decide on evidence.
6. **Questions:** seven short answers. Everything is free, it is for adults 18+, there are no live classes yet, no certificate comes from the free self-paced services, founder feedback has capped places, colleges can use the E-Cell kit, and the Lab does not help raise funding.
7. **Terms:** free, adults 18 and over, online delivery, what is not promised, data and contact, with links to the policies.
8. **Who provides them:** Swapnil Sahoo Learning Lab Private Limited, its purpose, the founder, and voluntary support (which buys nothing).

The Lab homepage has a matching **"Choose where to start"** band under the opening question. It offers six goals: test a business idea, learn entrepreneurship step by step, use founder tools, take a short course, bring the Lab to your college, or build skills for work. It also has a "Have a question? Ask the AI mentor" link.

Each fact repeats what the linked page already says. Check that page before changing a line. The test compares written counts ("eight tools", "six courses", "seven modules") with the data.

## Where they appear

- The Lab top menu ("Services") and footer ("Our services"; "Our purpose, mission and vision"). The footer's About column now starts with the purpose statement.
- The Lab homepage: the "Choose where to start" band, and the "About the Lab" section, which now leads with the purpose statement.
- `src/app/sitemap.ts` (the services page; the purpose page was already listed) and the browser test's route list (both pages).
- A new FAQ entry, "What services does the Lab offer?".
- An AI mentor prepared answer for questions about the Lab's services, purpose, mission or vision. Its wording is narrow, so a student's own questions about their services or purpose keep their existing answers. `scripts/test-digital-mentor-routing.mjs` asserts both.

## Not changed

No new service, price, partnership or outcome was introduced. The proposed programmes and institution pilots stay proposed. The CIN and registered office are still not published; add them only when verified.
