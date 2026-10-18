/* =========================================================
   Test-field strip (home page)
   Fetches live conditions for BMSCE, Bengaluru from the free
   Open-Meteo API (no key needed) and writes a short, rule-based
   summary of whether it's a good time for test flights.

   The limits below are a beginner-trainer rule of thumb, NOT an
   official club rule. The summary always ends by pointing pilots
   to the airspace map and a senior's go-ahead.
   ========================================================= */

(function () {
  var strip = document.getElementById("field");
  if (!strip) return;

  var LOCATION = { lat: 12.9416, lon: 77.5655 };   // BMS College of Engineering

  // km/h: [sustained wind, gusts]
  var LIMITS = {
    good:     { wind: 15, gust: 20 },   // fine for a foam trainer
    marginal: { wind: 22, gust: 30 }    // experienced pilots only
  };

  var API =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=" + LOCATION.lat + "&longitude=" + LOCATION.lon +
    "&current=wind_speed_10m,wind_gusts_10m,wind_direction_10m,temperature_2m,precipitation" +
    "&daily=sunset&timezone=Asia%2FKolkata&forecast_days=1";

  function field(name) { return strip.querySelector('[data-field="' + name + '"]'); }

  // Wind direction in degrees (where it blows FROM) → compass point.
  function compass(deg) {
    var points = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return points[Math.round(deg / 22.5) % 16];
  }

  function hhmm(isoLocal) { return isoLocal.slice(11, 16); }

  // Both timestamps come from the API in the same timezone (IST), so
  // parsing them the same way keeps the comparison correct anywhere.
  function minutesBetween(fromIso, toIso) {
    return Math.round((new Date(toIso) - new Date(fromIso)) / 60000);
  }

  // Turn the numbers into a status level and a plain-language summary.
  function assess(c, sunsetIso) {
    var wind = c.wind_speed_10m, gust = c.wind_gusts_10m;
    var daylight = minutesBetween(c.time, sunsetIso);
    var closing = " Check the Digital Sky airspace map and get a senior's go-ahead before flying.";

    if (daylight <= 0) {
      return { level: "closed", status: "Field closed: after sunset",
               text: "The sun set at " + hhmm(sunsetIso) + ". Plan test flights for tomorrow's daylight." + closing };
    }
    if (c.precipitation > 0) {
      return { level: "no", status: "Not for test flights",
               text: "Rain at the field. Electronics and foam airframes don't mix with water, so wait it out." + closing };
    }

    var level, status, text;
    if (wind <= LIMITS.good.wind && gust <= LIMITS.good.gust) {
      level = "good"; status = "Good for test flights";
      text = "Light winds (" + Math.round(wind) + " km/h) with gusts within beginner-trainer limits.";
    } else if (wind <= LIMITS.marginal.wind && gust <= LIMITS.marginal.gust) {
      level = "marginal"; status = "Experienced pilots only";
      text = "Breezy at " + Math.round(wind) + " km/h. Fine for experienced pilots, but not for a first flight on the trainer.";
    } else {
      level = "no"; status = "Not for test flights";
      text = "Too windy (" + Math.round(wind) + " km/h, gusts " + Math.round(gust) + " km/h) for test flights.";
    }

    if (level !== "no" && gust - wind >= 10) {
      text += " It's gusty, so expect bumps close to the ground on landing.";
    }
    if (level !== "no") {
      text += daylight < 60
        ? " Only " + daylight + " min of daylight left."
        : " About " + Math.floor(daylight / 60) + " h of daylight left.";
    }
    return { level: level, status: status, text: text + closing };
  }

  strip.hidden = false;

  fetch(API)
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (data) {
      var c = data.current;
      var sunset = data.daily.sunset[0];
      var result = assess(c, sunset);

      field("wind").textContent = compass(c.wind_direction_10m) + " " + Math.round(c.wind_speed_10m) + " km/h";
      field("gusts").textContent = Math.round(c.wind_gusts_10m) + " km/h";
      field("temp").textContent = Math.round(c.temperature_2m) + "°C";
      field("sunset").textContent = hhmm(sunset);
      field("status").textContent = result.status;
      field("summary").textContent = result.text;
      strip.querySelector(".field-status").dataset.level = result.level;
    })
    .catch(function () {
      field("status").textContent = "Field data unavailable";
      field("summary").textContent = "Couldn't reach the weather service. Check conditions at the field and ask a senior before flying.";
      strip.querySelector(".field-status").dataset.level = "closed";
    });
})();
