---
name: heats-design
description: The Heats template's design notes — read before changing its pages, sections or styles.
---

# Heats's design

An open project's datasheet, drawn as an engineering sheet on graph paper: cool, exact, its figures first. It shows its work (the index, the heats, the ledger) and invites the visitor to check it. One thing moves, the heats; everything else is quiet.

## Type

- **Besley** for headings (500, sentence case: `.title-hero` at `clamp(2.5rem, 3.6vw + 1rem, 4.25rem)`, `.title-section` at `clamp(1.875rem, 2vw + 1rem, 2.875rem)`), small headings (`.title-small`, 1.25 rem, 600), model names (`.model-name`, `clamp(1.5rem, 1.6vw + 1rem, 2.25rem)`, 600; a model card's name is `.title-hero` in 700), big figures (`.figure-large`, 600, tabular) and the wordmark (`.wordmark`, 700). Never lighter than 400. Its italic only for figure and table captions (`.caption-italic`, 1.0625 rem).
- **Source Sans 3** for reading: 1.0625 rem, `.body-copy` (64ch, 80% ink); long texts in `.reading` at 1.125 rem (64ch, 85% ink); buttons 600 at 1 rem.
- **Victor Mono** for commands (`.command`, 0.9375 rem, 500), figures (`.mono`, 500, tabular) and spec labels (`.spec`, 0.6875 rem, 600, uppercase, spaced 0.08em), ligatures off. Its cursive italic (`.comment`, 0.9375 rem, 400) only for a command's comment and a table's footnote.
- The fonts are files in `fonts/`, declared at the top of `styles/site.css`.

## Colors and shapes

- Graph paper (`base-100`) for the page, its grid drawn by the stylesheet from the border color: a major line every 40 px, a minor one every 8 px at half strength. Reading sections keep the major lines only (`.calm`). Vellum (`base-200`) for tables, title-block cells, forms and the machines' photos. Ink for text. Blueprint blue (`primary`) for the project's own bar, buttons, links, the index on hover. The wash (`secondary`) for one light band per page. The blueprint ground (`.ground`, `neutral` with its own grid at 10%) for the run strip, the report's band, the sponsor form and the footer.
- Redline (`accent`) is a mark, never text: the leader's tape and the revision's triangle (`parts/rev-mark.liquid`), on graph paper or on the ground, never on vellum. Nothing else takes it.
- On the ground, links and commands take the light text, the wash on hover, buttons `.btn-paper` and `.btn-paper-outline`; blue would not read there. On the wash, links are ink (`.text-link-ink`).
- The bars differ by pattern as well as color, set by a lane's `pattern`: `.pattern-solid` (blue), `.pattern-striped` (blue at 45°), `.pattern-ink` (ink at 50%). Fig. 1 adds `.pattern-ink-striped`, `.pattern-wash` and `.pattern-outline`.
- Corners are square, borders 1 px, relief off. Rules between rows are ink at 35%, frames ink at 50%.
- The plates (`.ink`, `mix-blend-mode: multiply`) are ink on the sheet, the grid showing through their white. Never put one inside an element that is revealed or transformed: its white would show as a box. On the ground a plate is inverted and screened (the sponsor form).

## Movement

- **The heats** (`data-heats` on the section, `data-heat` on each heat with `data-better`, `data-lane` on each lane with `data-figure`, `data-lane-bar`, `data-lane-figure` and `data-lane-tape` inside; `scripts/heats.js`, Motion). In CSS a bar's length is `--v / --scale`, written by Liquid on the lane, so it is complete with no script; `data-lead`, set by Liquid on the best figure, shows the tape (2 px of redline at the bar's end). In visitor mode the bars wait at zero and the figures and tapes at opacity 0; as 40% of a heat shows, after 0.15 s its bars leave together: 0.8 s for the best figure, 0.22 s more per place, ease [0.3, 0, 0.2, 1], tied figures together. Each figure shows as its bar arrives (0.18 s); the tape drops in once the leader has finished (0.2 s). The order follows the figures, never a choice in the script: a heat the project loses is lost on screen. `data-heats-rerun` on a button runs the section's heats again, 0.12 s apart; reduced motion hides it.
- **The run tabs**: daisyUI's radio tabs (`.run-tabs`), no script, each set with its own `name`. `data-run-tabs` on a set (`scripts/run-tabs.js`) keeps the picked tab's label in `sessionStorage` and checks the same label in every other set, on this page and the next.
- **Copy** (`data-copy` on the button of `parts/copy-button.liquid`, inside a `data-copy-from` element that holds one `<code>`; `scripts/copy.js`): copies the code, sets `data-copied` for 1.6 s, and the stylesheet swaps the two labels.
- **Reveals** (`data-reveal`, `data-reveal="stagger"` for children 60 ms apart; `scripts/reveal.js`): 16 px over 0.6 s, ease [0.22, 1, 0.36, 1], once 10% shows. With `data-index` (the index, the report's contents) 12 px over 0.5 s.
- Hover and focus, 150 ms: an index row's name and rules turn blue and its arrow moves 4 px (`.index-row`).
- The header is sticky on the paper at 92% with a hairline, and never changes. No smooth scrolling, no page transitions, no figure counting up, nothing following the clock. Under reduced motion and in edit mode every bar stands at its length, every tab set on its first tab.

## How the lists work

- A heat needs `scale`, its track's full length: a number above every figure that divides by four, for the four ticks. A figure left empty shows a dash and no bar.
- A lane added to `lanes` needs a figure of its own in `heats`: a new number field, named in the lane's `lane` choices.
- `models` is in the index's order. `files` are written "name · size · note"; `memory` "precision, amount"; `ollama` "name:size", its size also naming `dunlin-lm`'s. A column of `machines` reads the field named after the model's id, with underscores.
- A model card is split at its `##` headings into the contents list and the sections; on the featured model the home page's heats come before the heading that contains "valua" (Evaluation, Évaluation, Evaluación).
- The time-zone ruler runs from UTC−8 to UTC+9 and puts every second person above the line, the others below: two people on the same side need three hours between them, or the order of `maintainers` changed. A wider span needs the 17 of `.ruler-tick` and `.ruler-mark` in `styles/site.css` and the 8 and 17 in `parts/time-zones.liquid` changed.
- `releases` is newest first; a revision's sheet is its rank from the oldest.

## Rules for the website's whole life

- Every figure is the project's own run, with its method in the table's footnote. A benchmark joins both the heats and Table 1.
- One band of wash per page, and the ground for what is run or read on blueprint.
- No logo wall, no star counter or download count fetched live, no chat box or playground in the page, no gradient glow, sparkle or node graph, no "fully open": the ledger says it line by line.
- Nothing is drawn as a floor plan, and the lanes never change order.
