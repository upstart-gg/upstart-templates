// The hero's words (data-split="words" on its headline): Splitting cuts the headline into
// words, and each lands like a downbeat: up 28 px and turned −3° to its place, 0.6 s with a
// small overshoot, 70 ms apart, from 0.15 s after the page opens. Whole words, once. start
// saves the headline's markup and stop puts it back; force makes Splitting, which keeps
// what it cut, cut the headline again. With no script, under reduced motion
// and in edit mode the headline is whole and still.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.34, 1.4, 0.64, 1];
let undo = [];

export function start(root) {
  if (reduced()) return;
  for (const heading of within(root, '[data-split="words"]')) {
    const markup = heading.innerHTML;
    Splitting({ target: heading, by: "words", force: true });
    const words = [...heading.querySelectorAll(".word")];
    for (const word of words) word.style.opacity = "0";
    const playing = words.map((word, i) =>
      Motion.animate(
        word,
        { opacity: [0, 1], y: [28, 0], rotate: [-3, 0] },
        { duration: 0.6, delay: 0.15 + i * 0.07, ease: EASE },
      ),
    );
    undo.push(() => {
      for (const one of playing) one.stop();
      heading.innerHTML = markup;
      heading.classList.remove("words", "splitting");
      heading.style.removeProperty("--word-total");
    });
  }
}

export function stop() {
  for (const step of undo) step();
  undo = [];
}
