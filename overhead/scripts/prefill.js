// What the link that led here says, chosen on the page: ?plan=full-time the plan in the visit
// form and in the plan's picker, ?for=tour what the visit is for, ?room=showroom the room.
// Each names an option by its data-id. It writes no text and moves nothing; with no script
// the forms open on their defaults. stop puts the choices back.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let undo = [];

const check = (input) => {
  const before = [...document.getElementsByName(input.name)].find((one) => one.checked);
  input.checked = true;
  input.dispatchEvent(new Event("change", { bubbles: true }));
  undo.push(() => {
    input.checked = false;
    if (before) before.checked = true;
  });
};

export function start(root) {
  const params = new URLSearchParams(location.search);
  const by = (el, name, id) =>
    [...el.querySelectorAll(`input[name="${name}"]`)].find((input) => input.dataset.id === id);
  for (const form of within(root, "form[data-prefill]")) {
    const select = form.querySelector('select[name="plan"]');
    const option = select && [...select.options].find((one) => one.dataset.id && one.dataset.id === params.get("plan"));
    if (option) {
      const before = select.selectedIndex;
      select.selectedIndex = option.index;
      undo.push(() => {
        select.selectedIndex = before;
      });
      const what = { "day-pass": "day-pass", office: "office" }[option.dataset.id] ?? "join";
      const reason = !params.get("for") && by(form, "for", what);
      if (reason) check(reason);
    }
    const reason = params.get("for") && by(form, "for", params.get("for"));
    if (reason) check(reason);
    const room = params.get("room") && by(form, "room", params.get("room"));
    if (room) check(room);
  }
  for (const plan of within(root, "[data-plan]")) {
    const input = [...plan.querySelectorAll("[data-plan-picker] input")].find(
      (one) => one.dataset.id === params.get("plan"),
    );
    if (input && !input.checked) check(input);
  }
}

export function stop() {
  for (const step of undo.reverse()) step();
  undo = [];
}
