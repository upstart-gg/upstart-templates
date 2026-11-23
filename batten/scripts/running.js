// The run: which productions are on now, which opens next. It reads data-opens and data-closes
// (dates as the records hold them, 2027-09-09) on each production's cloth, row and bar, and the
// theater's time zone from data-tz on the footer (without it, the visitor's own clock). It sets
// data-run on each: now (open today, previews included), next (the first to open after today),
// later, or closed; the stylesheet shows the matching tag of the four the template writes. On the
// season at a glance ([data-glance], with data-starts and data-ends) it sets --today, a number from
// 0 to 1, and data-today, where a hairline marks today. It writes no sentence and moves nothing,
// so it runs under prefers-reduced-motion too; it checks again every hour.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const HOUR = 60 * 60 * 1000;
let timer;

/** Today in the theater's time zone, as 2027-09-24. */
function today() {
  const tz = document.querySelector("[data-tz]")?.getAttribute("data-tz") || undefined;
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(
      new Date(),
    );
  } catch {
    return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  }
}

const day = (iso) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));

function mark() {
  const now = today();
  const runs = [...document.querySelectorAll("[data-opens][data-closes]")];
  const coming = runs.map((el) => el.getAttribute("data-opens")).filter((opens) => opens > now);
  const next = coming.sort()[0];
  for (const el of runs) {
    const opens = el.getAttribute("data-opens");
    const closes = el.getAttribute("data-closes");
    const run = opens <= now && now <= closes ? "now" : closes < now ? "closed" : opens === next ? "next" : "later";
    el.setAttribute("data-run", run);
  }
  for (const glance of document.querySelectorAll("[data-glance][data-starts][data-ends]")) {
    const starts = day(glance.getAttribute("data-starts"));
    const ends = day(glance.getAttribute("data-ends"));
    const at = (day(now) - starts) / (ends - starts);
    if (at >= 0 && at <= 1) {
      glance.style.setProperty("--today", at.toFixed(4));
      glance.setAttribute("data-today", "");
    } else {
      glance.style.removeProperty("--today");
      glance.removeAttribute("data-today");
    }
  }
}

export function start(root) {
  if (!within(root, "[data-opens][data-closes], [data-glance]").length) return;
  mark();
  clearInterval(timer);
  timer = setInterval(mark, HOUR);
}

export function stop() {
  clearInterval(timer);
  timer = undefined;
  for (const el of document.querySelectorAll("[data-run]")) el.removeAttribute("data-run");
  for (const glance of document.querySelectorAll("[data-glance]")) {
    glance.style.removeProperty("--today");
    glance.removeAttribute("data-today");
  }
}
