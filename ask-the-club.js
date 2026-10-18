/* =========================================================
   "Ask the club" — Ground Control assistant (home page)
   ---------------------------------------------------------
   Matches a visitor's question against a small knowledge base
   of club facts using AICore (ai-core.js). Every answer shows
   its source and a status tag. If something isn't on record the
   assistant says so and offers to email the core team, instead
   of guessing.
   ========================================================= */

(function () {

  /* ---------- 1. Sources the answers cite ---------- */
  var SOURCES = {
    notes:    { label: "AeroBMSCE recruitment notes (core team)" },
    who:      { label: "Who we are (this site)",      href: "who-we-are.html" },
    build:    { label: "What we build (this site)",   href: "what-we-build.html" },
    wins:     { label: "Achievements (this site)",    href: "achievements.html" },
    learn:    { label: "Learning path (this site)",   href: "learn.html" },
    partner:  { label: "Partner with us (this site)", href: "partner-with-us.html" },
    mech:     { label: "BMSCE Mechanical — Student Affinity Groups",
                href: "https://bmsce.ac.in/home/Mechanical-Engineering-Student-Affinity-Groups" },
    propel:   { label: "BMSCE — Propel Lab-3 report",
                href: "https://bmsce.ac.in/assets/files/Research/Propel%20Lab%20III%20-%20Report.pdf" }
  };

  var CONTACT_EMAIL = "aerobmsce@bmsce.ac.in";

  /* ---------- 2. Knowledge base ----------
     status: "record"      → published by the club or BMSCE
             "unpublished" → we looked and it is not published; say so honestly
     keywords: words that strongly signal this topic                        */
  var KNOWLEDGE = [
    {
      id: "who-can-join",
      question: "Who can join?",
      keywords: ["join", "eligible", "eligibility", "member", "become", "criteria", "open", "requirement", "apply", "student"],
      status: "record",
      answer:
        "Any BMSCE student from <b>1st to 3rd year</b> can join, from any department. " +
        "You take a <b>written recruitment test</b> in a domain such as Flight Mechanics, Flight Structures / Subsystems, Electrical or CS, " +
        "followed by an interview if you're shortlisted.",
      sources: ["notes", "who"],
      related: ["selection", "first-years", "mechanical"]
    },
    {
      id: "mechanical",
      question: "Do I need to be in Mechanical?",
      keywords: ["mechanical", "branch", "department", "cse", "ece", "eee", "computer", "electronics", "electrical", "aerospace", "ise", "civil", "stream", "domain"],
      status: "record",
      answer:
        "No. Recruitment is by <b>domain</b>, not branch: Flight Mechanics, Flight Structures / Subsystems, <b>Electrical</b> and <b>CS</b>. " +
        "Members come from more than 10 departments, and the R&amp;D work needs all of them. " +
        "Current projects include a flight controller (hardware and firmware), ESC electronics and vision-based navigation.",
      sources: ["notes", "who", "build"],
      related: ["selection", "build"]
    },
    {
      id: "selection",
      question: "How does selection work?",
      keywords: ["selection", "select", "selected", "interview", "test", "recruitment", "recruit", "process", "round", "shortlist", "shortlisted", "slot"],
      status: "record",
      answer:
        "Three steps. <b>1. Written recruitment test</b> in a domain: Flight Mechanics, Flight Structures / Subsystems, Electrical or CS. " +
        "<b>2. Shortlist</b>: students are shortlisted for each domain or subsystem from their test. " +
        "<b>3. Interview</b>: each shortlisted candidate is interviewed in an assigned time slot. " +
        "Those on the final shortlist become part of the club. " +
        "The <a href=\"learn.html\">learning path</a> covers the basics the test domains draw on.",
      sources: ["notes"],
      related: ["first-years", "prepare", "when-recruitment"]
    },
    {
      id: "first-years",
      question: "Can first-years join?",
      keywords: ["first", "year", "fresher", "junior", "semester", "sem", "beginner", "newbie", "second", "third"],
      status: "record",
      answer:
        "<b>Yes, definitely.</b> Note that the recruitment test paper is the <b>same for all students from 1st to 3rd year</b>, " +
        "so first-years sit the same test as seniors. Once you're in, training starts from the basics: " +
        "Propel Lab-3 gives UG students flying practice on an RC simulator (Phoenix5) and a foam trainer.",
      sources: ["notes", "propel"],
      related: ["prepare", "selection"]
    },
    {
      id: "prepare",
      question: "How should I prepare for the test?",
      keywords: ["prepare", "preparation", "study", "syllabus", "topic", "practice", "ready", "revise", "crack", "clear"],
      status: "record",
      answer:
        "The test is domain-based (Flight Mechanics, Flight Structures / Subsystems, Electrical, CS), and the exact syllabus isn't published. " +
        "A good start is the <a href=\"learn.html\">learning path</a>: <b>Basics of flight</b> and <b>CAD and design</b> for the flight domains, " +
        "<b>Electronics</b> for Electrical. Each waypoint has practice quizzes and a tutor that cites its sources.",
      sources: ["notes", "learn"],
      related: ["selection", "experience"]
    },
    {
      id: "build",
      question: "What will I actually build?",
      keywords: ["build", "make", "work", "project", "aircraft", "plane", "drone", "rc", "racing", "design", "actually"],
      status: "record",
      answer:
        "Four kinds of platform: <b>competition aircraft</b> for SAE Aero Design West (Team Yaksha), " +
        "<b>aeromodels</b> for national events (Team Blue Impulse), <b>autonomous payload drones</b> for SAE Aerothon (Team Flying Phantoms) " +
        "and <b>racing drones</b> (Team Vectors). Past lab work includes RC planes carrying 0.9–1 kg payloads and a three-rotor hybrid eVTOL. " +
        "The full list is in the <a href=\"what-we-build.html#archive\">project archive</a>.",
      sources: ["build", "propel"],
      related: ["learn", "teams"]
    },
    {
      id: "experience",
      question: "Do I need prior experience?",
      keywords: ["experience", "prior", "know", "knowledge", "skill", "never", "background", "prerequisite"],
      status: "record",
      answer:
        "Prior experience isn't listed as a requirement, and first-years are welcome. " +
        "Training starts from the basics: a simulator before real flying, a foam trainer before competition aircraft, " +
        "and lab workshops on RC airplane design and wing fabrication.",
      sources: ["notes", "propel"],
      related: ["prepare", "learn"]
    },
    {
      id: "learn",
      question: "What will I learn?",
      keywords: ["learn", "training", "train", "teach", "workshop", "software", "cad", "simulation", "fly", "flying", "pilot"],
      status: "record",
      answer:
        "Flight training on an RC simulator, then a foam trainer outdoors. Lab workshops on RC airplane design, analysis and wing fabrication. " +
        "Propulsion testing on a thrust rig, and CAD and simulation with tools such as SOLIDWORKS, Ansys and flow5. " +
        "The <a href=\"learn.html\">learning path</a> lays it out in six waypoints.",
      sources: ["propel", "partner", "learn"],
      related: ["build", "prepare"]
    },
    {
      id: "teams",
      question: "What are the club's teams?",
      keywords: ["team", "yaksha", "blue", "impulse", "phantom", "vector", "sub"],
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
      keywords: ["won", "win", "achievement", "award", "result", "podium", "prize", "rank", "competition"],
      status: "record",
      answer:
        "20+ podium finishes. Highlights: <b>2nd internationally</b> (MATLAB Simulation Awards) at SAE Aero Design West 2026, " +
        "<b>1st</b> for Unique Technology Development at ADDC 2026, <b>2nd overall</b> at SAE Aerothon 2025 (₹1,25,000) " +
        "and <b>1st overall</b> at SAEINDIA 2020 (₹1,00,000). The full list is on the <a href=\"achievements.html\">Achievements</a> page.",
      sources: ["wins"],
      related: ["build", "upcoming"]
    },
    {
      id: "upcoming",
      question: "Which competitions are next?",
      keywords: ["next", "upcoming", "future", "plan", "2026", "2027", "nacdec", "iroc", "isro"],
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
      keywords: ["about", "aerobmsce", "history", "founded", "established", "since", "old", "lab", "located", "propel"],
      status: "record",
      answer:
        "AeroBMSCE is the official aerospace, aeromodelling and unmanned systems innovation club of BMS College of Engineering. " +
        "It was <b>established in 2012</b> and works out of <b>Propel Lab-3</b>. It has completed 75+ projects and produced 50+ papers, reports and certifications.",
      sources: ["who", "propel"],
      related: ["teams", "build"]
    },
    {
      id: "mech-aero-club",
      question: "Is this the Mechanical department's Aero Club?",
      keywords: ["2017", "same", "different", "relation", "related"],
      status: "unpublished",
      answer:
        "BMSCE's Mechanical department lists a separate <b>AERO Club</b>, launched 5 May 2017, alongside Team Yaksha &amp; Blue Impulse. " +
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
        "The recruitment month isn't published here. Email the core team to hear when the next written test is scheduled.",
      sources: ["notes"],
      related: ["selection", "contact"]
    },
    {
      id: "contact",
      question: "How do I contact the club?",
      keywords: ["contact", "email", "mail", "reach", "talk", "message", "instagram", "social", "mentor", "faculty", "phone", "head"],
      status: "record",
      answer:
        "Email <a href=\"mailto:" + CONTACT_EMAIL + "\">" + CONTACT_EMAIL + "</a>. " +
        "BMSCE lists <b>Dr. Ram Rohith V.</b> as faculty mentor of Team Yaksha &amp; Blue Impulse. " +
        "For sponsorship, the Partnership Head is Rajesh. No official Instagram handle is listed in the sources we checked.",
      sources: ["partner", "mech"],
      related: ["when-recruitment", "sponsor"]
    },
    {
      id: "sponsor",
      question: "How can a company sponsor the club?",
      keywords: ["sponsor", "sponsorship", "partner", "partnership", "fund", "funding", "company", "brand", "tier", "platinum", "gold", "silver"],
      status: "record",
      answer:
        "There are four collaboration tiers: <b>Platinum</b>, <b>Gold</b>, <b>Silver</b> and <b>Technical &amp; Ecosystem</b>. " +
        "Partners fund travel and logistics, give academic guidance and create opportunities, and get visibility on aircraft, uniforms and at events. " +
        "See <a href=\"partner-with-us.html\">Partner with us</a>.",
      sources: ["partner"],
      related: ["contact", "achievements"]
    }
  ];

  var MIN_CONFIDENCE = 1.0;   // below this we admit we don't know

  function rankEntries(query) {
    return AICore.rank(query, KNOWLEDGE, function (e) {
      return { strong: e.keywords, weak: [e.question] };
    });
  }

  function findById(id) {
    return KNOWLEDGE.filter(function (e) { return e.id === id; })[0];
  }

  // Exposed for the automated tests described in the README.
  window.GroundControl = { rank: rankEntries, MIN_CONFIDENCE: MIN_CONFIDENCE };

  /* ---------- 3. Chat UI ---------- */
  var panel = document.querySelector(".gc");
  if (!panel) return;

  var log = panel.querySelector(".gc-log");
  var form = panel.querySelector(".gc-form");
  var input = panel.querySelector(".gc-input");
  var chipBox = panel.querySelector(".gc-chips");

  function addUserMessage(text) {
    var msg = document.createElement("div");
    msg.className = "gc-msg gc-msg-user";
    msg.textContent = text;              // user text is never treated as HTML
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
  }

  function mailtoFor(question) {
    return "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent("Question from the website") +
      "&body=" + encodeURIComponent("Hi AeroBMSCE team,\n\n" + question + "\n\nThanks!");
  }

  function sourcesHtml(ids) {
    return ids.map(function (id) {
      var s = SOURCES[id];
      if (!s.href) return "<span>" + s.label + "</span>";
      var external = s.href.indexOf("http") === 0;
      return '<a href="' + s.href + '"' + (external ? ' target="_blank" rel="noopener"' : "") + ">" + s.label + "</a>";
    }).join(" · ");
  }

  var TAGS = {
    record:      '<span class="gc-tag gc-tag-ok">On record</span>',
    unpublished: '<span class="gc-tag gc-tag-warn">Not published, confirm with core team</span>',
    unknown:     '<span class="gc-tag gc-tag-warn">Not in club records</span>'
  };

  function addBotMessage(html, opts) {
    var msg = document.createElement("div");
    msg.className = "gc-msg gc-msg-bot";
    msg.innerHTML =
      (TAGS[opts.status] || "") +
      "<p>" + html + "</p>" +
      (opts.sources ? '<p class="gc-source"><span class="gc-source-label">Source</span> ' + sourcesHtml(opts.sources) + "</p>" : "");
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
    var best = rankEntries(question)[0];

    if (!best || best.score < MIN_CONFIDENCE) {
      addBotMessage(
        "I don't have that in the club's records, and I won't guess. " +
        '<a href="' + mailtoFor(question) + '">Send this question to the core team →</a>',
        { status: "unknown" }
      );
      showChips(["who-can-join", "selection", "build"]);
      return;
    }

    var entry = best.item;
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
    log.scrollTop = log.scrollHeight;

    setTimeout(function () {
      typing.remove();
      answer(question);
    }, AICore.prefersReducedMotion() ? 0 : 500);
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
