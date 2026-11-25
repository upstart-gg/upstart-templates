---
name: ruled-design
description: The Ruled template's design notes — read before changing its pages, sections or styles.
---

# Ruled's design

A course read like the syllabus handed round on its first evening: ink on paper, rules where other sites have boxes, and one highlighter. It is still. Its life is its type, its rhythm, its marks, and the syllabus that lights its evenings where the visitor points.

## Type

- **Gelasio** for headings, the second voice and every column of figures. `.title-hero` (500, clamp 2.75 to 5.75 rem, line height 1.03, -0.012 em), `.title-page` (500, clamp 2.5 to 4.5 rem, 1.05, -0.012 em), `.title-section` (500, clamp 1.875 to 3 rem, 1.12), `.title-small` (600, 1.375 rem, 1.25), `.wordmark` (600, 1.375 rem). Sentence case, balanced lines.
- **The second voice is Gelasio's italic** at 400: `.second-voice` (clamp 1.25 to 1.625 rem) for the line under a page's title, `.first-line` (clamp 1.5 to 2.25 rem) for an essay's first line, the teacher's quote and the notes between rules. The first essay is larger (clamp 1.875 to 3.25 rem), the quote clamp 1.625 to 2.625 rem. A book's title is in this italic (`<i class="serif">`), an essay's in quotes. No italic word inside a heading.
- **Figures**: old-style in running text and headings, as Gelasio draws them; `.figures` lines them up (lining, tabular) for the prices, the years and the form's numbers; `.numeral` (400, 2.75 rem, pencil) for the numbers of weeks and lists. Mulish has no tabular figures: a column of figures is always Gelasio.
- **Mulish** for the rest: 400 at 1.0625 rem, line height 1.7. `.body-copy` is the ink at 80%, `.measure` 64ch, `.small` 0.9375 rem, `.facts` 600 at 1 rem, buttons 700 at 1 rem. `.pencil-label` (600, 0.8125 rem, 0.01 em, pencil) goes above a heading or under a photo (`font-normal` there), in sentence case, never spaced capitals. daisyUI already has a `.label`: do not use it for this.
- A small heading in Mulish takes `.sans`. No text is set lighter than `/70`, in ink or on the second sheet.
- Both fonts are files in `fonts/`, declared in `styles/site.css`.

## Colors and shapes

