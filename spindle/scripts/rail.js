// The ticket rail: as 40% of a row of a [data-rail] comes into view, its tickets
// ([data-ticket]) slide onto it from the left end of the row, one after another in
// reading order, and each settles with a two-pixel dip as the rail's ball takes it. The
// rail itself, and where each ticket hangs, is the stylesheet's: with no script, under
// reduced motion and in edit mode every ticket is already there. stop cancels what plays
// and takes off what start set; every value says where it starts from, so it plays again
// the same way.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.22, 1, 0.36, 1];
let stops = [];

/** How far left of its place a ticket starts: at the left end of its row, and 24px beyond. */
function from(slot, slots) {
  const row = slots.filter((other) => other.offsetTop === slot.offsetTop);
  return Math.min(...row.map((other) => other.offsetLeft)) - slot.offsetLeft - 24;
}

export function start(root) {
  if (reduced()) return;
  for (const rail of within(root, "[data-rail]")) {
    const slots = [...rail.children].filter((slot) => slot.querySelector("[data-ticket]"));
    const tickets = slots.map((slot) => slot.querySelector("[data-ticket]"));
    const playing = [];
    for (const ticket of tickets) ticket.style.opacity = "0";
    // The slots of a row are the same height, so a row goes as one; rows that come
    // into view together follow one another.
    let free = 0;
    const stopView = Motion.inView(
      slots,
      (slot) => {
        const ticket = slot.querySelector("[data-ticket]");
        const now = performance.now();
        const delay = Math.max(0, free - now) / 1000;
        free = Math.max(free, now) + 120;
        playing.push(
          Motion.animate(ticket, { x: [from(slot, slots), 0] }, { duration: 0.7, delay, ease: EASE }),
          Motion.animate(ticket, { opacity: [0, 1] }, { duration: 0.25, delay, ease: "linear" }),
          Motion.animate(ticket, { y: [0, 2, 0] }, { duration: 0.18, delay: delay + 0.6, ease: "easeInOut" }),
        );
      },
      { amount: 0.4 },
    );
    stops.push(stopView, () => {
      for (const animation of playing) animation.stop();
      for (const ticket of tickets) {
        ticket.style.opacity = "";
        ticket.style.transform = "";
      }
    });
  }
}

export function stop() {
  for (const step of stops) step();
  stops = [];
}
