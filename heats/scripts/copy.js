// Copy (data-copy on a button, beside its code in a data-copy-from element): a click writes the code's text to
// the clipboard and sets data-copied on the button for 1.6 s, and the stylesheet shows the label that matches.
// Both labels are in the markup. With no script the code has select-all: one click selects the whole command.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  for (const button of within(root, "[data-copy]")) {
    const code = button.closest("[data-copy-from]")?.querySelector("code");
    if (!code) continue;
    let timer = 0;
    const copy = async () => {
      try {
        await navigator.clipboard.writeText(code.textContent.trim());
      } catch {
        // No clipboard (an insecure page): the command is selected instead.
        getSelection()?.selectAllChildren(code);
        return;
      }
      button.setAttribute("data-copied", "");
      clearTimeout(timer);
      timer = setTimeout(() => button.removeAttribute("data-copied"), 1600);
    };
    button.addEventListener("click", copy);
    stops.push(() => {
      button.removeEventListener("click", copy);
      clearTimeout(timer);
      button.removeAttribute("data-copied");
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
