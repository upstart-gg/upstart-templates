# Bolster

Bolster is the site of a studio people come to for an hour at a time. On a deep aubergine field, the offer for new students lies over the edge of the room's photo; the day's classes and the class styles are mats that unroll as they come into view, and the week opens on today. It was written for Artesian Yoga & Pilates, an invented studio upstairs in a 1911 lodge hall in Boise, Idaho, with yoga, mat Pilates and reformer classes, memberships and class packs, Saturday workshops and one retreat a year; it suits a yoga, Pilates, reformer, barre or hot yoga studio, a dance or movement studio with a timetable, a meditation center that teaches classes, or a community studio run by its teachers. Keep the structure and the mats; rewrite the class styles and their tones, the week, the prices and the offer, the teachers, the workshops and the city.

## How it is made

- Every page shares the header (`parts/header.liquid`, the name in `parts/logo.liquid`, the links of `navigation` whose place is both or header, the "Book a class" pill, a menu button below 1200 px) and the footer (`parts/footer.liquid`: the address, `hours`, `navigation` and its social link). Every page but `/new` ends with the dock (`parts/dock.liquid`).
- `offer` (one record) fills the hero's card and `/new`'s (`parts/offer-card.liquid`), the dock, `/prices` (`parts/offer-plan.liquid`) and the band of each class's page (`parts/start-band.liquid`). `sessions` fills the week on the home page and `/schedule`, each class's page (by `class_id`) and each teacher's week (by `teacher`). `classes` fills the home page's mats, `/classes`, a page per class, two mats on `/new` and the teachers' chips. `plans` fills the prices by `family`. `team` fills the home page, `/teachers` and the class pages; `workshops` the home page, `/workshops` and a page per record; `rooms` `/studio` and the two rooms of `/schedule`; `hours` the footer and `/studio`.
- Every Book leads to its session's own `book` link when it has one, otherwise to the address of the "Book a class" record, `data/navigation/book.md`. The offer, the plans and the workshops each hold their own page of the booking app.
- Two forms collect records: `retreat-requests` on the retreat's page, `messages` on `/studio`, each with its thanks in `fragments/`.
- Most pages open with `parts/page-title.liquid`, its title and introduction written in the page.

## When adapting

