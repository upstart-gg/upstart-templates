// The gift card fills in as you type: the request form ([data-gift-form]) copies the
// amount chosen and the two names into the drawn card's slots ([data-gift-card]
// [data-slot="amount"], "for", "from"). They are the visitor's own words; an empty
// field shows the card's sample word again. Nothing moves. stop puts the sample words
// back and removes its listeners.
let undo = [];

export function start(root) {
  const forms =
    root === document
      ? [...document.querySelectorAll("form[data-gift-form]")]
      : [root, ...root.querySelectorAll("form[data-gift-form]")].filter((el) => el.matches?.("form[data-gift-form]"));
  const card = document.querySelector("[data-gift-card]");
  if (!card) return;
  const slots = Object.fromEntries([...card.querySelectorAll("[data-slot]")].map((slot) => [slot.dataset.slot, slot]));
  const samples = Object.fromEntries(Object.entries(slots).map(([key, slot]) => [key, slot.textContent]));
  for (const form of forms) {
    const fill = () => {
      const chosen = form.querySelector('input[name="amount"]:checked')?.value;
      const other = form.querySelector('input[name="other_amount"]')?.value.trim();
      const amount = chosen === "other" ? (other ? `$${other}` : "") : chosen ? `$${chosen}` : "";
      const values = {
        amount,
        for: form.querySelector('input[name="for_name"]')?.value.trim() ?? "",
        from: form.querySelector('input[name="from_name"]')?.value.trim() ?? "",
      };
      for (const [key, slot] of Object.entries(slots)) slot.textContent = values[key] || samples[key];
    };
    form.addEventListener("input", fill);
    form.addEventListener("change", fill);
    fill();
    undo.push(() => {
      form.removeEventListener("input", fill);
      form.removeEventListener("change", fill);
    });
  }
  undo.push(() => {
    for (const [key, slot] of Object.entries(slots)) slot.textContent = samples[key];
  });
}

export function stop() {
  for (const step of undo.reverse()) step();
  undo = [];
}
