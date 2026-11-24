---
name: spindle-design
description: The Spindle template's design notes — read before changing this site's pages, sections, styles or lists.
---

# Spindle

A neighborhood restaurant read like its own counter at five to eleven: the name huge on enamel turquoise with a plate of food standing in front of it, the day's specials typed on tickets that hang from a steel rail, and the week as a staff time card. Lit by daylight, neighborly and practical; it reads no clock and nothing on it is marked today.

## Type

- Alfa Slab One (`font-heading`, its one weight, no italic) for the name, headings, small headings and large prices, in sentence case; the hero's name alone is uppercase, by CSS. `section-title` is `clamp(2rem, 3vw + 1rem, 3.25rem)` at line height 1.02, `page-title` `clamp(2.75rem, 5vw + 1rem, 5rem)`, `small-title` 1.375 rem (a course, a room, a person, a way to come), the hero's line under the name `clamp(1.75rem, 2vw + 1rem, 2.75rem)`, the wordmark 1.625 rem.
- Karla for everything read: 1.0625 rem, `body-copy` (80% of the ink) in lines of about 62 characters at most; dish names 700, a dish's description in italic at 0.9375 rem, buttons 700 at 1 rem. `label-caps`: Karla 600, uppercase, 0.8125 rem, spaced 0.08em.
- A heading in Karla takes `font-body`, one in Cutive Mono `typed`: rules at the foot of the stylesheet, outside the layers, carry them over the heading face.
- Cutive Mono (`typed`, 400 only, never bold: `font-synthesis: none`) for tickets, times, prices and what the regulars are signed with.

## Color and shape

- Cream (`bg-base-100`) for most of a page; the menu card's color (`bg-base-200`) for the two menus, the forms' grounds and the pickup strip; diner turquoise (`bg-primary`, text in booth ink) for the hero's field, buttons, the featured dishes, the fish fry and the time card's band and rules; milk glass (`bg-secondary`) for the wall behind the rail; booth teal (`bg-neutral`) for the private hire band, the booth form's panel and the footer.
- Turquoise is never small text, and cream on turquoise is only the hero's name. Paprika (`accent`) is a mark: "Special" and "86" on the tickets, "Closed" on the time card; never on turquoise or booth teal. The diet marks (`diet`) are paprika mixed with 18% of the ink, so that they read on the menu card.
- Links in text are `link-ink`: the text's own color over a 2px turquoise underline (its own color on turquoise). The main button is `btn btn-primary`, the other `btn btn-line` (an outline in the text's color).
- Fields, buttons, photos and panels have 0.5 rem corners; tickets, the time card and the menus are square. No relief (`--theme-depth: 0`). Tickets and the time card cast one flat shadow (0.375 and 0.5 rem, the neutral at 12%); cut-out dishes a soft one (the neutral at 30%).

## Effects, and what turns each on

