// The shelf-talkers: as a [data-picks] comes into view (the hero's, marked
// data-picks="load", as the page opens), each bookseller's card ([data-talker]) is
// lowered behind its book, then raised to its rest height, one after another in
// reading order. The rest height is the stylesheet's (the whole card, or only its
// band where the card peeks): Motion's y adds to it, so with no script, under reduced
// motion and in edit mode every card simply stands at rest. stop takes off what it set.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.22, 1, 0.36, 1];
let stops = [];

/** How far a card is lowered: down to its book's top, so it is all behind the book. */
function depth(card) {
  const book = card.parentElement?.querySelector(".pick-book");
  if (!book) return 0;
  const lowered = book.getBoundingClientRect().top - card.getBoundingClientRect().top;
  return Math.max(0, Math.round(lowered));
}

export function start(root) {
  if (reduced()) return;
  for (const table of within(root, "[data-picks]")) {
    const cards = [...table.querySelectorAll("[data-talker]")];
    if (!cards.length) continue;
    const lows = cards.map(depth);
    cards.forEach((card, i) => {
      card.style.transform = `translateY(${lows[i]}px)`;
    });
    const delay = table.dataset.picks === "load" ? 0.25 : 0;
    const stopView = Motion.inView(
      table,
      () => {
        cards.forEach((card, i) => {
          Motion.animate(card, { y: [lows[i], 0] }, { duration: 0.6, delay: delay + i * 0.09, ease: EASE });
        });
      },
      { amount: 0.15 },
    );
    stops.push(stopView, () => {
      for (const card of cards) card.style.transform = "";
    });
  }
}

export function stop() {
  for (const step of stops) step();
  stops = [];
}
