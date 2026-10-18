# AeroBMSCE — Website Redesign

A rebuilt, multi-page website for AeroBMSCE, made for the AeroBMSCE Web Development Recruitment Task.

- **Live site:** https://kavin-svg-cpu.github.io/AeroBMSCE_TASK_REPO/
- **Original (broken) site:** https://rajeshbharadwaj44.github.io/AeroBMSCE_TASK_REPO/

Plain HTML, CSS and JavaScript. No frameworks, no build step and no backend, as the brief asked.

| Page | File |
|---|---|
| Home | `index.html` |
| Who we are | `who-we-are.html` |
| What we build | `what-we-build.html` |
| Our achievements | `achievements.html` |
| Learning path | `learn.html` |
| Partner with us | `partner-with-us.html` |

All six pages share one stylesheet (`style.css`) and one script (`script.js`). The AI features add a few small scripts, described at the end. `journey.html` and `partners.html` from the original site are kept as small redirect pages, so old links still work.

---

## 1. Flaws in the original website

**Broken links and navigation**
- The Contact link pointed to `contact.html`, which doesn't exist (404).
- The navigation was different on every page. The home page had five links, the other pages had three, and the order kept changing (Home, Journey, Partners on one page; Journey, Home, Partners on another).
- The current page link was a dead `href="#"`, and nothing showed which page you were on.
- The "Who We Are" anchor used the outdated `<a name>` tag.

**Layout and sizing**
- Everything was hard-coded in pixels. `.wrap` was 1480px wide, the tiers table 1440px and the banner 1480px, so the whole site scrolled sideways on most laptop screens.
- There was no `<meta name="viewport">`.
- The header logo was forced to 420×200px, which squashed it, and it took up most of the header.
- Gallery photos (300×170) and partner logos (140×60) were given fixed sizes, which distorted them.
- The tiers were laid out with a `<table>`, and the layout depended on floats and `.clear` hacks.
- Photos were up to 1.1 MB each and loaded at full size.

**Typography and consistency**
- Four unrelated fonts were mixed together: Times New Roman, Impact, Trebuchet and Arial.
- Body text was 11–13px, grey (`#707070`) on near-black, which is hard to read.
- Heading levels were misused: an `h4` came before the page's `h1`, and pages had several `h1`s. Headings that looked the same used different tags.
- The colours were maroon on black with low contrast, and the logo's gold appeared only in places.

**Content errors**
- "Credibility Summary: **16+ years**" contradicts "Established in **2012**".
- The paragraph ending "…represent us at various prestigious events:" came *after* the team list it was introducing.
- Typos: "TeamFlying Phantoms", "Ecosytem", "show cased", "lll South India Exhibition", and "(SAE competitions, IIT techfests, )".
- The milestones were one long block of text separated by `<br>` tags, which was very hard to scan.
- The brief asks for "What we build" and "Our Achievements" pages, and neither existed.

**Usability and accessibility**
- The slideshow changed every 2 seconds, with no way to pause it or go back.
- Link focus outlines were removed (`a:focus { outline: none }`), so keyboard users couldn't see where they were.
- No image had `alt` text, there was no `lang` attribute and no favicon, and every page had the same `<title>`.
- Some partner logos are white artwork. Placed straight on a dark background, they had no consistent treatment.

## 2. Design route and UI/UX decisions

**Concept: an engineering drawing set.** AeroBMSCE designs aircraft, so the site is styled like a set of blueprint sheets:

- **Blueprint base.** The background is navy with a drafting grid of fine 20px squares and heavier 100px lines.
- **Sheet numbering.** Every page is a "sheet" (Sheet 01 / 05 … 05 / 05), and its footer is styled as a drawing **title block** (project, drawing name, sheet number, contact).
- **Drawing details.** Section headings have a **dimension line** under them (a measuring line with an arrowhead). Cards have gold **registration corners**. Photos are captioned as figures ("FIG. 2 — …"). The hero shows the club's CAD aircraft with labelled call-outs.
- **One flight-deck element.** On the Achievements page, a black-glass **altitude tape**, like an aircraft altimeter, sits beside the timeline. The tape lists the seasons, and a boxed amber readout follows the season you're reading. Clicking a year jumps to it. I kept this to one element on purpose. The cockpit look stands out more when it's the one exception to the blueprint style.

