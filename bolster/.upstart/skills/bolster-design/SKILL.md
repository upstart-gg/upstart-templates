---
name: bolster-design
description: The Bolster template's design notes — read before changing this site's pages, sections, styles or lists.
---

# Bolster's design

A studio at six in the morning: a deep aubergine field, a chalk pink card left on the windowsill, and the classes lying on the floor as mats. It is warm and unhurried; the mats are the only thing that makes an entrance, and everything a visitor asks (what is on today, what it costs, how to start) is read without opening anything.

## Type

- **Imbue**, a condensed Didone with optical sizes, for names, titles and figures: `h1` to `h4` have it, `.display` gives it to anything else. Sentence case, upright. `.title-hero` (clamp 3.25 to 7.5 rem, weight 300, line height 0.95, −0.01 em), `.title-page` (3 to 6 rem, the same), `.title-section` (2.25 to 4 rem, 350, line height 1), `.title-small` (1.75 rem, 400, 1.1). On a class's mat `.mat-name` is 2.25 to 3.5 rem at 400 (to 5 rem in `data-mats="floor"`), in a session's row `.row-name` is 1.5 rem at 450; `.price` is 3 rem at 350, the offer's price 5 rem at 300. The smaller it is the heavier it is: under 1.5 rem, use Afacad.
- **Afacad** for the rest: 400 at 1.125 rem, line height 1.625. `.facts` (0.9375 rem, 500) for lengths, rooms, teachers and terms; `.eyebrow` (0.875 rem, 600, sentence case, never spaced out) for labels, also on a small heading; `.body-copy` is the ground's own text at 80%, 62 characters wide at most. Buttons, times and Book are 600 at 1 rem.
- Only the wordmark is in capitals (`.wordmark`: Imbue 600, 1.75 rem, 0.06 em). Italic is Afacad's, for a teacher's own line at the end of a biography, and nowhere else.
- Times are `tabular-nums`, right-aligned in their column (`.row-time`); a list of prices lines up by its right edge, with `.leader`'s dots before it in a one-line list.
- Arrows are drawn by `{% render 'arrow' %}`, `down: true` for a link within the page. Both fonts are files in `fonts/`, declared in `styles/site.css`.

## Colors and shapes

