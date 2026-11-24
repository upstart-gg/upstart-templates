// Smooth scrolling (Lenis), light, so that "Book a free first lesson" glides to its form.
// Touch screens keep their own scroll. In-page links land under the sticky header, as the
// targets' scroll-margin has them without a script.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis;

export function start(root) {
  if (root !== document || reduced() || lenis) return;
  lenis = new Lenis({ autoRaf: true, lerp: 0.12, anchors: true });
}

export function stop(root) {
  if (root !== document) return;
  lenis?.destroy();
  lenis = undefined;
}
