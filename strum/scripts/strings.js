// The strings: every rule of a [data-strings] list is an SVG string (parts/string.liquid,
// data-string="1" to "4", its gauge) that is always there, full length, and only bends
// and springs back where it stands.
// - As a list comes into view (a third of it), its strings are plucked one after another,
//   top to bottom, 60 ms apart, once per page view. data-strings-at="load" (the hero)
//   strums 0.55 s after the page opens instead, and each row's [data-tick] bounces.
// - On a fine pointer that hovers, a string crossed by the pointer's path is plucked where
//   it was crossed, 2 to 9 px deep by the pointer's vertical speed and in its direction;
//   a page scrolling under a resting pointer plucks more gently (2 to 6 px). One string
//   is plucked at most every 120 ms.
// - A tap on a row plucks the string above it (4 px, under the finger), keyboard focus
//   moving into a row too (3 px, at 30 %).
// No sound, no change of color, nothing follows the pointer. Under reduced motion and in
// edit mode every string lies straight. stop puts every path back and removes it all.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const REST = "M0 12 H1000";
// A thin string rings fast and short, a thick one slower and longer.
const SPRINGS = {
  1: { stiffness: 1400, damping: 12 },
  2: { stiffness: 1100, damping: 11 },
  3: { stiffness: 850, damping: 10 },
  4: { stiffness: 600, damping: 9 },
};
const GAP = 0.06;
const EVERY = 120;
const clamp = (value, low, high) => Math.min(high, Math.max(low, value));

let stops = [];
let seen;
let inSight = new Set();
let sides = new Map();
let pointer;
const ringing = new Map();
const last = new WeakMap();

/** The string's one smooth curve, its deepest point `depth` px below (or above) rest at `at` (0 to 1). */
function bend(at, depth) {
  const control = 2000 * clamp(at, 0.25, 0.75) - 500;
  return `M0 12 Q${control.toFixed(1)} ${(12 + 2 * depth).toFixed(2)} 1000 12`;
}

function straighten(string) {
  for (const path of string.querySelectorAll("path")) path.setAttribute("d", REST);
  const ghost = string.querySelector(".string-ghost");
  if (ghost) ghost.style.opacity = "";
}

function pluck(string, at, depth) {
  const now = performance.now();
  if (now - (last.get(string) ?? Number.NEGATIVE_INFINITY) < EVERY) return;
  last.set(string, now);
  ringing.get(string)?.stop();
  const { stiffness, damping } = SPRINGS[string.dataset.string] ?? SPRINGS[2];
  const lines = string.querySelectorAll(".string-line, .string-winding");
  const ghost = string.querySelector(".string-ghost");
  const draw = (swing) => {
    const curve = bend(at, swing);
    for (const line of lines) line.setAttribute("d", curve);
    if (!ghost) return;
    ghost.setAttribute("d", bend(at, -swing));
    // The other side of the lens fades as the string dies away (half its spring's damping).
    const left = Math.exp((-damping / 2) * ((performance.now() - now) / 1000));
    ghost.style.opacity = (0.5 * left).toFixed(3);
  };
  draw(depth);
  const playing = Motion.animate(depth, 0, {
    type: "spring",
    stiffness,
    damping,
    restDelta: 0.1,
    restSpeed: 4,
    onUpdate: draw,
    onComplete: () => {
      if (ringing.get(string) !== playing) return;
      ringing.delete(string);
      straighten(string);
    },
  });
  ringing.set(string, playing);
}

