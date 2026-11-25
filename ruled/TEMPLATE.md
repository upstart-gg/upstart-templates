# Ruled

Ruled is the site of a course taught live to a cohort on set dates. It reads like the syllabus handed round on the first evening: numbered, ruled weeks, each with its dates, and beside them the cohort's calendar; pointing at a week lights its evenings in highlighter, and pointing at an evening lights its week. Nothing else moves, and there is no script. It was written for The Slow Draft, six weeks of live evenings in the personal essay taught by Hollis Ouellette from Burlington, Vermont; it suits any course a group follows on a calendar: a photography, drawing or design cohort, a coding or data bootcamp, a language course, a cooking series, a choir's or a pottery studio's term, a book-writing program, a reading group with a syllabus. Keep the structure, the dated syllabus and the one mark a section; rewrite the weeks, the cohorts, the tuition, the readings, the teacher and the place.

## How it is made

- Every page shares the header (`parts/header.liquid`: the name, the links of `navigation` whose place is both or header, the "Ask for a place" button, a menu button below 1024 px) and the footer (`parts/footer.liquid`: the name and a sentence, the waitlist field of `parts/waitlist-strip.liquid`, the first three `cohorts`, `navigation` with its social link, the email and the phone).
- `cohorts` fills the hero's facts line, the outcomes' date, the tuition card, the waitlist band and the closing call, the cohorts table and the forms' choices on `/enroll`, the syllabus page's line and the footer. The cohort shown is the first whose status is enrolling, or else the first one; the waitlist is the first whose status is waitlist.
- `weeks` fills the home page's six weeks, `/syllabus` and the headings of `/readings`; `parts/cohort-calendar.liquid` builds the calendar from its dates. `readings` hangs from them by `week`, a number.
- `essays` shows on the home page and `/about`; `home-included` on the home page's tuition card and the form's aside; `notes` on `/notes` with a page per note. `home-outcomes`, `home-evening`, `home-fit` and `home-faq` belong to the home page, `syllabus-figures`, `syllabus-between` and `syllabus-needs` to `/syllabus`, `enroll-faq` to `/enroll`, `about-teaching` and `about-milestones` to `/about`.
- Two forms collect records: `requests` (`parts/request-form.liquid`) and `waitlist` (`parts/next-cohort.liquid`, `parts/waitlist-form.liquid`, `parts/waitlist-strip.liquid`), answered by the two files of `fragments/`.

## When adapting

- The course's name (The Slow Draft) is in `parts/header.liquid`, `parts/footer.liquid` (twice), `parts/teacher.liquid`, `parts/story.liquid`, the titles of every page, `pages/notes/index.liquid`'s description and the footer's block. The teacher's name (Hollis Ouellette, she) is in `parts/teacher.liquid`, `parts/story.liquid`, `pages/index.liquid`, `pages/about.liquid` and `pages/notes/index.liquid`; her first name also in `parts/hero.liquid` (the caption), `parts/request-form.liquid`, `parts/enroll-questions.liquid`, `parts/write-to-hollis.liquid`, `pages/enroll.liquid`, `fragments/requests-thanks.liquid`, and records of `weeks`, `home-outcomes`, `home-evening`, `home-included`, `home-faq`, `syllabus-between`, `enroll-faq`, `about-milestones` and `requests`. "How she teaches" is in `parts/teaching.liquid`, "She holds your place" in `pages/enroll.liquid`.
- The place (Burlington, Vermont, North Street, Winooski) is in `parts/hero.liquid`, `parts/footer.liquid`, `parts/teacher.liquid` (the papers), `parts/story.liquid`, `pages/index.liquid` and records of `weeks`, `essays` and `about-milestones`; its sugaring is week four and a note. The email is in `parts/footer.liquid`, `parts/write-to-hollis.liquid` and `parts/enroll-questions.liquid`; the phone and its hours in `parts/footer.liquid`, `parts/write-to-hollis.liquid` and `parts/request-form.liquid`; Instagram in `data/navigation/instagram.md`.
- Dates, places left, the tuition, the weeks' titles and the readings are facts: ask for them once the page is built, or leave them out rather than guess. `places_left` stays empty unless the maker gives the number. Type the next cohort's dates once, in `cohorts`, and the weeks' in `weeks`; the calendar follows.
- A few facts are written in sentences and change with the records: "Six weeks, twelve evenings" and the days in `parts/six-weeks.liquid`; "Twelve evenings", "thirteen other writers" and "by the end of February" in `parts/hero.liquid`; "The winter cohort's calendar" and the time zones line in `parts/cohort-calendar.liquid`; "Four places", "from $200" in `parts/tuition.liquid`, `parts/pay-what-you-can.liquid` and `parts/request-form.liquid`; the refunds in `parts/request-form.liquid` and `data/home-faq/money-back.md`; "Eleven essays" in `pages/readings.liquid`; "fourteen" in `parts/bring-your-own.liquid`, `parts/teacher.liquid` and `data/home-faq/recordings.md`; the descriptions of `pages/index.liquid`, `pages/syllabus.liquid` and `pages/readings.liquid`. The time zones line follows the maker's own zone.
- The essays of "What they wrote" are invented and never stay: ask for real first lines, given with their writers' permission, or delete `parts/essays.liquid`, its renders in `pages/index.liquid` and `pages/about.liquid`, `data/essays/` and `blocks/testimonials/testimonials-ruled-first-lines/`. Hollis's quote and her story go the same way: the maker's own words, or a plain line.
- The marker's photo stands in for the teacher's portrait; replace it when the maker sends one, and without any photo set the teacher's initials in Gelasio on `bg-secondary`. The hero's photo is a desk that is not the maker's: its caption goes if it stays.
- The blocks in `blocks/` repeat the parts and records they were made from: what changes in a part or a record changes in its block. Each kind has one, so a choice below names it by its kind.

