/* =========================================================
   AICore — the small matching engine behind every "AI" feature
   on this site (Ask the club, the learning-path tutor and the
   project-archive search).

   GitHub Pages has no backend and an API key in front-end code
   would be public, so instead of calling a language model we:
     1. normalise the question (lowercase, drop filler words,
        map synonyms, strip plurals),
     2. score each knowledge item by the words it recognises,
     3. return the best matches with their scores, so callers can
        refuse to answer when confidence is low.
   ========================================================= */

var AICore = (function () {

  // Words that carry no meaning for matching.
  var STOPWORDS = (
    "a an the is are am be to of in on for and or i me my we our you your it its this that these those " +
    "do does did can could should would will how what which who where why with at as by from about any " +
    "there here need get have has into so if just really guys stuff please tell hi hey hello thanks ok " +
    "much many some like than then also very too"
  ).split(" ");

  // Different ways of saying the same thing → one word.
  var SYNONYMS = {
    // people & joining
    "freshers": "fresher", "1st": "first", "firstyear": "first", "newcomer": "beginner",
    "mech": "mechanical", "cs": "cse", "computers": "computer", "ec": "ece", "ee": "eee",
    "recruiting": "recruitment", "hiring": "recruitment", "joining": "join", "joined": "join",
    "applications": "apply", "application": "apply", "applying": "apply",
    "exam": "test", "paper": "test", "papers": "test", "written": "test",
    "insta": "instagram", "ig": "instagram",
    "sponsoring": "sponsor", "partners": "partner",
    // aircraft
    "planes": "plane", "airplane": "plane", "aeroplane": "plane", "aircrafts": "aircraft",
    "quadcopter": "drone", "quad": "drone", "multirotor": "drone", "multicopter": "drone", "uav": "drone", "uas": "drone",
    "aerofoil": "airfoil", "aerofoils": "airfoil", "centre": "center", "cog": "cg",
    "lipo": "battery", "batteries": "battery", "cells": "cell",
    "motors": "motor", "kv": "kv", "props": "propeller", "prop": "propeller",
    "competitions": "competition", "events": "competition", "contest": "competition",
    "aoa": "angle", "stalls": "stall", "stalling": "stall",
    "windy": "wind", "gusty": "gust", "breezy": "wind",
    "legally": "legal", "allowed": "legal", "permitted": "legal", "lawful": "legal",
    "twinboom": "boom", "vtol": "vtol", "evtol": "vtol"
  };

  // Very light stemming so "wings" matches "wing" and "batteries" matches "battery".
  function stem(w) {
    if (w.length > 4 && /ies$/.test(w)) return w.slice(0, -3) + "y";
    if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1);
    return w;
  }

  function normalise(text) {
    return String(text)
      .toLowerCase()
      .replace(/first[\s-]+years?/g, "first year")   // "first-years" → "first year"
      .replace(/twin[\s-]+boom/g, "boom")
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(function (w) { return w.length > 1 && STOPWORDS.indexOf(w) === -1; })
      .map(function (w) { return SYNONYMS[w] || w; })
      .map(stem);
  }

  /* Score items against a query.
     getWords(item) returns { strong: [...], weak: [...] }:
       strong words (curated keywords) score 2, weak words (titles,
       body text) score 1. The total is divided by √(query length) so
       long questions don't win just by containing more words. */
  function rank(query, items, getWords) {
    var q = normalise(query);
    if (!q.length) return [];

    return items.map(function (item) {
      var words = getWords(item);
      var strong = normalise(words.strong.join(" "));
      var weak = normalise(words.weak.join(" "));
      var score = 0, matched = 0;
      q.forEach(function (w) {
        var hit = false;
        if (strong.indexOf(w) !== -1) { score += 2; hit = true; }
        if (weak.indexOf(w) !== -1) { score += 1; hit = true; }
        if (hit) matched++;
      });
      // coverage: share of the question's words this item recognised
      return { item: item, score: score / Math.sqrt(q.length), coverage: matched / q.length };
    })
    .filter(function (r) { return r.score > 0; })
    .sort(function (a, b) { return b.score - a.score; });
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  return { normalise: normalise, rank: rank, escapeHtml: escapeHtml, prefersReducedMotion: prefersReducedMotion };
})();
