/* AeroBMSCE — small, page-agnostic scripts.
   Each block checks that its elements exist, so one file serves every page. */

/* ---------- 1. Mobile navigation toggle ---------- */
(function setupNavToggle() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
})();

/* ---------- 1b. Land exactly on #section links ----------
   The browser jumps to the anchor before web fonts finish loading; when
   they arrive the text reflows and the section drifts. Re-align once the
   page has fully loaded (used by the site navigator's "Take me there"). */
window.addEventListener("load", function () {
  var id = decodeURIComponent(location.hash.slice(1));
  var target = id && document.getElementById(id);
  var enableSmooth = function () { document.documentElement.classList.add("smooth-scroll"); };

  if (!target || target.tagName !== "SECTION") { enableSmooth(); return; }
  var align = function () {
    target.scrollIntoView({ block: "start", behavior: "instant" });
    enableSmooth();          // later in-page links scroll smoothly
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(align); else align();
});

/* ---------- 2. Footer year ---------- */
(function setYear() {
  var el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();

/* ---------- 3. Achievements: filter by season + competition type ---------- */
(function setupMilestoneFilter() {
  var filters = document.querySelector(".filters");
  if (!filters) return;

  var seasons = Array.prototype.slice.call(document.querySelectorAll(".season"));
  var milestones = Array.prototype.slice.call(document.querySelectorAll(".milestone"));
  var status = document.getElementById("filter-status");
  var noResults = document.getElementById("no-results");
  var active = { year: "all", type: "all" };

  function applyFilters() {
    var shown = 0;

    milestones.forEach(function (m) {
      var season = m.closest(".season");
      var matchYear = active.year === "all" || season.dataset.year === active.year;
      var matchType = active.type === "all" || m.dataset.type === active.type;
      m.hidden = !(matchYear && matchType);
      if (!m.hidden) shown++;
    });

    // Hide a whole season when none of its milestones survived the filter,
    // and dim its year on the altitude tape so the two stay in sync.
    seasons.forEach(function (s) {
      var visible = s.querySelectorAll(".milestone:not([hidden])").length > 0;
      s.hidden = !visible;
      var tapeLink = document.querySelector('.alt-tape a[href="#season-' + s.dataset.year + '"]');
      if (tapeLink) tapeLink.classList.toggle("is-empty", !visible);
    });

    // If the tape's readout points at a season that was just filtered out
    // (or was cleared by an earlier zero-result filter), move it to the
    // first season that is still visible.
    var activeLink = document.querySelector(".alt-tape a.is-active");
    var firstVisible = seasons.filter(function (s) { return !s.hidden; })[0];
    if (!activeLink || activeLink.classList.contains("is-empty")) {
      if (activeLink) activeLink.classList.remove("is-active");
      if (firstVisible) {
        document.querySelector('.alt-tape a[href="#season-' + firstVisible.dataset.year + '"]').classList.add("is-active");
      }
    }

    noResults.hidden = shown > 0;
    status.textContent = "Showing " + shown + " of " + milestones.length + " results";
  }

  filters.addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (!chip) return;

    var group = chip.closest(".filter-group");
    group.querySelectorAll(".chip").forEach(function (c) {
      c.setAttribute("aria-pressed", "false");
    });
    chip.setAttribute("aria-pressed", "true");

    active[group.dataset.filter] = chip.dataset.value;
    applyFilters();
  });

  applyFilters();
})();

/* ---------- 4. Altitude tape: highlight the season currently in view ---------- */
(function setupAltitudeTape() {
  var links = document.querySelectorAll(".alt-tape a");
  if (!links.length || !("IntersectionObserver" in window)) return;

  function setActive(year) {
    links.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#season-" + year);
    });
  }

  // A season counts as "in view" when it crosses a thin band ~30% down the
  // viewport — that's where the eye naturally reads.
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(entry.target.dataset.year);
    });
  }, { rootMargin: "-30% 0px -65% 0px" });

  document.querySelectorAll(".season").forEach(function (s) { observer.observe(s); });
  setActive(links[0].getAttribute("href").replace("#season-", ""));
})();
