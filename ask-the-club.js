/* =========================================================
   "Ask the club" — Ground Control assistant
   ---------------------------------------------------------
   Runs entirely in the browser (GitHub Pages has no backend).
   Each question is matched against a small knowledge base of
   club facts. Every answer cites where it came from. If the
   club has not published something, the assistant says so
   instead of guessing, and offers to email the core team.
   ========================================================= */

/* ---------- 1. Sources the answers cite ---------- */
var SOURCES = {
  who:      { label: "Who we are (this site)",        href: "who-we-are.html" },
  build:    { label: "What we build (this site)",     href: "what-we-build.html" },
  wins:     { label: "Achievements (this site)",      href: "achievements.html" },
  partner:  { label: "Partner with us (this site)",   href: "partner-with-us.html" },
  mech:     { label: "BMSCE Mechanical — Student Affinity Groups",
              href: "https://bmsce.ac.in/home/Mechanical-Engineering-Student-Affinity-Groups" },
  propel:   { label: "BMSCE — Propel Lab-3 report",
              href: "https://bmsce.ac.in/assets/files/Research/Propel%20Lab%20III%20-%20Report.pdf" }
};

var CONTACT_EMAIL = "aerobmsce@bmsce.ac.in";

/* ---------- 2. Knowledge base ----------
   status: "record"      → the fact is published by the club or BMSCE
           "unpublished" → we looked and it is not published; say so honestly
   keywords: words that signal this topic (after normalising, see below)   */
