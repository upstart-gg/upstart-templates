// Tonight: the one script that reads the clock. For each reading ([data-event], with
// data-date "2027-03-11" and data-starts "19:00"), it sets data-when in the shop's time
// zone (data-tz on the list, or anywhere on the page; without it, the visitor's own
// clock): "past" once its day is over, "tonight" on its day when it starts at 5 pm or
// later, "today" on its day before that. The stylesheet does the rest: it shows the
// "Tonight" and "Today" tags written in the template, leaves past readings out of a
// [data-upcoming] list, and keeps a list's first readings still to come
// (data-upcoming="3", marking the others data-beyond). It writes no text. It checks again every ten minutes; stop
// clears the timer and every data-when.
const EVENING = 17 * 60;
let timer;
const marked = new Set();

function today(tz) {
  const parts = (zone) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: zone || undefined,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
  let list;
  try {
    list = parts(tz);
  } catch {
    list = parts();
  }
  const get = (type) => list.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

const minutes = (t) => {
  const m = /^(\d{1,2}):(\d{2})/.exec((t || "").trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : 0;
};

function mark() {
  const tz = document.querySelector("[data-tz]")?.dataset.tz;
  const day = today(tz);
  for (const event of document.querySelectorAll("[data-event][data-date]")) {
    const date = event.dataset.date.slice(0, 10);
    let when = "";
    if (date < day) when = "past";
    else if (date === day) when = minutes(event.dataset.starts) >= EVENING ? "tonight" : "today";
    if (when) event.dataset.when = when;
    else delete event.dataset.when;
    delete event.dataset.beyond;
    marked.add(event);
  }
  for (const list of document.querySelectorAll("[data-upcoming]")) {
    const count = Number(list.dataset.upcoming);
    if (!count) continue;
    list.dataset.counted = "";
    marked.add(list);
    let shown = 0;
    for (const event of list.querySelectorAll(":scope > [data-event]")) {
      if (event.dataset.when === "past") continue;
      shown += 1;
      if (shown > count) event.dataset.beyond = "";
    }
  }
}

export function start() {
  mark();
  clearInterval(timer);
  timer = setInterval(mark, 10 * 60 * 1000);
}

export function stop() {
  clearInterval(timer);
  timer = undefined;
  for (const el of marked) {
    delete el.dataset.when;
    delete el.dataset.beyond;
    delete el.dataset.counted;
  }
  marked.clear();
}
