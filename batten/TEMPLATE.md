# Batten

Batten is the website of a theater's season, told the way a stage changes scene. A flat magenta portal frames every page and never moves; each production is a painted cloth that comes down from the flies on its pipe as the visitor scrolls, lands at its trim and swings a little, in front of the last; each new page comes down the same way. Around that: the season at a glance by month, every production's page with its cast and credits set as a program, an access performance of each kind for every play, a subscription asked for with a form, the building, the classes and the ways to give. It was written for Bottineau Rep, a repertory company of twelve actors in a 1912 sash factory in Northeast Minneapolis, with a season of six plays; it suits a regional or repertory theater, a touring company, a Shakespeare festival, an opera or dance company's season, a children's theater, a puppet or physical theater company, or a community theater with a season of plays. Keep the structure; rewrite the productions and their credits, the stages, the prices and packages, the company, the programs and the city.

## How it is made

- Every page shares the portal (`parts/header.liquid`: the magenta header piece with the name, the links of `navigation` whose `place` is `both` or `header`, the "Box office" button from the record whose `place` is `button`, a menu button below 1024 px; the fixed legs, `.portal-legs`, drawn again as the body's own borders) and the footer (`parts/footer.liquid`, on flies black: the address, phone and email, the box office's `hours`, the links, and `data-tz`, the theater's time zone).
- `productions` drives the site: the home page's flies (`parts/flies.liquid`), the in-rep band (`parts/in-rep.liquid`), the season at a glance (`parts/at-a-glance.liquid`), the season's list (`parts/productions-list.liquid`), the access table (`parts/access-table.liquid`), each production's page (`pages/season/[productions].liquid`, with `parts/production-cloth.liquid`, `parts/program.liquid` and `parts/next-cloth.liquid`), and the play lists of both forms. One record changes all of them. `cast` and `creative` are lists of "Role / Name"; an actor whose name is a record of `company` links to the company page.
- The other lists: `company` (the ensemble and the staff, by `group`: the home page's billing block and the company page), `hours` (the footer, the home page, the visit page, the subscription aside), `home-doors`, `ticket-prices` and `season-faq` (season), `packages`, `subscriber-perks` and `subscribe-faq` (subscribe), `access`, `access-performances`, `getting-here`, `visit-notes` and `visit-faq` (visit), `programs` (learn), `giving`, `support-figures` and `funders` (support), `navigation`. Collected: `subscriptions` (answered by `fragments/subscriptions-thanks.liquid`), `matinee-requests` (`fragments/matinee-requests-thanks.liquid`), `ushers` (`fragments/ushers-thanks.liquid`) and `newsletter` (`fragments/newsletter-thanks.liquid`).
- Shared parts take their texts as arguments: `page-title` (label, title, text), `faq` (items, label, title, columns), `notes` (items, label, title, image).

## When adapting

- The name (Bottineau Rep) is in `parts/header.liquid`, `parts/footer.liquid` (twice), the hero's label, the story on the company page and every page's title; "the Sash Works" (the building) is in the hero's sentence, the visit page, `parts/story.liquid`, `parts/building.liquid` and some records (`visit-notes`, `access`, `funders`). The address, the phone ((612) 555-0163) and the emails (`@bottineaurep.example`) are in the footer, the hero, `parts/visit-home.liquid`, `parts/box-office.liquid`, `parts/access-visit.liquid`, `parts/prices.liquid`, the production page, `parts/subscription-form.liquid` and `programs`: change them together.
- Set `data-tz` on the footer to the maker's city's time zone ("America/New_York", "Europe/London"), so the tags (On now, Next, On sale, Closed) and today's line follow the theater's clock.
- The productions are facts: their titles, authors, directors, dates, times, prices and access performances. Ask for them; until given, keep the examples and say so. Dates go in the records only, as dates (`opens`, `opening`, `closes`); the cloths, the bars, the rows and the tags follow. The two stages are the choice `stage` in `data/productions/_datasource.yaml` and the lanes in `parts/at-a-glance.liquid` ("Mainstage,The Loft"): change both together, or keep one lane.
- A production's `photos` are the shop's (a paint frame, a set model, the rail), not the play's, and its `photos_note` says so: when the maker gives the production's own photos, replace both together, and never call the shop's photos the production's.
- The cloths are generated paintings in grays (`media/cloth-*.webp`): replace a cloth with the production's own key art or a rehearsal photo when the maker gives one, and otherwise keep the generated cloth; never say it shows the set. A new production without a picture shows the black weave in its place.
- The twelve actors (and the casts that name them), the guest directors and designers, the funders and the support figures are invented: ask for the real company, or keep the actors' initials and remove the names; remove the funders and the figures until given. Never keep them as facts of the maker's.
- Every "Tickets" button goes to the record's `tickets` (the production's page at the outside box office) and "Box office" to the `box-office` navigation record: ask for these addresses, never invent them. A production with no `tickets` loses its button.
- Prices, packages and the pay-what-you-can line are facts: ask, or keep them and say so. "From $132" is also in the hero's button and the magenta band (`parts/subscribe-band.liquid`).
- The home page's line "See both on a Saturday: Hedda at 2, Short Days at 7:30" (`parts/in-rep.liquid`) and the hero's "First up" line and "September 9 to May 21" are written, not computed: rewrite them with the season.

## Pages

### Home (`/`)

The black statement cloth flown in on load, the season's six cloths flown in one by one with their rail of cues, the two plays in rep, the magenta subscription band, the company's billing block, beyond the stage, the box office's hours and address, support and the monthly email.

#### How do people buy tickets?

- **At an outside box office** (as built): each production's `tickets` is its page there, and "Box office" in the header is the box office's home (the `box-office` navigation record). Ask for these addresses; leave `tickets` empty, its button gone, until given.
- **With a request the box office confirms**: add a collected `ticket-requests` (the production as text, the date, the performance, how many seats, an under-30 or access seat as a choice, name, email and phone, answered by `fragments/ticket-requests-thanks.liquid`: "We'll call to confirm your seats and take payment"), and a form "Ask for tickets" with `id="tickets"` on the production page, in the shape of `parts/matinee-form.liquid`, its production set by a hidden input of `record.title`. Point every "Tickets" button (`parts/flies.liquid`, `parts/production-cloth.liquid`, `parts/productions-list.liquid`, the tabs and the dates on `pages/season/[productions].liquid`) to `/season/<id>#tickets`, and the `box-office` record to `/season#tickets`, with a short form of its own on the season page.
- **By phone and at the door**: every "Tickets" button becomes "Call (612) 555-0163" with `tel:`; delete `tickets` from the records and the definition; the `box-office` record becomes the `tel:` link; add "Cash or card at the door from an hour before" to `parts/prices.liquid`.

#### Is it a repertory company?

- **One ensemble, two plays in rep** (as built): the in-rep band, the billing block of the ensemble and `in_rep_with`.
- **A producing theater with a cast for each play**: remove `{% render 'in-rep' %}` and `in_rep_with` (definition and records); the home page's `parts/billing.liquid` becomes "Who's in it this season", listing the actors named in the casts (`production.cast`) rather than `company`; `company` keeps the staff, and `pages/company.liquid` leads with `parts/staff.liquid`, without `parts/ensemble.liquid`.

#### Pictures in black and white?

- **Yes, the house color alone** (as built).
- **In their own colors**: for a company whose posters are its identity. Remove `bw` from the images and their frames (`img.bw`, `class="bw …"`) in every part and page; the cloths keep their scrim; say in the design notes that the house magenta stays the only flat color.

### The season (`/season`)

The season at a glance by month and stage, the productions as dated rows, the access performances on muslin, ticket prices and pay-what-you-can Thursdays, and questions; each production has its own page (`/season/<id>`): its cloth rising into the flies, the tabs, the overview and facts, dates and times, access, the cast and credits on muslin, photos, content advisories, and the next production's cloth.

#### How is the season laid out?

- **At a glance by month, then a row per production** (as built).
- **By night**: for a box office that sells night by night. Add a `performances` collection (date, time, the production as a choice of the titles, `access` as a list with choices ASL, AD, OC, RP, PWYC) and a calendar of performances in place of `{% render 'productions-list' %}` on `pages/season/index.liquid`: a table by date, as in the gallery's `events/events-agenda-table`. The season at a glance stays above it.

#### How are access performances given?

- **A dated performance of each kind for every play** (as built): `asl`, `described`, `captioned` and `relaxed` on each record; the access table and the four lines of each production's page.
- **Captions and description at every performance**: remove those four fields from the definition and the records, `{% render 'access-table' %}` from the season page and the access section's list from `pages/season/[productions].liquid`; in their place one line: "Every performance is captioned and audio-described; tell the box office when you book." Rewrite the hero-side line in `parts/visit-home.liquid` and `data/access-performances/`.

When removed: delete `pages/season/` (both files), `parts/at-a-glance.liquid`, `parts/productions-list.liquid`, `parts/access-table.liquid`, `parts/prices.liquid`, `parts/production-cloth.liquid`, `parts/program.liquid`, `parts/next-cloth.liquid`, `data/season-faq/`, `data/ticket-prices/` and the `season` navigation record. The home page's flies and `productions` stay, and every link into the removed pages changes: the cloths lose "About the play" (`parts/flies.liquid`) and keep "Tickets"; `parts/in-rep.liquid` loses "About the play"; the hero's "First up" line (`parts/hero.liquid`) names the play without a link, or links to its cloth on the home page (`#uncle-vanya`); the pay-what-you-can program (`data/programs/pay-what-you-can-thursdays.md`) and "See the season" in the hero, already `#season`, lead to the home page's flies (`/#season`). The access performances move to the visit page: "Every play's access performances" in `parts/access-visit.liquid` points to nothing, so remove it and list each play's four dates there.

### Subscribe (`/subscribe`)

The four packages, what subscribers get, the subscription request on muslin with a stage-black aside to call instead, and questions.

#### How do people subscribe?

- **A request, set up by phone** (as built): the form posts to `subscriptions`; the box office calls back to choose the seats and take payment, as the form and its answer say.
- **On the box office's own page**: each package's `cta` becomes "Subscribe online" and its `href` the box office's subscription page; delete `parts/subscription-form.liquid`, `data/subscriptions/` and `fragments/subscriptions-thanks.liquid`, and its render on `pages/subscribe.liquid`.
- **A membership instead**: for a theater that moved from subscriptions to memberships. One record in `packages` ("Member", "$28 a month", "a ticket to every play and 20% off for friends"), the others deleted; the form's first field asks for the membership and the plays' checkboxes go; the hero's button and the magenta band say "Become a member".

When removed: delete `pages/subscribe.liquid`, `parts/packages.liquid`, `parts/perks.liquid`, `parts/subscription-form.liquid`, `data/packages/`, `data/subscriber-perks/`, `data/subscriptions/`, `data/subscribe-faq/`, `fragments/subscriptions-thanks.liquid` and the `subscribe` navigation record. The home page's magenta band (`parts/subscribe-band.liquid`) says "Tickets for every play are on sale now" and leads to `/season`; the hero's first button becomes "See the season".

### Visit (`/visit`)

The box office's hours and contacts, getting here, access at the building and what each access performance is (on muslin, `id="access"`), at the theater, and questions.

#### Where do you play?

- **One building, two stages** (as built).
- **In several venues**: a touring or itinerant company. Replace `parts/box-office.liquid` and `parts/getting-here.liquid` with "Venues", a list of a new `venues` collection (name, address, a directions link, access notes), in the shape of the gallery's `contact/contact-locations`; `stage` in `productions` becomes a choice of the venues' names, and the lanes of `parts/at-a-glance.liquid` follow; remove the building's facts (`parts/building.liquid`) from the company page.

When removed: delete `pages/visit.liquid`, `parts/box-office.liquid`, `parts/getting-here.liquid`, `parts/access-visit.liquid`, `parts/notes.liquid` if no other page renders it, `data/access/`, `data/access-performances/`, `data/getting-here/`, `data/visit-notes/`, `data/visit-faq/` and the `visit` navigation record. The footer keeps the address and the hours; every link to `/visit#access` (`parts/visit-home.liquid`, `parts/access-table.liquid`, the production page) points to `/season#access`, whose section gains the building's access facts in one paragraph.

### Learn (`/learn`)

The programs as ruled rows (the Teen Company, student matinees, classes, pay-what-you-can Thursdays, rail tours), each with whom it is for, when, its price and its own button, and the student matinee request on muslin.

#### How do schools book a matinee?

- **A request form** (as built): `parts/matinee-form.liquid` posts to `matinee-requests`.
- **By email**: the student matinees' button in `data/programs/` and `data/home-doors/` becomes a `mailto:` with the subject "Student matinee"; delete `parts/matinee-form.liquid`, `data/matinee-requests/` and `fragments/matinee-requests-thanks.liquid`, and its render on `pages/learn.liquid`.

When removed: delete `pages/learn.liquid`, `parts/programs.liquid`, `parts/matinee-form.liquid`, `data/programs/`, `data/matinee-requests/`, `fragments/matinee-requests-thanks.liquid` and the `learn` navigation record. Remove `{% render 'take-part' %}` and `data/home-doors/` from the home page; the pay-what-you-can line stays in the season's prices.

### Company (`/company`)

The company's story beside the building, the ensemble's portraits (initials until there are headshots), who runs it, the building's facts beside the fly tower, and auditions.

#### Who appears on the page?

- **The ensemble and the people who run it** (as built): the ensemble's twelve portraits or initials (`group: ensemble`) and four bios (`group: staff`).
- **The people who run it only**: for a producing theater (see the home page's choice). Remove `{% render 'ensemble' %}` and the ensemble's records; the billing block on the home page goes, and the casts link to nothing.

When removed: delete `pages/company.liquid`, `parts/story.liquid`, `parts/ensemble.liquid`, `parts/staff.liquid`, `parts/building.liquid`, `data/company/` and the `company` navigation record. Remove `{% render 'billing' %}` from the home page; the cast's names in `parts/program.liquid` stay as text (no `company` to link to); the building's facts move to the visit page as a list after the box office.

### Support (`/support`)

The three ways to give, what giving paid for last season, the ushers' sign-up on muslin, and the funders as typographic wordmarks.

#### How do people give?

- **On an outside giving page** (as built): "Give" (`parts/support-band.liquid`) and the giving records' `href` lead there. Ask for its address; the line sets' sponsorship is asked for by email.
- **With a pledge, confirmed by phone**: add a collected `pledges` (the way to give as a choice of the giving records' names, the amount, name, email and phone), answered by `fragments/pledges-thanks.liquid` ("We'll call to thank you and take your gift"), and a form in the shape of `parts/ushers-form.liquid` after `{% render 'giving' %}`, `id="pledge"`; point every giving record's `href` and "Give" to `#pledge`.
- **By check and by phone**: give once shows the mailing address and the phone in its `description`, its button removed; the other two keep "Write to us" (`mailto:`).

When removed: delete `pages/support.liquid`, `parts/giving.liquid`, `parts/figures.liquid`, `parts/ushers-form.liquid`, `parts/funders.liquid`, `data/giving/`, `data/support-figures/`, `data/funders/`, `data/ushers/`, `fragments/ushers-thanks.liquid` and the `support` navigation record. Remove `{% render 'support-band' %}` from the home page.
