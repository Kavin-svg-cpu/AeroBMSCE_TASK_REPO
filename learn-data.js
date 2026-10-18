/* =========================================================
   Learning path content: six waypoints, each with club notes,
   a practice quiz and the sources the tutor cites.
   Facts come from the linked references; anything that is only
   a rule of thumb is labelled as one.
   ========================================================= */

var LEARN_SOURCES = {
  nasaForces: { label: "NASA Glenn — Four Forces on an Airplane", href: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/four-forces-on-an-airplane/" },
  nasaLift:   { label: "NASA Glenn — What is Lift?",              href: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/what-is-lift/" },
  nasaLiftEq: { label: "NASA Glenn — The Lift Equation",           href: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/lift-equation/" },
  nasaDrag:   { label: "NASA Glenn — What is Drag?",               href: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/what-is-drag/" },
  phak:       { label: "FAA — Pilot's Handbook of Aeronautical Knowledge", href: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak" },
  ftCg:       { label: "Flite Test — Where should an RC airplane CG be?", href: "https://www.flitetest.com/articles/where-should-an-rc-airplane-center-of-gravity-be" },
  ftDesign:   { label: "Flite Test — Easy Aircraft Design",        href: "https://www.flitetest.com/articles/easy-aircraft-design" },
  ecalcCg:    { label: "eCalc — cgCalc (CG and static margin)",    href: "https://ecalc.ch/cgcalc.php" },
  ecalcMotor: { label: "eCalc — motorCalc",                        href: "https://ecalc.ch/motorcalc.php" },
  airfoil:    { label: "Airfoil Tools — airfoil database",         href: "http://airfoiltools.com/" },
  raymer:     { label: "Raymer, Aircraft Design: A Conceptual Approach (textbook)" },
  apEsc:      { label: "ArduPilot — ESC calibration",              href: "https://ardupilot.org/plane/docs/common-esc-calibration.html" },
  apArm:      { label: "ArduPilot — Arming your plane",            href: "https://ardupilot.org/plane/docs/arming-your-plane.html" },
  apPixhawk:  { label: "ArduPilot — Pixhawk overview",             href: "https://ardupilot.org/copter/docs/common-pixhawk-overview.html" },
  lipo:       { label: "BYU MAGICC Lab — LiPo battery guide",      href: "https://magicc.byu.edu/wiki/hw_guides/lipo_batts" },
  droneRules: { label: "MoCA — Drone Rules 2021 summary (Vikaspedia)", href: "https://en.vikaspedia.in/viewcontent/e-governance/digital-india/unmanned-aircraft-system/ministry-of-civil-aviation-notifies-liberalised-drone-rules-2021?lgn=en" },
  digitalSky: { label: "DGCA — Digital Sky platform",              href: "https://digitalsky.dgca.gov.in/" },
  saeAero:    { label: "SAE Aero Design — rules and documents",    href: "https://www.saeaerodesign.com/cdsweb/gen/DocumentResources.aspx" },
  aerothon:   { label: "SAEINDIA — AeroTHON 2025",                 href: "https://saeindia.org/aerothon2025/" },
  propel:     { label: "BMSCE — Propel Lab-3 report",              href: "https://bmsce.ac.in/assets/files/Research/Propel%20Lab%20III%20-%20Report.pdf" },
  club:       { label: "Achievements (this site)",                 href: "achievements.html" },
  field:      { label: "Test-field strip (this site)",             href: "index.html#field" }
};

var WAYPOINTS = [
  /* ---------------- WPT 01 ---------------- */
  {
    id: "basics",
    code: "WPT 01",
    title: "Basics of flight",
    summary: "Lift, drag, airfoils and stability, in plain language.",
    domain: "Flight Mechanics",
    notes: [
      {
        id: "forces",
        title: "The four forces",
        keywords: ["force", "lift", "weight", "thrust", "drag", "level", "steady", "balance"],
        html: "Every aircraft in flight feels four forces: <b>lift</b> (up, from the wing), <b>weight</b> (down), <b>thrust</b> (forward, from the propeller) and <b>drag</b> (backward, from the air). In steady, level flight they balance: lift equals weight and thrust equals drag. To climb, accelerate or turn, you deliberately unbalance them.",
        sources: ["nasaForces", "phak"]
      },
      {
        id: "lift-equation",
        title: "The lift equation",
        keywords: ["lift", "equation", "formula", "speed", "velocity", "density", "area", "coefficient", "cl", "bengaluru", "altitude", "thin", "air"],
        html: "<b>L = ½ ρ V² S C<sub>L</sub></b>: air density × speed² × wing area × lift coefficient. Speed is squared, so <b>doubling airspeed gives four times the lift</b>. Density matters too. Bengaluru is about 900 m above sea level, so the air is roughly 9% thinner than at sea level (standard atmosphere). To make the same lift you need about 5% more speed or a little more wing area, and more on a hot day.",
        sources: ["nasaLiftEq", "nasaLift"]
      },
      {
        id: "airfoils",
        title: "Airfoils, angle of attack and stall",
        keywords: ["airfoil", "angle", "attack", "stall", "camber", "separation", "critical", "coefficient", "shape"],
        html: "An airfoil turns the oncoming air, and the wing feels an equal and opposite push: lift. A <b>cambered</b> (curved) airfoil makes lift even at zero angle of attack. Raising the <b>angle of attack</b> increases lift roughly in proportion, up to the <b>critical angle</b>, often somewhere around 10–15° for typical airfoils. Beyond it the airflow separates from the top surface and the wing <b>stalls</b>, losing lift suddenly. A stall depends on angle of attack, not on speed alone.",
        sources: ["nasaLift", "phak", "airfoil"]
      },
      {
        id: "drag",
        title: "Two kinds of drag",
        keywords: ["drag", "induced", "parasite", "parasitic", "friction", "form", "aspect", "ratio", "wingtip", "vortex", "slow"],
        html: "<b>Parasite drag</b> (skin friction, form and interference drag) grows with speed squared, so it dominates when you fly fast. <b>Induced drag</b> is the price of making lift: wingtip vortices tilt the lift backwards. It is <b>largest at low speed and high angle of attack</b>, and smaller on long, slender (high aspect ratio) wings. Total drag is lowest at the speed where the two are roughly equal, which is usually the best speed for range or a long glide.",
        sources: ["nasaDrag", "phak"]
      },
      {
        id: "stability",
        title: "Stability: why the CG matters",
        keywords: ["stability", "stable", "cg", "center", "gravity", "neutral", "point", "static", "margin", "dihedral", "pitch", "tail", "unstable"],
        html: "A plane is stable in pitch only if its <b>centre of gravity (CG) is ahead of the neutral point</b>, the aerodynamic balance point of the whole aircraft. The gap between them, as a fraction of the mean aerodynamic chord (MAC), is the <b>static margin</b>. Most planes sit around <b>5–15%</b>: 5% is barely stable, 15% is very stable. <b>Dihedral</b> (wings angled up) helps roll stability, and the vertical tail keeps the nose pointed into the airflow.",
        sources: ["ftCg", "ecalcCg", "phak"]
      }
    ],
    quiz: [
      { q: "If you double the airspeed and change nothing else, lift becomes…", options: ["2× larger", "4× larger", "√2× larger", "Unchanged"], answer: 1,
        explain: "Lift depends on V². Doubling V multiplies lift by 2² = 4." },
      { q: "For a plane to be stable in pitch, the CG must be…", options: ["Behind the neutral point", "Exactly on the neutral point", "Ahead of the neutral point", "Anywhere, as the tail fixes it"], answer: 2,
        explain: "CG ahead of the neutral point gives a positive static margin, so the plane returns to its trimmed attitude after a disturbance." },
      { q: "Induced drag is highest when the aircraft is…", options: ["Flying slowly at a high angle of attack", "At top speed", "Gliding with the motor off", "Parked on the ground"], answer: 0,
        explain: "Induced drag comes from producing lift. It peaks at low speed and high angle of attack, which is why slow flight needs more power than you'd expect." },
      { q: "Compared with sea level, the same plane at Bengaluru (~900 m) needs…", options: ["Less speed to lift off", "About the same speed", "A bit more speed for the same lift", "Twice the speed"], answer: 2,
        explain: "The air is roughly 9% thinner, so lift drops by that much at the same speed. You need about 5% more speed to make up for it." }
    ]
  },

  /* ---------------- WPT 02 ---------------- */
  {
    id: "design",
    code: "WPT 02",
    title: "CAD and design",
    summary: "Sizing a wing and modelling an airframe.",
    domain: "Flight Structures / Subsystems",
    notes: [
      {
        id: "sizing-loop",
        title: "The sizing loop",
        keywords: ["size", "sizing", "loop", "design", "process", "mission", "requirement", "weight", "estimate", "iterate", "start"],
        html: "Design starts from the <b>mission</b>: payload, take-off distance, flight time. Then <b>estimate the weight</b>, pick a <b>wing loading</b> (weight ÷ wing area) to get the wing area, and choose an <b>aspect ratio</b> to get the span. Size the tail, motor and battery, then work out the weight again. Repeat until the numbers stop changing.",
        sources: ["raymer", "ftDesign"]
      },
      {
        id: "wing-loading",
        title: "Wing loading and stall speed",
        keywords: ["wing", "loading", "stall", "speed", "area", "slow", "landing", "formula", "clmax"],
        html: "Stall speed is <b>V<sub>stall</sub> = √(2W ÷ (ρ S C<sub>Lmax</sub>))</b>. For the same weight, a <b>bigger wing (lower wing loading) stalls slower</b>, so it lands slower and gentler. That's why trainers are light for their size. Example: 1.2 kg (≈ 11.8 N) on a 0.3 m² wing is a wing loading of 4 kg/m², or 40 g/dm².",
        sources: ["nasaLiftEq", "raymer"]
      },
      {
        id: "aspect-ratio",
        title: "Aspect ratio",
        keywords: ["aspect", "ratio", "span", "chord", "glide", "slender", "induced"],
        html: "<b>Aspect ratio AR = span² ÷ wing area.</b> A 1.5 m span on 0.3 m² gives AR = 2.25 ÷ 0.3 = <b>7.5</b>. Higher AR means less induced drag and a better glide. The cost is a longer, more heavily loaded spar and a slower roll response. Trainers and payload aircraft usually stay moderate.",
        sources: ["nasaDrag", "raymer"]
      },
      {
        id: "tail-sizing",
        title: "Sizing the tail",
        keywords: ["tail", "volume", "coefficient", "horizontal", "vertical", "stabilizer", "elevator", "rudder", "boom", "moment", "arm"],
        html: "Tails are sized with <b>tail volume coefficients</b>: horizontal V<sub>H</sub> = (S<sub>h</sub> × l<sub>h</sub>) ÷ (S × MAC), and vertical V<sub>V</sub> = (S<sub>v</sub> × l<sub>v</sub>) ÷ (S × b). Raymer lists typical values of about <b>0.5 (horizontal)</b> and <b>0.04 (vertical)</b> for homebuilt aircraft. A longer tail arm (l) lets you use a smaller tail. Compare against similar flying models before you commit.",
        sources: ["raymer"]
      },
      {
        id: "cad-workflow",
        title: "From CAD to laser cutter",
        keywords: ["cad", "solidworks", "model", "laser", "cut", "dxf", "rib", "spar", "fuselage", "export", "coordinates", "software", "tool"],
        html: "Download airfoil coordinates (Airfoil Tools has a large database). Model ribs, spars and fuselage in CAD (SOLIDWORKS, Siemens and Altair are among the club's technical partners), then export flat parts as <b>2D DXF</b> files for laser cutting. Propel Lab-3 has laser cut fuselage, elevator, rudder and airfoil parts for the club's RC UAV planes. Before building, check the CG and static margin with a calculator such as eCalc cgCalc.",
        sources: ["airfoil", "propel", "ecalcCg"]
      }
    ],
    quiz: [
      { q: "A wing has a 1.5 m span and 0.3 m² area. Its aspect ratio is…", options: ["5", "4.5", "7.5", "0.2"], answer: 2,
        explain: "AR = b² ÷ S = 1.5² ÷ 0.3 = 2.25 ÷ 0.3 = 7.5." },
      { q: "Keeping weight the same, you increase the wing area. Stall speed…", options: ["Increases", "Decreases", "Stays the same", "Depends only on the motor"], answer: 1,
        explain: "V_stall = √(2W ÷ ρSC_Lmax). A bigger S in the denominator lowers stall speed." },
      { q: "Which file format do you export flat ribs in for laser cutting?", options: ["STL", "DXF", "JPG", "STEP"], answer: 1,
        explain: "Laser cutters work from 2D vector paths. DXF is the usual format. STL and STEP are 3D formats." }
    ]
  },

  /* ---------------- WPT 03 ---------------- */
  {
    id: "first-build",
    code: "WPT 03",
    title: "First build",
    summary: "Build and fly a simple trainer with a senior.",
    domain: "Flight Structures / Subsystems",
    notes: [
      {
        id: "sim-first",
        title: "Simulator first, then the foam trainer",
        keywords: ["simulator", "sim", "phoenix", "practice", "foam", "trainer", "sky", "surfer", "begin", "beginner", "first"],
        html: "Propel Lab-3 gives UG students hands-on flying practice on an <b>RC flight simulator (Phoenix5)</b> with a real transmitter, so crashes cost nothing. After that, lab students fly a <b>foam trainer (Sky Surfer)</b> outdoors at the APS ground. Foam is forgiving and quick to repair.",
        sources: ["propel"]
      },
      {
        id: "balance",
        title: "Balance before you fly",
        keywords: ["balance", "cg", "center", "gravity", "nose", "heavy", "tail", "maiden", "check", "mac"],
        html: "Most airfoils have their aerodynamic centre around <b>25–33% of the MAC</b> from the leading edge. For a maiden flight, put the CG at about <b>25%</b>. A slightly <b>nose-heavy plane is always safer than a tail-heavy one</b>. Check side-to-side balance too: a heavy wingtip makes the plane roll.",
        sources: ["ftCg"]
      },
      {
        id: "control-check",
        title: "Control-surface check",
        keywords: ["control", "surface", "aileron", "elevator", "rudder", "direction", "stick", "servo", "throw", "reverse", "check", "linkage"],
        html: "Before every first flight, stand behind the plane and move each stick. <b>Right aileron stick</b>: the right aileron goes <b>up</b> and the left goes down. <b>Pull back</b>: the elevator goes <b>up</b>. <b>Right rudder</b>: the rudder's trailing edge moves <b>right</b>. A reversed channel is a classic first-flight crash. Make sure every linkage is tight and nothing binds.",
        sources: ["phak"]
      },
      {
        id: "radio-safety",
        title: "Range check and failsafe",
        keywords: ["range", "check", "failsafe", "radio", "transmitter", "receiver", "signal", "safety", "arm", "arming"],
        html: "Do a <b>range check</b> using your transmitter's range-check mode, as its manual describes. Set the <b>failsafe</b> so a lost signal cuts the throttle instead of flying away. With a flight controller, arming checks (as in ArduPilot) refuse to arm until sensors and radio are healthy.",
        sources: ["apArm"]
      },
      {
        id: "hand-launch",
        title: "Hand-launching",
        keywords: ["launch", "hand", "throw", "takeoff", "into"],
        html: "Launch <b>into the wind</b>, wings level, with a firm, slightly nose-up throw and the power on. Facing into the wind gives the wing more airspeed at the moment of release. The club has published a paper on <i>a practical approach to designing, manufacturing and testing a hand-launched fixed-wing UAV</i>.",
        sources: ["propel"]
      }
    ],
    quiz: [
      { q: "For a maiden flight, it's safer for the plane to be…", options: ["Slightly tail-heavy", "Slightly nose-heavy", "Balanced exactly at 50% MAC", "It makes no difference"], answer: 1,
        explain: "Nose-heavy is stable but sluggish. Tail-heavy can be uncontrollable. Start near 25% MAC." },
      { q: "You give right aileron. The RIGHT aileron should move…", options: ["Up", "Down", "Not at all", "Up, then down"], answer: 0,
        explain: "Right aileron up and left aileron down rolls the plane to the right." },
      { q: "You hand-launch…", options: ["With the wind behind you", "Into the wind", "Across the wind", "Straight up"], answer: 1,
        explain: "Into the wind gives more airspeed over the wing at release, and that airspeed is what makes lift." }
    ]
  },

  /* ---------------- WPT 04 ---------------- */
  {
    id: "electronics",
    code: "WPT 04",
    title: "Electronics",
    summary: "Motors, ESCs, batteries, servos and radios.",
    domain: "Electrical",
    notes: [
      {
        id: "power-chain",
        title: "The power chain",
        keywords: ["power", "chain", "system", "battery", "esc", "motor", "propeller", "receiver", "servo", "bec", "wiring", "connect"],
        html: "<b>Battery → ESC → brushless motor → propeller.</b> The receiver sends the throttle signal to the ESC and steering signals to the servos. Most ESCs include a <b>BEC</b> that powers the receiver and servos from the main battery.",
        sources: ["apEsc", "ecalcMotor"]
      },
      {
        id: "lipo",
        title: "LiPo batteries",
        keywords: ["battery", "lipo", "voltage", "cell", "volt", "charge", "charging", "storage", "store", "rating", "capacity", "mah", "discharge", "swollen", "3s", "4s"],
        html: "A LiPo cell is <b>3.7 V nominal and 4.2 V full</b>, so a 3S pack is 11.1 V nominal and 12.6 V full. Below about 3.0–3.3 V per cell the cell starts to get damaged. Store packs at about <b>3.8 V per cell</b>. Maximum current = <b>capacity (Ah) × C rating</b>: a 2200 mAh 30C pack can deliver 2.2 × 30 = 66 A. Always <b>balance charge</b>, never leave a charging pack unattended, and retire swollen packs.",
        sources: ["lipo"]
      },
      {
        id: "motor-kv",
        title: "Motors, KV and propellers",
        keywords: ["motor", "kv", "rpm", "propeller", "thrust", "pitch", "diameter", "efficiency", "match", "brushless"],
        html: "<b>KV</b> is a motor's no-load RPM per volt. <b>Low KV with a large propeller</b> gives efficient thrust for trainers and payload aircraft. <b>High KV with a small propeller</b> is for speed, such as racing drones. Don't guess: estimate with eCalc and measure on a thrust stand. Propel Lab-3 built one, an L-shaped arm on a digital scale, to compare motor, battery and propeller combinations.",
        sources: ["ecalcMotor", "propel"]
      },
      {
        id: "esc",
        title: "Choosing and calibrating an ESC",
        keywords: ["esc", "speed", "controller", "current", "amp", "rating", "calibrate", "calibration", "throttle", "headroom"],
        html: "Choose an ESC whose continuous current rating is <b>above the motor's maximum current, with headroom</b>. 20–30% is a common rule of thumb. <b>Calibrate</b> its throttle range to your transmitter so zero throttle really is zero. Take the propeller off whenever you calibrate or bench-test.",
        sources: ["apEsc"]
      },
      {
        id: "flight-controller",
        title: "Radios, servos and flight controllers",
        keywords: ["radio", "servo", "flight", "controller", "pixhawk", "ardupilot", "autonomy", "autonomous", "gps", "mode", "firmware", "torque"],
        html: "Servos need enough <b>torque</b> for their surface size and airspeed. For autonomy, a <b>flight controller</b> (for example a Pixhawk running ArduPilot) reads its sensors and GPS and flies the plane in assisted or automatic modes. The club's R&amp;D goes further: an <b>indigenous flight controller</b> with its own hardware and firmware, and <b>GPS-denied navigation</b>.",
        sources: ["apPixhawk"]
      }
    ],
    quiz: [
      { q: "A 3S LiPo pack has a nominal voltage of…", options: ["3.7 V", "7.4 V", "11.1 V", "12.6 V"], answer: 2,
        explain: "3 cells × 3.7 V = 11.1 V nominal. 12.6 V is a fully charged 3S pack." },
      { q: "Maximum continuous current from a 2200 mAh, 30C pack?", options: ["30 A", "66 A", "22 A", "660 A"], answer: 1,
        explain: "2.2 Ah × 30C = 66 A." },
      { q: "For an efficient payload trainer, choose…", options: ["High KV, small prop", "Low KV, large prop", "Any KV, as the prop doesn't matter", "The highest KV available"], answer: 1,
        explain: "A low-KV motor turning a big propeller produces thrust efficiently. High KV with a small prop is built for speed." }
    ]
  },

  /* ---------------- WPT 05 ---------------- */
  {
    id: "flight-testing",
    code: "WPT 05",
    title: "Flight testing",
    summary: "Safe field procedures and logging every flight.",
    domain: "All domains",
    notes: [
      {
        id: "drone-rules",
        title: "Airspace and the Drone Rules",
        keywords: ["rule", "law", "legal", "airspace", "where", "dgca", "digital", "sky", "zone", "green", "yellow", "red", "permission", "height", "400", "feet", "licence", "license", "registration", "uin", "airport"],
        html: "India's <b>Drone Rules, 2021</b> divide airspace into <b>green, yellow and red zones</b> on the Digital Sky map. In a <b>green zone</b> you can fly up to <b>400 ft (120 m)</b> without permission. Yellow and red zones need permission, and the yellow zone around an airport perimeter was cut from 45 km to 12 km. Nano drones and non-commercial micro drones need no remote pilot licence, but registration rules depend on the category and the rules are amended over time. <b>Check the current rules and the map before every session.</b>",
        sources: ["droneRules", "digitalSky"]
      },
      {
        id: "weather",
        title: "Reading the weather",
        keywords: ["weather", "wind", "gust", "gusty", "rain", "sunset", "daylight", "temperature", "condition", "conditions"],
        html: "Watch the <b>gusts</b> as well as the average wind. The gap between them tells you how bumpy it will be near the ground. Small foam trainers prefer calm air. As a rule of thumb (not a club rule), keep first flights under about <b>15 km/h of wind with gusts under 20 km/h</b>. Don't fly in rain, and plan to land well before sunset. The test-field strip on the home page shows live conditions for BMSCE.",
        sources: ["field", "phak"]
      },
      {
        id: "checklist",
        title: "Pre-flight checklist",
        keywords: ["checklist", "preflight", "pre", "before", "check", "procedure", "safety", "spotter", "propeller", "secure"],
        html: "Before each flight: <b>CG</b> correct. <b>Battery</b> charged and secured. <b>Control directions</b> right. <b>Range check</b> done and <b>failsafe</b> set. Propeller tight and undamaged. Field clear of people. A <b>spotter</b> beside the pilot. Say \"taking off\" and \"landing\" out loud so everyone at the field knows.",
        sources: ["apArm", "ftCg"]
      },
      {
        id: "flight-log",
        title: "Log every flight",
        keywords: ["log", "logbook", "record", "data", "note", "flight", "time", "track", "telemetry"],
        html: "Write down the <b>date, aircraft, battery, flight time, wind, what you changed and what happened</b>. Over a season the log shows which battery is ageing, which trim works and what broke. It is also evidence for your competition design report.",
        sources: ["saeAero"]
      },
      {
        id: "test-cards",
        title: "One change per flight",
        keywords: ["test", "card", "plan", "change", "variable", "envelope", "abort", "incremental", "experiment"],
        html: "Plan each flight on a <b>test card</b>: what you're testing, what success looks like, and when to abort. <b>Change one thing at a time</b> (CG, a throw, a propeller), so you know which change caused what. Expand the envelope step by step.",
        sources: ["phak"]
      }
    ],
    quiz: [
      { q: "In a green zone, the Drone Rules let you fly without permission up to…", options: ["100 ft (30 m)", "400 ft (120 m)", "1000 ft (300 m)", "Any height"], answer: 1,
        explain: "Green-zone airspace up to 400 ft (120 m) needs no permission. Always check the Digital Sky map first." },
      { q: "Between test flights you should change…", options: ["As much as possible", "One thing at a time", "Nothing, ever", "Only the battery colour"], answer: 1,
        explain: "Changing one variable at a time is the only way to know what caused the difference." },
      { q: "Wind 9 km/h, gusts 22 km/h. The biggest concern is…", options: ["The average wind", "The gust spread", "The temperature", "Nothing at all"], answer: 1,
        explain: "A 13 km/h gap between the average wind and the gusts means sudden bumps, which are worst near the ground on landing." }
    ]
  },

  /* ---------------- WPT 06 ---------------- */
  {
    id: "competition",
    code: "WPT 06",
    title: "Competition",
    summary: "Design reports and the SAE Aero Design build.",
    domain: "All domains",
    notes: [
      {
        id: "sae-aero",
        title: "SAE Aero Design",
        keywords: ["sae", "aero", "design", "west", "east", "micro", "regular", "advanced", "class", "score", "scoring", "judge"],
        html: "SAE Aero Design has <b>Regular, Advanced and Micro</b> classes. Teams are scored on the <b>design report</b>, a <b>technical presentation</b> and <b>flight (mission) performance</b>, under rules published each year. AeroBMSCE competed in the Micro Class at SAE Aero Design West 2026 and finished <b>#16 overall globally and 2nd internationally in the MATLAB Simulation Awards</b>.",
        sources: ["saeAero", "club"]
      },
      {
        id: "aerothon",
        title: "SAEINDIA AeroTHON",
        keywords: ["aerothon", "saeindia", "drone", "uas", "surveillance", "disaster", "phase", "theme", "2025"],
        html: "AeroTHON is SAEINDIA's design-build-fly competition for uncrewed aerial systems. The <b>2025 theme was Surveillance and Disaster Management</b>. Phase 1 was a design report and jury presentation, and Phase 2 was building the prototype and flying it (Nov 2025). AeroBMSCE's Flying Phantoms finished <b>2nd overall</b>.",
        sources: ["aerothon", "club"]
      },
      {
        id: "design-report",
        title: "Writing the design report",
        keywords: ["report", "write", "writing", "document", "justify", "analysis", "simulation", "cfd", "data", "budget"],
        html: "A strong report <b>shows the sizing loop with numbers</b> and justifies every choice. Include analysis: CFD and simulation (the club's MATLAB simulation work won an award in 2026), plus weight and CG budgets. Back it with <b>test data</b> from thrust-rig runs and the flight log. Judges want evidence, not adjectives.",
        sources: ["saeAero", "club", "propel"]
      },
      {
        id: "presentation",
        title: "The technical presentation",
        keywords: ["presentation", "present", "slide", "pitch", "talk", "jury", "judge", "question"],
        html: "Tell one story: <b>mission → requirements → design → analysis → testing → results</b>. Each slide should make one point with one supporting figure. Rehearse the judges' likely questions. The club won <b>Best Technical Presentation</b> at the SAE Drone Design Challenge 2025.",
        sources: ["club"]
      },
      {
        id: "build-two",
        title: "Prototype, then final",
        keywords: ["prototype", "final", "build", "timeline", "schedule", "plan", "two", "iteration", "second"],
        html: "Plan for <b>two airframes</b>: a prototype to fly, break and learn from, then the final aircraft. The club has done this before. For SAE Aero Design West it built a prototype RC plane and a final model carrying a 1 kg payload, and for SAEINDIA two prototype RC planes carrying 0.9 kg.",
        sources: ["propel"]
      }
    ],
    quiz: [
      { q: "SAE Aero Design teams are scored on…", options: ["Flight only", "Report, presentation and flight", "Presentation only", "Aircraft colour"], answer: 1,
        explain: "The design report, the technical presentation and mission/flight performance all count." },
      { q: "The theme of SAEINDIA AeroTHON 2025 was…", options: ["Agriculture spraying", "Surveillance and Disaster Management", "Drone racing", "Space launch"], answer: 1,
        explain: "AeroTHON 2025 (5th edition) was themed Surveillance and Disaster Management." },
      { q: "Why build a prototype before the final aircraft?", options: ["Judges require two planes", "To find and fix problems before they matter", "To use up spare balsa", "It's faster to build twice"], answer: 1,
        explain: "A prototype shows the problems that analysis missed, while there's still time to fix them." }
    ]
  }
];
