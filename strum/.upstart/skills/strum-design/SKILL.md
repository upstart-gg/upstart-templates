---
name: strum-design
description: The Strum template's design notes — read before changing this site's pages, sections, styles or lists.
---

# Strum's design

A school that is noisy in the best way, on flat bands of color with straight edges. The rules of its lists are strings: always there, full length, and they ring when a list arrives and when a hand crosses them. Everything else keeps still enough for a parent to book a lesson on a phone at a red light.

## Type

- **Shrikhand**, one weight (400), for headings and big figures only, never made bolder or more slanted: every `h1` to `h4` has it, and `.display` gives it to anything else. Sentence case. `.title-hero` (clamp 2.75 to 6.75 rem, line height 1.02), `.title-page` (2.75 to 5.25 rem, 1.02), `.title-section` (2.25 to 3.75 rem, 1.06), `.title-small` (1.625 rem, 1.16). A program's ages are 3 to 4.5 rem in the lists and 5 to 12.5 rem on its page; a concert's day 3 rem in the lists and 6 to 10 rem on its page; the wordmark 1.75 rem.
- **Lexend** for the rest: 400 at 1.0625 rem, line height 1.65. `.body-copy` is the current color at 80% (88% on tangerine); `.eyebrow` (500, 0.8125 rem, spaced 0.02 em) for labels, sentence case, in rust on paper and shade (`text-accent`) and in tangerine on night (`text-primary`); buttons 600 at 1 rem.
- A name, a step or a note's title is a heading in Lexend 600: `.plain-heading`. Shrikhand has no Vietnamese, so a person's name is never set in it.
- No italic, no uppercase, no figure alignment by `tabular-nums` (Lexend has none): a column of prices lines up by its cell.
- Neither font draws arrows: `{% render 'arrow' %}`, with `down: true` for a link within the page and `class: 'row-arrow-lg'` beside a large heading.
- Both fonts are files in `fonts/`, declared in `styles/site.css`.

## Colors and shapes

- Paper (`base-100`) for the page; shade (`base-200`) for alternate sections and the forms' panels; tangerine (`primary`) in flat bands, with ink text; apricot (`secondary`) for the rentals strip, the forms' aside, the chips and a teacher's initials; rust (`accent`) only as small text on paper and shade; night (`neutral`) for the strip, the concerts, a concert's top, the founders and the footer.
- Tangerine on paper is a fill, never text; on night it is fine for a date or a label. Rust never goes on apricot or tangerine. Text on tangerine is full ink, or `.body-copy`'s 88%.
- Bands are straight: no gradient, wave, diagonal or texture. Photos are rectangles with `rounded-box`, in daylight or warm stage light, close on hands and instruments; children appear in groups from afar, by their hands or from behind, never close and recognizable: an empty room with its instruments says as much.
- Main buttons: `btn-primary` on paper, shade and night; `btn-neutral` on tangerine and apricot; `btn-outline` for the second one (paper-colored on night, by the stylesheet). Pills, fields too; `.choice` for a radio or checkbox card, apricot when chosen. Field edges are ink at 55%.
- `.chip` is an apricot pill; `.text-link` an ink link underlined 2 px in tangerine (in ink on tangerine), 3 px on hover.
- The rhythm of a section: `max-w-[80rem]`, `px-5 py-20 md:px-8 md:py-28`.

## The strings

Every new list draws its rules with `parts/string.liquid`: one above each row and one under the last, inside a `<ul data-strings>` or `<ol data-strings>` whose direct children are the `<li>`s, each row in a `.strung-row`. Never a `border-b` or `divide-y` in their place.

```liquid
<ul class="mt-12" data-strings>
  {% for item in data.items %}
  <li>
    {% render 'string' %}
    <div class="strung-row py-6">…</div>
    {% if forloop.last %}{% render 'string' %}{% endif %}
  </li>
  {% endfor %}
</ul>
```

- **Gauges**: `gauge: 1` to `4` draws 1, 1.5, 2 and 3 px, the fourth wound; 2 unless the list says otherwise. The programs go from 1 to 4 by `forloop.index`, 4 at most; the week and the second way in on `/start` are 3.
- **Colors** come from the band, by the stylesheet: ink at 60% on paper, shade and apricot, ink at 70% on tangerine, paper at 55% on night; under each lies its ghost at 30%. A string never changes color.
- **The strum on arrival** (`scripts/strings.js`, Motion): each string once, top to bottom, 60 ms apart, at 30% of its length, 6 px deep (4 px when it is shorter than 480 px), as a third of the list or half a screen of it comes into view. `data-strings-at="load"`, the hero's alone, strums 0.55 s after the page opens, and each row's `data-tick` bounces (scale 0.7, 1.15, 1 in 0.45 s).
- **The hand**: on a mouse or trackpad, a string crossed is plucked where it was crossed, 2 to 9 px by the pointer's speed; scrolling under a resting pointer, 2 to 6 px; a tap on a row, 4 px; keyboard focus entering a row, 3 px. A string is plucked at most every 120 ms. Springs by gauge: stiffness 1400, 1100, 850, 600; damping 12, 11, 10, 9.
- A strung list is never revealed by fading (`data-reveal` does not go on it or its rows): it is there, and it rings. No sound, ever.
- A list that is not ruled (the steps in a row, the cards of "Finding us") has no strings.
- A strung row takes the shade, or the band's tint, on hover and focus in 150 ms.

