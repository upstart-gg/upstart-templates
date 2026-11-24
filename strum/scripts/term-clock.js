// The school's clock: the one script that reads the time, and all it does is mark rows. In
// a [data-term] list, each [data-starts] row ("2027-11-08", with data-ends for a span) gets
// data-state in the school's time zone (data-tz on the list; without it, the visitor's own
// clock): "now" when today falls in it, "next" on the first row after today, "past" before.
// The labels are written in the template; the stylesheet shows the one that matches and
// fades the past. It checks again every hour and moves nothing; stop clears it all.
const HOUR = 60 * 60 * 1000;
let timer;

/** Today in a time zone, as 2027-11-10. */
function today(timeZone) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  try {
    return new Intl.DateTimeFormat("en-CA", { ...options, timeZone: timeZone || undefined }).format(new Date());
  } catch {
    return new Intl.DateTimeFormat("en-CA", options).format(new Date());
  }
}

function mark() {
  for (const list of document.querySelectorAll("[data-term]")) {
    const now = today(list.dataset.tz);
    const rows = [...list.querySelectorAll("[data-starts]")].filter((row) => row.dataset.starts);
    const coming = rows
      .map((row) => row.dataset.starts.slice(0, 10))
      .filter((starts) => starts > now)
      .sort()[0];
    let next = false;
    for (const row of rows) {
      const starts = row.dataset.starts.slice(0, 10);
      const ends = (row.dataset.ends || starts).slice(0, 10);
      delete row.dataset.state;
      if (starts <= now && now <= ends) row.dataset.state = "now";
      else if (ends < now) row.dataset.state = "past";
      else if (starts === coming && !next) {
        row.dataset.state = "next";
        next = true;
      }
    }
  }
}

export function start() {
  mark();
  clearInterval(timer);
  timer = setInterval(mark, HOUR);
}

export function stop() {
  clearInterval(timer);
  timer = undefined;
  for (const row of document.querySelectorAll("[data-term] [data-state]")) delete row.dataset.state;
}
