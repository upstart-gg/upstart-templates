# Strum

Strum is the site of a school that teaches music to every age. Its first screen is a flat band of tangerine with a huge slanted headline over three promises; every ruled list under it is strung, and its rules pluck as the list arrives and when the hand crosses them. It was written for Ristra Music School, fourteen teachers in the twelve rooms of a 1948 Route 66 motor court in Albuquerque, with private lessons, group classes, recitals and instruments to rent; it suits any school a family signs up to for a term: a dance, drama, art or circus school, a language school, a climbing or swimming club's lessons, a tutoring center, a single teacher with a studio. Keep the structure and the strings; rewrite the school's people, programs, dates and prices.

## How it is made

- Every page shares the header (`parts/header.liquid`: the term's strip, `parts/term-strip.liquid`; the name, `parts/logo.liquid`; the links of `navigation` whose place is both or header; the "Free first lesson" button; a menu button below 1408 px) and the footer (`parts/footer.liquid`: the address, the phone and email, `hours`, `navigation` and its social link).
- `promises` fills the hero; `first-lesson-steps` the home page's closing band. `programs` fills the home page, `/programs` and a page per program, with `classes` (by their `program`), `team` (by its `programs`), `lesson-rates` and `program-faq`. `classes` fills the week on `/lessons` too. `team` fills `/teachers`, the home page's first four and both forms' lists; `concerts` fills the home page's first three, `/concerts` and a page per concert; `dates` fills `/calendar` by `term`, and the home page with those marked `on_home`; `rentals` fills `/rentals` and its form.
- Three forms collect records: `trial-lessons` and `enrollments` on `/start`, `rental-requests` on `/rentals`, each with its thanks in `fragments/`.
- Most pages open with `parts/page-title.liquid`, its title and introduction written in the page.

## When adapting

- The name (Ristra Music School) is in `parts/logo.liquid`, the footer's last line and its links' title, every page's title and description, `parts/story.liquid`, the concert page's "Getting there", and the names of the mariachis in `data/classes/`, `data/programs/` and `data/concerts/`. The address (16 Oberlin Court SE) is in `parts/footer.liquid`, `parts/header.liquid` (the menu), `parts/desk-hours.liquid` and `pages/concerts/[concerts].liquid`, with the directions link in all but the header; the phone ((505) 555-0164) in `parts/footer.liquid`, `parts/desk-hours.liquid`, `parts/trial-form.liquid`, `parts/questions.liquid` and `pages/start.liquid`; the email in `parts/footer.liquid` and `pages/teachers.liquid`; Instagram in `data/navigation/instagram.md`. The desk's hours are `data/hours/`, said again in a sentence on `pages/start.liquid`.
- The headline and the three promises are written for this school. Rewrite the headline with the maker's own ages or place, short enough for two lines of one sentence each, and keep the promises three, each true: the second goes if the school does not rent, the third follows the real hours.
- The term's facts are written in several places: the strip (`parts/term-strip.liquid`), "Fall 2027" in `parts/term-at-a-glance.liquid`, the terms' headings, days and weeks in `parts/school-year.liquid`, "Enroll for spring" and its dates in `parts/enroll-form.liquid` and `pages/start.liquid`, the term's totals in `data/lesson-rates/`, and `data/dates/`. Change them together.
- Set the school's time zone in `data-tz`, wherever it says `America/Denver`: `parts/term-at-a-glance.liquid`, `parts/school-year.liquid`, `parts/concerts-band.liquid`, `parts/concert-rows.liquid` and `pages/concerts/[concerts].liquid`. Set the year the concerts and dates really happen in.
- Prices, dates, classes with their evenings and seats, rooms and the rentals' prices are facts: ask for them once the page is built, or leave them out rather than guess. Besides `data/`, prices are written in `parts/ways-to-learn.liquid` (two), `parts/week-of-classes.liquid` (the ensembles, and its block), `parts/rentals-strip.liquid`, `pages/programs/[programs].liquid` ("from $9 a month"), and the descriptions of `pages/lessons.liquid` and `pages/rentals.liquid`. The instruments taught are named in `parts/trial-form.liquid`.
- The city, the neighborhood and the avenue (Albuquerque, Nob Hill, Central, Route 66) are also in the label above the hero's headline (`parts/hero.liquid` and its block), the menu's last line (`parts/header.liquid`), the footer's last line, the introductions of `pages/concerts/index.liquid` and `pages/calendar.liquid` (its public schools), the concert page's "Getting there", `parts/story.liquid`, `data/getting-here/bus.md`, `data/rentals-faq/learn-elsewhere.md`, two teachers' `plays` (`data/team/`), and every page's description; "New to Ristra" opens `pages/start.liquid`.
- Teachers are never invented: keep one row as an example, and say so, until the maker names theirs. The founders' quotes (`parts/founders.liquid`) are invented and go unless the maker gives theirs.
- Photos of students belong to the school and their families: replace them with the maker's as they come, and never keep one as if it showed the maker's own students without saying it. The blocks in `blocks/` repeat the parts and records they were made from: what changes in a part changes in its block.

## Pages

### Home (`/`)

The tangerine hero with its headline, three promises and a lesson's photo, the programs by age, one-on-one or with friends, the rentals strip, the next three concerts on night blue, four teachers, the term at a glance and a closing band on the free first lesson.

#### How does a new student start?

- **A free first lesson, asked for with the form** (as built): every "Book a free first lesson" leads to `/start#trial`, and the first promise says the lesson is free. Nothing to change.
- **A paid trial lesson**: every "Book a free first lesson" and "Free first lesson" becomes "Book a first lesson" (`parts/hero.liquid`, `parts/header.liquid`, `parts/term-strip.liquid`, `parts/footer.liquid`, `parts/first-lesson-band.liquid`, `parts/first-lesson-line.liquid`, `parts/lesson-rates.liquid`, `parts/trial-form.liquid`, `pages/start.liquid`, `pages/programs/[programs].liquid`, `cta` in `data/lesson-rates/`). "Your first lesson is $20, taken off the term" (the maker's price) goes in `data/promises/free-first-lesson.md`, the heading of `parts/first-lesson-band.liquid` and the aside of `parts/trial-form.liquid`; "The first thirty minutes are free" goes from `parts/lesson-rates.liquid`, "The first lesson is free" from the two descriptions of `pages/index.liquid`, and "free" from the introduction of `pages/programs/index.liquid`, the two descriptions of `pages/start.liquid`, `data/program-faq/is-four-too-young.md` and `which-instrument-first.md`, `fragments/trial-lessons-thanks.liquid`, and the blocks made from these parts.
- **A placement call**: in the same files the buttons say "Ask for a placement call"; the first promise becomes "A call to find the right teacher"; the form in `parts/trial-form.liquid` keeps its parts 1, 3 and 4, renumbered, and `instrument` is no longer required in `data/trial-lessons/`; `data/first-lesson-steps/` tells the call.

#### How do families enroll and pay?

- **A request, confirmed and paid at the desk** (as built): the enrollment form on `/start#enroll`.
- **On the school's own system online** (My Music Staff, Opus1 or another): ask for its address, never invent it. Every "Enroll" links to it and says "Enroll online" (`parts/fund-band.liquid`, `pages/programs/[programs].liquid`, the waitlist in `parts/class-seats.liquid`, the second way in on `pages/start.liquid`). Delete `parts/enroll-form.liquid` and its render in `pages/start.liquid`, `data/enrollments/`, `fragments/enrollments-thanks.liquid`, and "program" and "class" from the list in `scripts/prefill.js`; "Ask on the enrollment form" in `parts/fund-band.liquid` and `data/lessons-notes/courtyard-fund.md` becomes "Ask the desk".
- **By phone or email only**: the same files go, and those links become "Call the desk" (`tel:`) or "Write to us" (`mailto:`). The free lesson form stays.

#### How are the programs grouped?

- **By age** (as built): four programs, from the little ones to the grown-ups.
- **By instrument**, for a school whose students choose an instrument first: the programs become instruments ("Piano", "Strings", "Guitar & bass", "Voice", "Drums"), their ages as a line; `ages_short` becomes the age they start at ("from 5"); `data/classes/`, `data/team/` and `data/program-faq/` take the new ids in their `program` and `programs`, and their `_datasource.yaml` the new choices. Rewrite the heading of `parts/programs-by-age.liquid`, the title of `/programs`, "Programs by age" and "Another age?" on `pages/programs/[programs].liquid`, and the hero's second button.
- **One age only**, for a children's school or an adults' school: keep one or two programs. With one, the home page's list becomes its classes: replace `{% render 'programs-by-age' %}` with `{% render 'week-of-classes' %}`, and rewrite the headline.

### Programs (`/programs`)

The programs in full, with their classes' evenings, and a page per program: the ages very large, what it's like, the first instruments, its classes with their seats, the private lessons' prices, its teachers and its questions.

#### A page for each program?

- **Yes** (as built): each program opens on its page.
- **The list only**: delete `pages/programs/[programs].liquid`, `data/program-faq/`, the fields `instruments`, `lesson_note` and `body` of `data/programs/`, and `programs` in `data/lesson-rates/`. In `parts/program-row.liquid` the ages and the name lose their links and the last link leads to `/lessons#week`; in `parts/week-of-classes.liquid` and `blocks/services/services-strum-week-of-classes/block.liquid` the class's name loses its link.

When removed: delete `pages/programs/`, `parts/programs-by-age.liquid`, `parts/programs-full.liquid`, `parts/program-row.liquid`, `data/programs/`, `data/program-faq/`, `blocks/features/features-strum-programs-by-age/`, `media/violin-group.jpg`, `media/mariachi-students.jpg`, `media/fiddle-evening.jpg`, the `programs` navigation record and `blocks/footer/footer-strum-front-desk/data/programs.md`; `programs` goes from `data/lesson-rates/` (`media/room-12.webp` stays for `/about`). On the home page, `{% render 'week-of-classes' %}` takes the place of `{% render 'programs-by-age' %}`, its classes grouped by `program`, whose choices become plain words ("Kids, 7 to 12"). Point the hero's second button (`parts/hero.liquid`, `blocks/hero/hero-strum-start-at-four/block.liquid`) to `/lessons`. In `parts/week-of-classes.liquid` and `blocks/services/services-strum-week-of-classes/block.liquid` the class's name loses its link. In `parts/enroll-form.liquid` the program's field goes, and `program` from `data/enrollments/` and from `scripts/prefill.js`. `data/lesson-rates/` then shows on `/lessons` and in the enrollment form only.

### Lessons & prices (`/lessons`)

The private lessons' three lengths and prices, the week's group classes and ensembles day by day with their seats, how paying works, the fund and questions.

#### What does the school teach?

- **Private lessons and group classes** (as built).
- **Private lessons only**: remove `{% render 'week-of-classes' %}` and delete `parts/week-of-classes.liquid`, `parts/class-seats.liquid`, `parts/day-name.liquid`, `data/classes/` and `blocks/services/services-strum-week-of-classes/`; "Classes" goes from `pages/programs/[programs].liquid`, the classes' lines from `parts/program-row.liquid` and `parts/programs-full.liquid`, the class from `parts/enroll-form.liquid`, `data/enrollments/`, its thanks and `scripts/prefill.js`. `parts/ways-to-learn.liquid` becomes the three lengths of `data/lesson-rates/`, and the hero's second promise or button follows.
- **Group classes only**: remove `{% render 'lesson-rates' %}` and delete `parts/lesson-rates.liquid`, `data/lesson-rates/`, "Private lessons at this age" on `pages/programs/[programs].liquid`, the private lesson in `parts/enroll-form.liquid` and `data/enrollments/`, and "Private lessons" in `parts/ways-to-learn.liquid`; the week's classes lead the page.

#### How are lessons priced?

- **By the term, or in four payments** (as built).
- **By the month**: in `data/lesson-rates/` the price becomes the month's ("$136", "a month, four lessons") and `features` empties; "or in four payments" goes from `/lessons`' introduction, `data/lessons-notes/by-the-term.md` and the form's "Paying" (`parts/enroll-form.liquid`, `payment` in `data/enrollments/`); `from_price` in `data/programs/` and the prices in `parts/ways-to-learn.liquid` follow.
- **In packs of lessons**, for a studio without terms: the records of `data/lesson-rates/` become packs of 5 and 10 lessons; the same lines change, and the calendar follows "All year round".

When removed: delete `pages/lessons.liquid`, `parts/lesson-rates.liquid`, `parts/week-of-classes.liquid`, `parts/paying.liquid`, `data/lessons-notes/`, `data/lessons-faq/`, `media/violin-neck.jpg`, the `lessons` navigation record and `blocks/footer/footer-strum-front-desk/data/lessons.md`. `data/lesson-rates/` stays: the program pages and the enrollment form read it. Point the two buttons of `parts/ways-to-learn.liquid` (`/lessons` and `/lessons#week`) to `/programs`, and remove "Lessons & prices" from `pages/programs/[programs].liquid`. If the programs' home section had become the week's classes, keep `parts/week-of-classes.liquid`.

### Teachers (`/teachers`)

Every teacher as a strung row with a portrait or initials, the instruments and ages they teach, a short biography, where they play, and a link to ask for them; a line on teaching here.

#### Can families ask for a teacher?

- **Yes** (as built): "Ask for Linh" fills the free lesson form's teacher.
- **No, the desk matches them**: remove the link from `parts/teacher-row.liquid`, the teacher's field from `parts/trial-form.liquid`, `parts/enroll-form.liquid` and `blocks/forms/forms-strum-free-lesson/block.liquid`, `teacher` from `data/trial-lessons/`, `data/enrollments/` and both thanks, and "teacher" from the list in `scripts/prefill.js`; "Ask for one in the first lesson's form" goes from `blocks/team/team-strum-teacher-rows/block.liquid`.

#### Who appears on the page?

- **Every teacher by name** (as built).
- **A few lead teachers**: three or four records in `data/team/`, and "and ten more teachers" in the page's introduction.
- **One teacher, alone**: the page becomes "Your teacher", with one portrait large, adapted from the gallery's `team-founder-featured`; on the home page `parts/teachers-band.liquid` becomes a short note; "Teachers for this age" goes from `pages/programs/[programs].liquid` and the teacher from both forms.

When removed: delete `pages/teachers.liquid`, `parts/teacher-rows.liquid`, `parts/teachers-band.liquid` and its render in `pages/index.liquid`, the `teachers` navigation record and `blocks/footer/footer-strum-front-desk/data/teachers.md`. `data/team/` with its photos, `parts/teacher-row.liquid` and `parts/portrait.liquid` stay for the program pages and the forms.

### Concerts (`/concerts`)

The recitals and concerts as strung rows with their day large, how playing in a recital works, the free first lesson, and a page per concert with its running order and past years' photos.

#### A page for each concert?

- **Yes** (as built).
- **The list only**: delete `pages/concerts/[concerts].liquid`; in `parts/concert-row.liquid` the title loses its link and "Details" goes; the fields `summary`, `cover`, `running_order`, `sign_up_by`, `photos` and `body` of `data/concerts/` go, with the media named below.

#### Are the concerts free?

- **Free, but one** (as built): "Free" on each, and one at the door.
- **Tickets at the door**: each concert's `price`; rewrite the introduction of `parts/concerts-band.liquid` and the description of `pages/concerts/index.liquid`.
- **Tickets on an outside page**: ask for each address and put it in `booking`, which adds "Tickets" to the row and the page.

When removed: delete `pages/concerts/`, `parts/concerts-band.liquid` and its render in `pages/index.liquid`, `parts/concert-rows.liquid`, `parts/concert-row.liquid`, `parts/playing.liquid`, `data/concerts/`, `data/recital-notes/`, `blocks/events/events-strum-concert-rows/`, the `concerts` navigation record, `blocks/footer/footer-strum-front-desk/data/concerts.md`, and the media only the concerts show: `recital-stage.jpg`, `cello-bow.jpg`, `viola-scroll.jpg`, `cymbals.jpg`, `drummer.jpg`, `electric-guitar.jpg`, `spotlight.jpg`, `luminarias.jpg`, `strumming.jpg` and `violin-hand.jpg` (`recital-trio.jpg` stays for the home page). The calendar keeps the concerts as dates.

### Calendar (`/calendar`)

The school year term by term, its breaks, make-up Saturdays and concerts, with today's week marked, and the front desk's hours.

#### How is the school year divided?

- **Two terms and a summer** (as built).
- **Three terms**: a third heading in `parts/school-year.liquid`, and its choice in `term` of `data/dates/_datasource.yaml`.
- **All year round, by the month**: `parts/school-year.liquid` becomes one list of `data.dates` with no headings; `data/dates/` keeps the closures, the concerts and enrollment, and loses `term`. The strip, the term at a glance's label and heading, and "Enroll for spring" no longer name a term.

When removed: delete `pages/calendar.liquid`, `parts/school-year.liquid`, `parts/term-rows.liquid` and the `calendar` navigation record. `data/dates/`, `parts/date-row.liquid` and `parts/date-span.liquid` stay for the home page's term at a glance, whose button to `/calendar` goes (`parts/term-at-a-glance.liquid`, `blocks/features/features-strum-term-at-a-glance/block.liquid`). `parts/desk-hours.liquid` stays for `/about`.

### Rentals (`/rentals`)

The instruments to rent with their sizes and monthly prices, which violin size, how renting works, the request form and questions.

#### How do families get an instrument?

- **The school rents them** (as built), with the request form.
- **Through a music store nearby**: ask for its name and address. The page keeps its title and one note with the store's link; everything under the title goes, with the files named below but the page itself, its navigation record and `parts/rentals-strip.liquid`, whose button then says "Where to rent".

When removed: delete `pages/rentals.liquid`, `parts/rental-rows.liquid`, `parts/violin-sizes.liquid`, `parts/renting-steps.liquid`, `parts/rental-form.liquid`, `parts/rentals-strip.liquid` and its render in `pages/index.liquid`, `data/rentals/`, `data/violin-sizes/`, `data/rental-steps/`, `data/rentals-faq/`, `data/rental-requests/`, `fragments/rental-requests-thanks.liquid`, `blocks/products/products-strum-rentals/`, the `media/rental-*.webp` images and the `rentals` navigation record. The second promise (`data/promises/rent-one-here.md`, and the hero block's) changes to another true one ("Groups of eight at most"); "instrument rental" goes from the two descriptions of `pages/index.liquid`, "No instrument at home? Rent one here" from `pages/programs/[programs].liquid`, the rental box from `parts/enroll-form.liquid` and `rental` from `data/enrollments/`, and "instrument" from the list in `scripts/prefill.js`; delete `scripts/sizes.js`.

### Start (`/start`)

Two ways in, the free first lesson's form in four parts with its aside, the enrollment form for the next term, and a line to call the desk. Its forms follow how a new student starts and how families enroll, chosen with the home page.

#### Do returning students re-enroll on the site?

- **Yes, with the form** (as built).
- **No, the desk calls them**: "Coming back?" becomes one line, "The desk calls every family before the term", and the enrollment form goes, with the files and links named under "How do families enroll and pay?".

When removed: delete `pages/start.liquid`, `parts/trial-form.liquid`, `parts/enroll-form.liquid`, `data/trial-lessons/`, `data/enrollments/`, `fragments/trial-lessons-thanks.liquid`, `fragments/enrollments-thanks.liquid`, `blocks/forms/forms-strum-free-lesson/`, the `start` navigation record and `blocks/footer/footer-strum-front-desk/data/start.md`. Every link to `/start` becomes "Call the desk" (`tel:`): `parts/header.liquid` (twice), `parts/term-strip.liquid`, `parts/hero.liquid`, `parts/first-lesson-band.liquid`, `parts/first-lesson-line.liquid`, `parts/footer.liquid`, `parts/fund-band.liquid` (and its "Ask on the enrollment form" becomes "Ask the desk"), `parts/class-seats.liquid` (the waitlist), `parts/teacher-row.liquid` ("Ask for", which goes, as "Ask for one in the first lesson's form" from the block `team-strum-teacher-rows`), `pages/programs/[programs].liquid` (three), `cta` and `href` in `data/lesson-rates/` (the button of each rate), and the blocks `hero-strum-start-at-four`, `banner-strum-term-strip` and `footer-strum-front-desk`. `data/first-lesson-steps/` and `data/lessons-notes/courtyard-fund.md` no longer speak of a form; "Book a free lesson" goes from the introduction of `pages/programs/index.liquid`, "the free lesson" from `data/program-faq/is-four-too-young.md` and `which-instrument-first.md`. `scripts/prefill.js` stays for the rental request; without rentals it goes too.

### About (`/about`)

The motor court's story, which door is which, the founders, the fund, the desk's hours with the address, and how to find the school.

#### Does the school help with tuition?

- **Yes, from its own fund** (as built): the band on `/about` and `/lessons`, and the enrollment form's box.
- **Yes, and it takes gifts**: ask for the outside giving page's address and add "Give to the Fund" beside the button of `parts/fund-band.liquid`.
- **No**: delete `parts/fund-band.liquid` and its renders in `pages/about.liquid` and `pages/lessons.liquid`, `data/lessons-notes/courtyard-fund.md`, the box in `parts/enroll-form.liquid`, `fund` in `data/enrollments/` and its line in `fragments/enrollments-thanks.liquid`; the teachers' concert (`data/concerts/teachers-play.md`, `data/dates/teachers-play.md`) says what it pays for.

#### Who appears on the page?

- **The founders** (as built), with their portraits or initials and their own words.
- **Nobody by name**: delete `parts/founders.liquid` and its render, and the names in `parts/story.liquid`.

When removed: delete `pages/about.liquid`, `parts/story.liquid`, `parts/rooms.liquid`, `parts/founders.liquid`, `parts/getting-here.liquid`, `data/rooms/`, `data/getting-here/`, `media/motel-neon.jpg`, `media/sandia.jpg` and the `about` navigation record (`media/room-12.webp` stays for the little ones' program). `parts/fund-band.liquid` stays for `/lessons` and `parts/desk-hours.liquid` for `/calendar`; nothing else links here, and the footer keeps the address and the desk's hours.