- The name (Artesian Yoga & Pilates) is in `parts/logo.liquid`, `parts/footer.liquid` (its title and last line), `parts/story.liquid` (what an artesian well is), and every page's title and description. The address (418 Larkin Lane) is in `parts/footer.liquid`, `parts/front-desk.liquid` and `parts/header.liquid` (the menu), with the directions link in the first two; the phone ((208) 555-0163) in `parts/footer.liquid` and `parts/front-desk.liquid`; the email in `parts/footer.liquid` and `parts/message-form.liquid`; Instagram in `data/navigation/instagram.md`. The blocks in `blocks/` repeat the parts and records they were made from: what changes in a part or a record changes in its block.
- The booking app's address is asked for, never invented: `book.artesianyoga.example` stays only until the maker gives theirs (Mindbody, Momence, Walla, Arketa, Bsport…), in `data/navigation/book.md`, `data/offer/`, `data/plans/` and `data/workshops/`. Without a page per purchase, each of them takes the app's own address.
- The week is typed in `data/sessions/`, one record per class, its tone and kind copied from the class: change them with the class. A file is named after its day, time and class (`mon-0615-slow-flow`). How many there are and the first and last hours are said again in `parts/hero.liquid`, and in the introduction and the descriptions of `pages/schedule.liquid`; the 6:15 and the 7:30s in `data/schedule-faq/parking.md`, `data/rooms/reformer-room.md`, `data/classes/slow-flow.md`, `data/team/` (Maite's and Theo's bios) and `data/getting-here/car.md`.
- Set the studio's time zone in `data-tz`, which says `America/Boise` in `parts/week.liquid` and `parts/week-full.liquid`. For a site in French, German or most of Europe, show 24-hour times: in `parts/time.liquid`, output `{{ start }}` alone inside the `<time>`.
- The offer's length and price are `data/offer/two-weeks.md`, and said again in the descriptions of `pages/index.liquid` and `pages/prices.liquid`, the title, introduction and descriptions of `pages/new.liquid`, `data/new-faq/`, `data/first-steps/buy.md` and `data/testimonials/dana.md`.
- The prices, the offer's terms, the rooms, the teachers and the workshops' dates are facts: ask for them once the page is built, or leave them out rather than guess. Besides `data/`, prices are written in `parts/retreat-form.liquid` (the cabins, the deposit), `parts/private-groups.liquid` and `parts/for-less.liquid`. "Coming twice a week or more? A membership costs less" (`parts/two-ways.liquid`, `parts/two-ways-full.liquid`) must be true of the maker's prices.
- The three quotes on `/new` (`data/testimonials/`) are invented and never stay: ask for real ones, given with the students' permission, or remove `{% render 'testimonials' %}`, its part and its data. The teachers are invented too: keep one row as an example, and say so, until the maker names theirs. Without a photo they show initials on chalk pink; ask for portraits.
- The story of the warm floor is Artesian's alone: `parts/warm-floor.liquid`, `parts/story.liquid`, the hero's sentence, `data/rooms/long-room.md`, `data/classes/foundations.md`, `data/classes/warm-flow.md`, `data/classes-faq/hot.md`, `data/testimonials/pilar.md`, the headline "An hour on a warm floor." and the descriptions of `pages/index.liquid`, the title of `pages/studio.liquid`. Ask what is true of the maker's building, or replace the section with their own story (`media/warm-floor.webp` goes with it); never keep the geothermal water.
- The city (Boise, the Basque Block, Grove Street, the Sawtooths, Hulls Gulch) is also in the label above the hero's headline, `parts/header.liquid` (the menu), the footer, `parts/story.liquid`, `pages/studio.liquid`, `data/getting-here/`, `data/team/`, `data/workshops/`, `data/classes-faq/hot.md` and the descriptions.
- The photos of the rooms are generated (`media/long-room.webp` and its crop `media/warm-floor.webp`, `media/reformer-room.webp`, `media/prop-shelf.webp`): the maker's own rooms replace them first.

## Pages

### Home (`/`)

The aubergine hero with the offer over the room's photo, today's classes as mats with the days of the week, the six class styles, the warm floor's story, memberships beside class packs, the teachers, the Saturday workshops and the retreat.

#### How do students book a class?

- **In the studio's booking app** (as built): every Book and "Start your two weeks" leads out. Ask for the app's address and put it in `data/navigation/book.md`, `data/offer/`, `data/plans/` and `data/workshops/`.
- **With a request on the site**, for a small studio without a booking app: the page says places are confirmed by the studio, and prices are paid at the desk. Make a collected datasource `class-requests` (the class, the day, first time or not, name, email, phone) with the fragment `class-requests-thanks` ("We'll confirm your place by text or email"), and its form in a new part on `/schedule`, `id="request"`. In `parts/session-row.liquid`, Book leads to `/schedule?session={{ session.id }}#request`, and a small `scripts/prefill.js` picks that class in the form. `data/navigation/book.md` leads to `/schedule#request`. The links of `data/offer/`, `data/plans/` and `data/workshops/` lead to `/studio#write`, and "in the app" goes from their buttons and from `parts/week.liquid`, `parts/week-full.liquid`, `pages/schedule.liquid`, `pages/prices.liquid`, `pages/classes/[classes].liquid`, `pages/workshops/[workshops].liquid`, `parts/workshop-rows.liquid`, `parts/message-form.liquid`, `data/first-steps/`, `data/schedule-faq/`, `data/prices-faq/`, `data/workshops/arm-balances.md` and `data/team/rosa-nakamura.md`.
- **Drop in, no booking**: the rows lose Book (`parts/session-row.liquid`), "Open the booking app" goes from `parts/week.liquid` and `parts/week-full.liquid`, and their line becomes "Come ten minutes early; mats are first come, first served". `data/navigation/book.md` becomes "See the week", to `/schedule`. The offer and the packs are bought at the desk: `cta` and `href` in `data/offer/` become "How it works" and `/new`, the buttons go from `parts/two-ways-full.liquid`, `parts/private-rates.liquid`, `parts/workshop-rows.liquid` and `pages/workshops/[workshops].liquid`, and "in the app" from the files named above.

