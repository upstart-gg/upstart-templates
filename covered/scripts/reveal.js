// Reveals (data-reveal): a section's main elements rise a little as they come into view; under
// data-reveal="stagger" its children follow one another, 70 ms apart; data-reveal="late" rises once the
// page has loaded, after half a second (the hero's floating card). Used sparingly. With no script,
// under reduced motion and while editing, everything is simply there.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.22, 1, 0.36, 1];
let stops = [];
let animations = [];

const hide = (el, y) => {
  el.style.opacity = "0";
  el.style.transform = `translateY(${y}px)`;
  stops.push(() => {
    el.style.opacity = "";
    el.style.transform = "";
  });
};

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-reveal]")) {
    const how = el.dataset.reveal;
    if (how === "late") {
      hide(el, 12);
      animations.push(Motion.animate(el, { opacity: [0, 1], y: [12, 0] }, { duration: 0.6, delay: 0.5, ease: EASE }));
      continue;
    }
    const items = how === "stagger" ? [...el.children] : [el];
    for (const item of items) hide(item, 16);
    stops.push(
      Motion.inView(
        el,
        () => {
          animations.push(
            Motion.animate(
              items,
              { opacity: [0, 1], y: [16, 0] },
              { duration: 0.7, ease: EASE, delay: Motion.stagger(0.07) },
            ),
          );
        },
        { amount: 0.15 },
      ),
    );
  }
}

/** Stops the animations first, then clears the styles they and `hide` set. */
export function stop() {
  for (const a of animations) a.stop();
  animations = [];
  for (const stop of stops) stop();
  stops = [];
}
