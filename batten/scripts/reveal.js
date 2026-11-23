// Reveals on the practical sections: data-reveal rises a little into view; data-reveal="stagger"
// does it for each of its children, 70 ms apart. Never under the flies, never on a first screen.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-reveal]")) {
    const stagger = el.getAttribute("data-reveal") === "stagger";
    const items = stagger ? [...el.children] : [el];
    for (const item of items) {
      item.style.opacity = "0";
      item.style.transform = "translateY(16px)";
    }
    stops.push(
      Motion.inView(
        el,
        () => {
          Motion.animate(
            items,
            { opacity: [0, 1], y: [16, 0] },
            { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: stagger ? Motion.stagger(0.07) : 0 },
          );
        },
        { amount: 0.15 },
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

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