## Pages

### Home (`/`)

A wide picture of the desk, then the headline and the cohort's facts on one line beside the button; what a writer leaves with; the six weeks beside their calendar; an evening of the course; past cohorts' first lines; the teacher; who it's for; the tuition; questions; the next cohort's waitlist.

#### How do writers enroll?

- **They ask for a place, and you send a payment link** (as built): the form on `/enroll` collects requests in the Content tab, and you answer by email. Every "Ask for a place" leads to `/enroll#ask`. Nothing to change.
- **On your own checkout** (a payment link, Teachable, Podia, Maven): ask for its address, never invent it. Every "Ask for a place" becomes "Enroll" and links to it: `parts/header.liquid` (twice), `parts/hero.liquid`, `parts/tuition.liquid`, `parts/story.liquid`, `parts/closing.liquid`, `data/navigation/enroll.md`, and the hero, pricing and footer blocks. In `pages/enroll.liquid` the title, its text and the descriptions follow. `parts/request-form.liquid` keeps its section and its aside, with one large "Enroll" button in place of the form; in `parts/cohorts-table.liquid` the enrolling cohort's link leads to the checkout. Delete `data/requests/`, `fragments/requests-thanks.liquid` and `blocks/forms/forms-ruled-request/`. "In the form" goes from `parts/pay-what-you-can.liquid` and from `captions.md`, `employer.md` and `time-zone.md` of `data/enroll-faq/`.
- **By application**, for a course that chooses its writers: in `parts/request-form.liquid` and `blocks/forms/forms-ruled-request/block.liquid` add "Your first page" (a textarea, `first_page`, up to 3,000 characters) and "Why now?" (`why_now`) to part 2, and both fields to `data/requests/_datasource.yaml` and the block's. Every button says "Apply" (the files named above, and the form's own), the page's title and texts follow, `fragments/requests-thanks.liquid` and its copy in the block say when decisions come, "Enrollment closes" becomes "Applications close" in `parts/hero.liquid` and its block, and "Enrolling until" becomes "Apply by" in `parts/cohort-status.liquid`.

#### How is the course priced?

