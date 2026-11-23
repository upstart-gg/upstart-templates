// The flies, Batten's signature: scenery coming down from above into a portal that never moves.
//
// - data-flies on the season's section, data-flies-stage on what sticks, data-cloth on each
//   production, data-flies-rail on the list of cues. From 1024 px wide, under no-preference, the
//   section gets one screen per cloth (data-flying), its stage sticks under the portal's header,
//   and each equal part of the scroll is a cue: its cloth flies in from the flies, in front of the
//   last, lands at its trim and swings a little about its pipe; the cloth behind dims, then is
//   hidden once covered. Scrolling back flies the front cloth out. With no script, in edit mode,
//   under reduced motion and below 1024 px, the stylesheet stacks the cloths, each complete.
// - data-fly-in="load": a cloth that comes down on its pipe once the page has painted.
// - data-fly-out: a production's first screen, which rises into the flies as the visitor scrolls
//   the first 70% of a screen, uncovering the page behind it.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const WIDE = "(min-width: 64rem)";
const UP = "-112%";
/** A flyman hauling a line set fast and braking it to its trim. */
const IN = { duration: 0.85, ease: [0.3, 0, 0.15, 1] };
const OUT = { duration: 0.6, ease: [0.5, 0, 0.75, 0] };
const running = new Map();

/** The cloth settles, swinging about its pipe, its hem a little late. */
function swing(cloth) {
  const hem = cloth.querySelector(".cloth-hem");
  const moves = [Motion.animate(cloth, { rotate: [0, 0.8, -0.45, 0.2, 0] }, { duration: 1.2, ease: "easeOut" })];
  if (hem) moves.push(Motion.animate(hem, { y: [0, 3, 0] }, { duration: 1.2, delay: 0.08, ease: "easeOut" }));
  return moves;
}

/** Puts a cloth where it is at once: at its trim or up in the flies. */
const place = (cloth, y) => Motion.animate(cloth, { y: [y, y], rotate: [0, 0] }, { duration: 0 });

function flies(section) {
  const stage = section.querySelector("[data-flies-stage]");
  const cloths = [...section.querySelectorAll("[data-cloth]")];
  if (!stage || cloths.length < 2) return () => {};
  const cues = [...section.querySelectorAll("[data-flies-rail] a")];
  const wide = matchMedia(WIDE);
  let current = -1;
  let moves = [];
  let stopScroll;
  let pending;

  const hide = (cloth) => {
    cloth.style.visibility = "hidden";
    cloth.inert = true;
  };
  const show = (cloth) => {
    cloth.style.visibility = "";
    cloth.inert = false;
  };
  const mark = () => {
    cues.forEach((cue, i) => {
      if (i === current) cue.setAttribute("aria-current", "step");
      else cue.removeAttribute("aria-current");
    });
  };
  const settle = () => {
    for (const move of moves) move.complete?.();
    moves = [];
  };

  /** Every cloth as it stands at cue `to`, without moving. */
  const layout = (to) => {
    cloths.forEach((cloth, i) => {
      place(cloth, i <= to ? "0%" : UP);
      cloth.style.filter = i < to ? "brightness(0.55)" : "";
      if (i < to) hide(cloth);
      else show(cloth);
    });
  };

  const go = (to, instant) => {
    const from = current;
    if (to === from) return;
    current = to;
    mark();
    settle();
    if (instant || from < 0) return layout(to);
    if (to > from) {
      // A visitor who scrolls past several cues at once sees only the last one fly in.
      for (let i = from + 1; i < to; i++) {
        place(cloths[i], "0%");
        hide(cloths[i]);
      }
      const front = cloths[to];
      show(front);
      front.style.filter = "";
      const behind = cloths[from];
      moves.push(Motion.animate(behind, { filter: ["brightness(1)", "brightness(0.55)"] }, { duration: 0.5 }));
      const flight = Motion.animate(front, { y: [UP, "0%"], rotate: [0, 0] }, IN);
      moves.push(flight);
      flight.then(() => {
        if (current !== to) return;
        for (let i = 0; i < to; i++) hide(cloths[i]);
        moves.push(...swing(front));
      });
    } else {
      for (let i = to + 1; i < from; i++) {
        place(cloths[i], UP);
        show(cloths[i]);
        cloths[i].style.filter = "";
      }
      const back = cloths[to];
      show(back);
      moves.push(Motion.animate(back, { filter: ["brightness(0.55)", "brightness(1)"] }, { duration: 0.5 }));
      moves.push(Motion.animate(cloths[from], { y: ["0%", UP], rotate: [0, 0] }, OUT));
    }
  };

  const ground = () => {
    stopScroll?.();
    stopScroll = undefined;
    settle();
    current = -1;
    section.removeAttribute("data-flying");
    section.style.height = "";
    for (const cloth of cloths) {
      cloth.style.transform = "";
      cloth.style.filter = "";
      show(cloth);
    }
    const hem = (c) => c.querySelector(".cloth-hem");
    for (const cloth of cloths) if (hem(cloth)) hem(cloth).style.transform = "";
    for (const cue of cues) cue.removeAttribute("aria-current");
  };

  const fly = () => {
    ground();
    if (!wide.matches) return;
    section.setAttribute("data-flying", "");
    // A stage held in place by someone else (an inline position, as a full-page capture does)
    // cannot stick: leave the cloths stacked, as with no script.
    if (getComputedStyle(stage).position !== "sticky") return ground();
    section.style.height = `calc(${cloths.length} * 100svh)`;
    stopScroll = Motion.scroll(
      (progress) => go(Math.min(cloths.length - 1, Math.max(0, Math.floor(progress * cloths.length)))),
      { target: section, offset: ["start start", "end end"] },
    );
    if (current < 0) go(0, true);
  };

  /** Scrolls to the middle of cue `i`. */
  const toCue = (i) => {
    const top = section.getBoundingClientRect().top + scrollY;
    const run = section.offsetHeight - innerHeight;
    const y = top + (run * (i + 0.5)) / cloths.length;
    if (window.battenLenis) window.battenLenis.scrollTo(y);
    else scrollTo({ top: y, behavior: "smooth" });
  };
  const onCue = (event) => {
    if (!section.hasAttribute("data-flying")) return;
    const i = cues.indexOf(event.currentTarget);
    if (i < 0) return;
    event.preventDefault();
    toCue(i);
  };
  // A link focused by the keyboard on a cloth still up in the flies brings its cue in.
  const onFocus = (event) => {
    if (!section.hasAttribute("data-flying")) return;
    const i = cloths.findIndex((cloth) => cloth.contains(event.target));
    if (i >= 0 && i !== current) toCue(i);
  };

  const later = () => {
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(fly);
  };
  fly();
  wide.addEventListener("change", later);
  for (const cue of cues) cue.addEventListener("click", onCue);
  section.addEventListener("focusin", onFocus);
  // The moment the stage is held in place from outside, return the section to the stack,
  // before anything measures it: every picture then shows all the cloths.
  const held = new MutationObserver(() => {
    if (stage.style.position && section.hasAttribute("data-flying")) ground();
  });
  held.observe(stage, { attributes: true, attributeFilter: ["style"] });

  return () => {
    held.disconnect();
    cancelAnimationFrame(pending);
    wide.removeEventListener("change", later);
    for (const cue of cues) cue.removeEventListener("click", onCue);
    section.removeEventListener("focusin", onFocus);
    ground();
  };
}

