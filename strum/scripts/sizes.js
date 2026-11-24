// The rental form's sizes follow its instrument: in a select marked data-sizes-of="instrument",
// only the group (data-for) of the option chosen (data-id) in the form's field of that name is
// offered. It writes no text and moves nothing; with no script every group is listed under its
// instrument's name. stop offers them all again.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let undo = [];

export function start(root) {
  for (const sizes of within(root, "select[data-sizes-of]")) {
    const of = sizes.form?.elements[sizes.dataset.sizesOf];
    if (!of) continue;
    const offer = () => {
      const id = of.selectedOptions[0]?.dataset.id;
      for (const group of sizes.querySelectorAll("optgroup")) {
        const other = Boolean(id) && group.dataset.for !== id;
        group.hidden = other;
        group.disabled = other;
      }
      if (sizes.selectedOptions[0]?.closest("optgroup")?.disabled) sizes.selectedIndex = 0;
    };
    of.addEventListener("change", offer);
    offer();
    undo.push(() => {
      of.removeEventListener("change", offer);
      for (const group of sizes.querySelectorAll("optgroup")) {
        group.hidden = false;
        group.disabled = false;
      }
    });
  }
}

export function stop() {
  for (const step of undo) step();
  undo = [];
}
