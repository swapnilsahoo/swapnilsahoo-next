# Free-course library

The founder requested free courses inspired by Maven's free-lesson catalogue. The Lab now offers six original self-paced courses at `/learning-lab/free-courses`, with no registration or payment gate. Each includes three readings with fictional worked examples, two branching decisions, a retryable checkpoint, three reflection prompts and a downloadable worksheet. Topic filters and search help visitors choose a starting point. The homepage, navigation, resources, programme catalogue and sitemap link to the library.

The design keeps the existing cream/indigo palette, Fraunces headings, Poppins text and light/dark themes. Course illustrations use native layout and typography. No stock portrait, fabricated recording, testimonial, outcome or live event date was added. A free course is available immediately as written self-practice; it does not include individual assessment or award a certificate.

Notes remain on the page unless the visitor chooses browser saving or downloads a worksheet. Saving/restoring/clearing is explicit, and these exercises send no notes to the Lab or an AI provider. Shared-browser users should clear saved notes. The browser test blocks all HTTP writes and inspects downloaded file contents.

Reference for the product format: [Maven's official Lightning Lesson guide](https://help.maven.com/en/articles/9189798-start-here-what-is-a-lightning-lesson), reviewed 8 October 2026. Its emphasis on a small practical skill informed the scope. The Lab's material and delivery are original; these courses are self-paced readings and exercises, with no Maven affiliation. Source links on each course distinguish further reading from included teaching material.

## Introductory paid-workshop preference

The founder suggested an introductory price around **₹100** and asked for online delivery. This is the current pricing preference, replacing earlier higher-price recommendations as the launch direction. The free library costs ₹0. A ₹100 workshop should be a separate, bounded offer; do not silently price the full six-session cohort at that amount. Schedule, delivery capacity, full payable/tax wording, access and cancellation details still need to match what can actually be delivered. No live date, tax status or postal address was invented.

Private programme controls now accept IST timetable, tax presentation, minimum cohort, instructor, format, learner output, access/attendance alternatives, support/feedback, and cancellation/rescheduling terms. Drafts can be saved before launch approval. Public pages and programme-outline downloads expose them only for an explicitly approved open pilot. The controls do not take payment, reserve a place or send an email. Payment collection remains disabled.

The founder said to use the same operator address and deliver online. The existing profile states **Gurgaon, India**, but it does not supply a full operator postal address. Online delivery is not a postal address. Keep the postal-address configuration unset until an actual publishable address is available. The approved contact remains `swapnil.s@greatlakes.edu.in`.

## Verification commands

```powershell
npm.cmd run lab:test:pilot-details
$env:LAB_TEST_BASE_URL='http://localhost:3112'
npm.cmd run lab:test:free-courses
```

The pilot/enquiry suite uses an isolated synthetic database. The free-course suite checks all seven routes at 320/360/768/1440px, metadata, topic filters/search/empty reset, keyboard use, theme persistence, all course decisions and checkpoints, explicit note storage/clearing, actual worksheet contents, unknown-course 404 and sitemap coverage. Browser evidence is kept in ignored `artifacts/learning-lab`.
