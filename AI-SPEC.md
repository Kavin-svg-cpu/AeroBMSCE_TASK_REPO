# AI Features — Specification

This document records every AI-assisted feature on the AeroBMSCE website: what each one does, where its knowledge comes from, how it decides what to answer, how it behaves when it doesn't know, and how to maintain it.

| # | Feature | Where it lives | Files |
|---|---|---|---|
| 1 | Test-field strip | Home page, top (`index.html#field`) | `field.js` |
| 2 | Ask the club (Ground Control) | Home page (`index.html#ask`) | `ask-the-club.js` |
| 3 | Learning path + AI tutor | `learn.html` | `learn-data.js`, `learn.js` |
| 4 | Project archive search | What we build (`what-we-build.html#archive`) | `archive.js` |
| 5 | Site navigator ("Where do you want to go? I can help") | Home page, floating button | `navigator.js` |
| — | Shared matching engine | used by features 2–5 | `ai-core.js` |

---

## 1. Design principles

1. **No backend, no API keys.** The site is static and hosted on GitHub Pages. A language-model API key in front-end code would be public, so every feature runs in the visitor's browser.
2. **Grounded answers only.** Every answer comes from a written knowledge base that cites its sources. Nothing is generated freely.
3. **Say "I don't know".** Below a confidence threshold, a feature says so and offers a human route (an email to the core team or a senior) instead of guessing.
4. **Show provenance.** Answers show their sources. Ground Control also tags each answer **On record** (published) or **Not published** (we checked and the club hasn't said).
5. **Safe rendering.** Visitor text is always inserted with `textContent` (or `AICore.escapeHtml`) and is never rendered as HTML.
6. **Accessible.** Chat logs and result areas are `aria-live` regions, controls are real `<button>`s with labels, focus is managed in the navigator dialog, and animations are skipped under `prefers-reduced-motion`.
7. **Privacy.** Questions never leave the browser. The only outside request is the weather call to Open-Meteo, which carries the club's coordinates and nothing about the visitor. Emails are only sent if the visitor clicks a `mailto:` link themselves.

---

## 2. Shared engine: `ai-core.js`

`AICore` exposes `normalise(text)`, `rank(query, items, getWords)`, `escapeHtml(text)` and `prefersReducedMotion()`.

**Normalisation pipeline**
1. Lowercase, and join common phrases ("first-years" → "first year", "twin boom" → "boom").
2. Strip punctuation and split into words.
3. Remove stopwords (filler such as *the, how, can, please, too*) and one-letter tokens.
4. Map synonyms onto one word, for example *freshers → fresher, quadcopter → drone, windy → wind, legally → legal, LiPo → battery, applications → apply*.
5. Light stemming: *batteries → battery, wings → wing*.

**Scoring**

For each item, `getWords(item)` returns `{ strong, weak }`:

```
score    = Σ over query words ( 2 if in strong keywords ) + ( 1 if in weak text )
score   /= √(number of query words)          // long questions don't win by length
coverage = matched query words / query words
```

Results are sorted by score. Each feature applies its own thresholds:

| Feature | Minimum score | Extra rules |
|---|---|---|
| Ask the club | 1.0 | Best match only, plus that answer's related questions as chips |
| AI tutor | 1.0 | +0.3 bonus for notes on the waypoint being read; up to 2 follow-up chips |
| Archive search | 1.0 | **coverage ≥ 0.5**; a 4-digit year filters by year; the word "year" is ignored |
| Site navigator | 1.0 | Top 3 destinations; best one gets "Take me there" |

---

## 3. Feature specifications

### 3.1 Test-field strip
- **Purpose:** tell visitors at a glance whether now is a good time for test flights at BMSCE.
- **Data:** the Open-Meteo forecast API (`api.open-meteo.com`, no key) at BMSCE (12.9416 N, 77.5655 E): current wind speed, gusts, direction, temperature, precipitation, and today's sunset (IST).
- **Rules, applied in this order:**
  1. After sunset → **Field closed**.
  2. Rain > 0 mm → **Not for test flights**.
  3. Wind ≤ 15 km/h and gusts ≤ 20 km/h → **Good for test flights**.
  4. Wind ≤ 22 km/h and gusts ≤ 30 km/h → **Experienced pilots only**.
  5. Otherwise → **Not for test flights**.
  - Additions: a gust spread of 10 km/h or more adds a "gusty" warning, and the summary states the daylight left.
- **Every summary ends with:** "Check the Digital Sky airspace map and get a senior's go-ahead before flying."
- **Limits:** the wind limits are a beginner-trainer **rule of thumb, not an official club rule**. Replace them in `LIMITS` if the club sets its own.
- **Failure:** if the API can't be reached, the strip shows "Field data unavailable" and tells pilots to check conditions at the field. Without JavaScript the strip stays hidden.

### 3.2 Ask the club — Ground Control
- **Purpose:** answer prospective members' questions (joining, selection, first-years, projects, contact).
- **Knowledge:** 16 entries in `KNOWLEDGE`, each with an id, question, keywords, answer HTML, status, sources and related ids.
- **Sources:**
  - Core-team recruitment notes:
    - 1st–3rd year students can join.
    - There is a written test by domain (Flight Mechanics, Flight Structures / Subsystems, Electrical, CS).
    - Students are shortlisted per domain, then interviewed in assigned slots; the final shortlist joins the club.
    - First-years are welcome and sit the same test paper.
  - This site's content.
  - BMSCE's Mechanical Student Affinity Groups page.
  - BMSCE's Propel Lab-3 report.
- **Still "Not published":** the recruitment month, and how AeroBMSCE relates to the Mechanical department's AERO Club (launched 2017).
- **Unknown questions:** tagged "Not in club records", with a pre-filled email to aerobmsce@bmsce.ac.in.
- **UI:** suggested-question chips, a typing indicator (skipped under reduced motion), and auto-scroll that shows the start of long answers.

### 3.3 Learning path + AI tutor
- **Purpose:** take a beginner from zero to competition-ready, and help candidates prepare for the recruitment test domains.
- **Content (`learn-data.js`):** 6 waypoints × 5 notes, plus 19 quiz questions. Every note links to its sources:
  - NASA Glenn's Beginner's Guide to Aeronautics and the FAA Pilot's Handbook of Aeronautical Knowledge.
  - Flite Test, eCalc and Airfoil Tools.
  - ArduPilot documentation and the BYU MAGICC LiPo guide.
  - India's Drone Rules 2021 (MoCA summary) and Digital Sky.
  - SAE Aero Design, SAEINDIA AeroTHON and the Propel Lab-3 report.
  - Raymer, *Aircraft Design: A Conceptual Approach*.
- **Tutor:**
  - Ranks all 30 notes, preferring the current waypoint.
  - Answers with the note text, its sources, an **Open in notes** button that switches waypoint and highlights the note, and **Flag for a senior** (a pre-filled email).
  - Below the threshold it says "Not in club notes" and offers the flag.
- **Quizzes:** one attempt per question shows the answer and an explanation. A waypoint is complete when every question has been answered; complete waypoints get a filled diamond on the route. Progress is stored per browser in `localStorage`, wrapped in try/catch.
- **Rules of thumb are labelled as such:** ESC headroom of 20–30%, and first-flight wind limits.

### 3.4 Project archive search
- **Purpose:** "Every aircraft we've built, and what we learned", searchable in plain words.
- **Data:** 18 entries from this site's results and the Propel Lab-3 report.
  - **Lesson** shows *Not recorded yet* unless a lesson was actually documented.
  - Undated lab projects show "c. 2022".
- **Behaviour:**
  - A bare year ("2022") lists that year.
  - A year inside a query filters by that year.
  - The coverage rule stops a single common word such as "design" from matching unrelated entries.
  - No match → **No record**, with a pre-filled email to the core team. The mockup's own example, "Which year did we try a twin-boom design?", correctly returns *No record*.

### 3.5 Site navigator — "Where do you want to go? I can help"
- **Purpose:** take visitors straight to the exact page **and section** that holds what they're looking for.
- **Index:** 33 destinations in `DESTINATIONS`, each with a page, section `id`, breadcrumb path, description and keywords. It covers every section on all six pages, each achievements season and each learning waypoint.
- **UI:**
  - A floating compass button (bottom right) opens a dialog with a search box and popular-destination chips.
  - Results show the breadcrumb, a description and **Take me there** (best match) or **Go** (runners-up).
  - Esc or × closes the panel and returns focus to the button.
  - Destinations on the current page scroll in place and close the panel.
- **Landing:**
  - Every content `section` has an `id` and `scroll-margin-top`, so it lands just below the sticky header.
  - The target section flashes a gold outline (`:target` animation).
  - `script.js` re-aligns to the anchor once web fonts have loaded.
  - Smooth scrolling is enabled only after landing, so the initial jump can't overshoot.
- **No match:** "Not found", plus links to all six pages and to Ask the club.

---

## 4. Testing

Automated checks run in headless Chrome. A harness page loads the real pages in iframes, or a scratch copy for scroll measurements, and calls each feature's exposed test hook (`GroundControl`, `LearnTutor`, `ArchiveSearch`, `SiteNavigator`).

| Area | What was checked | Result |
|---|---|---|
| Ground Control | 11 questions, including the mockup's five, paraphrases and an off-topic question | All routed correctly; off-topic → fallback |
| AI tutor | 19 questions across all six waypoints, plus an off-topic question | All routed correctly; off-topic → fallback |
| Archive | 7 searches, including the twin-boom question, a bare year and year + topic | All correct; twin-boom → *No record* |
| Navigator | 33 destination anchors exist; 17 natural-language queries; open, chip, Esc and same-page links | All anchors resolve; all queries routed sensibly |
| Anchor landing | `partner-with-us.html#tiers` and `achievements.html#season-2022`, loaded 4× each | 8/8 landed at exactly 80px below the top |
| Weather strip | Live API response for daytime rain and for after sunset | Correct status and summary in both cases |
| Quiz | Answering right and wrong options, score and progress | Correct states, score and route update |
| Safety | `<img src=x onerror=alert(1)>` typed into a chat box | Shown as plain text, never executed |
| Layout | Horizontal overflow at 390px width on all six pages | None |

---

## 5. Maintenance

- **Add a Ground Control answer:** add an entry to `KNOWLEDGE` in `ask-the-club.js` with distinctive keywords, a status (`record` or `unpublished`) and source ids. If the answer comes from a new source, add it to `SOURCES`.
- **Add a learning note or quiz question:** edit `learn-data.js`. Add any new reference to `LEARN_SOURCES`, then cite it by id.
- **Add an archive entry:** append to `ARCHIVE` in `archive.js`. Fill `lesson` only if the lesson was actually recorded.
- **Add a page or section:**
  1. Give the `<section>` an `id`.
  2. Add a destination to `DESTINATIONS` in `navigator.js`.
  3. If it's a new page, add it to `PAGES`.
- **Change the wind limits:** edit `LIMITS` in `field.js` and update §3.1 above.
- **After any change:** re-run the test questions for the feature you touched. Keywords that appear in many entries (e.g. *design*, *team*) cause ties, so prefer distinctive ones.

---

## 6. Known limitations and next steps

- **Keyword matching, not understanding.** Unusual phrasings can miss. The "I don't know" path and the human hand-offs are the safety net.
- **Data gaps:** recruitment month, the club's Instagram handle, official field wind limits, and documented lessons for most archive entries.
- **Mockup discrepancy:** the design mockup labels the club "Dept. of Mechanical Engineering · EST. 2017", which matches BMSCE Mechanical's separate AERO Club. This site keeps AeroBMSCE's own "established 2012, 10+ departments".
- **Unverified results:** web searches found no outside record of the SAE Aero Design West 2026 and AeroTHON 2025 placings. Those entries rely on the club's own content.
- **Upgrade path to a language model:** put a small serverless function (for example a Cloudflare Worker) between the site and a model API, so the key stays secret. Keep the same knowledge bases as retrieval context, and keep the source citations and "I don't know" behaviour.