#### How do new students start?

- **Two weeks for a set price** (as built): the hero's card, the dock, `/prices` and `/new`.
- **A first class free**: one record in `data/offer/` ("Your first class is on us", with `name` "Your first class", `price` "Free"). In `parts/offer-card.liquid` and `parts/offer-plan.liquid`, "for" goes from between them. Rewrite the title, introduction and descriptions of `pages/new.liquid`, the descriptions of `pages/index.liquid` and `pages/prices.liquid`, `data/first-steps/buy.md`, `data/new-faq/start.md`, `data/new-faq/again.md` and `data/testimonials/dana.md`.
- **No offer**: the overlap stays, with facts in place of the price: in `parts/hero.liquid`, `{% render 'offer-card' %}` becomes a chalk-pink card with "Weekdays from 6:15 am" and "418 Larkin Lane", the maker's own. Delete `parts/offer-card.liquid`, `parts/offer-plan.liquid`, `parts/start-band.liquid`, `parts/dock.liquid`, `scripts/dock.js`, `data/offer/`, `blocks/banner/banner-bolster-dock/`, and their renders: `{% render 'dock' %}` in every page but `/new`, `{% render 'offer-plan' %}` in `pages/prices.liquid`, `{% render 'start-band' %}` in `pages/classes/[classes].liquid`; `blocks/hero/hero-bolster-offer/` takes the new card and loses its `data`. `pages/new.liquid` becomes "Your first class" and loses its offer and its photo's section; rewrite its introduction and descriptions, the descriptions of `pages/index.liquid` and `pages/prices.liquid`, `data/navigation/new.md`, `data/first-steps/buy.md` and `data/testimonials/dana.md`, and delete `data/new-faq/start.md` and `data/new-faq/again.md`.

#### What does the studio teach?

- **Yoga and Pilates, with reformers** (as built): six styles, the filter's four choices, the "counts as two" rule.
- **Yoga only**: delete `data/classes/mat-pilates.md`, `data/classes/reformer.md` and their sessions (and their ids from each `order`), `data/rooms/reformer-room.md`, `data/plans/private-reformer.md`, `data/plans/reformer-duet.md`, `data/workshops/your-first-reformer.md`, `data/workshops/pilates-for-runners.md`, `data/schedule-notes/socks.md`, `data/new-bring/socks.md`, `data/classes-faq/difference.md`, and the media `plank-leg.jpg`, `reformer-elephant.jpg`, `reformer-backs.jpg`, `reformer-room.webp` and `hulls-gulch.jpg`. "Counts as two" goes from `parts/session-row.liquid`, `parts/class-mat.liquid`, `pages/classes/[classes].liquid`, `parts/two-ways.liquid`, `parts/two-ways-full.liquid` and the blocks; the filter (the second `fieldset` and the `data-none` lines) from `parts/week-full.liquid`; the last line from `parts/which-first.liquid`; `parts/two-rooms.liquid` and its render in `pages/schedule.liquid`. Rewrite Pilates out of `parts/hero.liquid`, `parts/logo.liquid`, `data/offer/`, `data/plans/`, `data/team/` (Calvin and Inés), and every title and description.
- **Pilates only, on the mat and the reformer**: delete the four yoga classes and their sessions, their media (`down-dog.jpg`, `puppy-pose.jpg`, `bright-class.jpg`, `warm-room.jpg`, `backbend-row.jpg`, `reclined-bolster.jpg`; `class-from-behind.jpg` stays for `/new` unless replaced), `data/plans/private-yoga.md`, `data/workshops/arm-balances.md`, `data/workshops/yin-by-lamplight.md` and `data/classes-faq/hot.md`. The filter in `parts/week-full.liquid` becomes All, Mat (`pilates`) and Reformer. `parts/which-first.liquid` takes the two classes left. The warm floor (`parts/warm-floor.liquid`, `media/warm-floor.webp`) stays only if the maker's room is heated. Rewrite yoga out of the same texts, `data/first-steps/book.md` and `data/classes-faq/`.