var KNOWLEDGE = [
  {
    id: "who-can-join",
    question: "Who can join?",
    keywords: ["join", "eligible", "eligibility", "member", "become", "criteria", "open", "requirement", "apply"],
    status: "unpublished",
    answer:
      "AeroBMSCE is the official aerospace, aeromodelling and unmanned systems club of BMS College of Engineering, " +
      "and its members come from <b>10+ departments</b>, not a single branch. " +
      "The exact eligibility rules (year, branch, grades) are <b>not published</b>, so confirm the current criteria with the core team when recruitment opens.",
    sources: ["who"],
    related: ["mechanical", "first-years", "selection"]
  },
  {
    id: "mechanical",
    question: "Do I need to be in Mechanical?",
    keywords: ["mechanical", "mech", "branch", "department", "cse", "ece", "eee", "computer", "electronics", "electrical", "aerospace", "ise", "stream", "other"],
    status: "record",
    answer:
      "No. The club brings together engineers from <b>more than 10 departments</b>. " +
      "Plenty of the work isn't mechanical at all: the R&amp;D list includes an indigenous <b>flight controller</b> (hardware and firmware), " +
      "<b>ESC</b> propulsion electronics and <b>vision-based GPS-denied navigation</b>. " +
      "The club's lab, Propel Lab-3, sits under BMSCE Aerospace.",
    sources: ["who", "build", "propel"],
    related: ["build", "who-can-join"]
  },
  {
    id: "selection",
    question: "How does selection work?",
    keywords: ["selection", "select", "selected", "interview", "test", "recruitment", "recruit", "process", "round", "shortlist", "task"],
    status: "unpublished",
    answer:
      "The selection process is <b>not published</b> on this site or on BMSCE's pages, and we won't guess it. " +
      "The core team can tell you how this year's recruitment works. " +
      "To prepare, read <a href=\"what-we-build.html\">what we build</a> and <a href=\"achievements.html\">our results</a> so you can talk about the work.",
    sources: ["who"],
    related: ["when-recruitment", "experience"]
  },
  {
    id: "build",
    question: "What will I actually build?",
    keywords: ["build", "make", "work", "project", "projects", "aircraft", "plane", "drone", "drones", "uav", "rc", "racing", "design", "actually"],
    status: "record",
    answer:
      "Four kinds of platform: <b>competition aircraft</b> for SAE Aero Design West (Team Yaksha), " +
      "<b>aeromodels</b> for national events (Team Blue Impulse), <b>autonomous payload drones</b> for SAE Aerothon (Team Flying Phantoms) " +
      "and <b>racing drones</b> (Team Vectors). " +
      "Past lab work includes RC planes carrying 0.9–1 kg payloads and a three-rotor hybrid eVTOL. " +
      "Current R&amp;D covers morphing wingtips, deployable micro-fins and a reconfigurable surveillance UAV.",
    sources: ["build", "propel"],
    related: ["learn", "teams"]
  },
  {
    id: "first-years",
    question: "Can first-years join?",
    keywords: ["first", "year", "fresher", "freshers", "junior", "semester", "sem", "1st", "beginner", "newbie", "second", "2nd"],
    status: "unpublished",
    answer:
      "There is <b>no published year requirement</b>, so check with the core team for this cycle. " +
      "Beginners are trained in-house: Propel Lab-3 gives UG students hands-on flying practice on an <b>RC flight simulator</b> (Phoenix5), " +
      "and lab students fly a <b>foam trainer</b> (Sky Surfer) at the APS ground.",
    sources: ["propel"],
    related: ["experience", "learn"]
  },
  {
    id: "experience",
    question: "Do I need prior experience?",
    keywords: ["experience", "prior", "know", "knowledge", "skill", "skills", "never", "beginner", "background", "prerequisite"],
    status: "record",
    answer:
      "None of the club's published material lists prior experience as a requirement. " +
      "Training starts from the basics: a simulator before real flying, a foam trainer before competition aircraft, " +
      "and lab workshops on <b>RC airplane design and wing fabrication</b>.",
    sources: ["propel"],
    related: ["learn", "first-years"]
  },
  {
    id: "learn",
    question: "What will I learn?",
    keywords: ["learn", "training", "train", "teach", "skill", "skills", "workshop", "workshops", "software", "cad", "simulation", "fly", "flying", "pilot"],
    status: "record",
    answer:
      "On record: <b>flight training</b> on an RC simulator, then a foam trainer outdoors; " +
      "<b>workshops</b> on RC airplane design, analysis and wing fabrication; <b>propulsion testing</b> on a thrust rig for motor, battery and propeller combinations; " +
      "and <b>CAD and simulation</b> with tools from our technical partners (SOLIDWORKS, Ansys, Altair, Siemens, flow5, SimScale).",
    sources: ["propel", "partner"],
    related: ["build", "experience"]
  },
  {
    id: "teams",
    question: "What are the club's teams?",
    keywords: ["team", "teams", "yaksha", "blue", "impulse", "phantoms", "flying", "vectors", "sub"],
    status: "record",
    answer:
      "Four teams: <b>Yaksha</b> (international competitions), <b>Blue Impulse</b> (aeromodelling), " +
      "<b>Flying Phantoms</b> (drone development) and <b>Vectors</b> (drone racing).",
    sources: ["who", "mech"],
    related: ["build", "achievements"]
  },
  {
    id: "achievements",
    question: "What has the club won?",
    keywords: ["won", "win", "wins", "achievement", "achievements", "award", "awards", "result", "results", "podium", "prize", "rank", "competition", "competitions"],
    status: "record",
    answer:
      "20+ podium finishes. Highlights: <b>2nd internationally</b> (MATLAB Simulation Awards) at SAE Aero Design West 2026, " +
      "<b>1st</b> for Unique Technology Development at ADDC 2026, <b>2nd overall</b> at SAE Aerothon 2025 (₹1,25,000), " +
      "and <b>1st overall</b> at SAEINDIA 2020 (₹1,00,000). See the full flight log on the <a href=\"achievements.html\">Achievements</a> page.",
    sources: ["wins"],
    related: ["build", "upcoming"]
  },
  {
    id: "upcoming",
    question: "Which competitions are next?",
    keywords: ["next", "upcoming", "future", "plan", "plans", "2026", "2027", "nacdec", "iroc", "isro"],
    status: "record",
    answer:
      "Targets for 2026–27: <b>NACDEC 2026</b> (Aeronautical Society of India), <b>ISRO IROC</b>, " +
      "<b>NITK Drone Racing 2026</b>, <b>SAE Aero Design West 2027</b> and <b>SAE Aerothon 2027</b>.",
    sources: ["partner"],
    related: ["achievements", "build"]
  },
  {
    id: "about",
    question: "What is AeroBMSCE?",
    keywords: ["about", "aerobmsce", "history", "founded", "established", "since", "old", "lab", "where", "located", "propel"],
    status: "record",
    answer:
      "AeroBMSCE is the official aerospace, aeromodelling and unmanned systems innovation club of BMS College of Engineering, " +
      "<b>established in 2012</b> and operating from <b>Propel Lab-3</b>. It has completed 75+ projects and produced 50+ papers, reports and certifications.",
    sources: ["who", "propel"],
    related: ["teams", "build"]
  },
  {
    id: "mech-aero-club",
    question: "Is this the Mechanical department's Aero Club?",
    keywords: ["2017", "same", "different", "relation", "related"],
    status: "unpublished",
    answer:
      "BMSCE's Mechanical department lists a separate <b>AERO Club</b>, launched on 5 May 2017, alongside Team Yaksha &amp; Blue Impulse. " +
      "AeroBMSCE describes itself as established in 2012 with members from 10+ departments. " +
      "How the two groups relate is <b>not published</b>, so ask the core team.",
    sources: ["mech", "who"],
    related: ["about", "contact"]
  },
  {
    id: "when-recruitment",
    question: "When is recruitment?",
    keywords: ["when", "recruitment", "recruit", "date", "deadline", "month", "open", "opening", "form", "apply"],
    status: "unpublished",
    answer:
      "Recruitment dates are <b>not published</b> here. Email the core team to be told when the next round opens.",
    sources: ["who"],
    related: ["selection", "contact"]
  },
  {
    id: "contact",
    question: "How do I contact the club?",
    keywords: ["contact", "email", "mail", "reach", "talk", "message", "instagram", "insta", "social", "mentor", "faculty", "phone", "head"],
    status: "record",
    answer:
      "Email <a href=\"mailto:" + CONTACT_EMAIL + "\">" + CONTACT_EMAIL + "</a>. " +
      "BMSCE lists <b>Dr. Ram Rohith V.</b> as faculty mentor of Team Yaksha &amp; Blue Impulse. " +
      "For sponsorship, the Partnership Head is Rajesh. An official Instagram handle isn't listed on the sources we checked.",
    sources: ["partner", "mech"],
    related: ["when-recruitment", "sponsor"]
  },
  {
    id: "sponsor",
    question: "How can a company sponsor the club?",
    keywords: ["sponsor", "sponsorship", "partner", "partnership", "fund", "funding", "company", "brand", "tier", "tiers", "platinum", "gold", "silver"],
    status: "record",
    answer:
      "There are four collaboration tiers: <b>Platinum</b>, <b>Gold</b>, <b>Silver</b> and <b>Technical &amp; Ecosystem</b>. " +
      "Partners fund travel and logistics, give academic guidance and open up opportunities, in exchange for visibility on aircraft, uniforms and at events. " +
      "Details are on <a href=\"partner-with-us.html\">Partner with us</a>.",
    sources: ["partner"],
    related: ["contact", "achievements"]
  }
];