- `base-100` is the page, `base-200` the floor the week and the forms lie on, `primary` the aubergine field (header, page titles, the two ways to pay), `secondary` chalk pink (the offer, the warm floor, the front desk, initials), `accent` cork (the "counts as two" mark, today's dot, a tone), `neutral` night (the footer, a tone). No other color: a new section takes one of these grounds.
- **Tones.** `data-tone` on a mat, a chip or a class's title band sets `--tone` and `--tone-ink`: `plum` and `night` carry light text; `chalk`, `cork`, `heather` (chalk pink with 30% aubergine) and `pale` carry ink. `pale` is the floor's color, and the page's white where it lies on the floor (`.bg-base-200`). A class has one tone everywhere it is named; its sessions repeat it. `.tone-ground` paints an element with it.
- Cork is never text. On aubergine, links and labels are `text-secondary`, and a main button is `btn-secondary`; elsewhere it is `btn-primary`. The other button is `btn-line`, an outline in the text's color, on any ground. `.text-link` is aubergine on light grounds, chalk pink on the field and night, the text's own color on a mat and on chalk pink. The focus ring is 2 px of the text's color, 3 px away (a button's is its fill's color; on a mat that is a link and on a chip it lies inside).
- Cards, mats, photos and panels are `rounded-box` (0.75 rem), buttons, pills and one-line fields round; the textarea is `rounded-box`. Field edges are ink at 60%; `.choice` is a radio card, chalk pink when chosen. Rules are `border-base-300`, or the text at 20 to 40% on a colored ground. No gradient and no shadow on anything but a roll and the dock.
- A photo is in early daylight, cool windows over warm floors, people from behind, upside down or small; no filter. One laid over the edge of two grounds (the hero's card, a workshop's cover) is the only overlap.
- The rhythm of a section: `mx-auto max-w-[80rem] px-5 py-20 md:px-8`, with `md:py-32` on the page and `md:py-28` on the floor.

## The mats

A list of mats is a `<ul data-mats>`, one `data-mat` in each `<li>`; mats lie straight, never tilted, and are never hidden or faded by anything else (no `data-rise` on one).

- **A class's mat**, `data-mat="style"` with its `data-tone` (`parts/class-mat.liquid`): 3:1 from 48 rem, as tall as its content on a phone. `suits: true` adds whom it suits. `data-mats="floor"` lays the list at 92% of the width, pushed in by 0, 6, 2 and 8% in turn, with its text at 1.375 rem, from 64 rem.
- **A session's row**, `data-mat="row"` (`parts/session-row.liquid`): 3.5 rem, time, length, class, teacher, Book; `show_day: true` adds the day under the time. `.small-mat` makes a row that only names a class and leads to it.
- **A class's own mat** on its page, `.class-mat`, is 9% of the text's color into the band's tone.
- At rest a mat is its tone with a grip of 1 px dots every 6 px and an inner edge of 2 px at its foot, darker than the mat (lighter on night).
- **Unrolling** (`scripts/mats.js`, Motion): at 40% in view a mat opens from its left end behind a roll that thins from 2.5 to 0.375 rem, by the square root of what is left. A style takes 0.9 s, those arriving together 90 ms apart; a row 0.6 s, 50 ms apart, eight at most; a day picked again 0.45 s, 35 ms apart. Easing 0.3, 0.7, 0.2, 1. Each mat once, but for a day picked.
- On hover a class's mat rises 2 px and its `.mat-arrow` moves 4 px, in 0.2 s; a row's Book fills with the mat's ink, in 0.15 s.

## The week

- `data-week` on a section with its radios: `name="day"` (mon to sun, or all) and `name="kind"` (yoga, pilates, reformer, or all) show and hide `[data-day]` lists and `[data-kind]` rows in the stylesheet alone. A new kind needs its two rules beside the others there, and a `data-none` line in each day.
- `scripts/week.js`, with `data-tz` for the studio's time zone: today's tab and day name get `aria-current="date"` (a cork dot), today's classes already begun `data-past` (55%); `data-week="today"` opens the week on today. It writes no text. On a phone the home page's seven days share one line.
- `data-start` on the row is the session's 24-hour time, as `start` in `sessions` (`07:30`); `parts/time.liquid` writes it "7:30 am".

## The dock

`parts/dock.liquid`, last in `<main>`: the offer as a slim band, which `scripts/dock.js` turns into a small card kept 1 rem from the foot of the screen. It stays out while a `data-offer` is on screen and until the first one has left it above (without one, until the first screen has gone, or four fifths of a shorter page), rises 16 px in 0.4 s, and settles above the footer. Its cross hides it for the visit (`offer-dismissed` in the session's storage). A page with a large `data-offer` of its own, like `/new`, has no dock. Nothing else floats over the page, and nothing opens by itself.

## Other movement

- `data-rise` on a section's heading, text or photo: 24 px up and in as it enters (a scroll-driven animation in CSS on `view(0px)`, from `entry 0%` to `cover 30%`; the `0px` sets aside the foot kept for the dock). Not on the hero, a page's title, mats or forms.
- A question's plus turns 45° when it opens. No page transitions, no loader, no carousel, no split text, no smooth scrolling, no parallax. Under reduced motion, in edit mode and without scripts every mat lies flat, the week opens on the day its markup checks, and the dock is a plain band, or comes and goes at once.

## Lists

- `sessions` names its class (`class`, `class_id`), tone and kind as plain text, so a row needs no lookup; `class_id` is the class's file name and `teacher` a first name, the first word of the name in `team`: both tie a session to its class's page and its teacher's week.
- `plans` has three families: membership, pack, private. `workshops` has two kinds: workshop and retreat, one retreat at a time. The booking app's links live in records (`book`, `href`, `booking`), never in a part.
- The header marks the link whose first address segment is the page's.