### Schedule (`/schedule`)

The whole usual week as mats, day by day, with a strip of days and a filter by kind of class; before you come, the two rooms, and questions.

#### Is the week typed on the site?

- **Yes, the usual week** (as built): `data/sessions/` on the home page and here, with the line about subs and changes.
- **No, the app holds it all**, for a studio whose week changes too often: in `parts/week.liquid`, `parts/week-full.liquid` and `blocks/events/events-bolster-week/block.liquid`, the strip and the lists give way to one `data-mat="style"` mat, "This week's classes are in our app", with its button. Delete `data/sessions/`, `parts/session-row.liquid`, `parts/time.liquid`, `parts/day-name.liquid`, `scripts/week.js`; "When it runs" and "Who teaches it" go from `pages/classes/[classes].liquid`, and the week from `parts/teacher-rows.liquid`. The hero's "See today's classes" (`parts/hero.liquid`) becomes "See the classes", to `/classes`.

When removed: delete `pages/schedule.liquid`, `parts/week-full.liquid`, `parts/before-you-come.liquid`, `parts/two-rooms.liquid`, `parts/faq-accordion.liquid`, `parts/question.liquid`, `data/schedule-notes/`, `data/schedule-faq/`, the field `booking` of `data/rooms/`, `data/navigation/schedule.md` and `blocks/footer/footer-bolster-studio/data/schedule.md`. "See the whole week" in `parts/week.liquid` and `blocks/events/events-bolster-week/block.liquid` points to the booking app and says "Open the booking app", in place of the second button. The home page keeps its week; `parts/checklist.liquid` stays for `/new`.

### Classes (`/classes`)

The six class styles as large mats laid unevenly on the floor, the classes by pace and questions, and a page per class: its own mat, its facts, what you'll do, when it runs and who teaches it.

#### A page for each class?

- **Yes** (as built): each mat opens on its page, with its times and teachers.
- **The floor only**: delete `pages/classes/[classes].liquid`, `parts/start-band.liquid` and the fields `bring`, `cover`, `photos` and `body` of `data/classes/` and of `blocks/services/services-bolster-mats/data/` (the mats here still show `summary` and `for_whom`), with the media only those pages show: `down-dog.jpg`, `puppy-pose.jpg`, `bright-class.jpg`, `warm-room.jpg`, `backbend-row.jpg`, `reclined-bolster.jpg`, `plank-leg.jpg` and `reformer-elephant.jpg`. In `parts/class-mat.liquid` the link becomes a `<div>` and "See the class" goes; the class's name is plain text in `parts/session-row.liquid`, `parts/pace.liquid` and `parts/teacher-rows.liquid` (the chips).

When removed: delete `pages/classes/`, `parts/floor.liquid`, `parts/pace.liquid`, `parts/start-band.liquid`, `data/classes-faq/`, `data/navigation/classes.md`, `blocks/footer/footer-bolster-studio/data/classes.md`, and the media named just above. `data/classes/` stays for the home page's mats, `/new` and the teachers' chips, without the fields `for_whom`, `bring`, `cover`, `photos` and `body`, as does `blocks/services/services-bolster-mats/data/`; `parts/class-mat.liquid`, `parts/session-row.liquid` and `parts/teacher-rows.liquid` lose their links as under "The floor only". `reformer-backs.jpg` stays for a workshop, `class-from-behind.jpg` and `parts/faq-two-columns.liquid` for `/new`; `parts/pace-name.liquid` stays.

### Prices (`/prices`)

The offer for new students, memberships beside class packs with what each holds, private sessions, discounts and questions. The offer follows how new students start, chosen with the home page.

#### How do students pay?

