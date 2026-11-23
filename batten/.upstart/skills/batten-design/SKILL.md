---
name: batten-design
description: The Batten template's design notes — read before changing its pages, sections or styles.
---

# Batten

A theater at night, seen from the house: a flat magenta portal that never moves, stage black inside it, and the season's scenery coming down from the flies on its pipes, one painted cloth in front of the last. Tall condensed capitals like a playbill's, a book face for everything said, muslin for the working pages (the program, the forms, access), and pictures in grays so that the house magenta stays the only flat color on the page.

## Type

- **League Gothic** for headings (h1 to h4 take it, uppercase, at 88 % width). `title` for the biggest lines, at 75 % width and tight leading: the hero `text-[clamp(3.75rem,11vw+1rem,12rem)]`, a page's title `text-[clamp(3.75rem,9vw+1rem,10rem)]`, a cloth's play `text-[clamp(3.75rem,9vw+1rem,11rem)]` with `max-w-[16ch]`. A section's heading `text-[clamp(2.5rem,4vw+1rem,4.5rem)]`. `gothic` for the condensed capitals at full width in links, tabs, dates and tags (1.25 rem in tabs and rails).
- **Spectral** for everything else: `body-copy` (1.0625 rem, at most about 62 characters a line), `intro` for a lead paragraph in its 300, `credit` and `label` in its 500 with small capitals (the authors and directors, the small labels above headings). `figures` for tabular numbers (prices, times, phone numbers). Never League Gothic for a sentence.
- `text-link` for links in a text: magenta, a 1 px underline set 4 px below; on muslin and magenta it takes the text's own color.

## Color and shape

- Stage black (`bg-base-100`) for most of the page, the house's dark (`bg-base-200`) for bars, tabs and lanes, flies black (`bg-neutral`) for the footer, the figures and the next cloth's window.
- Magenta (`primary`) is the portal: the header piece, the legs down both edges of every page (`--leg`, the body's own borders), the house footer's rule, the buttons, the bars of the season at a glance, "On now" and one band on the home page (`parts/subscribe-band.liquid`). Text on magenta is black (`text-primary-content`), never white.
- Muslin (`bg-secondary`) for the working pages: the program, the access table, the forms. Its fields are a darker muslin with black text. Pale magenta (`accent`) only marks: the access tags (ASL, AD, OC, RP), "In rep with", today's line, a bar under the pointer.
- No radius anywhere (0 rem), no shadows, hairlines in `base-300`. Buttons are magenta filled (`btn btn-primary`) or outlined (`btn btn-outline`), in League Gothic capitals.
- Every picture is in grays: `bw` on the image or its frame (`filter: grayscale(1) contrast(1.05)`). The cloths are paintings in grays under a black scrim at their foot, so that the white type on them reads.

## Effects, and what turns each on

Everything moves only under `prefers-reduced-motion: no-preference`; with no script, in edit mode and under reduced motion, every element is in place and complete.

- **The flies** (`scripts/flies.js`, `parts/flies.liquid`): `data-flies` on the season's section, `data-flies-stage` on what sticks, `data-cloth` on each production (an `article.cloth` with `.cloth-pipe` carrying `data-batten`, `.cloth-face` holding `.cloth-painting`, `.cloth-scrim` and `.cloth-texts`, and `.cloth-hem`), `data-flies-rail` on the list of cues. From 1024 px wide the section takes a screen per cloth (`data-flying`) and each part of the scroll flies one cloth in, in front of the last, landing at its trim and swinging; the cues on the rail scroll to their cloth. Below 1024 px the cloths stack, each complete. A cloth without a picture shows `weave` in its place.
- **A cloth flown in on load**: `data-fly-in="load"` on a `.cloth` (the home page's statement).
- **A cloth flown out by the scroll**: `data-fly-out` on a production's first screen (`parts/production-cloth.liquid`, `production-first`), which rises into the flies over the first 70 % of a screen.
- **The next cloth** (`parts/next-cloth.liquid`): `data-next-cloth` on a `.next-cloth-window`, the foot of the next production's cloth showing in a black window; it comes down a little under the pointer.
- **A new page comes down like a cloth**: the cross-document view transition in `styles/site.css`; the portal (`portal-header`, `portal-legs`) stays still, the old page dims, the new one flies in and swings. Below 768 px it only comes down.
- **What's on now** (`scripts/running.js`): an element with `data-opens` and `data-closes` (dates) gets `data-run` (`now`, `next`, `later`, `closed`) by the theater's day; inside it, each `.run-tag` with the matching `data-tag` shows. `data-tz` on the footer is the theater's time zone. On the season at a glance, `data-glance` with `data-starts` and `data-ends` places `.glance-today`.
- **The season at a glance** (`parts/at-a-glance.liquid`): Liquid works out each bar's `--from` and `--to` (0 to 1) from the dates and each month's width from its days; `data-slot` 1 and 2 put two plays in rep in halves of one lane.
- **Reveals** (`scripts/reveal.js`): `data-reveal` makes an element rise a little into view, `data-reveal="stagger"` its children one after another.
- **Smooth scroll** (`scripts/smooth-scroll.js`, Lenis), with anchors landing under the portal's header.
- **The statement** (`parts/hero.liquid`): `statement-key` underlines its last words in magenta.

## How the lists work

- `productions` holds the season, sorted by `opens`; `in_rep_with` names the other production's id, `stage` is a choice that the season at a glance reads as lanes. `cast` and `creative` are "Role / Name" lines, cut at " / ".
- `company` holds the ensemble (`group: ensemble`) and the staff (`group: staff`); a record without `photo` shows its initials on the weave.
- `navigation`: `place` puts a link in the header and footer (`both`), one only, the social links (`social`) or the header's button (`button`).

## Rules for the site's whole life

- One magenta band per page at most; the portal and its legs on every page; magenta is never a picture's color.
- White is never text on magenta; pictures stay in grays.
- Cloths only travel up and down, never sideways, never fade: they come down from the flies and go back up.
- Every production keeps its dates and its four access lines; every play's tickets go to the box office's own page, never an invented address.
- Labels on buttons and in tabs stay on one line (`whitespace-nowrap`).
