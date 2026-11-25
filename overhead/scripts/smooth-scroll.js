// Light smooth scrolling (Lenis), on wheel and trackpad only: touch screens keep their own.
// Links to #plan, #visit and #ask on the page glide there, under the sticky header.
// Not under reduced motion.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const TARGETS = ["#plan", "#visit", "#ask"];

let lenis;
let onClick;

export function start(root) {
  if (root !== document || reduced() || lenis) return;
  lenis = new Lenis({ autoRaf: true, lerp: 0.12 });
  onClick = (event) => {
    if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const link = event.target.closest?.("a[href]");
    if (!link) return;
    const url = new URL(link.href);
    if (url.pathname !== location.pathname || url.search !== location.search || !TARGETS.includes(url.hash)) return;
    const target = document.querySelector(url.hash);
    if (!target) return;
    event.preventDefault();
    history.pushState(null, "", url.hash);
    const header = document.querySelector("header");
    lenis.scrollTo(target, { offset: -(header?.offsetHeight ?? 0) });
  };
  document.addEventListener("click", onClick);
}

export function stop(root) {
  if (root !== document) return;
  document.removeEventListener("click", onClick);
  lenis?.destroy();
  lenis = undefined;
}
