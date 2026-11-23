// The tidy-up (data-tidy): the paper schedule taped up crooked sorts itself, once, into the product's week.
// In the markup the clean week is there and the paper over it is `hidden`, so with no script, under reduced
// motion and while editing, the week alone shows. Here the paper is shown over the week, which its sheet
// covers. Once the stage is in view, the week's chips, chrome and toast are hidden under it, the clutter
// goes, each scrawl's chip flies from where the name was written to its slot (measured from the two boxes),
// each sticky note flies to the chip it asked for, the sheet gives way to the card and the toast rises, in
// about a second and a half. Then every inline style is cleared and the paper hidden again. It never replays
// and follows neither the pointer nor the scroll.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.22, 1, 0.36, 1];
const shown = (el) => el.getClientRects().length > 0;
const center = (rect) => ({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

let runs = [];

export function start(root) {
  if (reduced()) return;
  for (const section of within(root, "[data-tidy]")) {
    const run = setUp(section);
    if (run) runs.push(run);
  }
}

function setUp(section) {
  const stage = section.querySelector("[data-tidy-stage]");
  const paper = section.querySelector("[data-tidy-paper]");
  const week = section.querySelector("[data-tidy-week]");
  if (!stage || !paper || !week) return null;

  const chips = [...week.querySelectorAll("[data-shift]")];
  const chrome = [...section.querySelectorAll("[data-tidy-chrome]")];
  const toast = section.querySelector("[data-tidy-toast]");

  const run = { section, paper, styled: new Set(), animations: [], timers: [], stopView: null, done: false };

  // The before: the paper shown over the week.
  paper.hidden = false;

  run.stopView = Motion.inView(
    stage,
    () => {
      run.stopView?.();
      run.stopView = null;
      play(run, { chips, chrome, toast });
    },
    { amount: 0.45 },
  );
  return run;
}

function play(run, { chips, chrome, toast }) {
  const { section } = run;
  const animate = (el, keyframes, options) => {
    run.styled.add(el);
    run.animations.push(Motion.animate(el, keyframes, { ease: EASE, ...options }));
  };
  const style = (el, props) => {
    Object.assign(el.style, props);
    run.styled.add(el);
  };
  const visible = (selector) => [...section.querySelectorAll(selector)].filter(shown);

  // The week's pieces, under the sheet until now, hidden until they arrive.
  for (const el of [...chips, ...chrome, toast].filter(Boolean)) style(el, { opacity: "0" });

  // The clutter and the tape go first.
  for (const el of visible("[data-clutter]")) animate(el, { opacity: [1, 0] }, { duration: 0.25, delay: 0.25 });
  for (const el of visible("[data-tape]"))
    animate(el, { y: [0, -6], opacity: [1, 0] }, { duration: 0.25, delay: 0.25 });

  // Each chip, by day then by row, from its scrawl or its note. Measured now, before anything moves.
  const ordered = chips
    .filter(shown)
    .map((chip, row) => ({ chip, row, day: Number(chip.dataset.day ?? 0) }))
    .sort((a, b) => a.day - b.day || a.row - b.row);
  let flight = 0;
  let noteFlight = 0;
  for (const { chip } of ordered) {
    const key = chip.dataset.shift;
    const home = chip.getBoundingClientRect();
    const note = [...section.querySelectorAll(`[data-note="${key}"]`)].find(shown);
    const scrawl = [...section.querySelectorAll(`[data-scrawl="${key}"]`)].find(shown);
    style(chip, { position: "relative", zIndex: "3" });
    if (note) {
      const from = note.getBoundingClientRect();
      const a = center(from);
      const b = center(home);
      const tilt = Number(note.dataset.tilt ?? 0);
      const delay = 0.55 + noteFlight * 0.1;
      noteFlight += 1;
      animate(
        note,
        {
          x: [0, b.x - a.x],
          y: [0, b.y - a.y],
          rotate: [tilt, 0],
          scale: [1, home.width / from.width],
          opacity: [1, 1, 0],
        },
        { duration: 0.6, delay, times: [0, 0.75, 1] },
      );
      animate(chip, { opacity: [0, 1] }, { duration: 0.2, delay: delay + 0.42 });
    } else if (scrawl) {
      const a = center(scrawl.getBoundingClientRect());
      const b = center(home);
      const tilt = Number(scrawl.dataset.tilt ?? 0);
      const delay = 0.4 + flight * 0.022;
      flight += 1;
      animate(scrawl, { opacity: [1, 0] }, { duration: 0.12, delay });
      animate(
        chip,
        { x: [a.x - b.x, 0], y: [a.y - b.y, 0], rotate: [tilt, 0], opacity: [0, 1, 1] },
        { duration: 0.55, delay, times: [0, 0.2, 1] },
      );
    } else {
      animate(chip, { opacity: [0, 1] }, { duration: 0.3, delay: 0.7 });
    }
  }

  // The sheet straightens and gives way to the card; the ring goes last; the toast rises.
  for (const el of section.querySelectorAll("[data-paper-sheet]")) {
    animate(el, { rotate: [-1.5, 0], opacity: [1, 0] }, { duration: 0.55, delay: 0.55 });
  }
  for (const el of chrome) animate(el, { opacity: [0, 1] }, { duration: 0.45, delay: 0.55 });
  for (const el of section.querySelectorAll("[data-ring]"))
    animate(el, { opacity: [1, 0] }, { duration: 0.3, delay: 0.95 });
  if (toast) animate(toast, { y: [12, 0], opacity: [0, 1] }, { duration: 0.35, delay: 1.1 });

  // Cleared as soon as the last animation ends, or after 1.8 s whatever happens.
  Promise.all(run.animations.map((a) => a.finished ?? a)).then(
    () => clear(run),
    () => {},
  );
  run.timers.push(setTimeout(() => clear(run), 1800));
}

/** Leaves the page as the markup has it: the paper hidden, no inline style left. */
function clear(run) {
  if (run.done) return;
  run.done = true;
  for (const a of run.animations) a.stop?.();
  run.animations = [];
  for (const t of run.timers) clearTimeout(t);
  run.timers = [];
  run.paper.hidden = true;
  for (const el of run.styled) {
    el.style.opacity = "";
    el.style.transform = "";
    el.style.position = "";
    el.style.zIndex = "";
    el.style.willChange = "";
  }
  run.styled.clear();
}

export function stop() {
  for (const run of runs) {
    run.stopView?.();
    run.stopView = null;
    clear(run);
  }
  runs = [];
}
