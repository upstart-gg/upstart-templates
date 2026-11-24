// Reveals (data-reveal): a section's main elements rise a little as they come into view; under
// data-reveal="stagger" its children follow one another, 60 ms apart. The index (data-index) rises 12 px over
// 0.5 s, everything else 16 px over 0.6 s. With no script, under reduced motion and while editing, everything
// is simply there.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.22, 1, 0.36, 1];
let stops = [];
let animations = [];

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-reveal]")) {
    const items = el.dataset.reveal === "stagger" ? [...el.children] : [el];
    const index = el.hasAttribute("data-index");
    const rise = index ? 12 : 16;
    for (const item of items) {
      item.style.opacity = "0";
      item.style.transform = `translateY(${rise}px)`;
    }
    stops.push(
      Motion.inView(
        el,
        () => {
          animations.push(
            Motion.animate(
              items,
              { opacity: [0, 1], y: [rise, 0] },
              { duration: index ? 0.5 : 0.6, ease: EASE, delay: Motion.stagger(0.06) },
            ),
          );
        },
        { amount: 0.1 },
      ),
      () => {
        for (const item of items) {
          item.style.opacity = "";
          item.style.transform = "";
        }
      },
    );
  }
}

/** Stops the animations first, then clears the styles they and `start` set. */
export function stop() {
  for (const a of animations) a.stop();
  animations = [];
  for (const stop of stops) stop();
  stops = [];
}
