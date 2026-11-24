# Spindle

Spindle is the website of a neighborhood restaurant open for lunch and for supper, read like its own counter: its name set huge across the first screen with a cut-out plate of food standing in front of it, the day's specials typed on tickets that slide onto a steel rail ("86" when one is gone), and the week as a staff time card with a lunch shift and a supper shift a day. Under them are the two menus side by side, the Friday fish fry, the regulars by stool number, booths asked for with a form, pickup orders paid at the side door, and a back room for hire. It was written for Halina's, a 1926 corner restaurant in Lincoln Village, Milwaukee, with the Polish and Mexican cooking of its street; it suits a diner, a luncheonette or lunch counter, a family restaurant, a supper club, a bistro or trattoria, a taquería with a dining room, a Polish, Hungarian or German restaurant, a deli that serves supper, a soul food kitchen, or any restaurant whose specials change every day. Keep the structure; rewrite the dishes and the specials, the two services and their hours, the rooms, the people, the regulars and the town.

## How it is made

- Every page shares the header (`parts/header.liquid`: the name from `parts/logo.liquid`, the pages from `navigation`, a "Reserve a booth" button; a Menu button below 1280 px) and the footer (`parts/footer.liquid`, on booth teal: the name, the address, phone and email, the two services in a line each, the links).
- `parts/ticket-rail.liquid` draws the specials, in `parts/rail.liquid` on the home page and `parts/rail-short.liquid` on the menu page: one edit changes both. `parts/time-card.liquid` draws the week, in `parts/services.liquid` (home) and `parts/hours-large.liquid` (Visit). `parts/page-title.liquid`, `parts/steps.liquid` and `parts/faq.liquid` are shared by several pages, which pass them their texts and lists.
- Every "Reserve a booth" leads to `/reserve#booth`, every "Order pickup" to `/pickup#order`, every "Plan a party" and "Ask for this one" to `/private#request`.
- The lists and the pages that show them: `specials` (home, menu); `menu` (menu, and the home page where `featured`); `hours` (home, visit); `home-services` and `testimonials` (home); `fish-fry` (menu); `reserve-features` and `reserve-faq` (reserve); `pickup-steps` and `pickup-faq` (pickup); `private-plans`, `private-tasting`, `private-steps` and `private-faq` (private hire); `getting-here` and `visit-faq` (visit); `team` and `gallery` (our story); `navigation`. Three collected datasources take what visitors send: `bookings`, `pickup-orders` and `private-hire`, each answered by its fragment in `fragments/`.

## When adapting

