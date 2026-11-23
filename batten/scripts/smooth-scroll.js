// Smooth scrolling (Lenis), so that the cues of the flies come in evenly. The instance is
// kept on window.battenLenis for the flies' rail, which scrolls to a cue with it.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis;

export function start(root) {
  if (root !== document || reduced() || lenis) return;
  // In-page links land under the portal's header, as scroll-padding-top has them without a script.
  const header = document.querySelector(".portal-header")?.offsetHeight ?? 0;
  lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -(header + 8) } });
  window.battenLenis = lenis;
}

export function stop(root) {
  if (root !== document) return;
  lenis?.destroy();
  lenis = undefined;
  delete window.battenLenis;
}
