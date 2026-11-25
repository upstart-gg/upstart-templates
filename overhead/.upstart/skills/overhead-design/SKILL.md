---
name: overhead-design
description: The Overhead template's design notes — read before changing this site's pages, sections, styles or lists.
---

# Overhead's design

A floor seen from above on drawing paper: fine graphite lines, prices and facts in plain sight, and one color, a window cyan, kept for light. What is lit is what a plan opens, the floor that is ours, the room pointed at. The plan is the page's moment; everything around it is quiet, and nothing waits for it.

## Type

- **Castoro** for headings, prices, days and quotes: sentence case, 400 in headings, 500 in `.title-small`, `.form-part` and figures, 600 in the wordmark, italic in `.quote` only. `.title-hero` (clamp 2.75 to 5.5 rem, line height 1.02), `.title-page` (2.5 to 4.25 rem, 1.04), `.title-section` (2 to 3.25 rem, 1.08), `.title-small` (1.375 rem, 1.22). Its own figures are old-style: a price or a day has `.figures`, which sets them lining, as the wordmark and `.title-small` do.
- **Reddit Sans** for the rest: 400 at 1.0625 rem, line height 1.625; 500 in the navigation, 600 on buttons (1 rem), field legends (0.9375 rem) and names. `.body-copy` is the current color at 80%.
- **Reddit Mono** (`.mono`, 0.8125 to 0.9375 rem) for what a newcomer looks up: hours, addresses, rates, dates, states, captions, the plan's labels (0.75 rem, 0.6875 rem on a small drawing), the directory. Never for a sentence that is read rather than looked up.
- A person's name is a heading in Reddit Sans 600 at 1.25 rem: `.person-name`. Castoro has no Vietnamese, so a name is never set in it.
- No uppercase, no label above a section's heading (the hero's alone has one).
- The three fonts are files in `fonts/`, declared in `styles/site.css`.

## Colors and shapes

- Paper (`base-100`) for the page; board (`base-200`) for alternate sections, the picker and the panels beside forms; maple (`secondary`) for the events band, the evening-hire bands, date blocks and initials; cyan (`primary`) for light, main buttons and the closing band of a page; raspberry (`accent`) in two places only, the dot of the elevator's door and the "Waitlist" tag; the night (`neutral`) for the closing band of the home page and the footer.
- Cyan is a ground or a line, never text on paper, board or maple. Text on cyan is full ink; text links are ink underlined 2 px in cyan (`.text-link`, `.reading a`), on cyan ground when hovered.
- `--lit`, a lit room, is 45% of the primary over the paper; a pointed or focused room takes the primary itself. Both are made from the theme in `styles/site.css`, so the Theme tab relights everything. `--furniture` is the ink at 55% over the paper.
- Corners 0.25 rem everywhere, no shadow, no gradient, no texture; the rules between rows are 1 px, the plan's outer walls 1.5 px. Field edges are ink at 60%; `.choice` is a radio or checkbox as a card, lit when chosen.
- Main button: `btn-primary`, with an ink edge; `btn-neutral` on cyan and maple; `btn-outline` for the second one, which fills with ink on hover.
- `.ticks` is a list whose marks are small lit windows; `.plan-row-featured` the lit row of the plan most asked for, said in plain type, never a badge.
- Focus rings are 2 px in the current color, 3 px off (ink around a button, paper on the night); 2 px inside a row that is full width.
- Photos are rectangles with `rounded-box`, in daylight, on brick, wood and paper tones, no filter; no person but the team. Those of the rooms show one floor: generated ones are made with `media/river-room.webp` as their reference.
- The rhythm of a section: `mx-auto max-w-[84rem]`, `px-5 py-20 md:px-8 md:py-28`. The header is 4.5 rem high, sticky, paper at 95%: a section a link leads to has `scroll-mt-24`.

## The plan

