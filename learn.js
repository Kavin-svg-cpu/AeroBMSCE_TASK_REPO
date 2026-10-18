/* =========================================================
   Learning path page: route, waypoint notes, quizzes and the
   AI tutor. Content lives in learn-data.js; matching in ai-core.js.
   ========================================================= */

(function () {
  var route = document.getElementById("route");
  var panel = document.getElementById("waypoint");
  var tutor = document.querySelector(".tutor");
  if (!route || !panel) return;

  var CONTACT_EMAIL = "aerobmsce@bmsce.ac.in";
  var STORAGE_KEY = "aerobmsce-learn-progress";
  var MIN_CONFIDENCE = 1.0;

  // Starter questions for the tutor on each waypoint.
  var TUTOR_PROMPTS = {
    "basics":         ["Why does doubling speed give 4× lift?", "What is a stall?", "Where should the CG be?"],
    "design":         ["How do I size a wing?", "What is aspect ratio?", "How big should the tail be?"],
    "first-build":    ["How do I check the control surfaces?", "Where should the CG be for a maiden flight?", "How do I hand-launch?"],
    "electronics":    ["How should I charge a LiPo?", "What does KV mean?", "How do I choose an ESC?"],
    "flight-testing": ["Where can I fly legally?", "Is it too windy to fly?", "What should I log?"],
    "competition":    ["How is SAE Aero Design scored?", "What was the AeroTHON 2025 theme?", "How do I write the design report?"]
  };

  /* ---------- Progress (per-browser convenience only) ---------- */
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (e) { /* storage blocked: fine */ }
  }
  var progress = loadProgress();          // { waypointId: { questionIndex: chosenOption } }

  function answersFor(wp) { return progress[wp.id] || {}; }
  function isComplete(wp) { return Object.keys(answersFor(wp)).length === wp.quiz.length; }
  function scoreFor(wp) {
    var a = answersFor(wp);
    return wp.quiz.filter(function (q, i) { return a[i] === q.answer; }).length;
  }

  /* ---------- Helpers ---------- */
  function sourceLinks(ids) {
    return ids.map(function (id) {
      var s = LEARN_SOURCES[id];
      if (!s.href) return "<span>" + s.label + "</span>";
      var external = s.href.indexOf("http") === 0;
      return '<a href="' + s.href + '"' + (external ? ' target="_blank" rel="noopener"' : "") + ">" + s.label + "</a>";
    }).join(" · ");
  }

  function findWaypoint(id) {
    return WAYPOINTS.filter(function (w) { return w.id === id; })[0] || WAYPOINTS[0];
  }

  var current = findWaypoint(location.hash.replace("#", ""));

  /* ---------- Route (the six waypoints) ---------- */
  function renderRoute() {
    route.innerHTML = WAYPOINTS.map(function (wp) {
      var classes = ["route-stop"];
      if (wp.id === current.id) classes.push("is-current");
      if (isComplete(wp)) classes.push("is-complete");
      return '<li class="' + classes.join(" ") + '">' +
        '<a href="#' + wp.id + '"' + (wp.id === current.id ? ' aria-current="step"' : "") + ">" +
          '<span class="route-diamond" aria-hidden="true"></span>' +
          '<span class="route-code">' + wp.code + (isComplete(wp) ? " ✓" : "") + "</span>" +
          '<span class="route-title">' + wp.title + "</span>" +
          '<span class="route-summary">' + wp.summary + "</span>" +
        "</a></li>";
    }).join("");

    var done = WAYPOINTS.filter(isComplete).length;
    document.getElementById("progress").textContent = done + " of " + WAYPOINTS.length + " waypoints complete";
  }

  /* ---------- One waypoint: notes + quiz ---------- */
  function renderWaypoint() {
    var index = WAYPOINTS.indexOf(current);
    var prev = WAYPOINTS[index - 1], next = WAYPOINTS[index + 1];

    var notes = current.notes.map(function (n, i) {
      return '<article class="card note" id="note-' + n.id + '">' +
        '<span class="label">Note ' + (i + 1) + "</span>" +
        "<h3>" + n.title + "</h3>" +
        "<p>" + n.html + "</p>" +
        '<p class="note-source"><span class="gc-source-label">Sources</span> ' + sourceLinks(n.sources) + "</p>" +
      "</article>";
    }).join("");

    var answers = answersFor(current);
    var quiz = current.quiz.map(function (q, qi) {
      var chosen = answers[qi];
      var answered = chosen !== undefined;
      var options = q.options.map(function (opt, oi) {
        var state = "";
        if (answered && oi === q.answer) state = " is-correct";
        else if (answered && oi === chosen) state = " is-wrong";
        return '<button type="button" class="quiz-option' + state + '" data-q="' + qi + '" data-o="' + oi + '"' +
          (answered ? " disabled" : "") + ">" + opt + "</button>";
      }).join("");
      return '<div class="quiz-q">' +
        '<p class="quiz-question"><b>' + (qi + 1) + ".</b> " + q.q + "</p>" +
        '<div class="quiz-options">' + options + "</div>" +
        '<p class="quiz-explain"' + (answered ? "" : " hidden") + ">" +
          (answered ? (chosen === q.answer ? "<b>Correct.</b> " : "<b>Not quite.</b> ") + q.explain : "") +
        "</p></div>";
    }).join("");

    panel.innerHTML =
      '<header class="wpt-head">' +
        '<span class="label">' + current.code + " · Useful for: " + current.domain + "</span>" +
        "<h2>" + current.title + "</h2>" +
        '<p class="lead">' + current.summary + "</p>" +
      "</header>" +
      '<div class="wpt-notes">' + notes + "</div>" +
      '<section class="quiz" aria-labelledby="quiz-title">' +
        '<div class="quiz-head"><h3 id="quiz-title">Practice quiz</h3>' +
          '<span class="quiz-score" aria-live="polite">' + scoreFor(current) + " / " + current.quiz.length + " correct</span></div>" +
        quiz +
        (isComplete(current) ? '<button type="button" class="btn btn-ghost quiz-retry">Retry quiz</button>' : "") +
      "</section>" +
      '<nav class="wpt-nav" aria-label="Waypoints">' +
        (prev ? '<a class="btn btn-ghost" href="#' + prev.id + '">← ' + prev.code + " " + prev.title + "</a>" : "<span></span>") +
        (next ? '<a class="btn btn-primary" href="#' + next.id + '">' + next.code + " " + next.title + " →</a>" : "") +
      "</nav>";
  }

  panel.addEventListener("click", function (e) {
    var option = e.target.closest(".quiz-option");
    if (option) {
      progress[current.id] = progress[current.id] || {};
      progress[current.id][option.dataset.q] = Number(option.dataset.o);
      saveProgress();
      renderWaypoint();
      renderRoute();
      return;
    }
    if (e.target.closest(".quiz-retry")) {
      delete progress[current.id];
      saveProgress();
      renderWaypoint();
      renderRoute();
    }
  });

  function show(id, focusNoteId) {
    current = findWaypoint(id);
    renderRoute();
    renderWaypoint();
    if (tutor) showTutorChips(TUTOR_PROMPTS[current.id]);
    if (focusNoteId) {
      var note = document.getElementById("note-" + focusNoteId);
      if (note) {
        note.scrollIntoView({ behavior: AICore.prefersReducedMotion() ? "auto" : "smooth", block: "center" });
        note.classList.add("is-highlight");
        setTimeout(function () { note.classList.remove("is-highlight"); }, 2000);
      }
    }
  }

  window.addEventListener("hashchange", function () {
    show(location.hash.replace("#", ""));
    panel.scrollIntoView({ behavior: AICore.prefersReducedMotion() ? "auto" : "smooth" });
  });

  /* ---------- AI tutor ---------- */
  // Every note on every waypoint is one searchable chunk.
  var CHUNKS = [];
  WAYPOINTS.forEach(function (wp) {
    wp.notes.forEach(function (n) { CHUNKS.push({ wp: wp, note: n }); });
  });

  function rankNotes(question) {
    return AICore.rank(question, CHUNKS, function (c) {
      return { strong: c.note.keywords, weak: [c.note.title, c.wp.title] };
    }).map(function (r) {
      // Prefer the waypoint the student is reading right now.
      if (r.item.wp.id === current.id) r.score += 0.3;
      return r;
    }).sort(function (a, b) { return b.score - a.score; });
  }
  window.LearnTutor = { rank: rankNotes, MIN_CONFIDENCE: MIN_CONFIDENCE };   // used by tests

  if (!tutor) { show(current.id); return; }

  var log = tutor.querySelector(".gc-log");
  var form = tutor.querySelector(".gc-form");
  var input = tutor.querySelector(".gc-input");
  var chipBox = tutor.querySelector(".gc-chips");

  function seniorMailto(question, chunk) {
    var body = "Hi seniors,\n\nI asked the learning-path tutor: \"" + question + "\"\n" +
      (chunk ? "It answered from " + chunk.wp.code + " › " + chunk.note.title + ".\n" : "It didn't have an answer.\n") +
      "Could you review this for me?\n\nThanks!";
    return "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("Learning path: please review") +
      "&body=" + encodeURIComponent(body);
  }

  function addMessage(className, html, isText) {
    var msg = document.createElement("div");
    msg.className = "gc-msg " + className;
    if (isText) msg.textContent = html; else msg.innerHTML = html;
    log.appendChild(msg);
    var question = msg.previousElementSibling;
    log.scrollTop = className.indexOf("bot") !== -1 && question ? question.offsetTop - 12 : log.scrollHeight;
    return msg;
  }

  function showTutorChips(prompts) {
    chipBox.innerHTML = "";
    prompts.forEach(function (p) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "gc-chip";
      chip.textContent = p;
      chipBox.appendChild(chip);
    });
  }

  function answer(question) {
    var ranked = rankNotes(question);
    var best = ranked[0];

    if (!best || best.score < MIN_CONFIDENCE) {
      addMessage("gc-msg-bot",
        '<span class="gc-tag gc-tag-warn">Not in club notes</span>' +
        "<p>That's beyond the notes I have, and I won't make it up. " +
        '<a href="' + seniorMailto(question) + '">Flag it for a senior →</a></p>');
      return;
    }

    var c = best.item;
    addMessage("gc-msg-bot",
      '<span class="gc-tag gc-tag-ok">From club notes · ' + c.wp.code + "</span>" +
      "<p><b>" + c.note.title + ".</b> " + c.note.html + "</p>" +
      '<p class="gc-source"><span class="gc-source-label">Source</span> ' + sourceLinks(c.note.sources) + "</p>" +
      '<p class="gc-actions">' +
        '<button type="button" class="gc-link" data-wp="' + c.wp.id + '" data-note="' + c.note.id + '">Open in ' + c.wp.code + " notes</button>" +
        '<a href="' + seniorMailto(question, c) + '">Flag for a senior</a>' +
      "</p>");

    // Offer the next-best notes as follow-ups.
    var followUps = ranked.slice(1, 3).filter(function (r) { return r.score >= MIN_CONFIDENCE; })
      .map(function (r) { return r.item.note.title; });
    if (followUps.length) showTutorChips(followUps);
  }

  function ask(question) {
    question = question.trim();
    if (!question) return;
    addMessage("gc-msg-user", question, true);       // user text is never treated as HTML
    input.value = "";
    var typing = addMessage("gc-msg-bot gc-typing", "<span></span><span></span><span></span>");
    typing.setAttribute("aria-hidden", "true");
    setTimeout(function () {
      typing.remove();
      answer(question);
    }, AICore.prefersReducedMotion() ? 0 : 450);
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); ask(input.value); });
  chipBox.addEventListener("click", function (e) {
    var chip = e.target.closest(".gc-chip");
    if (chip) ask(chip.textContent);
  });
  log.addEventListener("click", function (e) {
    var link = e.target.closest(".gc-link");
    if (!link) return;
    if (link.dataset.wp !== current.id) history.replaceState(null, "", "#" + link.dataset.wp);
    show(link.dataset.wp, link.dataset.note);
  });

  tutor.classList.add("is-ready");
  show(current.id);
})();
