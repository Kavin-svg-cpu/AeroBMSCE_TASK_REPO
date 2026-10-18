/* =========================================================
   Project archive (What we build page)
   Every documented build and result, searchable in plain words.
   Entries only contain what the club or BMSCE has published;
   lessons are shown only when they were actually recorded.
   ========================================================= */

(function () {
  var root = document.getElementById("archive");
  if (!root) return;

  var SOURCES = {
    wins:     { label: "Achievements (this site)", href: "achievements.html" },
    propel:   { label: "Propel Lab-3 report", href: "https://bmsce.ac.in/assets/files/Research/Propel%20Lab%20III%20-%20Report.pdf" },
    aerothon: { label: "SAEINDIA AeroTHON 2025", href: "https://saeindia.org/aerothon2025/" }
  };

  // kind: "plane" | "drone" | "lab" decides the little drawing on the card.
  // approx: the Propel Lab-3 report doesn't date each project; it covers work around 2022.
  var ARCHIVE = [
    { year: 2026, kind: "plane", category: "SAE Aero Design", title: "Micro Class aircraft",
      event: "SAE Aero Design West 2026 · Fort Worth, Texas", result: "2nd internationally (MATLAB Simulation Awards) · #16 overall, Micro Class",
      keywords: ["micro", "sae", "west", "usa", "texas", "matlab", "simulation", "international", "fixed", "wing", "plane"], sources: ["wins"] },
    { year: 2026, kind: "drone", category: "Drone", title: "ADDC 2026 entry",
      event: "SAE Aerothon · Autonomous Drone Design Challenge 2026", result: "1st place, Unique Technology Development",
      keywords: ["addc", "autonomous", "drone", "aerothon", "technology"], sources: ["wins"] },
    { year: 2025, kind: "drone", category: "Drone", title: "Flying Phantoms payload multirotor",
      event: "SAEINDIA AeroTHON 2025 (theme: Surveillance and Disaster Management)", result: "2nd place overall · ₹1,25,000",
      details: "Quadcopter with a payload box, flown by Team Flying Phantoms.",
      keywords: ["aerothon", "payload", "quadcopter", "surveillance", "disaster", "flying", "phantom", "drone"], sources: ["wins", "aerothon"] },
    { year: 2025, kind: "drone", category: "Drone", title: "SAE Drone Design Challenge entry",
      event: "SAE Drone Design Challenge · May 2025", result: "1st place, Best Technical Presentation · ₹10,000",
      keywords: ["drone", "design", "challenge", "presentation", "ddc"], sources: ["wins"] },
    { year: 2025, kind: "drone", category: "Drone", title: "Autonomous drone entry",
      event: "SAE Autonomous Drone Design Challenge · Apr 2025", result: "1st place, Best Innovation · ₹5,000",
      keywords: ["autonomous", "drone", "innovation", "addc"], sources: ["wins"] },
    { year: 2024, kind: "drone", category: "Racing drone", title: "Team Vectors racing quads",
      event: "NITK Drone Racing (Oct) · Global Academy of Technology (Nov)", result: "2nd at NITK · 1st at GAT",
      keywords: ["racing", "race", "fpv", "vectors", "nitk", "gat", "quad", "drone"], sources: ["wins"] },
    { year: 2024, kind: "plane", category: "SAE Aero Design", title: "SAE Aero Design West aircraft",
      event: "SAE Aero Design West · Aug 2024", result: "12th place globally",
      keywords: ["sae", "west", "international", "plane", "fixed", "wing"], sources: ["wins"] },
    { year: 2022, kind: "plane", category: "SAE Aero Design", title: "Team Yaksha — prototype and final aircraft",
      event: "SAE Aero Design West (USA)", result: "9th globally (Design Report) · 11th globally (Technical Presentation)",
      details: "One prototype RC plane and a final model carrying a 1 kg payload.",
      keywords: ["yaksha", "sae", "west", "usa", "payload", "prototype", "rc", "plane", "international"], sources: ["propel", "wins"] },
    { year: 2022, kind: "plane", category: "SAEINDIA", title: "Team Blue Impulse — RC payload planes",
      event: "SAEINDIA Aero Design Challenge 2022 (Team ID ADC20220175)", result: "3rd place, fabrication report",
      details: "Two prototype RC planes carrying a 0.9 kg payload, designed with 3D wing analysis. Fuselage, elevator, rudder and airfoil parts were laser cut in Propel Lab-3.",
      keywords: ["blue", "impulse", "saeindia", "payload", "laser", "fabrication", "rc", "plane", "wing"], sources: ["propel"] },
    { year: 2022, kind: "drone", category: "Drone", title: "SAE Aerothon 2022 entry",
      event: "SAE Aerothon 2022", result: "3rd place · ₹50,000",
      keywords: ["aerothon", "drone"], sources: ["wins"] },
    { year: 2022, kind: "drone", category: "VTOL", title: "AI-VTOL entry",
      event: "AI-VTOL · Techfest, IIT Bombay", result: "4th place nationally",
      keywords: ["vtol", "techfest", "iit", "bombay", "ai"], sources: ["wins"] },
    { year: 2022, kind: "drone", category: "Lab project", title: "Hybrid eVTOL with three rotors", approx: true,
      event: "Propel Lab-3 design and development", result: "Design and development (Propel Lab-3 report)",
      keywords: ["vtol", "hybrid", "tricopter", "three", "rotor", "lab"], sources: ["propel"] },
    { year: 2022, kind: "drone", category: "Lab project", title: "Quadcopter and tricopter stability study", approx: true,
      event: "Final-year major project, Propel Lab-3", result: "Completed (Propel Lab-3 report)",
      details: "Studied stability using four motors in manual control mode.",
      keywords: ["stability", "quadcopter", "tricopter", "project", "final", "year", "lab"], sources: ["propel"] },
    { year: 2022, kind: "lab", category: "Test rig", title: "Propulsion thrust rig", approx: true,
      event: "Propel Lab-3", result: "Built and used for motor, battery and propeller comparisons",
      details: "An L-shaped arm turns horizontal thrust into a vertical force a digital scale can read. A balsa thrust meter was also built.",
      lesson: "Measuring each combination on the rig let the team compare thrust with minimum possible error, instead of trusting datasheets.",
      keywords: ["thrust", "rig", "propulsion", "motor", "battery", "propeller", "test", "balsa", "scale"], sources: ["propel"] },
    { year: 2022, kind: "lab", category: "Publication", title: "Hand-launched fixed-wing UAV paper", approx: true,
      event: "Club publication", result: "\"A practical approach to designing, manufacturing and testing a hand-launched fixed-wing UAV\"",
      keywords: ["paper", "publication", "research", "hand", "launch", "fixed", "wing", "uav"], sources: ["propel"] },
    { year: 2020, kind: "plane", category: "SAEINDIA", title: "Team Blue Impulse — national winner",
      event: "SAEINDIA 2020", result: "1st place overall · ₹1,00,000",
      keywords: ["blue", "impulse", "saeindia", "national", "winner", "plane"], sources: ["wins"] },
    { year: 2020, kind: "plane", category: "SAE Aero Design", title: "SAE Aero Design West aircraft",
      event: "SAE Aero Design West 2020", result: "8th globally in design standings",
      keywords: ["sae", "west", "design", "international", "plane"], sources: ["wins"] },
    { year: 2018, kind: "plane", category: "SAEINDIA", title: "SAEINDIA aircraft",
      event: "SAEINDIA · Anna University, Chennai", result: "3rd place overall · 2nd in Design Report",
      keywords: ["saeindia", "anna", "chennai", "plane"], sources: ["wins"] }
  ];

  // Simple line drawings, styled like the mockup's plan-view sketches.
  var ICONS = {
    plane: '<svg viewBox="0 0 120 30" aria-hidden="true"><path d="M8 20 Q60 12 112 19 Q60 25 8 20Z M44 17 L52 6 L58 6 L54 16 M92 18 L98 10 L102 10 L100 18"/></svg>',
    drone: '<svg viewBox="0 0 120 30" aria-hidden="true"><circle cx="40" cy="8" r="6"/><circle cx="80" cy="8" r="6"/><circle cx="40" cy="22" r="6"/><circle cx="80" cy="22" r="6"/><path d="M46 10 L74 20 M46 20 L74 10"/><rect x="54" y="11" width="12" height="8"/></svg>',
    lab:   '<svg viewBox="0 0 120 30" aria-hidden="true"><path d="M30 26 L30 6 L52 6 M52 2 L52 10 M30 26 L90 26 M70 26 L70 18 L90 18 L90 26"/></svg>'
  };

  var form = root.querySelector(".archive-search");
  var input = root.querySelector(".archive-input");
  var grid = root.querySelector(".archive-grid");
  var status = root.querySelector(".archive-answer");
  var MIN_CONFIDENCE = 1.0;

  function sourceLinks(ids) {
    return ids.map(function (id) {
      var s = SOURCES[id];
      var external = s.href.indexOf("http") === 0;
      return '<a href="' + s.href + '"' + (external ? ' target="_blank" rel="noopener"' : "") + ">" + s.label + "</a>";
    }).join(" · ");
  }

  function card(e) {
    return '<article class="archive-card">' +
      '<div class="archive-meta"><span>' + (e.approx ? "c. " : "") + e.year + "</span><span>" + e.category + "</span></div>" +
      '<div class="archive-icon">' + ICONS[e.kind] + "</div>" +
      "<h3>" + e.title + "</h3>" +
      "<dl>" +
        "<dt>Event</dt><dd>" + e.event + "</dd>" +
        '<dt>Result</dt><dd class="archive-result">' + e.result + "</dd>" +
        (e.details ? "<dt>Notes</dt><dd>" + e.details + "</dd>" : "") +
        "<dt>Lesson</dt><dd>" + (e.lesson || '<span class="muted">Not recorded yet</span>') + "</dd>" +
      "</dl>" +
      '<p class="gc-source"><span class="gc-source-label">Source</span> ' + sourceLinks(e.sources) + "</p>" +
    "</article>";
  }

  function render(entries) { grid.innerHTML = entries.map(card).join(""); }

  function search(query) {
    query = query.trim();
    if (!query) { render(ARCHIVE); status.innerHTML = "Showing all " + ARCHIVE.length + " archive entries."; return; }

    var yearMatch = query.match(/\b(20\d\d)\b/);
    var pool = yearMatch ? ARCHIVE.filter(function (e) { return e.year === Number(yearMatch[1]); }) : ARCHIVE;

    // "year" is just how people phrase archive questions, not a topic.
    var topic = query.replace(/\b20\d\d\b/, "").replace(/\byears?\b/gi, "");
    var ranked = AICore.rank(topic, pool, function (e) {
      return { strong: e.keywords, weak: [e.title, e.category, e.event, e.details || ""] };
    });
    // Require most of the question to be recognised, so one common word
    // ("design") can't drag in unrelated entries.
    var hits = ranked.filter(function (r) { return r.score >= MIN_CONFIDENCE && r.coverage >= 0.5; })
      .map(function (r) { return r.item; });

    // A bare year ("2022") is a valid query on its own.
    if (!hits.length && yearMatch && AICore.normalise(topic).length === 0) hits = pool;

    var safeQuery = AICore.escapeHtml(query);
    if (!hits.length) {
      status.innerHTML = '<span class="gc-tag gc-tag-warn">No record</span> Nothing in the archive matches “' + safeQuery +
        "”. If the club tried it, it hasn't been written up yet. " +
        '<a href="mailto:aerobmsce@bmsce.ac.in?subject=' + encodeURIComponent("Archive question") +
        "&body=" + encodeURIComponent(query) + '">Ask the core team →</a>';
      render(ARCHIVE);
      return;
    }

    var top = hits[0];
    status.innerHTML = '<span class="gc-tag gc-tag-ok">Found ' + hits.length + "</span> Best match: <b>" + top.year + " · " + top.title +
      "</b> — " + top.result + ".";
    render(hits);
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); search(input.value); });
  root.querySelector(".archive-examples").addEventListener("click", function (e) {
    var chip = e.target.closest(".gc-chip");
    if (!chip) return;
    input.value = chip.textContent;
    search(chip.textContent);
  });
  input.addEventListener("input", function () { if (!input.value) search(""); });

  window.ArchiveSearch = { search: search };   // used by tests
  search("");
})();
