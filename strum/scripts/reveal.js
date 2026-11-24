// data-reveal: a section's main elements rise a little into view (y 16 → 0, with their
// opacity, 0.7 s). data-reveal="stagger" on a list does the same for its children,
// 70 ms apart. Never on a strung list, which is there and rings. Under reduced
// motion and in edit mode, everything is in place.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.22, 1, 0.36, 1];
let stops = [];

function hide(el) {
  el.style.opacity = "0";
  el.style.transform = "translateY(16px)";
  stops.push(() => {
    el.style.opacity = "";
    el.style.transform = "";
  });
}

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-reveal]")) {
    const items = el.dataset.reveal === "stagger" ? [...el.children] : [el];
    items.forEach(hide);
    stops.push(
      Motion.inView(
        el,
        () => {
          items.forEach((item, i) => {
            Motion.animate(item, { opacity: [0, 1], y: [16, 0] }, { duration: 0.7, delay: i * 0.07, ease: EASE });
          });
        },
        { amount: 0.05 },
      ),
    );
  }
}

export function stop() {
  for (const step of stops) step();
  stops = [];
}
