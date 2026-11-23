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
    // Each item watches for itself, so that a long list (twelve actors on a phone) reveals what is
    // on the screen without waiting for a share of the whole list; items that come in together
    // still rise 70 ms apart.
    let batch = 0;
    let frame;
    for (const item of items) {
      stops.push(
        Motion.inView(
          item,
          () => {
            const delay = stagger ? 0.07 * batch++ : 0;
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
              batch = 0;
            });
            Motion.animate(item, { opacity: [0, 1], y: [16, 0] }, { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay });
          },
          { amount: 0.1 },
        ),
      );
    }
    stops.push(() => {
      cancelAnimationFrame(frame);
      for (const item of items) {
        item.style.opacity = "";
        item.style.transform = "";
      }
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
