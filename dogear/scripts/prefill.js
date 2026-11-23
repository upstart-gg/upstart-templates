// Forms with data-prefill take what the link that led to them says: on /order,
// ?title=, ?author= and ?kind= (hold, order, signed), as every "Hold a copy" sends
// them; on /clubs, ?club= (a club's id, the option's data-id); on /gift-cards, ?amount=.
// It only writes into fields, moves nothing, and with no script the form is simply
// empty. stop puts the fields back as the page had them.
let undo = [];

function setValue(field, value) {
  const before = field.value;
  field.value = value;
  undo.push(() => {
    field.value = before;
  });
}

function check(input) {
  const before = input.checked;
  input.checked = true;
  undo.push(() => {
    input.checked = before;
  });
}

export function start(root) {
  const params = new URLSearchParams(location.search);
  if (![...params.keys()].length) return;
  const forms =
    root === document
      ? [...document.querySelectorAll("form[data-prefill]")]
      : [root, ...root.querySelectorAll("form[data-prefill]")].filter((el) => el.matches?.("form[data-prefill]"));
  for (const form of forms) {
    for (const name of ["title", "author"]) {
      const value = params.get(name);
      const field = form.querySelector(`input[name="${name}"]`);
      if (value && field) setValue(field, value);
    }
    for (const name of ["kind", "amount"]) {
      const value = params.get(name);
      if (!value) continue;
      const radio = form.querySelector(`input[type="radio"][name="${name}"][value="${CSS.escape(value)}"]`);
      if (radio) check(radio);
      else if (name === "amount") {
        const other = form.querySelector('input[type="radio"][name="amount"][value="other"]');
        const field = form.querySelector('input[name="other_amount"]');
        if (other && field && /^\d+$/.test(value)) {
          check(other);
          setValue(field, value);
        }
      }
    }
    const club = params.get("club");
    const select = form.querySelector('select[name="club"]');
    if (club && select) {
      const option = [...select.options].find((o) => o.dataset.id === club);
      if (option) {
        const before = select.selectedIndex;
        select.value = option.value;
        undo.push(() => {
          select.selectedIndex = before;
        });
      }
    }
    if (undo.length) form.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

export function stop() {
  for (const step of undo.reverse()) step();
  undo = [];
}
