/* =========================================================
   Site navigator — "Where do you want to go? I can help."
   ---------------------------------------------------------
   A floating helper on the home page. The visitor describes what
   they're looking for in plain words; AICore (ai-core.js) matches
   it against an index of every section on the site and offers the
   exact page + section, with a "Take me there" link.
   ========================================================= */

(function () {
  var launcher = document.querySelector(".nav-ai-launcher");
  var panel = document.getElementById("nav-ai-panel");
  if (!launcher || !panel) return;

  /* ---------- 1. Site index: every destination worth landing on ----------
     page + hash = the exact location; path = breadcrumb shown to the user. */
  var DESTINATIONS = [
    // Home
    { page: "index.html", hash: "field", title: "Live test-field conditions", path: "Home › Test field",
      desc: "Wind, gusts, temperature and sunset at BMSCE, with a flying summary.",
      keywords: ["weather", "wind", "gust", "temperature", "sunset", "conditions", "today", "test", "field", "fly"] },
    { page: "index.html", hash: "numbers", title: "The club in numbers", path: "Home › In numbers",
      desc: "Established 2012, 75+ projects, 20+ podiums, 50+ papers, 10+ departments.",
      keywords: ["stats", "statistics", "numbers", "projects", "podium", "papers", "departments", "established"] },
    { page: "index.html", hash: "latest", title: "Latest result", path: "Home › Latest from the flight log",
      desc: "2nd internationally at SAE Aero Design West 2026.",
      keywords: ["latest", "news", "recent", "newest", "update"] },
    { page: "index.html", hash: "ask", title: "Ask the club (joining questions)", path: "Home › Ask the club",
      desc: "Who can join, how selection works, first-years, the recruitment test.",
      keywords: ["join", "recruitment", "selection", "interview", "test", "eligible", "first", "year", "apply", "member", "question", "chat"] },

    // Who we are
    { page: "who-we-are.html", hash: "about", title: "About the club", path: "Who we are › About the club",
      desc: "History since 2012, Propel Lab-3, what the club does.",
      keywords: ["club", "history", "established", "founded", "propel", "lab", "intro", "introduction", "story", "aerobmsce"] },
    { page: "who-we-are.html", hash: "teams", title: "Our four teams", path: "Who we are › Our teams",
      desc: "Yaksha, Blue Impulse, Flying Phantoms and Vectors.",
      keywords: ["team", "yaksha", "blue", "impulse", "phantom", "vector", "subteam"] },
    { page: "who-we-are.html", hash: "vision", title: "Vision and why it matters", path: "Who we are › Why it matters",
      desc: "The club's vision and what members gain.",
      keywords: ["vision", "mission", "goal", "why", "matter", "purpose", "aim"] },
    { page: "who-we-are.html", hash: "field-log", title: "Photo gallery", path: "Who we are › Field log",
      desc: "Photos from competitions, flying grounds and the crew.",
      keywords: ["photo", "gallery", "picture", "image", "pic", "crew", "team", "field", "log"] },

    // What we build
    { page: "what-we-build.html", hash: "platforms", title: "What we build", path: "What we build › Bill of platforms",
      desc: "Competition aircraft, aeromodels, autonomous drones, racing drones.",
      keywords: ["build", "aircraft", "plane", "drone", "racing", "aeromodel", "platform", "fixed", "wing", "multirotor"] },
    { page: "what-we-build.html", hash: "archive", title: "Project archive (searchable)", path: "What we build › Project archive",
      desc: "Every documented build and result by year, searchable in plain words.",
      keywords: ["archive", "past", "old", "history", "previous", "project", "search", "lesson", "boom", "payload"] },
    { page: "what-we-build.html", hash: "rnd", title: "Research & development", path: "What we build › R&D",
      desc: "Flight controller, ESC, GPS-denied navigation, surveillance UAV, morphing wingtips, micro-fins, DRDO project.",
      keywords: ["research", "development", "rnd", "flight", "controller", "esc", "gps", "navigation", "surveillance", "morphing", "wingtip", "micro", "fin", "drdo", "defence"] },
    { page: "what-we-build.html", hash: "status", title: "Project status and funding", path: "What we build › Strategic project status",
      desc: "R&D funded by BMSCE; a flight-proven product.",
      keywords: ["status", "funding", "funded", "subsidised", "flight", "proven"] },

    // Achievements
    { page: "achievements.html", hash: "summary", title: "Credibility summary", path: "Achievements › Summary",
      desc: "Flying since 2012, 75+ projects, 20+ podiums, international flight history.",
      keywords: ["summary", "credibility", "stats", "international"] },
    { page: "achievements.html", hash: "milestones", title: "All milestones (filterable)", path: "Achievements › Milestones",
      desc: "Every result 2018–2026, filter by season and competition type.",
      keywords: ["milestone", "result", "award", "prize", "win", "won", "achievement", "podium", "filter", "competition", "rank"] },
    { page: "achievements.html", hash: "season-2026", title: "2026 results", path: "Achievements › 2026 season",
      desc: "SAE Aero Design West 2026 (Fort Worth, Texas), ADDC 2026.",
      keywords: ["2026", "west", "fort", "worth", "texas", "usa", "matlab", "addc"] },
    { page: "achievements.html", hash: "season-2025", title: "2025 results", path: "Achievements › 2025 season",
      desc: "SAE Aerothon 2nd overall, Drone Design Challenge, Autonomous DDC.",
      keywords: ["2025", "aerothon", "ddc"] },
    { page: "achievements.html", hash: "season-2024", title: "2024 results", path: "Achievements › 2024 season",
      desc: "NITK and GAT drone racing, SAE Aero Design West.",
      keywords: ["2024", "nitk", "gat", "racing"] },
    { page: "achievements.html", hash: "season-2022", title: "2022 results", path: "Achievements › 2022 season",
      desc: "Aerothon, South India Exhibition, AI-VTOL (IIT Bombay), SAE West.",
      keywords: ["2022", "vtol", "iit", "bombay", "techfest", "exhibition", "tiptur"] },
    { page: "achievements.html", hash: "season-2020", title: "2020 results", path: "Achievements › 2020 season",
      desc: "SAEINDIA 1st overall, SAE Aero Design West design standings.",
      keywords: ["2020", "saeindia", "national"] },
    { page: "achievements.html", hash: "season-2018", title: "2018 results", path: "Achievements › 2018 season",
      desc: "SAEINDIA at Anna University, Chennai.",
      keywords: ["2018", "anna", "chennai"] },

    // Learning path
    { page: "learn.html", hash: "", title: "Learning path", path: "Learn",
      desc: "Six waypoints from zero to competition-ready, with quizzes and an AI tutor.",
      keywords: ["learn", "learning", "course", "tutorial", "training", "study", "prepare", "beginner", "tutor", "quiz"] },
    { page: "learn.html", hash: "basics", title: "Basics of flight", path: "Learn › WPT 01",
      desc: "Four forces, the lift equation, airfoils and stall, drag, stability.",
      keywords: ["basic", "lift", "drag", "airfoil", "stall", "stability", "force", "aerodynamics", "physics", "cg"] },
    { page: "learn.html", hash: "design", title: "CAD and design", path: "Learn › WPT 02",
      desc: "Sizing loop, wing loading, aspect ratio, tail sizing, CAD to laser cutter.",
      keywords: ["cad", "design", "sizing", "wing", "loading", "aspect", "ratio", "tail", "solidworks", "laser"] },
    { page: "learn.html", hash: "first-build", title: "First build", path: "Learn › WPT 03",
      desc: "Simulator first, balancing, control checks, range check, hand-launching.",
      keywords: ["first", "build", "simulator", "balance", "control", "surface", "aileron", "launch", "range", "failsafe", "trainer"] },
    { page: "learn.html", hash: "electronics", title: "Electronics", path: "Learn › WPT 04",
      desc: "Power chain, LiPo batteries, motors and KV, ESCs, flight controllers.",
      keywords: ["electronics", "battery", "lipo", "motor", "kv", "esc", "servo", "radio", "pixhawk", "ardupilot", "charge", "propeller"] },
    { page: "learn.html", hash: "flight-testing", title: "Flight testing and drone rules", path: "Learn › WPT 05",
      desc: "Drone Rules 2021 and airspace zones, weather, checklist, flight log, test cards.",
      keywords: ["rule", "law", "legal", "dgca", "digital", "sky", "zone", "checklist", "safety", "testing", "permission"] },
    { page: "learn.html", hash: "competition", title: "Competition prep", path: "Learn › WPT 06",
      desc: "SAE Aero Design, SAEINDIA AeroTHON, design reports, presentations.",
      keywords: ["competition", "sae", "aerothon", "report", "presentation", "prototype", "rules", "scoring"] },

    // Partner with us
    { page: "partner-with-us.html", hash: "support", title: "Where sponsor support goes", path: "Partner with us › Where your support goes",
      desc: "Financial sponsorship, academic guidance, opportunity and exposure.",
      keywords: ["support", "sponsorship", "funding", "money", "donate", "travel", "guidance"] },
    { page: "partner-with-us.html", hash: "tiers", title: "Collaboration tiers", path: "Partner with us › Collaboration tiers",
      desc: "Platinum, Gold, Silver and Technical & Ecosystem partner benefits.",
      keywords: ["tier", "platinum", "gold", "silver", "technical", "ecosystem", "package", "benefit", "sponsor", "sponsorship", "level"] },
    { page: "partner-with-us.html", hash: "outcomes", title: "Why partner: outcomes", path: "Partner with us › Partner outcomes",
      desc: "Talent access, credibility, 20,000+ digital and 50,000+ on-ground impressions.",
      keywords: ["outcome", "why", "benefit", "impression", "visibility", "brand", "talent"] },
    { page: "partner-with-us.html", hash: "upcoming", title: "Upcoming competitions", path: "Partner with us › What's next",
      desc: "NACDEC 2026, ISRO IROC, NITK Drone Racing, SAE West 2027, Aerothon 2027.",
      keywords: ["upcoming", "next", "future", "plan", "nacdec", "iroc", "isro", "2027"] },
    { page: "partner-with-us.html", hash: "ecosystem", title: "Partners and collaborators", path: "Partner with us › Who we work with",
      desc: "SOLIDWORKS, Ansys, Altair, Siemens, flow5, SimScale, DRK Store, DRDO, CSIR-NAL.",
      keywords: ["partner", "logo", "collaborator", "solidworks", "ansys", "altair", "siemens", "flow5", "simscale", "drdo", "csir", "nal", "software", "company"] },
    { page: "partner-with-us.html", hash: "contact", title: "Contact the club", path: "Partner with us › Contact",
      desc: "Email aerobmsce@bmsce.ac.in. Partnership Head: Rajesh.",
      keywords: ["contact", "email", "mail", "reach", "phone", "rajesh", "head", "talk", "message"] }
  ];

  var PAGES = [
    { page: "index.html", name: "Home" },
    { page: "who-we-are.html", name: "Who we are" },
    { page: "what-we-build.html", name: "What we build" },
    { page: "achievements.html", name: "Achievements" },
    { page: "learn.html", name: "Learn" },
    { page: "partner-with-us.html", name: "Partner with us" }
  ];

  var MIN_CONFIDENCE = 1.0;
  var MAX_RESULTS = 3;

  var currentPage = location.pathname.split("/").pop() || "index.html";

  function rankDestinations(query) {
    return AICore.rank(query, DESTINATIONS, function (d) {
      return { strong: d.keywords, weak: [d.title, d.path, d.desc] };
    });
  }
  window.SiteNavigator = { rank: rankDestinations, MIN_CONFIDENCE: MIN_CONFIDENCE };   // used by tests

  // Same-page destinations use just "#hash" so the page scrolls instead of reloading.
  function hrefFor(d) {
    if (d.page === currentPage) return d.hash ? "#" + d.hash : "#main";
    return d.page + (d.hash ? "#" + d.hash : "");
  }

  /* ---------- 2. Panel UI ---------- */
  var form = panel.querySelector(".nav-ai-form");
  var input = panel.querySelector(".nav-ai-input");
  var results = panel.querySelector(".nav-ai-results");
  var chips = panel.querySelector(".nav-ai-chips");

  function open() {
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
    input.focus();
  }
  function close() {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  }

  launcher.addEventListener("click", function () { panel.hidden ? open() : close(); });
  panel.querySelector(".nav-ai-close").addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) close();
  });

  function resultCard(d, isBest) {
    return '<li class="nav-ai-result' + (isBest ? " is-best" : "") + '">' +
      '<span class="nav-ai-path">' + d.path + "</span>" +
      "<b>" + d.title + "</b>" +
      "<p>" + d.desc + "</p>" +
      '<a class="' + (isBest ? "btn btn-primary" : "nav-ai-go") + '" href="' + hrefFor(d) + '">' +
        (isBest ? "Take me there →" : "Go →") + "</a>" +
    "</li>";
  }

  function search(query) {
    query = query.trim();
    if (!query) return;
    var safe = AICore.escapeHtml(query);
    var hits = rankDestinations(query)
      .filter(function (r) { return r.score >= MIN_CONFIDENCE; })
      .slice(0, MAX_RESULTS)
      .map(function (r) { return r.item; });

    if (!hits.length) {
      results.innerHTML =
        '<p class="nav-ai-msg"><span class="gc-tag gc-tag-warn">Not found</span> I couldn\'t find “' + safe +
        "” on this site. Try other words, or browse a page:</p>" +
        '<ul class="nav-ai-pages">' + PAGES.map(function (p) {
          return '<li><a href="' + (p.page === currentPage ? "#main" : p.page) + '">' + p.name + "</a></li>";
        }).join("") + "</ul>" +
        '<p class="nav-ai-msg">Joining question? <a href="' + (currentPage === "index.html" ? "#ask" : "index.html#ask") + '">Ask the club →</a></p>';
      return;
    }

    results.innerHTML =
      '<p class="nav-ai-msg"><span class="gc-tag gc-tag-ok">Found</span> For “' + safe + "”, the best match is:</p>" +
      '<ol class="nav-ai-list">' + hits.map(function (d, i) { return resultCard(d, i === 0); }).join("") + "</ol>";
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); search(input.value); });
  chips.addEventListener("click", function (e) {
    var chip = e.target.closest(".gc-chip");
    if (!chip) return;
    input.value = chip.textContent;
    search(chip.textContent);
  });

  // Following a same-page link: close the panel so the section is visible.
  results.addEventListener("click", function (e) {
    var link = e.target.closest("a");
    if (link && link.getAttribute("href").charAt(0) === "#") {
      panel.hidden = true;
      launcher.setAttribute("aria-expanded", "false");
    }
  });

  launcher.hidden = false;   // only shown once the script is running
})();
