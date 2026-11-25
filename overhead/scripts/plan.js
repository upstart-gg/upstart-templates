// The plan's lights (data-plan, with data-plan-picker, data-zone on each room of the drawing
// and data-zone-row on each line of the list). Picking a plan is the stylesheet's work; here
// the rooms it opens come on one after another, 80 ms apart, in the order a visitor walks
// from the elevator (data-entrance): each room's light spreads from its corner nearest to
// the door, the circle of its clip path growing over 0.5 s. Once as the plan comes into
// view, then for the newly lit rooms at each change of plan. Pointing at or focusing a line
// lights its room (data-active); pointing at a room marks its line, a tap opens it.
// Under reduced motion the rooms come on at once. The dark state is set just before a room
// is lit; with no script every room of the plan is simply lit.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.22, 1, 0.36, 1];
const STEP = 0.08;
const FULL = "200";

let stops = [];

/** The position of the plan picked, from 1. */
const picked = (plan) =>
  [...plan.querySelectorAll("[data-plan-picker] > *")].findIndex((option) => option.querySelector(":checked")) + 1;

const lit = (plan) => {
  const at = String(picked(plan));
  return [...plan.querySelectorAll("[data-zone]")].filter((zone) => zone.dataset.plans.split(" ").includes(at));
};

/** Where a room's light starts: its corner nearest to the elevator, and how far it goes. */
function spread(zone) {
  const [x, y, w, h] = zone.dataset.box.split(" ").map(Number);
  const door = zone.ownerSVGElement.querySelector("[data-entrance]");
  const [ex, ey] = [Number(door.getAttribute("cx")), Number(door.getAttribute("cy"))];
  const near = (a, b, e) => (Math.abs(a - e) <= Math.abs(b - e) ? a : b);
  const cx = near(x, x + w, ex);
  const cy = near(y, y + h, ey);
  return { cx, cy, reach: Math.hypot(w, h), distance: Math.hypot(cx - ex, cy - ey) };
}

export function start(root) {
  for (const plan of within(root, "[data-plan]")) {
    let running = [];
    const circles = new Set();
    const end = () => {
      for (const animation of running) animation.stop();
      running = [];
      for (const circle of circles) circle.setAttribute("r", FULL);
      circles.clear();
    };
    const turnOn = (zones) => {
      end();
      if (reduced()) return;
      // Each drawing (the wide one, the tall one) has its own order.
      for (const svg of new Set(zones.map((zone) => zone.ownerSVGElement))) {
        zones
          .filter((zone) => zone.ownerSVGElement === svg)
          .map((zone) => ({ circle: zone.querySelector("clipPath circle"), ...spread(zone) }))
          .sort((a, b) => a.distance - b.distance)
          .forEach(({ circle, cx, cy, reach }, i) => {
            circle.setAttribute("cx", cx);
            circle.setAttribute("cy", cy);
            circle.setAttribute("r", "0");
            circles.add(circle);
            running.push(
              Motion.animate(0, 1, {
                duration: 0.5,
                delay: i * STEP,
                ease: EASE,
                onUpdate: (at) => circle.setAttribute("r", String(at * reach)),
                onComplete: () => circle.setAttribute("r", FULL),
              }),
            );
          });
      }
    };

    let before = new Set(lit(plan));
    const onChange = (event) => {
      if (!event.target.closest("[data-plan-picker]")) return;
      const now = lit(plan);
      turnOn(now.filter((zone) => !before.has(zone)));
      before = new Set(now);
    };
    plan.addEventListener("change", onChange);

    const zonesOf = (id) => plan.querySelectorAll(`[data-zone="${CSS.escape(id)}"]`);
    const rowOf = (id) => plan.querySelector(`[data-zone-row="${CSS.escape(id)}"]`);
    const mark = (id, on) => {
      for (const el of [...zonesOf(id), rowOf(id)]) el?.toggleAttribute("data-active", on);
    };
    const undo = [];
    const listen = (el, type, fn) => {
      el.addEventListener(type, fn);
      undo.push(() => el.removeEventListener(type, fn));
    };
    for (const row of plan.querySelectorAll("[data-zone-row]")) {
      const id = row.dataset.zoneRow;
      listen(row, "pointerenter", (event) => event.pointerType !== "touch" && mark(id, true));
      listen(row, "pointerleave", () => mark(id, row.contains(document.activeElement)));
      listen(row, "focusin", () => mark(id, true));
      listen(row, "focusout", () => mark(id, false));
    }
    for (const zone of plan.querySelectorAll("[data-zone]")) {
      const id = zone.dataset.zone;
      listen(zone, "pointerenter", (event) => event.pointerType !== "touch" && mark(id, true));
      listen(zone, "pointerleave", () => mark(id, false));
      listen(zone, "click", () => {
        const row = rowOf(id);
        if (row) row.open = true;
      });
    }

    if (!reduced()) {
      const drawing = [...plan.querySelectorAll(".plan")].find((el) => el.offsetParent) ?? plan;
      stops.push(
        Motion.inView(
          drawing,
          () => {
            turnOn(lit(plan));
          },
          { amount: 0.35 },
        ),
      );
    }
    stops.push(() => {
      end();
      plan.removeEventListener("change", onChange);
      for (const off of undo) off();
      for (const el of plan.querySelectorAll("[data-active]")) el.removeAttribute("data-active");
    });
  }
}

export function stop() {
  for (const off of stops) off();
  stops = [];
}