- **The name** (`.name` inside `.name-stage`): fills its container's width from `--name-em`, set in the hero section's `style` with `--lines`: the width in ems of its longest line, less 0.015 a letter for the tracking. In Alfa Slab One: A 0.81, B 0.78, C 0.72, D 0.80, E 0.71, F 0.63, G 0.78, H 0.84, I 0.42, J 0.67, K 0.83, L 0.65, M 1.14, N 0.94, O 0.79, P 0.74, Q 0.81, R 0.80, S 0.67, T 0.78, U 0.78, V 0.79, W 1.21, X 0.80, Y 0.78, Z 0.69, space 0.30, apostrophe 0.21, period 0.24, hyphen 0.39, & 0.83; an accent adds nothing. Kerning takes a little off it (an A beside a V, a W or an apostrophe): Halina's adds up to 5.23 and is set at 5.11. The size is 99% of the width over that sum, 40% of the width at most, so a name of two or three letters stays shorter than the line. The plate shares its grid cell (`col-start-1 row-start-1`, at its foot), in front, pulled over the field's edge by a negative margin in `cqi`; `name-dish` starts it at 0.31 em of the name's last line, 0.62 below 48 rem, whatever the name's size. The field clips what would pass its sides (`overflow-x-clip`).
- **The plate's drift** (`data-dish`, CSS only): as the plate leaves the screen it moves up by 12% of its height (`animation-timeline: view()`, `exit 0%` to `exit 100%`). Only the `to` keyframe is written, so it rests where the classes put it. `data-cutout` gives any other cut-out dish the same soft shadow, with no movement.
- **The ticket rail** (`data-rail` on a `<ul>`, `data-ticket` on the paper inside each `<li>`; `parts/ticket-rail.liquid`, pass `items`): the stylesheet draws a length of rail over each `<li>` (1.75 rem high, its steel made from the theme, a bracket at each end of a row; a last row that is not full keeps its bar whole), 2 tickets a row, 3 from 48 rem, 6 from 80 rem; a ticket's top 0.75 rem is hidden behind the rail. `scripts/rail.js` slides each ticket in from its row's left end and 24px beyond, in reading order, 120 ms apart, 0.7 s each, faded in over 0.25 s, with a two-pixel dip (0.18 s) as it lands, once 40% of the row is in view; rows that come into view together follow one another. Tickets hang plumb: no swing, no tilt, no hover.
- **86** (`data-gone` on a ticket, from the record's `gone`): the dish struck through with a 2px paprika line, the other lines at 70%, and the strip `data-86` shown across the foot. The strip's text is in `parts/ticket-rail.liquid`.
- **The time card** (`data-time-card`, `"large"` on `/visit`; `parts/time-card.liquid`, pass `days` and `size`): a table, still.
- **Reveals** (`scripts/reveal.js`): `data-reveal` on an element, `data-reveal="stagger"` on a list, whose children rise 16px, 70 ms apart, over 0.7 s. Used on the regulars, the two menus, the seating notes, the rooms and the people; never on the rail.
- Nothing scrolls smoothly, nothing scrolls sideways, no page transitions, no loader. Under reduced motion and in edit mode every ticket hangs in its place.

## Lists

- `specials`, the rail on the home page and on the menu page, in the order the maker drags them: `dish`, `line`, `price` (text, "$5 / $8"), `service` (lunch, supper, all day), `window`, `note`, `gone` (86).
- `menu`: `service` (lunch, supper, both) puts a dish on one card or both; `course` (starters, mains, sides, desserts, pastries, drinks) groups it, under the names of `parts/course-name.liquid`; `tags` become V, VG and GF; `featured` with an `image` puts it on the home page's turquoise band.
- `hours`: `lunch` and `supper` are the time card's shifts (empty prints "Closed"), `note` prints under the shift that runs, or after "Closed" on a day with neither; `hours` is the same day as one line, for blocks added later.
- `fish-fry`, `home-services`, `testimonials` (with `stool` and `usual`; the first is set large), `team` (initials on turquoise until there is a `photo`), `gallery`, `reserve-features`, `reserve-faq`, `pickup-steps`, `pickup-faq`, `private-plans`, `private-tasting`, `private-steps`, `private-faq`, `getting-here`, `visit-faq` (grouped by `topic`), `navigation`.
- Collected: `bookings`, `pickup-orders` and `private-hire`, each answered by its fragment.

## Rules for the site's whole life

- A dish on turquoise or in front of the name is a cut-out: a PNG or WebP with a transparent ground, seen from a low three-quarter angle.
- The specials are what the kitchen wrote up this morning: never invent one, and never make the rail read the clock.
- A day's `hours` says the same as its `lunch` and `supper`.
- One milk-glass wall behind a rail, one turquoise band below the hero and one booth teal band above the footer, a page at most (the menu page's pickup band is milk glass too).
- A regular is signed with a stool and a usual: no stars, no scores.
- No chalkboards, gingham or checkered paper, candles, overhead flat-lays, steam, a map or a review widget; no "open now".