- `{% render 'plan', uid: 'here' %}` draws the floor from `zones`, in feet, in two drawings: wide, and a quarter turn round under 640 px. `uid` must differ for each plan on a page (the ids of its clip paths). `only: zone.id` draws a small still copy with that room lit; `still: true` leaves out the prices, the meeting rooms' furniture and the line at the door; `then: true` draws the empty hall.
- The building is the assigns at the top of `parts/plan.liquid`: `width`, `depth`, `windows` (which walls), `columns_x`, `columns_y`, `core` and `lockers` (x y w h), `entrance_x`, `entrance_y` (the elevator's door, where the lights start).
- A room's furniture follows its `kind` and `seats` (`parts/plan-furniture.liquid`): desks of 5 by 2.5 feet, a table and its chairs, booths 4 feet deep, a counter and a long table. Its door is drawn open for `free` and `free from`, shut otherwise. The label's place is left free, at the top of the room's box (at its foot for fixed desks), so a room needs some 8 feet more than its furniture. A room under 18 feet wide hides its price on a small drawing, one under 10 feet deep always.
- The drawing is hidden from screen readers: the list of rooms under it says everything, so a plan never goes without it, except the small copies.
- A section has the whole behavior with `data-plan` on it, `data-plan-picker` on the element that holds the plans' labels, `data-plan-details` on the element that holds their details in the same order (`data-plan-detail`), `data-zone-row` with a room's id on each line of the list. The rooms a plan opens are the names in its `zones` list.
- Picking is the stylesheet's work, with `:has()`: eight plans at most, the ninth would light nothing. A browser without `:has()` shows every plan's details and lights no room.
- **The lights** (`scripts/plan.js`, Motion): the rooms a plan opens come on one after another, 80 ms apart, by the distance of their nearest corner from the elevator's door; each one's light spreads from that corner, a circle growing in 0.5 s (`[0.22, 1, 0.36, 1]`). Once as the plan comes into view (35% of it), then for the newly lit rooms at each change of plan; a room going dark fades in 0.2 s. A room under the pointer takes the primary in 150 ms; a line of the list pointed at or focused lights its room, a room pointed at marks its line, a click on it opens the line.

## Other movement

- **The front** (`data-front`, CSS): our floor's windows switch on one after another as the page opens, 0.3 s each, 90 ms apart, from 0.4 s. `parts/front.liquid` takes `facts: true` (the facts beside their floors) or `night: true` (still, on the night); its building is the assigns at its top: `floors`, `our_floor`, `bays`, `look` (`old`, `storefront`, `modern`). Its facts say only what is true at that floor.
- **The walk** (`data-carousel`, `data-carousel-viewport`, `data-carousel-prev`, `data-carousel-next`, `data-slot`; `scripts/carousel.js`, Embla): dragged, from the left edge, no loop, never on its own; its buttons fade to 40% at the ends. The figures are the script's, the words the page's.
- **Reveals** (`data-reveal`, `scripts/reveal.js`): 16 px up in 0.7 s; `data-reveal="stagger"` for children 70 ms apart. On four sections only: the walk, the two rooms, the events band and the members' words. Never on the plan or the front.
- **Smooth scrolling** (`scripts/smooth-scroll.js`, Lenis, lerp 0.12, wheel and trackpad only); links to `#plan`, `#visit` and `#ask` on the page glide there, under the header.
- **Prefilled forms** (`data-prefill` on the form, `data-id` on each option, `scripts/prefill.js`): `?plan=` picks the plan in the visit form and in the picker, `?for=` what the visit is for (`tour`, `day-pass`, `join`, `office`), `?room=` the room. The phone's menu closes when one of its links is followed (`scripts/menu.js`).
- No page transitions, no loader, no WebGL, nothing that follows the clock: no "open now", the hours are stated. Under reduced motion and in edit mode everything is lit and in place.

## Lists

- `zones` (`kind`: hot desks, fixed desks, office, meeting room, phone booths, kitchen; sorted by `order`), `plans` (`zones` are rooms' names, letter for letter), `events` (a page per record, `/events/<id>`, sorted by `date`), `gallery`, `testimonials`, `members`, `team`, `hours`, `navigation` (`place`: both, header, footer, social); section lists `plans-included`, `plans-steps`, `floor-rules`, `plans-faq`, `rooms-faq`, `floor-week`, `getting-here`, `access-notes`, `visit-faq` (by `topic`).
- A room's `state` is first come, free, free from, few left, taken or waitlist (which adds the tag), said in `state_note`; `image` shows in the list under the plan. A meeting room also has `summary`, `equipment`, `hour`, `half_day`, `day_rate`; it shows by itself on the home page, `/rooms` and the form.
- An event's `open` is everyone (with the form on its page) or members; `booking` adds "Get tickets" and takes the form's place; `price` empty shows none. A member's `link` is optional; they choose to be listed. `featured` marks one plan only.
- `collected` lists: `visits`, `room-requests`, `rsvps`, each answered by its fragment. A choice added to a form goes in its `_datasource.yaml` too.

## Rules for the website's whole life

- The same fact says the same everywhere: a plan's price in `plans`, on its rooms and on the front; an office's state in `zones`, in the walk's caption and under the plan, whose date is retyped with each change; an event in `events` and in `floor-week`.
- One cyan band at most on a page, its closing one, and one night band besides the footer.
- No count of members, desks left live, stars, awards or partner logos; no name in the directory without its owner's yes.
- The header's links stay on one line from 1216 px; more links than five go to the footer only (`place: footer`).