/* ---------- 3. Matching engine ---------- */

// Words that carry no meaning for matching.
var STOPWORDS = ("a an the is are am be to of in on for and or i me my we our you your it this that do does did " +
  "can could should would will how what which who where why with at as by from about any there here " +
  "need get have has into so if just really guys stuff please tell hi hey hello thanks").split(" ");

// Map different ways of saying something onto one word.
var SYNONYMS = {
  "freshers": "fresher", "1st": "first", "firstyear": "first", "newcomer": "beginner",
  "mech": "mechanical",
  "cs": "cse", "computers": "computer", "ec": "ece", "ee": "eee",
  "planes": "plane", "airplane": "plane", "aeroplane": "plane", "aircrafts": "aircraft",
  "quadcopter": "drone", "quad": "drone", "multirotor": "drone",
  "recruiting": "recruitment", "recruitments": "recruitment", "hiring": "recruitment",
  "interviews": "interview", "tests": "test", "joining": "join", "joined": "join",
  "sponsors": "sponsor", "sponsoring": "sponsor", "partners": "partner",
  "competitions": "competition", "events": "competition",
  "insta": "instagram", "ig": "instagram",
  "applications": "apply", "application": "apply", "applying": "apply"
};

function normalise(text) {
  return text
    .toLowerCase()
    .replace(/first[\s-]+years?/g, "first year")   // "first-years" → "first year"
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(function (w) { return w.length > 1 && STOPWORDS.indexOf(w) === -1; })
    .map(function (w) { return SYNONYMS[w] || w; });
}

// Score every entry by how many of the question's words it recognises.
// Keywords count double; words from the entry's own question count once.
function rankEntries(query) {
  var words = normalise(query);
  if (!words.length) return [];

  return KNOWLEDGE.map(function (entry) {
    var keywords = entry.keywords.map(function (k) { return SYNONYMS[k] || k; });
    var questionWords = normalise(entry.question);
    var score = 0;
    words.forEach(function (w) {
      if (keywords.indexOf(w) !== -1) score += 2;
      if (questionWords.indexOf(w) !== -1) score += 1;
    });
    // Long questions shouldn't win just by containing more words.
    return { entry: entry, score: score / Math.sqrt(words.length) };
  })
  .filter(function (r) { return r.score > 0; })
  .sort(function (a, b) { return b.score - a.score; });
}

