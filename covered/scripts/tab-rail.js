// The product page's rail (data-tab-rail): a sticky row of links to the chapters. The link of the chapter
// that has reached the reading line (a little below the rail, never further than 320 px) gets
// aria-current="true", which the stylesheet fills in jade; above the first chapter, none does. When the
// rail is wider than the screen (a phone), it scrolls sideways to show the marked link. With no script the
// links still jump to their chapters.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

let stops = [];

export function start(root) {
  for (const rail of within(root, "[data-tab-rail]")) {
    const list = rail.querySelector("ul") ?? rail;
    const links = [...rail.querySelectorAll('a[href^="#"]')];
    const chapters = links
      .map((a) => ({ a, chapter: document.getElementById(a.getAttribute("href").slice(1)) }))
      .filter(({ chapter }) => chapter);
    if (!chapters.length) continue;

    let marked = null;
    const mark = (link) => {
      if (link === marked) return;
      marked = link;
      for (const { a } of chapters) {
        if (a === link) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      }
      if (link && list.scrollWidth > list.clientWidth + 1) {
        const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
        list.scrollTo({ left: Math.max(0, left), behavior: reduced() ? "auto" : "smooth" });
      }
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = rail.getBoundingClientRect().bottom + Math.min(innerHeight * 0.4, 320);
      let current = null;
      for (const { a, chapter } of chapters) if (chapter.getBoundingClientRect().top <= line) current = a;
      mark(current);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    update();

    stops.push(() => {
      removeEventListener("scroll", queue);
      removeEventListener("resize", queue);
      if (frame) cancelAnimationFrame(frame);
      for (const { a } of chapters) a.removeAttribute("aria-current");
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
