---
name: covered-design
description: The Covered template's design notes — read before changing its pages, sections or styles.
---

# Covered's design

A work tool's site for people who stand all day: sturdy, clear and warm, like a well-run back of house. It starts where its visitors are (the sheet on the walk-in door) and turns it, once, into the product. Everywhere else it is calm and useful, and nothing on it reads as a developer tool: no dark neon, no code, no terminal, no version numbers.

## Type

- **Geologica** for headings (600, the hero 700), the wordmark (800 with sharpness 60, `.wordmark`) and figures (`.figure`, tabular). Sharpness and cursive stay at 0 everywhere else. Sentence case, `text-balance`.
- **Golos Text** for the body (1.0625 rem, `.body-copy` for the measure and color), buttons (600, sentence case) and labels (`.kicker`: 600, 0.75 rem, uppercase, spaced). It has no italic: emphasis is 600.
- **Shantell Sans** (`.marker`) only on the tidy-up's paper, the manager's marker. Never on a heading or another section.
- Section headings use `.heading-section`, small headings `.heading-small`. No text below `text-base-content/70`; on jade, no smaller text below `text-primary-content/90`.
- The three fonts are files in `fonts/`, declared in `styles/site.css`.

## Colors and shapes

- Order-pad white (`base-100`) for the page and the product's cards; kraft-light (`base-200`) for the tidy-up, the pricing and the forms' panels; espresso ink for text; deep jade (`primary`) for the hero's panel, the closing band, buttons and links; pale jade (`secondary`) for the crew's panel, "Most asked for" and the Kitchen role; ticket coral (`accent`) only as a fill or a mark (the Counter role, a pending dot, a sticky note), never as text; espresso (`neutral`) for the footer, the phone and the toast.
- One jade band per page at most besides the hero: the closing band (`parts/closing.liquid`).
- Buttons are rounded rectangles like an app's (`--theme-radius-field`), not pills. On jade, `.btn-on-primary` (order-pad with jade text) and `.btn-line-on-primary`; elsewhere `btn-primary` and `btn-outline` in ink.
- Cards take `rounded-box` and the soft shadow made from the neutral (`.soft-shadow`); the theme's relief stays off.
- Links in text: `.text-link` (jade, underlined 1 px, 3 px offset).
- The proof line (`parts/proof.liquid`) sits under every trial button, with the same words each time.

## The product, built from the theme

The product is HTML parts filled by records, so the Theme tab and every edit restyle it with the site. Never a screenshot in a browser frame, never tilted or fanned.

- Inside the product: `.ui` (Golos at interface sizes, tabular figures), `.ui-title`, `.ui-meta`, `.ui-pill` (`-done`, `-wait`, `-plain`), `.ui-button` (a picture of a button, not a real one), `.initials`.
- A role keeps the same color everywhere (the week, the timesheets, the phone): `.role-kitchen` (pale jade), `.role-counter` (coral at 30%), `.role-coffee-bar` (ink at 8%), from the record's role with spaces as dashes. A new role gets its class in `styles/site.css`, mixed from the theme's colors. An open shift is `.chip-open` (dashed jade), "Can't work" `.chip-cant` (hatched), a free day in the draft week `.chip-free` (dashed, faint jade). The Schedule job shows the week after the tidy-up's as a draft (`ui-week` with `draft`): Monday to Friday copied, the weekend still to fill.
- The crew's phone is one flat phone (`.phone`), never tilted, never a fan of phones.

## Movement

Orchestrated: one moment, the tidy-up, on the home page; calm everywhere else. Keep it so, and keep each effect to its attribute:

- **The tidy-up** (`data-tidy` on the section, `scripts/tidy-up.js`, Motion): the paper (`data-tidy-paper`, `hidden` in the markup) over the clean week. The sheet (`data-paper-sheet`) and its day zones (`data-paper-day`), the tape (`data-tape`), the ring (`data-ring`), the crossings-out and arrows (`data-clutter`), each shift's scrawl (`data-scrawl="<shift id>"`) and sticky note (`data-note="<shift id>"`); in the week, each chip (`data-shift`), its frame and headings (`data-tidy-chrome`) and the toast (`data-tidy-toast`). Every word on the paper comes from the shifts' paper fields (`paper`, `paper_from`, `paper_note`, `paper_struck`); the script writes none. Until it plays, the paper shows and the week's chips, frame and toast wait at opacity 0 under it. It plays as soon as the stage enters the screen (`inView`, amount "some"), once, in about 2.5 s: the paper holds still 0.6 s to be read; at 0.6 s the crossings-out, arrows and tape go (0.3 s); from 0.8 s each scrawl fades and its chip flies to its slot, 35 ms apart (0.7 s, no scale); from 1.2 s each sticky note flies to the chip it asked for (0.8 s) and the chip fades in as it lands; from 1.0 to 1.8 s the sheet straightens and gives way to the card while the frame fades in; at 1.5 s the toast rises (0.5 s); from 2.0 to 2.5 s the coffee ring goes last. Everything has arrived by about 2 s, within the time a look waits for the page to settle. It never replays; there is no "Run again". Below 768 px it shows Friday to Sunday, by Tailwind's classes.
- **Reveals** (`data-reveal`, `scripts/reveal.js`): rise into view, used sparingly (the stories, the plans, the phone, the steps); `data-reveal="stagger"` for children 70 ms apart; `data-reveal="late"` for the hero's card, once the page has loaded. Never on every block.
- **One job at a time**: daisyUI's tabs on radio inputs (`.job-tabs`), no script; the new panel's piece rises 8 px (`data-panel-piece`, CSS).
- **The rail** (`data-tab-rail`, `scripts/tab-rail.js`): marks with `aria-current` the chapter that has reached a line just under it; on a phone, where the rail scrolls sideways, it brings the marked link into view.
- Hover: a chip lifts 1 px, buttons darken. The header is sticky and never changes on scroll.
- No smooth scrolling, no page transitions, no loader, no WebGL, no split text. Under reduced motion and in edit mode the page is complete and still: the clean week, the first tab open, the card in place.

## Lists

`shifts`, `crew`, `timesheets` and `swaps` fill the product, one edit changing the tidy-up, the tabs and the product page together. `jobs` fills the home page's tabs and the product page's chapters and rail. `plans` fills the home page's pricing and the pricing page (with `pricing-compare`, `pricing-included`, `pricing-faq`). `stories` fills the home page and `/customers`, with a page per record at `/customers/<id>`; `help-articles` fills `/help`, with a page per record at `/help/<id>`; `changes` is the changelog, newest first. Section lists: `home-figures`, `customers-figures`, `crew-points`, `crew-privacy`, `product-not`, `start-steps`, `start-promises`, `contact-ways`, `home-faq`, `navigation`. `trials`, `demos`, `support` and `newsletter` collect the forms, each answered by its fragment.

## Rules for the website's whole life

- Keep the tidy-up's before and after the same week: a shift added to `shifts` appears in both.
- No stock teams around a laptop, no "all-in-one", no AI sparkle section, no violet button, no screenshots in browser frames. No logos (customers', press, integrations', payroll services'), no store badges, no review stars, no chat widget.
- Customers are shown with their initials on jade until the maker has a portrait the person agreed to.
- The footer links only pages that exist.
