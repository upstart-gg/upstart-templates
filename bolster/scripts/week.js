// The week: [data-week] with data-tz, the studio's time zone (without it, the visitor's own
// clock). Today's tab and day heading get aria-current="date", and today's classes that have
// begun data-past; with data-week="today" the week also opens on today. It writes no text,
// and looks again every minute. The days and filters themselves are the stylesheet's, so
// the week works with no script, on the day the template checks. No movement here.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

/** The day (mon to sun) and time ("07:40") in a time zone. */
function now(timeZone) {
  const read = (zone) =>
    Object.fromEntries(
      new Intl.DateTimeFormat("en-US", {
        timeZone: zone,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      })
        .formatToParts(new Date())
        .map((part) => [part.type, part.value]),
    );
  let parts;
  try {
    parts = read(timeZone || undefined);
  } catch {
    parts = read(undefined);
  }
  return { day: parts.weekday.toLowerCase(), time: `${parts.hour}:${parts.minute}` };
}

function clear(week) {
  for (const el of week.querySelectorAll('[aria-current="date"]')) el.removeAttribute("aria-current");
  for (const el of week.querySelectorAll("[data-past]")) el.removeAttribute("data-past");
}

function mark(week) {
  clear(week);
  const { day, time } = now(week.dataset.tz);
  for (const el of week.querySelectorAll(`input[name="day"][value="${day}"], [data-day="${day}"] .day-name`))
    el.setAttribute("aria-current", "date");
  for (const row of week.querySelectorAll(`[data-day="${day}"] [data-start]`))
    if (row.dataset.start <= time) row.setAttribute("data-past", "");
  return day;
}

export function start(root) {
  for (const week of within(root, "[data-week]")) {
    const day = mark(week);
    if (week.dataset.week === "today") {
      const today = week.querySelector(`input[name="day"][value="${day}"]`);
      if (today) today.checked = true;
    }
    const timer = setInterval(() => mark(week), 60_000);
    stops.push(() => {
      clearInterval(timer);
      clear(week);
      for (const input of week.querySelectorAll('input[name="day"]')) input.checked = input.defaultChecked;
    });
  }
}

export function stop() {
  for (const step of stops) step();
  stops = [];
}