- **Memberships and class packs** (as built): the two columns.
- **Class packs only**: delete the three membership records of `data/plans/`; the first column, the line between the two and the headings of the columns go from `parts/two-ways.liquid`, `parts/two-ways-full.liquid` and `blocks/pricing/pricing-bolster-two-ways/block.liquid`, whose title becomes "By the class, or by the pack". Delete `data/prices-faq/freeze.md`, and rewrite `data/prices-faq/move.md`, `data/prices-faq/include.md`, `data/classes/reformer.md`, `data/new-faq/again.md`, `parts/for-less.liquid` and the descriptions and introduction of `pages/prices.liquid`.
- **Memberships only**: the packs' column goes from the same three files but for the drop-in, one line under the memberships. Delete `data/plans/five-classes.md` and `data/plans/ten-classes.md`, and rewrite `data/prices-faq/share.md`, `data/prices-faq/move.md`, `data/new-faq/again.md` and the descriptions of `pages/prices.liquid`.

#### How is the reformer priced?

- **It counts as two classes** (as built): the cork mark on packs, `credits` on the class.
- **Priced on its own**: a third column, "Reformer", with its own drop-in and packs, in `parts/two-ways.liquid`, `parts/two-ways-full.liquid` and the block (a choice `reformer` in `family`, `data/plans/_datasource.yaml`). "Counts as two" goes from them, `parts/session-row.liquid`, `parts/class-mat.liquid` and `pages/classes/[classes].liquid`, `credits` from `data/classes/`, and the rule from `data/classes/reformer.md` and the features of `data/plans/`.

When removed: delete `pages/prices.liquid`, `parts/offer-plan.liquid`, `parts/two-ways-full.liquid`, `parts/private-rates.liquid`, `parts/for-less.liquid`, `parts/faq-numbered.liquid`, `data/prices-faq/`, the three private records of `data/plans/`, `data/navigation/prices.md` and `blocks/footer/footer-bolster-studio/data/prices.md`. "All prices" in `parts/two-ways.liquid` and `blocks/pricing/pricing-bolster-two-ways/block.liquid` becomes "Open the booking app"; `data/plans/` stays for the home page.

### New here (`/new`)

The offer large over a class's photo, the first class in four steps, which class to take first, what to bring, three students' words and questions. It follows how new students start, chosen with the home page, and has no choice of its own.

When removed: delete `pages/new.liquid`, `parts/first-class.liquid`, `parts/which-first.liquid`, `parts/what-to-bring.liquid`, `parts/testimonials.liquid`, `data/first-steps/`, `data/new-bring/`, `data/testimonials/`, `data/new-faq/`, `data/navigation/new.md` and `blocks/footer/footer-bolster-studio/data/new.md`. "How it works" in `parts/offer-card.liquid` points to `/prices`; "Which one first?" in `parts/six-classes.liquid` and `blocks/services/services-bolster-mats/block.liquid` points to `/classes`. `media/prop-shelf.webp` stays for `/studio`, `media/class-from-behind.jpg` for Slow Flow's page, `parts/checklist.liquid` for `/schedule` and `parts/faq-two-columns.liquid` for `/classes`.

### Teachers (`/teachers`)

Each teacher with a square portrait or initials, pronouns, the classes they teach as tone chips, a biography with a line of their own, and their week; a line on teaching here.

#### Who appears by name?

- **Every teacher** (as built): a row each, portraits or initials on chalk pink until the maker sends photos.
- **The founders only**: one or two shown large, adapted from the gallery's `about-founder-note`; `data/team/` keeps only them, and `parts/people.liquid` takes their number of columns. The sessions keep their teachers' first names as text.

When removed: delete `pages/teachers.liquid`, `parts/teacher-rows.liquid`, `parts/teach-here.liquid`, `parts/people.liquid` and its render in `pages/index.liquid`, `parts/portrait.liquid`, `data/team/`, `data/navigation/teachers.md`, `blocks/team/team-bolster-teachers/` and `blocks/footer/footer-bolster-studio/data/teachers.md`. "Who teaches it" goes from `pages/classes/[classes].liquid`; the sessions keep the teachers' first names.

