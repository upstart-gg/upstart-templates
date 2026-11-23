// The product page's rail (data-tab-rail): a sticky row of links to the chapters. The link of the chapter
// in the middle of the screen gets aria-current="true", which the stylesheet fills in jade. Nothing moves;
// with no script the links still jump to their chapters.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  for (const rail of within(root, "[data-tab-rail]")) {
    const links = [...rail.querySelectorAll('a[href^="#"]')];
    const chapters = links.map((a) => document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);
    if (!chapters.length) continue;
    const mark = (id) => {
      for (const a of links) {
        if (a.getAttribute("href") === `#${id}`) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) mark(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const chapter of chapters) observer.observe(chapter);
    stops.push(() => {
      observer.disconnect();
      for (const a of links) a.removeAttribute("aria-current");
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
