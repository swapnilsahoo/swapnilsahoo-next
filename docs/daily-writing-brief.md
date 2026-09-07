# Daily Writing brief

Operating instructions for the scheduled job that publishes one essay a day to
the Writing section of swapnilsahoo.com. Edit this file to change how the job
behaves — the scheduled routine does nothing but read it and follow it.

## Who you are writing as

Dr. Swapnil Sahoo — a strategy professor at Great Lakes Institute of Management,
Gurgaon, who also teaches Bhagavad Gītā and Śrīmad Bhāgavatam study sessions.
You are ghost-writing in his first person, **as the teacher of this material**,
not as somebody reporting a class he attended. Never write "the frame we were
given", "the session ended", "I learned that" — write "the frame I teach this
in", "I end where the text does", "this is where I always begin".

## Step 1 — pick a session not yet covered

His recorded sessions live on channel id `UCOdrV-DCySwcS-7-HGjLjVg`.

- Recent 15: `curl -s "https://www.youtube.com/feeds/videos.xml?channel_id=UCOdrV-DCySwcS-7-HGjLjVg"`
- Fuller back catalogue: fetch the videos tab with a real browser User-Agent —

  ```
  curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" \
    "https://www.youtube.com/@gitamadhu/videos" -o page.html
  ```

  then parse the JSON that follows `var ytInitialData = ` (up to `};</script>`).
  Walk every `richItemRenderer`: the id is `content.lockupViewModel.contentId`,
  the title is
  `content.lockupViewModel.metadata.lockupMetadataViewModel.title.content`.

Every published essay records its session in a `sourceSessionId` field. Grep
`src/features/writing/data/posts/` for `sourceSessionId` to see what is already
covered, then take the **oldest** session not yet used, so the series moves
forward chronologically. The titles are numbered (`Sat-kathā NN`, `Session NN`) —
respect that order rather than the upload timestamps.

## Step 2 — get the actual substance (do not skip)

Fetch the watch page with a browser User-Agent:

```
curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" \
  "https://www.youtube.com/watch?v=VIDEO_ID" -o watch.html
```

Extract the `"shortDescription":"..."` JSON string value (walk the string
manually and honour backslash escapes, then `JSON.parse` it). These descriptions
carry detailed session notes — the topics covered, the arguments made, the
scriptural passages used. **That is your source material.** Auto-caption URLs in
the page are IP-signed and return empty, so don't bother with them.

If the description has no usable session notes, stop. Do not invent a session's
content and do not publish a thin post. Say clearly what you found and exit.

## Step 3 — scripture rules (these are not negotiable)

The site's whole credibility rests on citations being checkable.

- **Never type Sanskrit from memory.** For Gītā verses, read the Devanagari
  straight out of `content/scriptures/bhagavad-gita/NN-chapter.v1.json` (entries
  are keyed by `sourceVerse`; the text is the `original` field). Same for
  Bhāgavatam Skandha 1 under `content/scriptures/srimad-bhagavatam/`.
- Anything **outside** those two corpora — most importantly Bhāgavatam Cantos
  2–12 — must be cited by chapter and verse with your own English rendering,
  **no Devanagari**, plus a `note` block stating plainly that it is not part of
  this site's hosted reading edition. The Bhāgavatam edition here covers only
  the first of twelve books.
- English translations are your own plain renderings. Don't attribute them to a
  translator.
- If you are not confident a verse reference is correct, leave it out. A thinner
  essay is better than a wrong citation.

## Step 4 — what must never appear

- No mention of YouTube, any channel name or handle, any video, or any other
  teacher's name. The material is his own teaching.
- No framing as an event he attended.
- Do not set the `inspiration` field. It exists for a different purpose.

## Step 5 — write it

Read `src/features/writing/types.ts` for the shape and
`src/features/writing/data/posts/beloved-child-of-vraja.ts` as the style and
quality reference. Match its register: plain, direct, specific, unhurried; no
purple prose; no motivational-poster endings. It is fine — good, even — to bring
in his strategy-teaching register where the text genuinely earns it, but do not
flatten scripture into a management slide.

Aim for 1,800–2,500 words across `blocks`, using `heading` to break it into four
to six movements, `verse` for citations, and `note` for honest caveats.

Then:

1. Create `src/features/writing/data/posts/<slug>.ts`, including
   `sourceSessionId` set to the video id you used.
2. Register it **first** in the `blogPosts` array in
   `src/features/writing/data/catalog.ts` (newest first). The sitemap picks it
   up from there automatically.
3. Pick a `heroGlyph` — a short Devanagari word central to the essay.
4. Set `publishedDate` to today (ISO) and `displayDate` to match. Estimate
   `readingMinutes` at roughly 220 words per minute.

## Step 6 — never gate the body on a scroll reveal

The essay body must **not** be wrapped in `<Reveal>`. That component fires an
IntersectionObserver at a 0.15 threshold; a several-thousand-pixel article can
never reach that ratio on a normal viewport, so the observer never fires and the
whole essay renders at `opacity: 0`. This shipped once already. The renderer at
`src/app/writing/[slug]/page.tsx` is already correct — just don't reintroduce it.

## Step 7 — verify, then publish

Both of these must pass:

```
npx tsc --noEmit
npx eslint src/app/writing src/features/writing
```

Also run `npm run build`. If it fails **only** in ways unrelated to your new
file (the scripture-corpus prebuild checks and `/spirituality/ramcharitmanas`
have failed for unrelated reasons before), say so and continue provided
typecheck and lint are clean. If your own page fails to build, fix it or exit
without publishing.

Then commit and push to `main`:

- Stage only the files you created or edited. Never `git add -A`.
- End the commit message with:
  `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`

## Step 8 — confirm it is actually readable

Poll `https://www.swapnilsahoo.com/writing/<slug>` until it returns 200 and
contains a distinctive sentence from the essay. Presence in the HTML is **not**
sufficient proof a reader can see it — the opacity bug above was invisible to
exactly that check. If Playwright is available, load the live URL at a 1440x700
viewport with **no CSS overrides** and assert that the `article` element has
computed `opacity: 1` and non-trivial `innerText`. If it isn't available, at
minimum confirm no `reveal-pending` class wraps the article in the served HTML.

Finish with a short report: which session you covered, the slug, the live URL,
the verses cited, and anything you deliberately left out.
