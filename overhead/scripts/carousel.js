// data-carousel: the walk across the floor (Embla). Dragged by a thumb or the pointer, from
// the left edge, no loop, no autoplay. Its links become previous and next buttons, and the
// line's slots (data-slot) get the figures, never words. With no script it is a row that
// snaps, its links leading to the first and last slides. Under reduced motion it jumps.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  for (const carousel of within(root, "[data-carousel]")) {
    const viewport = carousel.querySelector("[data-carousel-viewport]");
    if (!viewport?.firstElementChild?.children.length) continue;
    viewport.scrollLeft = 0;
    viewport.dataset.carouselOn = "";
    const embla = EmblaCarousel(viewport, {
      align: "start",
      containScroll: "trimSnaps",
      loop: false,
      duration: reduced() ? 0 : 25,
    });
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const slot = (name) => carousel.querySelector(`[data-slot="${name}"]`);
    const kept = ["now", "all"].map((name) => [slot(name), slot(name)?.textContent]);
    const go = (step) => (event) => {
      event.preventDefault();
      embla[step]();
    };
    const back = go("scrollPrev");
    const on = go("scrollNext");
    const onKey = (event) => {
      if (event.target !== viewport) return;
      if (event.key === "ArrowLeft") back(event);
      if (event.key === "ArrowRight") on(event);
    };
    const all = embla.slideNodes().length;
    const show = () => {
      // The last stop shows the last slides together: it counts as the last one.
      const at = embla.canScrollNext() ? embla.selectedScrollSnap() + 1 : all;
      if (slot("now")) slot("now").textContent = String(at);
      if (slot("all")) slot("all").textContent = String(all);
      prev?.toggleAttribute("data-off", !embla.canScrollPrev());
      next?.toggleAttribute("data-off", !embla.canScrollNext());
    };
    prev?.addEventListener("click", back);
    next?.addEventListener("click", on);
    viewport.addEventListener("keydown", onKey);
    embla.on("select", show).on("reInit", show);
    show();
    stops.push(() => {
      embla.destroy();
      prev?.removeEventListener("click", back);
      next?.removeEventListener("click", on);
      viewport.removeEventListener("keydown", onKey);
      prev?.removeAttribute("data-off");
      next?.removeAttribute("data-off");
      delete viewport.dataset.carouselOn;
      for (const [el, text] of kept) if (el) el.textContent = text;
    });
  }
}

export function stop() {
  for (const off of stops) off();
  stops = [];
}