**Keeping it consistent**
- All colours, fonts and spacing are defined once as CSS variables in `:root`. The spacing scale is 4, 8, 16, 24, 40, 64 and 96px, and no other gaps are used.
- There are three fonts, each with one job: **Space Grotesk** for headings, **IBM Plex Sans** for body text, and **IBM Plex Mono** for annotations, labels, buttons and navigation.
- Gold `#f5b730` comes from the club logo and is the only accent colour.
- There is one card component, two button styles (primary and outline) and one heading pattern, reused on every page.
- The header and footer are identical on every page. The current page is marked with `aria-current="page"`, and "Partner with us" is always the highlighted call to action.

**UX decisions**
- **Restructured content.** Content scattered across the old site is grouped into the five sections the brief lists. The `<br>` milestone block became an **Achievements timeline you can filter** by season and competition type, with a live "Showing X of 15 results" count and a message when nothing matches.
- **No auto-rotating slideshow.** It became a static "Field log" photo grid with captions, so nothing moves without the user asking.
- **Logos on plates.** Partner logos sit on plates: light plates for coloured logos and dark plates for the white ones, so every logo stays readable.
- **Logo recoloured for dark backgrounds.** The black eagle logo was recoloured with a short Pillow script into a light version that keeps the gold beak.
- **Accessibility.** Visible dashed gold focus outlines, a skip link, `alt` text on every image, `prefers-reduced-motion` support, and real `<button>`s with `aria-pressed` for the filters.
- **Content fixes.** "16+ years" was replaced with "Est. 2012" and "Flying since 2012". The typos are fixed. "lll South India Exhibition" is read as the Roman numeral **III**.
- **Responsive.** Built for desktop, as required, but the layout also works on tablets and phones. The grids collapse to fewer columns and the nav becomes a Menu button. The altitude tape hides on narrow screens because the filters do the same job there.
- **Performance.** Photos were resized and re-compressed (about 4.2 MB down to about 1.4 MB), and images below the fold use `loading="lazy"`.

## 3. A problem I ran into: the altitude tape pointing at an empty season

**The problem.** The altitude tape and the filters were built separately. The tape highlights whichever season is in view, and the filters hide milestones that don't match. While testing combinations I found that if I picked **Season: 2018** and then **Type: Drone racing**, every season was hidden. The tape's readout was still on a year that no longer had anything under it, and it stayed stuck when I switched back to **Season: All**. The two parts of the page were out of sync.

**How I found it.** I wrote a small test page that loads `achievements.html` in an iframe, clicks the filter chips in different orders, and prints the result count, the visible seasons and the highlighted tape year after each step. The output showed `active: undefined` after a zero-result filter, and it stayed that way after the filters were loosened again.

**The fix.**
1. After every filter change, years on the tape with no visible milestones are dimmed (`.is-empty`) and can't be clicked.
2. If the highlighted year has just been emptied, or nothing is highlighted because an earlier filter returned zero results, the readout moves to the first season that is still visible.
3. If nothing matches at all, a "No milestones match these filters" message appears instead of a blank area.

I re-ran the same click sequence afterwards. It now goes `2026 → 2024 → (none) → 2024`, which is what you'd expect.

**A smaller one.** On a phone-sized screen (390px) the Partner page scrolled sideways by 9px. I measured each element's right edge in the test page and found two causes. A grid column set to `1fr` won't shrink below its widest content, which here was the long "Email the partnership team" button. Separately, `max-width: 360px` on the contact image was overriding the global `max-width: 100%`. Using `minmax(0, 1fr)` and `max-width: min(360px, 100%)` fixed both.