- Paper (`base-100`) for every page; the second sheet (`base-200`) for the form's aside, the tuition card's side and the footer; ink (`base-content`); pencil (`accent`) for labels, week numbers, the calendar's times and its days outside the course, captions; the rules are `base-300`, and a section opens under an ink rule (`border-t border-base-content pt-6`).
- The highlighter (`primary`) is a fill behind ink, never text, never a line that must be seen alone, never a section's ground, never on a dark surface. The wash (`secondary`) is its lightest pass: the session days at rest, the waitlist band, the pay-what-you-can note, a chosen card. `--pressed`, made from the primary in `styles/site.css` (5.5 points darker), is the highlighter under the pointer.
- Corners are 0.25 rem, no shadow. A photo is a rectangle with `rounded-box`; the hero's runs the page's whole width, `21/9` (and at most 56% of the screen's height) from 768 px, `4/3` below.
- `btn-primary` is the highlighter in a 1 px ink edge, pressed under the pointer; `btn-outline` fills with ink. `.choice` is a radio or checkbox card: the wash and an ink edge once chosen. Field edges are ink at 60%.
- The rhythm of a section: `max-w-[80rem] px-5 pb-24 md:px-8 md:pb-36`; a page's first section sets its own top. Readings, notes and note pages sit in `max-w-[56rem]`, except the notes' list.

## The mark

`<span class="mark">…</span>` behind a phrase: the highlighter from 18% to 90% of the line, its ends cut by `styles/mark.svg`, clone across lines. In a markdown field of a `.marks` box (the evening's lines), bold is the mark. One a section at most: to mark another phrase, unmark the first. It stands on a phrase of two to four words, never on a whole sentence, and it is never animated.

Links are ink over the same highlighter: `.link-mark`, or `.marked-links` around a markdown text, a band of 0.32 em under the letters' lower half, 0.62 em on hover and focus (150 ms), never a full ground. The header's links (`.nav-link`) take the band on hover and on the page's own section.

## The linked syllabus

- `data-syllabus` goes on the section that holds the weeks and their calendar, `data-week="2"` on week 2's row and on each of its days. The stylesheet lights every element of a week when any one of them is hovered (devices that hover), focused or targeted by the address. Lit: a day is filled with the highlighter and its figure turns 700; the week's title (`.week-name`) takes the mark, its number (`.week-number`) and its rule (`.week-body`) turn ink; the day under the pointer is pressed. 150 ms, `ease-out`; weights change at once.
- The rules are written out for weeks 1 to 16. For a longer course, add a line per week in the two lists of selectors of `styles/site.css` ("Lit: one rule a week", and its `:hover` twin under it): `[data-syllabus]:has([data-week="17"]:is(:focus-within, :target)) [data-week="17"]` and `[data-syllabus]:has([data-week="17"]:hover) [data-week="17"]`.
- A day links to `#week-2`, the row's `id`; a row's title links to the week on `/syllabus`. One linked syllabus a page.
- `parts/cohort-calendar.liquid` draws whole weeks, Monday first, from the Monday on or before the first date to the Sunday after the last; pass `weeks`. A day's word is what its session's title says before the colon ("Talk: What an essay is for" reads "Talk"): keep that word short, "Workshop" is the longest that fits beside the weeks. A due day carries an ink tick and no wash. The calendar is beside the weeks from 1024 px, above them from 768 px, hidden below: every date is also in the rows, and must stay there.
- On `/syllabus` the calendar is sticky from 1024 px.

## Other states

- Transitions are 150 ms on colors, borders and the links' band, inside `prefers-reduced-motion: no-preference`; without them each state appears at once. No reveal, smooth scrolling, load animation, page transition, parallax, sticky header, library or script: this website has no `scripts/` folder, and gets none.
- Questions are `<details>` (`parts/question.liquid`; `number` numbers them): plus becomes minus, the answer appears with no height animation.
- The focus ring is 2 px of ink, 3 px away, on paper, the sheet, the wash and the highlighter alike; a card takes it around itself; a field takes a 2 px ink edge. No transition on any.

## Lists

- `.ruled` draws its children's rules, first to last; `.ruled-beside` drops the first one from 1024 px, for a list beside a heading under the same ink rule. `.leader` is the dotted line to a figure. Items have no bullet, icon, tick or cross.
- A date is never printed by itself: `{% render 'date', on: cohort.starts, form: "short" %}` (forms: day, short, short-year, long, long-year, weekday, month). A site in another language changes the date there, and the calendar's `heads`.
- `cohorts`: `status` is enrolling, waitlist, full or later. `places_left` writes "5 of 14 places left"; 0 makes the hero say the cohort is full and offer the waitlist; empty says nothing. `closes` and `opens` show when filled. `days` is short for the facts line ("Tue & Thu"), `schedule` the same in full, with the time and zone. Sorted by `starts`.
- `weeks`, sorted by `number`: `time` is the calendar's ("7 pm"); any date may stay empty; `readings` holds titles as `readings` writes them. `readings` belongs to a week by its number.
- `home-fit`'s `side` is for or not; `navigation`'s `place` both, header, footer or social.
- A form's cohorts are the records' names, so a new cohort needs no change in `requests` or `waitlist`.
- The next season: change the statuses and dates of `cohorts`, then the dates of `weeks`.

## Rules for the website's whole life

- Nothing follows the clock: no "this week", no "today", no countdown, no count of anything but the places left.
- The header's button, and one at the foot of every page or in its footer, say the same words.
- Proof is what past cohorts wrote, with their permission: no stars, faces or praise without a name.
- Photos are cool, clear daylight, paper and wood: no laptop, typewriter, candle, quill, coffee beside a keyboard or handwriting font, and no filter. No one recognizable but the teacher.
- No seal, badge, gradient, texture, icon set or second color.
