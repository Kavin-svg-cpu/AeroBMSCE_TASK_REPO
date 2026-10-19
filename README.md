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
**Observable Flaws**
- The navigation panels observability was partial and not organised to different paages.Certain navigation panels were hidden on investigation of one of the panels.
- No labels or organisation of images found in the  website.
- Font of the letters in the page was small.
- Black background with grey letters provided poor visibility.
- The content in the website required better organisation.
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

 **Blueprint base.** The background is navy with a drafting grid of fine 20px squares and heavier 100px lines
- The reason for choosing for Blueprint visual is as follows:
- Aviation already has its own blueprint language: aeronautical charts, aircraft three-view drawings, runway diagrams. We can borrow those instead of generic engineering drawings, which makes the site feel authentically aviation without the clichés.

- It tells the club’s real story. An aero club is about learning, training and understanding how flight works, and Blueprint is visually about knowledge and craft.

- It flatters your fleet. Line drawings of your actual aircraft (a Cessna 172, a glider, a microlight) with dimension callouts look striking and are far more distinctive than stock photos of planes in the sunset.

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
- It also included 2-3 interactive AI club assistant feature and also interactive AI powered learning path to help beginners understand aeronautics before joining the club paving the path for interested candidates
- **Performance.** Photos were resized and re-compressed (about 4.2 MB down to about 1.4 MB), and images below the fold use `loading="lazy"`.
- An AI navigation tool is also used to enhance user experience and eliminate difficulty in finding solutions in the website.

## 3. A problem I ran into: the altitude tape pointing at an empty season

**The problems.** 
- The altitude tape and the filters were built separately. The tape highlights whichever season is in view, and the filters hide milestones that don't match. While testing combinations I found that if I picked **Season: 2018** and then **Type: Drone racing**, every season was hidden. The tape's readout was still on a year that no longer had anything under it, and it stayed stuck when I switched back to **Season: All**. The two parts of the page were out of sync.
- To inlcude the AI club assistant , problem was faced to fetch information which was not published in the website itself.Hence the club assistant will have to return not published for some set of questions.

**How I found it.** I wrote a small test page that loads `achievements.html` in an iframe, clicks the filter chips in different orders, and prints the result count, the visible seasons and the highlighted tape year after each step. The output showed `active: undefined` after a zero-result filter, and it stayed that way after the filters were loosened again.

**The fix.**
1. After every filter change, years on the tape with no visible milestones are dimmed (`.is-empty`) and can't be clicked.
2. If the highlighted year has just been emptied, or nothing is highlighted because an earlier filter returned zero results, the readout moves to the first season that is still visible.
3. If nothing matches at all, a "No milestones match these filters" message appears instead of a blank area.
4. I've built the rest of the mockup and updated the club assistant with your notes. Everything is live at https://kavin-svg-cpu.github.io/AeroBMSCE_TASK_REPO/. I ran 37 test questions through the assistant, tutor and archive search and all now get the right answer, and no page scrolls sideways at phone width.

**Your notes in Ground Control:** these answers now show as "On record" and cite "AeroBMSCE recruitment notes (core team)".

| Question | Answer |
|---|---|
| **Who can join?** | Any BMSCE student from 1st to 3rd year, from any department. You take a written test in one domain. |
| **Do I need to be in Mechanical?** | No. Recruitment is by domain (Flight Mechanics, Flight Structures / Subsystems, Electrical, CS), not by branch. |
| **How does selection work?** | Written test in a domain, then a shortlist per domain, then an interview in an assigned time slot. Those on the final shortlist join the club. |
| **Can first-years join?** | Yes, definitely. The test paper is the same for all students from 1st to 3rd year. |

I also added "How should I prepare for the test?", which points to the learning path. The recruitment month and the club's Instagram handle are still marked "Not published".