/** A list's strings, top to bottom, like a hand drawn across them. */
function strum(list, delay = 0) {
  const strings = [...list.querySelectorAll("[data-string]")].filter((s) => s.closest("[data-strings]") === list);
  strings.forEach((string, i) => {
    const timer = setTimeout(
      () => {
        pluck(string, 0.3, string.clientWidth < 480 ? 4 : 6);
        const tick = delay ? string.closest("li")?.querySelector("[data-tick]") : undefined;
        if (tick && string.closest("li").querySelector("[data-string]") === string) {
          const bounce = Motion.animate(tick, { scale: [0.7, 1.15, 1] }, { duration: 0.45, ease: "easeOut" });
          stops.push(() => {
            bounce.stop();
            tick.style.transform = "";
          });
        }
      },
      (delay + i * GAP) * 1000,
    );
    stops.push(() => clearTimeout(timer));
  });
}

/** The strings the hand has crossed since the last event: `soft` when the page moved under it. */
function cross(x, y, soft) {
  const now = performance.now();
  const before = pointer;
  const time = Math.max(8, now - (before?.time ?? now));
  pointer = { x, y, time: now };
  for (const string of inSight) {
    const box = string.getBoundingClientRect();
    const side = y - (box.top + box.height / 2);
    const was = sides.get(string);
    sides.set(string, side);
    if (was === undefined || was === side || was * side > 0 || was === 0) continue;
    const share = was / (was - side);
    const crossed = before ? before.x + (x - before.x) * share : x;
    if (crossed < box.left || crossed > box.right) continue;
    const speed = Math.abs(side - was) / time;
    const depth = clamp(2 + speed * 3.5, 2, soft ? 6 : 9);
    pluck(string, (crossed - box.left) / box.width, Math.sign(side - was) * depth);
  }
}

function forget() {
  pointer = undefined;
  sides.clear();
}

function listen() {
  const on = (target, type, handler, options) => {
    target.addEventListener(type, handler, options);
    stops.push(() => target.removeEventListener(type, handler, options));
  };
  const firstOf = (event) => event.target.closest?.("[data-strings] > li")?.querySelector("[data-string]");
  let touched = false;
  on(
    document,
    "pointerdown",
    (event) => {
      touched = event.pointerType === "touch";
    },
    { passive: true },
  );
  on(document, "click", (event) => {
    if (!touched) return;
    const string = firstOf(event);
    if (!string) return;
    const box = string.getBoundingClientRect();
    pluck(string, (event.clientX - box.left) / box.width, 4);
  });
  on(document, "focusin", (event) => {
    const row = event.target.closest?.("[data-strings] > li");
    if (!row || row.contains(event.relatedTarget) || !event.target.matches(":focus-visible")) return;
    const string = row.querySelector("[data-string]");
    if (string) pluck(string, 0.3, 3);
  });
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  on(
    document,
    "pointermove",
    (event) => {
      if (event.pointerType !== "touch") cross(event.clientX, event.clientY, false);
    },
    { passive: true },
  );
  on(
    document,
    "scroll",
    () => {
      if (pointer) cross(pointer.x, pointer.y, true);
    },
    { passive: true },
  );
  on(document.documentElement, "pointerleave", forget);
}

export function start(root) {
  if (reduced()) return;
  const lists = within(root, "[data-strings]");
  if (!seen) {
    seen = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inSight.add(entry.target);
        else {
          inSight.delete(entry.target);
          sides.delete(entry.target);
        }
      }
    });
    listen();
  }
  for (const list of lists) {
    for (const string of list.querySelectorAll("[data-string]")) seen.observe(string);
    if (list.dataset.stringsAt === "load") {
      strum(list, 0.55);
      continue;
    }
    // A third of the list, or as much as the screen can show of a longer one.
    const amount = Math.min(1 / 3, (0.5 * innerHeight) / Math.max(1, list.offsetHeight));
    stops.push(Motion.inView(list, () => strum(list), { amount }));
  }
}

export function stop() {
  for (const undo of stops.reverse()) undo();
  stops = [];
  seen?.disconnect();
  seen = undefined;
  inSight = new Set();
  sides = new Map();
  pointer = undefined;
  for (const [string, playing] of ringing) {
    playing.stop();
    straighten(string);
  }
  ringing.clear();
}