## Other movement

- **The headline's words** (`data-split="words"`, `scripts/words.js`, Splitting and Motion), on the home page's hero only: whole words, 28 px up and turned −3° to their place, 0.6 s, 70 ms apart, from 0.15 s.
- **Reveals** (`data-reveal`, `scripts/reveal.js`): a section's heading and main elements rise 16 px in 0.7 s; `data-reveal="stagger"` for children 70 ms apart. Not on every block, and not on the hero.
- **The school's clock** (`data-term` and `data-tz` on a list of dates or around several, `data-starts` and `data-ends` on each row, `scripts/term-clock.js`): the row of today's dates gets "This week" or "Today", the next one "Coming up", and the past fades to 55%. The labels are written in the row (`data-when="now"`, `data-when="next"`), shown by the stylesheet.
- **Smooth scrolling** (`scripts/smooth-scroll.js`, Lenis, lerp 0.12). A section a link leads to within a page has `scroll-mt-20` or `scroll-mt-24`, for the sticky header.
- **Prefilled forms** (`data-prefill` on the form, `data-prefill-from` on the select, `data-id` on each option, `scripts/prefill.js`): `?teacher=`, `?program=`, `?class=` and `?instrument=` with a record's id. The rental form's sizes follow its instrument (`data-sizes-of` on the select, `data-for` on each group, `scripts/sizes.js`); the phone's menu closes when one of its links is followed (`scripts/menu.js`).
- No page transitions, no loader, no carousel, no letter-by-letter text. Under reduced motion and in edit mode the strings lie straight and everything is in place; no script runs in edit mode, so no row of the calendar is marked there.

## Lists

- `programs` (a page per record, `/programs/<id>`), `concerts` (a page per record, `/concerts/<id>`, sorted by `date`), `classes`, `team`, `lesson-rates`, `dates` (sorted by `starts`), `rentals`, `hours`, `navigation`; section lists `promises`, `first-lesson-steps`, `program-faq`, `lessons-notes`, `lessons-faq`, `recital-notes`, `rental-steps`, `violin-sizes`, `rentals-faq`, `rooms`, `getting-here`.
- A class belongs to a program by its `program`, a teacher to several by `programs`, a question of `program-faq` by `program`. `seats_left` writes "2 seats left" below four, "Full: ask for the waitlist" at 0, "Places open" above or when empty. `day` is mon to sat.
- A date of one day leaves `ends` empty; `kind` break or closed shows "No lessons" on the calendar. `on_home` puts it in the term at a glance, six at most.
- A concert's `booking` adds "Tickets"; its `running_order` and `photos` show on its page when filled. Remove a concert or a date only when the maker says so: the past fades on its own.
- The rentals' images are generated, square, each instrument alone on apricot paper seen from above in window light from the left: make a new one with `media/rental-violin.webp` as its reference.
- A rate's `programs` says on which program pages it shows; its `cta` and `href` are the link under it on `/lessons`. A rental's `size_options` are the sizes its request offers, `sizes` the line that sums them up; "One size" alone when there is one.
- A teacher's `role` shows beside the pronouns on `/teachers`; leave it empty for a teacher who is only that. A teacher's `photo` is a square, close, with the instrument; without one, the initials.
- `collected` lists: `trial-lessons`, `enrollments`, `rental-requests`, each answered by its fragment. A choice added to a form's list goes in its `_datasource.yaml` too.

## Rules for the website's whole life

- The same fact says the same everywhere: a class's evening and room, a concert's date in `concerts` and in `dates`, the term's dates in the strip, the calendar and the enrollment form.
- Two tangerine bands at most on a page, never side by side; one night band besides the strip and the footer.
- No music notes, staves, clefs, piano keys or equalizers as decoration; no neon lettering, no chili peppers: the strings are the only ornament.
- No invented review, star, award or figure. No logo of an instrument's brand in a photo.
- The header's links stay on one line from 1408 px; more links than nine go to the footer only (`place: footer`).
