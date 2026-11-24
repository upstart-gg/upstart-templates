// Forms marked data-prefill take what the link that led to them says: ?teacher=linh-nguyen
// the teacher, ?program=kids the program, ?class=guitar-club the class, ?instrument=cello
// the instrument. Each names an option by its data-id. It only chooses: it writes no text
// and moves nothing, and with no script the forms start empty and work. stop puts the
// fields back as the page had them.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let undo = [];

export function start(root) {
  const params = new URLSearchParams(location.search);
  for (const form of within(root, "form[data-prefill]")) {
    for (const name of ["teacher", "program", "class", "instrument"]) {
      const id = params.get(name);
      const select = id && form.querySelector(`select[data-prefill-from="${name}"]`);
      const option = select && [...select.options].find((one) => one.dataset.id === id);
      if (!option) continue;
      const before = select.selectedIndex;
      select.selectedIndex = option.index;
      undo.push(() => {
        select.selectedIndex = before;
      });
    }
  }
}

export function stop() {
  for (const step of undo.reverse()) step();
  undo = [];
}
