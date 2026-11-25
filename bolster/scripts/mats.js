// The mats: each [data-mat] of a [data-mats] list unrolls from its left end as 40% of it
// comes into view. The clip opens from the left and a roll travels with its edge, thinner
// as the mat leaves it (the square root of what is left), its shadow on the floor ahead;
// in the last tenth the roll fades. A class's mat (data-mat="style") takes 0.9 s, those
// coming in together 90 ms apart; a session's (data-mat="row") 0.6 s and 50 ms, eight at
// most one after another, the rest together. Picking another day in a [data-week] unrolls
// that day's rows again, in 0.45 s, 35 ms apart. With no script, under reduced motion and
// in edit mode the mats lie flat; stop takes off everything start set.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.3, 0.7, 0.2, 1];
const STYLE = { duration: 0.9, gap: 0.09, most: Number.POSITIVE_INFINITY };
const ROW = { duration: 0.6, gap: 0.05, most: 8 };
const AGAIN = { duration: 0.45, gap: 0.035, most: Number.POSITIVE_INFINITY };
const rem = () => Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
let stops = [];

/** A mat, its roll and what plays on it. */
function roller(mat) {
  let roll;
  let playing;
  const rolledUp = (t) => {
    const left = 1 - t;
    mat.style.clipPath = t >= 1 ? "" : `inset(0 ${left * 100}% 0 0 round var(--radius-box))`;
    if (!roll) return;
    const size = (0.375 + 2.125 * Math.sqrt(left)) * rem();
    roll.style.top = `${mat.offsetTop}px`;
    roll.style.left = `${mat.offsetLeft}px`;
    roll.style.height = `${mat.offsetHeight}px`;
    roll.style.width = `${size}px`;
    roll.style.transform = `translateX(${t * mat.offsetWidth - size / 2}px)`;
    roll.style.opacity = t > 0.9 ? `${(1 - t) * 10}` : "";
  };
  return {
    mat,
    waiting: false,
    wait() {
      playing?.stop();
      this.waiting = true;
      if (!roll) {
        roll = document.createElement("span");
        roll.className = "mat-roll";
        roll.setAttribute("aria-hidden", "true");
        roll.dataset.tone = mat.dataset.tone ?? "";
        mat.parentElement.append(roll);
      }
      rolledUp(0);
    },
    unroll({ duration }, delay) {
      this.waiting = false;
      rolledUp(0);
      playing = Motion.animate(0, 1, {
        duration,
        delay,
        ease: EASE,
        onUpdate: rolledUp,
        onComplete: () => this.flat(),
      });
    },
    flat() {
      playing?.stop();
      playing = undefined;
      this.waiting = false;
      roll?.remove();
      roll = undefined;
      mat.style.clipPath = "";
    },
  };
}

export function start(root) {
  if (reduced()) return;
  for (const list of within(root, "[data-mats]")) {
    const rollers = [...list.querySelectorAll("[data-mat]")].map(roller);
    const of = new Map(rollers.map((r) => [r.mat.parentElement, r]));
    for (const r of rollers) r.wait();
    // Mats that come into view together follow one another, from the top. What is watched
    // is the mat's box: clipped to nothing, the mat itself would never be seen coming.
    let queue = [];
    let frame;
    const go = () => {
      frame = undefined;
      const timing = queue[0].mat.dataset.mat === "row" ? ROW : STYLE;
      queue
        .sort((a, b) => rollers.indexOf(a) - rollers.indexOf(b))
        .forEach((r, i) => {
          r.unroll(timing, Math.min(i, timing.most) * timing.gap);
        });
      queue = [];
    };
    const stopView = Motion.inView(
      rollers.map((r) => r.mat.parentElement),
      (box) => {
        const r = of.get(box);
        if (!r.waiting) return;
        queue.push(r);
        frame ??= requestAnimationFrame(go);
      },
      { amount: 0.4 },
    );
    // Another day picked: its rows again, quicker. Any other choice of the week leaves
    // the rows it shows to their own entrance.
    const day = list.closest("[data-day]");
    const week = day?.closest("[data-week]");
    const picked = (event) => {
      if (event.target.name !== "day" || event.target.value !== day.dataset.day) return;
      const shown = rollers.filter((r) => r.mat.offsetParent);
      for (const r of shown) r.wait();
      shown.forEach((r, i) => {
        r.unroll(AGAIN, i * AGAIN.gap);
      });
    };
    week?.addEventListener("change", picked);
    stops.push(() => {
      stopView();
      if (frame) cancelAnimationFrame(frame);
      week?.removeEventListener("change", picked);
      for (const r of rollers) r.flat();
    });
  }
}

export function stop() {
  for (const step of stops) step();
  stops = [];
}