function flyIn(cloth) {
  cloth.style.transform = "translateY(-105%)";
  let moves = [];
  const flight = Motion.animate(cloth, { y: ["-105%", "0%"], rotate: [0, 0] }, { ...IN, delay: 0.2 });
  moves.push(flight);
  flight.then(() => moves.push(...swing(cloth)));
  return () => {
    for (const move of moves) move.stop?.();
    moves = [];
    cloth.style.transform = "";
    const hem = cloth.querySelector(".cloth-hem");
    if (hem) hem.style.transform = "";
  };
}

function flyOut(cloth) {
  const wide = matchMedia(WIDE);
  let frame;
  const rise = () => {
    frame = undefined;
    const k = Math.min(1, Math.max(0, scrollY / (0.7 * innerHeight)));
    cloth.style.transform = k ? `translateY(${(-100 * k).toFixed(2)}%)` : "";
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(rise);
  };
  const ground = () => {
    removeEventListener("scroll", onScroll);
    if (frame) cancelAnimationFrame(frame);
    frame = undefined;
    cloth.removeAttribute("data-flying");
    cloth.style.transform = "";
  };
  const fly = () => {
    ground();
    if (!wide.matches) return;
    cloth.setAttribute("data-flying", "");
    if (getComputedStyle(cloth).position !== "sticky") return ground();
    addEventListener("scroll", onScroll, { passive: true });
    rise();
  };
  fly();
  wide.addEventListener("change", fly);
  const held = new MutationObserver(() => {
    if (cloth.style.position && cloth.hasAttribute("data-flying")) ground();
  });
  held.observe(cloth, { attributes: true, attributeFilter: ["style"] });
  return () => {
    held.disconnect();
    wide.removeEventListener("change", fly);
    ground();
  };
}

export function start(root) {
  if (reduced()) return;
  for (const section of within(root, "[data-flies]")) if (!running.has(section)) running.set(section, flies(section));
  for (const cloth of within(root, '[data-fly-in="load"]')) if (!running.has(cloth)) running.set(cloth, flyIn(cloth));
  for (const cloth of within(root, "[data-fly-out]")) if (!running.has(cloth)) running.set(cloth, flyOut(cloth));
}

export function stop(root) {
  for (const el of within(root, '[data-flies], [data-fly-in="load"], [data-fly-out]')) {
    running.get(el)?.();
    running.delete(el);
  }
}