**The rest of the mockup:**
- **Learning path ([learn.html](https://kavin-svg-cpu.github.io/AeroBMSCE_TASK_REPO/learn.html)), a new "Learn" page in the nav:**
  - Six waypoints, from Basics of flight to Competition.
  - Each waypoint has five short notes, each linked to its sources (NASA Glenn, FAA, Flite Test, eCalc, ArduPilot, a university LiPo guide, India's Drone Rules 2021, SAE pages and BMSCE's Propel Lab-3 report).
  - Each waypoint has a 3–4 question quiz. Progress is saved in the visitor's browser.
  - The tutor answers from the notes, cites them, and links to the matching note. "Flag for a senior" sends an email to aerobmsce@bmsce.ac.in.
- **Project archive (What we build page):**
  - 18 entries built only from documented results and the Propel Lab-3 report, searchable in plain words.
  - The mockup's "Which year did we try a twin-boom design?" returns "No record", because there's no record of one.
  - "Lesson" shows *Not recorded yet* unless a lesson was actually written down.
- **Test-field strip (top of the home page):**
  - Live wind, gusts, temperature and sunset for BMSCE from Open-Meteo, a free weather service that needs no key.
  - A one-line summary of flying conditions that always ends by saying to check the drone airspace map and get a senior's go-ahead. Right now it correctly says "Field closed: after sunset".

None of these call a real AI model. Like Ground Control, they match questions against written-up knowledge and admit when they don't know.

**Things to check:**
1. **Wind limits are my rule of thumb, not a club rule:** up to 15 km/h wind and 20 km/h gusts counts as "good" for a beginner trainer. If the club has its own limits, send them and I'll swap them in.
2. **Results I couldn't confirm independently:** web searches found no outside record of AeroBMSCE's SAE Aero Design West 2026 or AeroTHON 2025 placings. Those entries rely on the task site's own claims.
3. **Drone rules wording is deliberately cautious:** the green zone (up to 400 ft / 120 m) and the licence exemptions are confirmed. Registration details vary by drone category and the rules get amended, so the notes tell students to check the current version.
4. **Your recruitment notes are now public:** they're quoted on the live site and in the README. Make sure the core team is happy for that to be published.

Sources:
- [MoCA — Drone Rules 2021 summary (Vikaspedia)](https://en.vikaspedia.in/viewcontent/e-governance/digital-india/unmanned-aircraft-system/ministry-of-civil-aviation-notifies-liberalised-drone-rules-2021?lgn=en) · [Draft Drone Rules 2021 (Digital Sky)](https://digitalsky.dgca.gov.in/assets/files/Draft-DronesRules-2021_Gazette%20version_14-Jul-2021.pdf) · [The Quint — Drone Rules 2021](https://www.thequint.com/amp/story/tech-and-auto/indias-drone-rules-2021-here-is-what-the-new-rules-say-about-drone-policy)
- [SAEINDIA AeroTHON 2025](https://saeindia.org/aerothon2025/) · [MathWorks competition winners](https://kr.mathworks.com/academia/students/competitions/global-competitions/winners.html) · [MIT-WPU at AeroTHON 2025](https://mitwpu.edu.in/achievements/mit-wpu-team-avion-soaring-high-at-sae-aerothon-2025)
- [DJS Skylark at SAE Aero Design West 2026](https://mba.hitbullseye.com/blog/djs-skylark-from-mumbais-djsce-soars-to-global-success-with-three-podiums-at-sae-aero-design-west-2026-in-texas.php) · [Brno University of Technology — SAE West 2026](https://www.fme.vutbr.cz/en/fakulta/oceneni/76842)
- [Flite Test — RC airplane CG](https://flitetest.com/articles/where-should-an-rc-airplane-center-of-gravity-be) · [Flite Test — Easy Aircraft Design](https://www.flitetest.com/articles/easy-aircraft-design) · [eCalc cgCalc](https://ecalc.ch/cgcalc.php) · [Model Airplane News CG calculator](https://next.modelairplanenews.com/tools/cg-calculator)
- [BYU MAGICC — LiPo guide](https://magicc.byu.edu/wiki/hw_guides/lipo_batts) · [Zbotic LiPo guide](https://zbotic.in/lipo-battery-guide-voltage-c-rating-safety/) · [Open Exam Prep — LiPo management](https://open-exam-prep.com/study-guides/aus-repl/rpas-systems-platforms/lipo-battery) · [SkyRC — 4.2 V standard](https://blog.skyrc.com/understanding-the-4-2v-standard-in-lipo-batteries/)
- [BMSCE — Mechanical Student Affinity Groups](https://bmsce.ac.in/home/Mechanical-Engineering-Student-Affinity-Groups) · [BMSCE — Propel Lab-3 report](https://bmsce.ac.in/assets/files/Research/Propel%20Lab%20III%20-%20Report.pdf)
I re-ran the same click sequence afterwards. It now goes `2026 → 2024 → (none) → 2024`, which is what you'd expect.

**A smaller one.** On a phone-sized screen (390px) the Partner page scrolled sideways by 9px. I measured each element's right edge in the test page and found two causes. A grid column set to `1fr` won't shrink below its widest content, which here was the long "Email the partnership team" button. Separately, `max-width: 360px` on the contact image was overriding the global `max-width: 100%`. Using `minmax(0, 1fr)` and `max-width: min(360px, 100%)` fixed both.

**A third one: links that overshot their section.** The site navigator sends visitors to links like `partner-with-us.html#tiers`. In testing, the page sometimes landed hundreds of pixels past the section. I measured where the section ended up on 4 loads of each test link, and the result varied from load to load. There were two causes. The browser jumps to the anchor before the web fonts load, and when they arrive the text reflows and moves the section. On top of that, the CSS `scroll-behavior: smooth` animated that first jump, and the animation kept going after the page had reflowed. The fix: smooth scrolling is now switched on only after the page has loaded, and `script.js` re-aligns to the anchor once `document.fonts.ready` resolves. After the fix, 8 out of 8 loads landed exactly 80px from the top, just below the sticky header.

---

## Extra: AI features (from the "Homepage — Blueprint" mockup)

Five features follow a mockup of AI-assisted pages. They share one small matching engine, `ai-core.js`. The full specification, covering behaviour, data sources, thresholds, tests and maintenance, is in **[AI-SPEC.md](AI-SPEC.md)**.

| Feature | Where | Files |
|---|---|---|
| **Test-field strip.** Live wind, gusts, temperature and sunset at BMSCE, plus a plain-language "AI summary" of whether it's a good time for test flights | Top of the home page | `field.js` |
| **Ask the club (Ground Control).** Answers joining questions with sources | Home page, `#ask` | `ask-the-club.js` |
| **Learning path + AI tutor.** Six waypoints (Basics of flight → Competition) with notes, practice quizzes and a tutor that cites its sources | `learn.html` | `learn-data.js`, `learn.js` |
| **Project archive search.** Every documented build and result, searchable in plain words | What we build, `#archive` | `archive.js` |
| **Site navigator ("Where do you want to go? I can help").** Describe what you want and it takes you to the exact page and section, which flashes gold when you arrive | Home page, floating compass button | `navigator.js` |

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

**Testing.** An automated test page loads the real pages in iframes. It runs 37 questions through the assistant, tutor and archive search, plus 17 through the navigator, and checks that all 33 navigator destinations exist. Examples: the mockup's "Can first-years join?" goes to the recruitment notes, "Is it too windy to fly?" goes to WPT 05 › Reading the weather, "Which year did we try a twin-boom design?" correctly returns *No record*, and "where can I see the sponsorship tiers?" goes to Partner with us › Collaboration tiers. See [AI-SPEC.md](AI-SPEC.md) §4 for the full table.

---

### Running locally
Open `index.html` in a browser. No install is needed.

### Deployment
GitHub Pages serves the site from the `main` branch root (Settings → Pages → Deploy from a branch → `main` / `root`).

*Practice website for the AeroBMSCE web development recruitment task. This is not the official AeroBMSCE website.*
