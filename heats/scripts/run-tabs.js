// The tab you picked (data-run-tabs on each tab set): when a visitor picks a tab, its label is kept for the
// visit, and the tab of the same label is checked in every other set, on this page and the next. It writes no
// text and moves nothing.
const KEY = "heats-run-tab";
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

const kept = () => {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
};
const keep = (label) => {
  try {
    sessionStorage.setItem(KEY, label);
  } catch {
    // Storage turned off: the tab stays picked on this page only.
  }
};
const pick = (set, label) => {
  for (const input of set.querySelectorAll('input[type="radio"]'))
    if (input.getAttribute("aria-label") === label) input.checked = true;
};

export function start(root) {
  const label = kept();
  for (const set of within(root, "[data-run-tabs]")) {
    if (label) pick(set, label);
    const picked = (event) => {
      const name = event.target.getAttribute?.("aria-label");
      if (!name) return;
      keep(name);
      for (const other of document.querySelectorAll("[data-run-tabs]")) if (other !== set) pick(other, name);
    };
    set.addEventListener("change", picked);
    stops.push(() => set.removeEventListener("change", picked));
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