var MIN_CONFIDENCE = 1.0;   // below this we admit we don't know

function findById(id) {
  return KNOWLEDGE.filter(function (e) { return e.id === id; })[0];
}

/* ---------- 4. Chat UI ---------- */
(function setupGroundControl() {
  var panel = document.querySelector(".gc");
  if (!panel) return;

  var log = panel.querySelector(".gc-log");
  var form = panel.querySelector(".gc-form");
  var input = panel.querySelector(".gc-input");
  var chipBox = panel.querySelector(".gc-chips");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function scrollToEnd() { log.scrollTop = log.scrollHeight; }

  function addUserMessage(text) {
    var msg = document.createElement("div");
    msg.className = "gc-msg gc-msg-user";
    msg.textContent = text;              // user text is never treated as HTML
    log.appendChild(msg);
    scrollToEnd();
  }

  function mailtoFor(question) {
    return "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent("Question from the website") +
      "&body=" + encodeURIComponent("Hi AeroBMSCE team,\n\n" + question + "\n\nThanks!");
  }

  function sourcesHtml(ids) {
    return ids.map(function (id) {
      var s = SOURCES[id];
      var external = s.href.indexOf("http") === 0;
      return '<a href="' + s.href + '"' + (external ? ' target="_blank" rel="noopener"' : "") + ">" + s.label + "</a>";
    }).join(" · ");
  }

  function addBotMessage(html, opts) {
    var msg = document.createElement("div");
    msg.className = "gc-msg gc-msg-bot";
    var tag = "";
    if (opts.status === "record") tag = '<span class="gc-tag gc-tag-ok">On record</span>';
    if (opts.status === "unpublished") tag = '<span class="gc-tag gc-tag-warn">Not published, confirm with core team</span>';
    if (opts.status === "unknown") tag = '<span class="gc-tag gc-tag-warn">Not in club records</span>';

    msg.innerHTML =
      tag +
      "<p>" + html + "</p>" +
      (opts.sources ? '<p class="gc-source"><span>Source</span> ' + sourcesHtml(opts.sources) + "</p>" : "");
    log.appendChild(msg);
    // Long answers: scroll so the user's question sits at the top and the
    // answer reads from its first line, instead of jumping to its end.
    var question = msg.previousElementSibling;
    log.scrollTop = question ? question.offsetTop - 12 : log.scrollHeight;
  }

  // Suggested follow-ups replace the chip row after every answer.
  function showChips(ids) {
    chipBox.innerHTML = "";
    ids.forEach(function (id) {
      var entry = findById(id);
      if (!entry) return;
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "gc-chip";
      chip.textContent = entry.question;
      chipBox.appendChild(chip);
    });
  }

  function answer(question) {
    var ranked = rankEntries(question);
    var best = ranked[0];

    if (!best || best.score < MIN_CONFIDENCE) {
      addBotMessage(
        "I don't have that in the club's records, and I won't guess. " +
        '<a href="' + mailtoFor(question) + '">Send this question to the core team →</a>',
        { status: "unknown" }
      );
      showChips(["who-can-join", "build", "contact"]);
      return;
    }

    var entry = best.entry;
    var reply = entry.answer;
    if (entry.status === "unpublished") {
      reply += ' <a href="' + mailtoFor(question) + '">Ask the core team →</a>';
    }
    addBotMessage(reply, { status: entry.status, sources: entry.sources });
    showChips(entry.related);
  }

  function ask(question) {
    question = question.trim();
    if (!question) return;
    addUserMessage(question);
    input.value = "";

    // A short "transmitting" pause makes the exchange readable, not instant.
    var typing = document.createElement("div");
    typing.className = "gc-msg gc-msg-bot gc-typing";
    typing.setAttribute("aria-hidden", "true");
    typing.innerHTML = "<span></span><span></span><span></span>";
    log.appendChild(typing);
    scrollToEnd();

    setTimeout(function () {
      typing.remove();
      answer(question);
    }, reduceMotion ? 0 : 500);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    ask(input.value);
  });

  chipBox.addEventListener("click", function (e) {
    var chip = e.target.closest(".gc-chip");
    if (chip) ask(chip.textContent);
  });

  panel.classList.add("is-ready");     // reveals the input (hidden without JS)
})();
