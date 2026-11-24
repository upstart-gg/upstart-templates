// The heats (data-heats on a section, data-heat on each heat, data-lane on each lane): as a heat comes into
// view, 40% of it shown, its bars leave together after a 150 ms "set" and run out to their figures. The order
// in which they finish follows the figures alone (data-figure on the lane, data-better on the heat): the best
// takes 0.8 s, each place after it 0.22 s more, and tied figures share a place. Each figure shows as its bar
// arrives, and the leader's tape drops in once the leader has finished. "Run again" (data-heats-rerun) sets
// the section's bars back to zero and runs its heats again, 120 ms apart. A lane without a figure is left
// alone. With no script, under reduced motion and while editing, every bar stands at its full length.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.3, 0, 0.2, 1];
const SET = 0.15;
const LEADER = 0.8;
const PLACE = 0.22;

let runs = [];
let stops = [];

/** A heat's lanes that have a figure, each with its place: 0 for the best, tied figures sharing one. */
function lanesOf(heat) {
  const lanes = [...heat.querySelectorAll("[data-lane]")]
    .map((el) => ({
      el,
      figure: Number.parseFloat(el.dataset.figure ?? ""),
      bar: el.querySelector("[data-lane-bar]"),
      label: el.querySelector("[data-lane-figure]"),
      tape: el.querySelector("[data-lane-tape]"),
    }))
    .filter((lane) => Number.isFinite(lane.figure) && lane.bar && lane.label);
  const lower = heat.dataset.better === "lower";
  const order = [...new Set(lanes.map((l) => l.figure))].sort((a, b) => (lower ? a - b : b - a));
  for (const lane of lanes) lane.place = order.indexOf(lane.figure);
  return lanes;
}

function setBack(run) {
  for (const a of run.animations) a.stop();
  run.animations = [];
  for (const { bar, label, tape } of run.lanes) {
    bar.style.transform = "scaleX(0)";
    label.style.opacity = "0";
    if (tape) tape.style.opacity = "0";
  }
}

function clear(run) {
  for (const a of run.animations) a.stop();
  run.animations = [];
  for (const { bar, label, tape } of run.lanes) {
    bar.style.transform = "";
    label.style.opacity = "";
    if (tape) {
      tape.style.opacity = "";
      tape.style.transform = "";
    }
  }
}

function play(run, wait = 0) {
  run.ran = true;
  const move = (el, keyframes, options) => run.animations.push(Motion.animate(el, keyframes, options));
  for (const { bar, label, tape, place } of run.lanes) {
    const duration = LEADER + place * PLACE;
    const arrives = wait + SET + duration;
    move(bar, { scaleX: [0, 1] }, { duration, delay: wait + SET, ease: EASE });
    move(label, { opacity: [0, 1] }, { duration: 0.18, delay: arrives });
    if (tape && place === 0)
      move(tape, { opacity: [1, 1], scaleY: [0, 1] }, { duration: 0.2, delay: arrives, ease: EASE });
    else if (tape) tape.style.opacity = "";
  }
}

export function start(root) {
  if (reduced()) return;
  for (const section of within(root, "[data-heats]")) {
    const own = [...section.querySelectorAll("[data-heat]")].map((heat) => {
      const run = { heat, lanes: lanesOf(heat), animations: [], ran: false };
      setBack(run);
      stops.push(
        Motion.inView(
          heat,
          () => {
            if (!run.ran) play(run);
          },
          { amount: 0.4 },
        ),
      );
      return run;
    });
    runs.push(...own);

    for (const button of section.querySelectorAll("[data-heats-rerun]")) {
      const again = () => {
        for (const run of own) setBack(run);
        own.forEach((run, i) => {
          play(run, i * 0.12);
        });
      };
      button.addEventListener("click", again);
      stops.push(() => button.removeEventListener("click", again));
    }
  }
}

/** Stops the animations and the observers, then clears the styles `start` set. */
export function stop() {
  for (const stop of stops) stop();
  stops = [];
  for (const run of runs) clear(run);
  runs = [];
}