- **One price, with two payments and pay-what-you-can places** (as built).
- **Two levels**, with or without extra calls or feedback: `parts/tuition.liquid` becomes two cards (adapted from `apps/desktop/gallery/pricing/pricing-two-plans`, with the card's ink edge and second sheet kept), and `data/home-included/` gains `level`, a choice. In `parts/request-form.liquid` part 3 asks for the level, its aside names both prices, and `payment` in `data/requests/_datasource.yaml` takes the levels' names; the condition on `payment` in `fragments/requests-thanks.liquid` goes. Empty `tuition` and `plan` in `data/cohorts/` and the hero's price goes by itself. The pricing and forms blocks follow.
- **Free, or by donation**: empty `tuition` and `plan` in `data/cohorts/`; in `parts/tuition.liquid` the second sheet says "Free. Give what you can at the end, if you'd like." Remove part 3's payment and the aside's refunds from `parts/request-form.liquid` ("Anything Hollis should know?" stays, under "Anything else"), `payment` from `data/requests/_datasource.yaml`, `{% render 'pay-what-you-can' %}` from `pages/enroll.liquid` with `parts/pay-what-you-can.liquid`, and the payment link from `fragments/requests-thanks.liquid`, `pages/enroll.liquid` (its text and descriptions) and the messages of `data/requests/_datasource.yaml`. Delete `data/home-faq/money-back.md`, `data/enroll-faq/employer.md`, `data/enroll-faq/receipt.md` and `data/about-milestones/pay-what-you-can.md`. The hero, pricing and forms blocks follow.

#### Where does the cohort meet?

- **Live online** (as built): "On Zoom" in the facts, the time zones line, the captions.
- **In a room**: `format` in `data/cohorts/` becomes the place ("At the Old North End studio"), and "Eastern" goes from `schedule` with `zone`, and from `parts/six-weeks.liquid`. The time zones line goes from `parts/cohort-calendar.liquid`, and "on Zoom" from `parts/hero.liquid` and `pages/index.liquid`. A "Where we meet" section joins `pages/enroll.liquid` after the cohorts (adapted from `apps/desktop/gallery/contact/contact-find-us`, without its map placeholder). Delete `data/home-faq/what-time.md`, `data/home-faq/recordings.md`, `data/enroll-faq/time-zone.md` and `data/syllabus-needs/computer.md`; rewrite `data/enroll-faq/captions.md` (access to the room), `data/home-faq/miss-an-evening.md`, `data/home-included/evenings.md`, `data/home-fit/recordings-only.md`, "cameras off" in `data/home-evening/twenty-minutes.md` and the placeholder of `parts/request-form.liquid`. The hero, features, steps, pricing and forms blocks follow.

### Syllabus (`/syllabus`)

Each week in full, with its two sessions, its paragraph, its readings, its writing and its due day, beside the calendar; what a week asks, what happens between sessions, what you'll need, and a closing call.

#### How often does the cohort meet?

- **Twice a week** (as built): each week holds two sessions and, sometimes, a due day.
- **Once a week**: empty `second_date` and `second_title` in `data/weeks/`; the calendar shows one session a row. `sessions`, `days` and `schedule` in `data/cohorts/` follow ("6", "Thursdays"), and so do the heading and the sentence of `parts/six-weeks.liquid`, "Twelve evenings" in `parts/hero.liquid`, the descriptions of `pages/index.liquid` and `pages/syllabus.liquid`, `data/home-included/evenings.md`, `data/home-fit/three-hours.md`, `data/syllabus-figures/evenings.md`, `data/syllabus-needs/printer.md`, and `the-talk.md` and `one-page.md` of `data/home-evening/`. The hero, features, steps and pricing blocks follow.
- **An intensive, every weekday for two weeks**: `data/weeks/_datasource.yaml` gains `third_date` and `third_title` to `fifth_date` and `fifth_title`; add "third", "fourth" and "fifth" to `slots` in `parts/cohort-calendar.liquid`, the same dates to `parts/week-dates.liquid` and the same lines to the list in `parts/whole-syllabus.liquid`. The files named above follow, and in `parts/evening.liquid` the label and the heading become the day's ("What a day looks like"), as in its block; the features block takes the new fields.

When removed: delete `pages/syllabus.liquid`, `parts/whole-syllabus.liquid`, `parts/week-figures.liquid`, `parts/between-sessions.liquid`, `parts/needs.liquid`, `parts/closing.liquid`, `data/syllabus-figures/`, `data/syllabus-between/`, `data/syllabus-needs/`, `media/notebook.jpg`, the `syllabus` navigation record and `blocks/footer/footer-ruled/data/syllabus.md`; `summary`, `writing` and `readings` go from `data/weeks/`, and `schedule` from `data/cohorts/` (the features and hero blocks too). The home page's six weeks stay: in `parts/six-weeks.liquid` and `blocks/features/features-ruled-linked-syllabus/block.liquid` the week's title loses its link and "Read the whole syllabus" goes.

### Enroll (`/enroll`)

The next cohorts as a ruled table, the request for a place in three parts with its aside, the pay-what-you-can note, the waitlist and questions. Its form follows how writers enroll, and its prices how the course is priced, chosen with the home page.

#### Are there pay-what-you-can places?

- **Yes, a few in every cohort** (as built): the note, the form's choice and the tuition card's line.
- **No**: delete `parts/pay-what-you-can.liquid`, its render in `pages/enroll.liquid` and `data/about-milestones/pay-what-you-can.md`; remove the third choice of part 3 from `parts/request-form.liquid`, "A pay-what-you-can place" from `payment` in `data/requests/_datasource.yaml`, its condition from `fragments/requests-thanks.liquid` and the line from `parts/tuition.liquid`. The pricing and forms blocks follow. `data/enroll-faq/` gains "Do you offer scholarships?" only if the maker has one.

When removed: delete `pages/enroll.liquid`, `parts/cohorts-table.liquid`, `parts/request-form.liquid`, `parts/pay-what-you-can.liquid`, `parts/waitlist-form.liquid`, `parts/enroll-questions.liquid`, `data/requests/`, `data/enroll-faq/`, `fragments/requests-thanks.liquid`, `blocks/forms/forms-ruled-request/`, the `enroll` navigation record and `blocks/footer/footer-ruled/data/enroll.md`. Every "Ask for a place" leads to the email (`mailto:`, with the cohort's name as its subject) or the checkout: `parts/header.liquid` (twice), `parts/hero.liquid`, `parts/tuition.liquid`, `parts/story.liquid`, `parts/closing.liquid` (whose "Read the questions" goes), and the hero and pricing blocks. The waitlist stays in the home page's band, the footer and the notes; the cohorts stay in the footer.

### Readings (`/readings`)

The reading list, grouped by week: each essay's title and year, its author, where it was collected and why it is read; then the essay each writer brings.

#### How do writers get the readings?

- **From a library, the rest in a PDF** (as built): titles, authors and where they were collected.
- **Linked to free texts**: `data/readings/_datasource.yaml` gains `link`, filled only with a copy the maker may point to (a public-domain text, the publisher's own page), and in `parts/reading-list.liquid` the title becomes that link (`.link-mark`) when it is filled. The text of `pages/readings.liquid` and `data/home-included/reading-list.md` (and its copy in the pricing block) follow.
- **Titles only, sent once enrolled**: empty `collected_in` and `why` in `data/readings/`; the text of `pages/readings.liquid` says "The full list comes with your place", and `data/home-included/reading-list.md` (and its copy in the pricing block) follows.

When removed: delete `pages/readings.liquid`, `parts/reading-list.liquid`, `parts/bring-your-own.liquid`, `data/readings/`, the `readings` navigation record and `blocks/footer/footer-ruled/data/readings.md`. In `parts/whole-syllabus.liquid` the weeks keep their readings' titles, unlinked; `data/home-included/reading-list.md` stays if the course still has a list.

### Notes (`/notes`)

Short letters on drafting by date, and a page per note with its cover, its text, the other notes and the waitlist.

#### What are the notes?

- **Short letters by the teacher** (as built).
- **Essays from past cohorts**, with their writers' permission: each note becomes one essay in full. `data/notes/_datasource.yaml` gains `writer` and `cohort`, shown under the title in `pages/notes/[notes].liquid`; the page is named "Essays" in `pages/notes/index.liquid`, `data/navigation/notes.md` and `blocks/footer/footer-ruled/data/notes.md`, "More notes" and "The course is these letters, with company." change in `pages/notes/[notes].liquid`; `data/essays/` gains `link`, and in `parts/essays.liquid` and the testimonials block each first line with one becomes a link to its essay.

When removed: delete `pages/notes/`, `parts/notes-list.liquid`, `parts/note-rows.liquid`, `data/notes/`, `media/after-dinner.jpg`, `media/mailbox.jpg`, `media/pencil-shavings.jpg`, `media/sap-buckets.jpg`, the `notes` navigation record and `blocks/footer/footer-ruled/data/notes.md`; the styles of `.prose-ruled` go from `styles/site.css`. The waitlist field stays in the footer, and nothing else links here.

### About (`/about`)

The teacher's story beside the lake over the roofs, how she teaches in four lines, the course so far by year, what past cohorts wrote, and how to write to her.

#### Who teaches?

- **One teacher** (as built): her story, how she teaches, the course so far.
- **Two or more**: "Who teaches" (adapted from `apps/desktop/gallery/team/team-bio-rows`, over a new `data/team/`) replaces `{% render 'story' %}` in `pages/about.liquid`, and `parts/story.liquid` and `media/rooftops.jpg` go. `parts/teacher.liquid` shows them side by side, `parts/hero.liquid` (and its block) and the descriptions of `pages/index.liquid`, `pages/about.liquid` and `pages/notes/index.liquid` name them, `data/navigation/about.md` and its copy in the footer block say "Teachers", and the sentences that name Hollis say who does what.

When removed: delete `pages/about.liquid`, `parts/story.liquid`, `parts/teaching.liquid`, `parts/milestones.liquid`, `parts/write-to-hollis.liquid`, `data/about-teaching/`, `data/about-milestones/`, `media/rooftops.jpg`, the `about` navigation record and `blocks/footer/footer-ruled/data/about.md`. In `parts/teacher.liquid` "About Hollis" becomes "Read the whole syllabus" to `/syllabus`, or goes if that page goes too; `parts/essays.liquid` stays for the home page.
