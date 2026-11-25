// The dock: [data-dock], the offer for new students at the end of <main>. The script turns
// the band into a small card that keeps to the foot of the screen (data-dock="on"), hidden
// and inert while a [data-offer] is on screen and until the first one has left it above (on
// a page without one, until the first screen has, or four fifths of a shorter page). It
// rises in and sinks out in 0.4 s, and being sticky, settles into its own place above the
// footer. Dismissed, it stays away for the visit. With no script it is a plain band,
// dismissed by its checkbox alone; under reduced motion it comes and goes at once.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const KEY = "offer-dismissed";
const EASE = [0.22, 1, 0.36, 1];
let stops = [];

const dismissed = () => {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

export function start(root) {
  for (const dock of within(root, "[data-dock]")) {
    const cross = dock.querySelector('input[type="checkbox"]');
    if (dismissed()) {
      dock.hidden = true;
      stops.push(() => {
        dock.hidden = false;
      });
      continue;
    }
    const still = reduced();
    const offers = [...document.querySelectorAll("[data-offer]")];
    let shown = false;
    let playing;

    const show = (yes) => {
      if (yes === shown) return;
      shown = yes;
      dock.inert = !yes;
      playing?.stop();
      if (still) {
        dock.style.opacity = yes ? "" : "0";
        return;
      }
      playing = yes
        ? Motion.animate(dock, { opacity: [0, 1], y: [16, 0] }, { duration: 0.4, ease: EASE })
        : Motion.animate(dock, { opacity: [1, 0], y: [0, 16] }, { duration: 0.4, ease: EASE });
    };
    const look = () => {
      const boxes = offers.map((offer) => offer.getBoundingClientRect()).filter((box) => box.height > 0);
      const onScreen = boxes.some((box) => box.bottom > 0 && box.top < innerHeight);
      const passed = boxes.length
        ? boxes.some((box) => box.bottom <= 0)
        : scrollY >= Math.min(innerHeight, (document.documentElement.scrollHeight - innerHeight) * 0.8);
      show(passed && !onScreen);
    };
    const dismiss = () => {
      if (!cross.checked) return;
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
    };

    dock.dataset.dock = "on";
    dock.inert = true;
    dock.style.opacity = "0";
    if (!still) dock.style.transform = "translateY(16px)";
    addEventListener("scroll", look, { passive: true });
    addEventListener("resize", look);
    cross?.addEventListener("change", dismiss);
    look();

    stops.push(() => {
      removeEventListener("scroll", look);
      removeEventListener("resize", look);
      cross?.removeEventListener("change", dismiss);
      playing?.stop();
      dock.dataset.dock = "";
      dock.inert = false;
      dock.style.opacity = "";
      dock.style.transform = "";
    });
  }
}

export function stop() {
  for (const step of stops) step();
  stops = [];
}