---

## Extra: AI features (from the "Homepage — Blueprint" mockup)

Four features follow a mockup of AI-assisted pages. They share one small matching engine, `ai-core.js`.

| Feature | Where | Files |
|---|---|---|
| **Test-field strip.** Live wind, gusts, temperature and sunset at BMSCE, plus a plain-language "AI summary" of whether it's a good time for test flights | Top of the home page | `field.js` |
| **Ask the club (Ground Control).** Answers joining questions with sources | Home page, `#ask` | `ask-the-club.js` |
| **Learning path + AI tutor.** Six waypoints (Basics of flight → Competition) with notes, practice quizzes and a tutor that cites its sources | `learn.html` | `learn-data.js`, `learn.js` |
| **Project archive search.** Every documented build and result, searchable in plain words | What we build, `#archive` | `archive.js` |

**Why there's no LLM.** GitHub Pages has no backend, and an API key in front-end code would be public. So the "AI" runs entirely in the browser:
1. The question is normalised: lowercased, filler words removed, synonyms mapped ("freshers" → "fresher", "windy" → "wind", "LiPo" → "battery") and plurals stripped.
2. Each knowledge item is scored by keyword overlap. Curated keywords count double and titles count once, and the score is divided by √(question length).
3. Below a confidence threshold, the assistant **says it doesn't know** and offers a pre-filled email to the core team or a senior. The archive also requires that at least half the question's words are recognised, so one common word ("design") can't pull in unrelated entries.
4. Every answer shows its **sources**. Ground Control also tags each answer **On record** or **Not published**.

**The weather summary** uses the free [Open-Meteo](https://open-meteo.com/) API (no key needed). The limits (≤15 km/h wind and ≤20 km/h gusts for a beginner trainer) are a stated rule of thumb, **not an official club rule**. Every summary ends by pointing to the Digital Sky airspace map and a senior's go-ahead.

**Where the facts come from**
- *Club facts:* this site's content, the core team's recruitment notes (written test by domain → shortlist → interview; open to 1st–3rd years; first-years welcome, same test paper), and BMSCE's public [Mechanical Student Affinity Groups](https://bmsce.ac.in/home/Mechanical-Engineering-Student-Affinity-Groups) page and [Propel Lab-3 report](https://bmsce.ac.in/assets/files/Research/Propel%20Lab%20III%20-%20Report.pdf).
- *Learning notes:* NASA Glenn's Beginner's Guide to Aeronautics, the FAA Pilot's Handbook of Aeronautical Knowledge, Flite Test, eCalc, Airfoil Tools, ArduPilot docs, the BYU MAGICC LiPo guide, India's Drone Rules 2021 (MoCA summary and Digital Sky), SAE Aero Design and SAEINDIA AeroTHON pages. Each note links to its own sources.
- *Archive:* only documented facts. "Lesson" says *Not recorded yet* unless a lesson was actually written down, and undated lab projects are marked "c. 2022".

**Safety and UX details.** User text is always inserted with `textContent`, never as HTML. Chat logs are `aria-live` regions. Quiz progress is saved per browser in `localStorage`, wrapped in try/catch so a blocked storage doesn't break the page. Typing animations are skipped under `prefers-reduced-motion`. Without JavaScript, each feature shows a fallback message.

**Testing.** An automated test page loads the real pages in iframes and runs 37 questions through the three matchers. Examples: the mockup's "Can first-years join?" goes to the recruitment notes, "Is it too windy to fly?" goes to WPT 05 › Reading the weather, and "Which year did we try a twin-boom design?" correctly returns *No record*.

---

### Running locally
Open `index.html` in a browser. No install is needed.

### Deployment
GitHub Pages serves the site from the `main` branch root (Settings → Pages → Deploy from a branch → `main` / `root`).

*Practice website for the AeroBMSCE web development recruitment task. This is not the official AeroBMSCE website.*