- The name (Halina's) is in `parts/logo.liquid`, `parts/hero.liquid`, `parts/footer.liquid` (three times), `parts/time-card.liquid`, `parts/mondays.liquid`, `parts/story.liquid`, the titles and descriptions of every page, the intro of `pages/private.liquid`, and in `data/menu/pierogi-plate.md`, `data/specials/chicken-paprikash.md` and `data/team/bernie-sobczak.md`. In `parts/hero.liquid`, set `--chars` in the section's `style` to the maker's name, counted as the design notes say. Over 12, set the name on two lines (a `<br>` between its words) and `--chars` to the longer line.
- The address (14 Tamarack Court, at Lincoln Avenue, Milwaukee, WI 53215) is in the header's menu, the footer and `parts/finding-us.liquid` (the last two with a "Get directions" link to a map search for it: change it there too); the street and the side door are also named in `parts/hero.liquid`, `parts/pickup-strip.liquid`, `parts/pickup-form.liquid`, `pages/pickup.liquid`, `pages/visit.liquid`, `data/pickup-steps/pick-up.md`, `data/pickup-faq/side-door.md`, `data/getting-here/`, `data/visit-faq/`, `data/testimonials/dolores.md` and `data/gallery/snow.md`. The neighborhood is in `parts/hero.liquid` and `pages/index.liquid`, the city in the titles of every page. The phone ((414) 555-0163) is in the header's menu, the footer, `parts/booth-form.liquid`, `parts/pickup-form.liquid`, `parts/private-form.liquid`, `parts/finding-us.liquid` and `parts/faq.liquid`; the email is in the footer.
- The hours and the days of each service, the prices, the specials, the pickup cutoffs (10:30 and 4), the rooms' sizes and minimums and the deposit are facts: ask for them, or keep the example and say so. The hours are typed in `hours`, `parts/hero.liquid`, `parts/footer.liquid`, the heads of `parts/two-menus.liquid`, `parts/fish-fry.liquid`, `parts/booth-form.liquid`, `parts/rail.liquid` ("come down at 2:30"), `data/specials/` and the intro of `pages/reserve.liquid`. Type times as the maker's visitors read them: 11–2:30, or 11:00–14:30 for a site in French, German or most of Europe, where the booth form's times (`parts/booth-form.liquid`, `fragments/bookings-thanks.liquid`) are 24-hour too.
- "86" is kitchen slang for a dish that has run out: on a site in another language, the strip in `parts/ticket-rail.liquid` says "Épuisé", "Ausverkauft" or the like, and so does the rail's line in `parts/rail.liquid`.
- The three regulars' quotes (`data/testimonials/`) are invented and never stay: ask for real ones, given with the regulars' permission, or remove `{% render 'regulars' %}` from `pages/index.liquid`.
- The story (Halina Nowak, 1961, the sign, 2009, 2022) is in `parts/story.liquid`, `parts/hero.liquid` ("under the same sign since 1961"), `parts/footer.liquid` and the description of `pages/about.liquid`: replace it with the maker's, or keep it short and true rather than guess.

## Pages

### Home (`/`)

The name huge on turquoise with a plate of pierogi in front of it and the two services under it, today's specials as tickets on the rail, the week as a time card beside three lines on the services, three cut-out dishes for a first visit, the regulars at the counter, the private hire band ("Closed Mondays. Unless it's your party."), and the pickup strip.

#### How do guests get a table?

- **Booths by request for supper, the counter walk-in** (as built): the form on `/reserve`; requests arrive in the Content tab and the restaurant confirms by text.
- **On an outside reservation page** (Resy, OpenTable, Tock): ask for its address, never invent it. Every "Reserve a booth" button links there and says "Book a table": the header's two (`parts/header.liquid`, beside the menu and inside it), the hero's (`parts/hero.liquid`) and the footer's (`parts/footer.liquid`). `/reserve` keeps how seating works and its questions, with one large link in place of `{% render 'booth-form' %}`; delete `parts/booth-form.liquid`, `data/bookings/` and `fragments/bookings-thanks.liquid`.
- **Walk-in only**: no reservations. Remove the Reserve page as its section says, except that its buttons become "Today's specials" (`/#rail`) in the header, and "Find us" (`/visit#finding-us`) in the hero and the footer; the hero's own "Today's specials" stays. The supper line of `data/home-services/` and the notes of `parts/hours-large.liquid` say "No reservations; the counter turns fast".

#### How many services a day?

- **Lunch and supper** (as built): two shifts on the time card, two menu cards, `service` on tickets and dishes.
- **One service** (lunch only, or supper only): `parts/time-card.liquid` keeps one shift's column; in `parts/two-menus.liquid` the list of services keeps one, and the grid one column (`max-w-3xl`); `service` loses the other choice in `data/menu/_datasource.yaml` and `data/specials/_datasource.yaml`, and its records go; the hero and the footer keep one line of hours; delete the other shift's line in `data/home-services/`, whose heading in `parts/services.liquid` ("Two services, six days") is rewritten.
- **Breakfast, lunch and supper**: add a `breakfast` field to `hours` and its column to `parts/time-card.liquid`; add `breakfast` to the choices of `service` in both datasources; add it to the list of services of `parts/two-menus.liquid`, with its name and hours, the grid `lg:grid-cols-3`; a third line of hours in the hero and the footer.

#### Is there a cut-out dish in front of the name?

- **Yes** (as built): an image with a transparent ground (PNG or WebP) stands in front of the name. A photo with its ground left on would cover the letters with a box: replace the plate only by another cut-out the maker sends; until then the template's own plate stays, or take the second option.
- **The name whole, a wide photo under it**: for a maker with no cut-out. Remove the `data-dish` image from `parts/hero.liquid` and give the field `pb-10`; between the field and the three columns, add a wide photo of the counter or the room (`aspect-[21/9] w-full rounded-box object-cover`) and take the columns' large top padding off.

### Menu (`/menu`)

Today's tickets again, the lunch card and the supper card side by side with their prices, the Friday fish fry with its plate, a line for allergies, and the way to pickup.

#### How do the specials change?

- **Every day, on the rail** (as built): the maker edits `specials` each morning and ticks "86" through the day.
- **Every week, by day**: for a kitchen that sets its specials on Mondays. In `data/specials/_datasource.yaml`, `service` gives way to `day` (a choice, Tuesday to Sunday) and the shift stays in `window`; `parts/ticket-rail.liquid` prints the day and the window ("Thu · supper"); the rail is headed "This week's specials" in `parts/rail.liquid` and `parts/rail-short.liquid`, its label and its line rewritten.

#### Do the dishes have pictures?

- **A few cut-outs** (as built): three featured dishes on the home page, and the fish fry's plate.
- **Photos in frames**: in `parts/first-time.liquid` and `parts/fish-fry.liquid`, the pictures become ordinary photos, `aspect-[4/3] rounded-box object-cover` in place of `data-cutout`.
- **No pictures**: in `parts/first-time.liquid` the picture's line goes and the names are set in `small-title`; in `parts/fish-fry.liquid` the picture's column goes and the text takes the whole width.

When removed: delete `pages/menu.liquid`, `parts/rail-short.liquid`, `parts/two-menus.liquid`, `parts/course-name.liquid`, `parts/fish-fry.liquid`, `parts/allergies.liquid`, `parts/pickup-band.liquid`, `data/fish-fry/` and the `menu` navigation record; "The whole menu" (`parts/rail.liquid`) goes, "See both menus" (`parts/first-time.liquid`) points to `/#rail`, and so does "the rail" in `data/pickup-faq/specials.md`. `menu` stays for the featured dishes.

### Reserve (`/reserve`)

How seating works in four notes, the request for a booth beside supper's nights, and questions in two columns. It follows how guests get a table, chosen with the home page.

#### Which tables can be reserved?

- **Booths for supper only** (as built).
- **Any table, at both services**: the time list of `parts/booth-form.liquid`, its panel, the choices of `time` in `data/bookings/_datasource.yaml` and `fragments/bookings-thanks.liquid` cover lunch too; the seating choice goes from the form and from `data/bookings/`; `data/reserve-features/counter.md` says "Walk-ins welcome when there's room", and "the counter is always walk-in, and so is lunch" leaves the page's intro.
- **Large parties only** (six or more): in `parts/booth-form.liquid` the guests start at six and have no limit of six; the buttons say "Reserve for six or more"; everyone else walks in, as the notes then say.

When removed: delete `pages/reserve.liquid`, `parts/seating.liquid`, `parts/booth-form.liquid`, `data/bookings/`, `fragments/bookings-thanks.liquid`, `data/reserve-features/`, `data/reserve-faq/` and the `reserve` navigation record; "Reserve a booth" becomes "Call for a booth" (`tel:`) in `parts/header.liquid` (twice), `parts/hero.liquid` and `parts/footer.liquid`; the supper line of `data/home-services/` says so too.

### Pickup (`/pickup`)

How pickup works in four steps, the order form beside the phone, and questions.

#### How do people order ahead?

- **A request, confirmed by text, paid at pickup** (as built): orders arrive in the Content tab.
- **On an outside ordering page** (Toast, Square, ChowNow): ask for its address, never invent it. "Order pickup" (`parts/pickup-strip.liquid`, `parts/pickup-band.liquid`) links there and says "Order online", and so does one large link in place of `{% render 'pickup-form' %}`; the steps and the questions stay, rewritten for it; delete `parts/pickup-form.liquid`, `data/pickup-orders/` and `fragments/pickup-orders-thanks.liquid`.
- **By phone only**: "Order pickup" becomes "Call to order" (`tel:`) in both parts, and the page's intro loses "or send it here"; delete the form as above, the phone set large in its place.

When removed: delete `pages/pickup.liquid`, `parts/pickup-form.liquid`, `parts/pickup-strip.liquid`, `parts/pickup-band.liquid`, `data/pickup-orders/`, `fragments/pickup-orders-thanks.liquid`, `data/pickup-steps/`, `data/pickup-faq/` and the `pickup` navigation record; remove `{% render 'pickup-strip' %}` from the home page and `{% render 'pickup-band' %}` from the menu page. `parts/steps.liquid` stays for private hire.

### Private hire (`/private`)

Three things to hire as rows with their minimums, the party menu with its price a guest, how it goes in four steps, the request, and questions.

#### What can be hired?

- **The back room, and the whole place on the closed day** (as built), with the counter for a birthday lunch.
- **The back room only**: delete `data/private-plans/whole-place.md` and `counter-birthday.md` with their cards in `parts/private-form.liquid` and their choices in `data/private-hire/_datasource.yaml`, and `data/private-faq/monday-fish-fry.md`; the page's intro and its description, and `parts/mondays.liquid`, say "The back room seats thirty"; Monday's `note` in `hours` goes.
- **The whole place only**: for a restaurant with one room. The rows of `private-plans` become nights of the week, each with its minimum, and the form's cards the same nights; the Back room's mentions go from `data/reserve-features/large-parties.md`, `data/reserve-faq/seven.md`, `data/visit-faq/the-booths.md`, `parts/booth-form.liquid`, `data/gallery/back-room.md` and `parts/mondays.liquid`.

#### Is there a set party menu?

- **Yes, with its price a guest** (as built).
- **On a quote**: in `parts/party-menu.liquid` the two prices give way to "We'll write a menu with you"; the prices also leave `data/private-faq/monday-fish-fry.md`.

When removed: delete `pages/private.liquid`, `parts/rooms.liquid`, `parts/party-menu.liquid`, `parts/private-form.liquid`, `data/private-plans/`, `data/private-tasting/`, `data/private-steps/`, `data/private-faq/`, `data/private-hire/`, `fragments/private-hire-thanks.liquid` and the `private` navigation record; on the home page `{% render 'mondays' %}` goes (delete `parts/mondays.liquid`) and the pickup strip is set large in its place. "Ask for the back room" leaves `parts/booth-form.liquid`, and its mentions leave `data/reserve-faq/seven.md`, `data/reserve-features/large-parties.md`, `data/visit-faq/the-booths.md`, `data/gallery/back-room.md` and Monday's `note` in `hours`. `parts/steps.liquid` goes too if pickup is not kept.

### Visit (`/visit`)

The time card at full size, how to find the place with four cards (the bus, parking, bikes, access), a line on gift cards, and questions by topic. The time card follows the services, chosen with the home page.

When removed: delete `pages/visit.liquid`, `parts/hours-large.liquid`, `parts/finding-us.liquid`, `parts/gift-cards.liquid`, `parts/faq-topics.liquid`, `data/getting-here/`, `data/visit-faq/` and the `visit` navigation record; "Hours and finding us" leaves `parts/services.liquid`. The home page keeps the time card, and the footer the address and the services.

### Our story (`/about`)

The story of the corner beside its photo at night, the four people, and the counter's year in six photos.

#### Who appears on the page?

- **The people by name** (as built): four round portraits, or their initials on turquoise until the maker sends photos (each person's `photo`).
- **The owners only**: one or two people shown large in their own words, in the layout of `parts/story.liquid` (adapted from the gallery's `about-founder-note`), in place of `{% render 'people' %}`; `team` keeps only them.
- **Nobody by name**: remove `{% render 'people' %}` and delete `parts/people.liquid` and `data/team/`; the photos stay, and so does the story, without its names (in `parts/story.liquid` and the description of `pages/about.liquid`). Marisol's name also leaves `parts/allergies.liquid`, and Pete's `parts/private-form.liquid`, `fragments/private-hire-thanks.liquid`, `data/private-hire/_datasource.yaml` (its `sent` message), `data/private-steps/call.md` and `data/private-plans/whole-place.md`; Bernie's `data/private-plans/counter-birthday.md` and `data/testimonials/dolores.md`.

When removed: delete `pages/about.liquid`, `parts/story.liquid`, `parts/people.liquid`, `parts/counter-year.liquid`, `data/team/`, `data/gallery/` and the `about` navigation record; nothing else links to it. The hero's and the footer's "since 1961" stay only if the maker confirms them.