### Workshops & retreats (`/workshops`)

The retreat featured, the Saturday workshops as dated rows, private groups, and a page per workshop; the retreat's adds its three days, the cabins and the request form.

#### How do people sign up for a workshop?

- **In the booking app** (as built): each workshop's `booking` link.
- **With a request on the site**: make a collected datasource `workshop-requests` (name, email, phone, how many places) with its fragment, and its form at the foot of `pages/workshops/[workshops].liquid`, paid at the door, for the records whose `kind` is workshop; "Book in the app" there and in `parts/workshop-rows.liquid` leads to it. `booking` goes from `data/workshops/`.

#### A retreat?

- **Yes, with its own page and a request form** (as built).
- **Workshops only**: delete `data/workshops/three-days-near-stanley.md`, `parts/retreat-feature.liquid` and its render, `parts/retreat-form.liquid`, `data/retreat-requests/`, `fragments/retreat-requests-thanks.liquid`, and the media `sawtooths.jpg`, `kirkham-springs.jpg` and `stanley-meadow.jpg`; the retreat's part goes from `pages/workshops/[workshops].liquid` and `parts/saturdays.liquid`, whose title becomes "Saturdays", and the fields `ends`, `days`, `included`, `cabins` and `kind`'s `retreat` from `data/workshops/`. The page's title and descriptions and `data/navigation/workshops.md` say "Workshops".

When removed: delete `pages/workshops/`, `parts/retreat-feature.liquid`, `parts/workshop-rows.liquid`, `parts/private-groups.liquid`, `parts/retreat-form.liquid`, `parts/event-date.liquid`, `parts/saturdays.liquid` and its render in `pages/index.liquid`, `data/workshops/`, `data/retreat-requests/`, `fragments/retreat-requests-thanks.liquid`, `data/prices-faq/include.md`, the media `arm-balance.jpg`, `hulls-gulch.jpg`, `lamplight-foot.jpg`, `sawtooths.jpg`, `kirkham-springs.jpg` and `stanley-meadow.jpg` (`reformer-backs.jpg` stays for the Reformer's page), `data/navigation/workshops.md` and `blocks/footer/footer-bolster-studio/data/workshops.md`. "Your first reformer" goes from `parts/which-first.liquid`, and Saturday's note from `data/hours/saturday.md`.

### The studio (`/studio`)

The building's story, the rooms with their photos, how to get here, the front desk's hours with the address, and a form to write to the studio.

#### One studio or two?

- **One** (as built): the address in the footer and here.
- **Two studios**: make a `locations` collection (name, address, phone); `data/sessions/` and `data/rooms/` gain a `location`, shown as a chip in `parts/session-row.liquid`; the filter in `parts/week-full.liquid` gains a third row of radios, with its rule in `styles/site.css` beside those of `data-kind`; `parts/front-desk.liquid` and `parts/getting-here.liquid` show both, side by side, and `parts/footer.liquid` both addresses.

When removed: delete `pages/studio.liquid`, `parts/story.liquid`, `parts/rooms.liquid`, `parts/getting-here.liquid`, `parts/front-desk.liquid`, `parts/message-form.liquid`, `data/getting-here/`, `data/messages/`, `fragments/messages-thanks.liquid`, `data/rooms/corner-room.md`, `data/rooms/changing-rooms.md`, the media `basque-block.jpg`, `boise-river.jpg`, `lockers.jpg` and `reformer-room.webp`, the fields `facts`, `text` and `photo` of `data/rooms/`, `data/navigation/studio.md` and `blocks/footer/footer-bolster-studio/data/studio.md`. The Long Room and the Reformer Room stay in `data/rooms/` for `/schedule`, `long-room.webp` for the home page and `prop-shelf.webp` for `/new`. "Visit the studio" in `parts/warm-floor.liquid` points to the footer's directions link, and "Write to us" in `parts/teach-here.liquid` and `parts/private-groups.liquid` to the email (`mailto:`).
