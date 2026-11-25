// The phone's menu (details.site-menu) closes when one of its links is followed, since a link
// to the page it is on ("Come for a day" on /visit) loads no other page. With no
// script the menu opens and closes by its own button.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  for (const menu of within(root, "details.site-menu")) {
    const close = (event) => {
      if (event.target.closest("a")) menu.open = false;
    };
    menu.addEventListener("click", close);
    stops.push(() => menu.removeEventListener("click", close));
  }
}

export function stop() {
  for (const off of stops) off();
  stops = [];
}
