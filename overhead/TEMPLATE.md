# Overhead

Overhead is the site of a coworking floor. The floor is drawn from above and the rooms a plan opens light up, one after another from the elevator, when a visitor picks that plan; the first screen shows the building's front from the street, its lit floor carrying the day pass, the address, the hours and the bus stop. It was written for Sample Floor, sixty people at desks on the fourth floor of an old furniture works in Grand Rapids; it suits a coworking space, an office suite, a makers' or artists' building with studios to rent, a shared kitchen, a rehearsal building, any place that sells rooms and desks by the day, the month or the hour. Keep the structure, the drawing and the lights; rewrite the rooms, the plans, the people and the prices.

## How it is made

- Every page shares the header (`parts/header.liquid`: the name, `parts/logo.liquid`; the links of `navigation` whose place is both or header; "Come for a day"; a menu button below 1216 px) and the footer (`parts/footer.liquid`: the address, the bus, the phone and email, `hours`, `navigation` and its social link).
- `zones` are the floor's rooms, with their place and size in feet: they draw the plan (`parts/plan.liquid`, its furniture in `parts/plan-furniture.liquid`) and fill the list of rooms under it, on the home page and `/plans` (`parts/plan-section.liquid`); those of kind meeting room fill the home page's two rooms, `/rooms` and its form. `plans` fills the picker, `/plans` and the visit form's list. `gallery` fills the walk.
- `events` fills the home page's next four, `/events` and a page per event; `floor-week` and `members` fill `/events`; `testimonials` the home page; `hours` the footer and `/visit`; `getting-here`, `access-notes` and `visit-faq` fill `/visit`; `plans-included`, `plans-steps`, `floor-rules` and `plans-faq` fill `/plans`; `rooms-faq` fills `/rooms`; `team` fills `/about`.
- The building's front (`parts/front.liquid`) shows in the home page's hero and, at night, in its closing band; its assigns are at its top.
- Three forms collect records: `visits` on `/visit`, `room-requests` on `/rooms`, `rsvps` on an event's page, each with its thanks in `fragments/`.
- The pages but the home page, `/about` and an event's open with `parts/page-title.liquid`, its title and introduction written in the page; `/plans` and `/about` close with `parts/day-band.liquid`, its title written in the page.

## When adapting

- The floor is the maker's: ask for a photo of a fire-exit plan, a sketch, or a list of rooms with rough sizes, and redraw it. Each room is a record of `data/zones/` (`x`, `y`, `w`, `h` in feet from the north-west corner, `kind`, `seats`); the outline, the windows, the columns, the core and the elevator's door are the assigns at the top of `parts/plan.liquid`. Rooms must not overlap each other or the core. Without a plan from the maker, keep the drawing's layout with the maker's room names and say so in the line on what was invented. The rooms named in `zones` of `data/plans/` must match the records' names letter for letter; `/plans` and the home page draw both from them. The columns, desks, offices and rooms are also counted in words in the captions of `parts/then-and-now.liquid`.
- The offices' and desks' states (`state`, `state_note` in `data/zones/`, and the caption of `data/gallery/office-4.md`) and the date of "Offices as of Monday, November 16" (`parts/plan-section.liquid`, `blocks/features/features-overhead-plan/block.liquid`) come only from the maker, and the date is retyped with each change of state. The sentence on a full Tuesday is there too, and in `data/zones/river-room.md`.
- The name (Sample Floor) is in `parts/logo.liquid`, the titles of every page in `pages/`, the email's domain, and Instagram's address in `data/navigation/instagram.md`. The heading of `parts/story.liquid` plays on it. The mark in `parts/logo.liquid` is a small lit plan and suits any floor.
- The address (61 Tailrace Street NW, 4th floor, Grand Rapids, MI 49504) is in `parts/footer.liquid` and `parts/getting-here.liquid` (both with the directions link), `parts/front.liquid`, `parts/visit-form.liquid` and the menu of `parts/header.liquid`; the street again in `data/getting-here/car.md` and `data/plans-faq/parking.md`. The floor's number is also in `parts/hero.liquid`, the description of `pages/index.liquid`, `our_floor` and "elevator to 4" in `parts/front.liquid`, "elevator to 4" in `parts/visit-form.liquid`, `data/access-notes/door.md`, `data/visit-faq/elevator.md`, `data/getting-here/bike.md` and `data/plans-included/bikes.md`. The building's name (the Holloway works) is in `parts/hero.liquid`, `parts/footer.liquid`, `parts/story.liquid` and the description of `pages/about.liquid`.
- The phone ((616) 555-0162) is in `parts/footer.liquid`, `parts/getting-here.liquid` and `parts/questions.liquid`; the email in `parts/footer.liquid` and `fragments/rsvps-thanks.liquid`.
- The bus or train line and its stop are never invented: ask, or drop them from `parts/front.liquid`, `parts/visit-form.liquid`, `parts/footer.liquid`, `data/getting-here/bus.md` and `data/visit-faq/weekends.md`. The city, its West Side, the river and the Blue Bridge are in `parts/hero.liquid` (label, headline, text), the title and description of `pages/index.liquid`, the description of `pages/rooms.liquid`, `parts/every-week.liquid` and `parts/getting-here.liquid` (photos and captions), `parts/story.liquid`, `data/getting-here/`, `data/floor-week/walk.md`, `data/plans-included/` (coffee, roof), `data/zones/kitchen.md` and `data/events/open-floor-day.md`; "the river room" and "the river door" are names of this floor, in `data/zones/`, `data/plans/`, `data/gallery/`, `data/testimonials/ana.md`, `data/events/`, `data/rooms-faq/food.md`, `data/visit-faq/elevator.md`, `data/access-notes/door.md`, `data/floor-week/walk.md`, `data/getting-here/`, `parts/front.liquid` and `parts/visit-form.liquid`.
- The prices are in `data/plans/`, `data/zones/` (`price`, `hour`, `half_day`, `day_rate`) and, written again: "Day pass $25" in `parts/front.liquid`, `parts/visit-form.liquid` and the description of `pages/index.liquid`; the whole list in the description of `pages/plans.liquid`; "from $650" in `parts/whole-floor.liquid` and `parts/room-request.liquid`; `data/plans-faq/try-a-day.md`; the parking in `data/getting-here/car.md` and `data/plans-faq/parking.md`. The hours are `data/hours/`, said again in `parts/front.liquid`, `parts/visit-form.liquid`, `parts/after-hours.liquid`, `data/plans/` and `data/events/open-floor-day.md`.
- Never keep the invented member businesses (`data/members/`), the members' words (`data/testimonials/`), the team, or the story of the building: ask for the real ones with their permission, or remove the section. Rosa, who staffs the front table, is also named in `fragments/visits-thanks.liquid`, `data/plans-faq/address.md`, `data/plans-steps/pick.md` and `data/visit-faq/leave.md`; Lena in `parts/story.liquid` and `data/events/open-floor-day.md`; Andre in `data/events/show-and-tell-december.md`; Sam in `data/events/holiday-potluck.md`.
- The pictures of the rooms (`media/river-room.webp`, `bench-row.webp`, `office.webp`, `showroom.webp`, `sample-room.webp`, `phone-booths.webp`, `kitchen.webp`) are generated placeholders: they are the first to replace with the maker's own photos, and they are never presented as the maker's floor. The two historic pictures show Grand Rapids's furniture trade and go with it.
- Prices, hours, room sizes and seats, states, the bus and events are facts: ask for them once the page is built, or leave them out rather than guess. The blocks in `blocks/` repeat the parts and records they were made from: what changes in a part or a record changes in its block.

## Pages

### Home (`/`)

The headline beside the building's front with its facts, the plan with its picker and the list of rooms, a walk across the floor in photos, the meeting rooms, the next events, members' words, and the front at night.

#### How does someone come in for a day?

- **They walk in and pay at the front table** (as built): "Day pass $25" on the front; groups and tours send the visit form. Nothing to change.
- **They buy the day pass online first**: ask for the address of the space's own booking tool (Nexudus, OfficeRnD, Optix, Archie or another), never invent it; it is a link that leaves the site, never the tool's widget. "Buy a day pass" links to it from the hero's first button (`parts/hero.liquid`), a link under the price on the front (`parts/front.liquid`), and `cta` and `href` of `data/plans/day-pass.md`, whose description loses "Pay at the front table"; the same in the blocks `hero-overhead-front` and, for the picker, `features-overhead-plan`. "Pay at the front table" also goes from the introduction of `pages/visit.liquid`, `data/plans-steps/come.md` and `data/visit-faq/book.md`. The other "Come for a day" buttons still lead to the visit form.
- **Members only, no day passes**: "Come for a day" becomes "Book a tour" and leads to `/visit?for=tour#visit` (`parts/header.liquid`, twice; `parts/hero.liquid`, `parts/after-hours.liquid`, `parts/day-band.liquid`, `parts/footer.liquid`); the closing titles change in `pages/about.liquid` and `pages/plans.liquid`. Delete `data/plans/day-pass.md` (and from `order` in its `_datasource.yaml`), `data/plans-faq/try-a-day.md`, `data/visit-faq/book.md` and `leave.md`, and the topic "The day pass" in `data/visit-faq/_datasource.yaml`. "Day pass $25" becomes "Tours on Tuesdays and Thursdays at 10" (the maker's times) in `parts/front.liquid` and `parts/visit-form.liquid`, and goes from the descriptions of `pages/index.liquid` and `pages/plans.liquid`; the choice "A day pass, for a few of us" goes from `parts/visit-form.liquid`, its value from `data/visits/_datasource.yaml`, and `"day-pass"` from `scripts/prefill.js`. Rewrite the day-pass lines of `parts/after-hours.liquid`, `data/hours/weekdays.md` and `weekend.md`, `data/plans-steps/come.md`, the introduction of `pages/visit.liquid`, `price` in `data/zones/river-room.md`, the visit's and the walk's blocks, and the block `cta-overhead-after-hours`.

#### What is on the floor?

- **Desks, offices and rooms** (as built).
- **Desks and rooms, no offices**: delete the `office-*` records of `data/zones/` and of the blocks `features-overhead-plan` and `services-overhead-rooms`, `data/plans/office.md` (and from `order` in its `_datasource.yaml`), `data/gallery/office-4.md` and the walk block's copy (and from their `order`), and `media/office.webp` with its `.json`. Their side of the plan takes more desks or what the maker has there. Rewrite "six small offices" in `parts/hero.liquid` (and its block) and the description of `pages/index.liquid`, "offices from $790" in the description of `pages/plans.liquid`, the caption under the plan (`parts/plan-section.liquid` and its block), `parts/after-hours.liquid` (and its block), `data/hours/members.md`, `data/plans-faq/address.md`, `pause.md` and `share.md`, the introduction of `pages/visit.liquid`, the caption of `parts/then-and-now.liquid`, `where` in `data/members/` and `data/testimonials/devon.md`. The choice "An office for a team" goes from `parts/visit-form.liquid` (and its block), `data/visits/_datasource.yaml` and `scripts/prefill.js`.
- **Mostly offices**: the records of `data/plans/` become the offices by size ("For one", "For two", "For four", "For six"), each with its `zones`; the river room becomes the lounge (`data/zones/river-room.md`, renamed wherever it is named), with a day pass for visitors or none, which then follows "Members only" above; `data/gallery/` shows the offices first, by its `order`; the hero's text and the description of `pages/index.liquid` lead with the offices, and the plan's details, `data/hours/` and `data/plans-faq/` follow.

#### How many floors?

- **One floor** (as built).
- **Two or three floors**: `data/zones/_datasource.yaml` takes `floor` (a number), set on each record. In `parts/plan-section.liquid` (and its block), one `{% render 'plan' %}` per floor, with a tab per floor above it: radios outside `data-plan-picker`, shown with CSS in `styles/site.css`, no script. `parts/plan.liquid` takes a `floor`, draws that floor's rooms only, and has its assigns per floor; the lights then start from each floor's own elevator door, since each drawing has its `data-entrance`. In `parts/front.liquid`, every floor the space uses gets `front-ours`, the facts at the lowest. Say the floors where the fourth one is said (see "When adapting").

#### What does the building look like from the street?

- **An older building of several floors** (as built): the cornice and the tall windows, our floor lit. Set `floors`, `our_floor` and `bays` at the top of `parts/front.liquid`.
- **A storefront at street level**: `look` is `storefront` there: one floor with a wide shop window, lit, and its door. The facts stand beside it; "elevator to 4" becomes what is true, there and wherever the floor is said.
- **A modern office building**: `look` is `modern`: bands of glass, our floor's band lit.

### Plans & passes (`/plans`)

The plan larger with its picker, every plan side by side, what comes with every plan, joining in four steps, how the floor works, questions, and a closing band.

#### How do people join?

- **In person, after a tour or a day** (as built): each plan's button leads to `/visit?plan=…#visit`.
- **Online, on the space's member tool**: ask for its address. In `data/plans/`, `cta` is "Join online" and `href` that address; "Ask about this plan" in `parts/plan-section.liquid` becomes "Join online" too; rewrite `data/plans-steps/come.md` and `pick.md` (the front table's form).
- **By email or phone**: in `data/plans/`, `cta` is "Write to us" and `href` a `mailto:` with the plan's name as its subject; "Ask about this plan" in `parts/plan-section.liquid` becomes "Write to us"; add the phone under the list of `parts/plan-rows.liquid`.

#### Are the prices on the site?

- **Every price** (as built): in the picker, the plan rows, the list of rooms and the front.
- **Desks priced, offices on request**: in `data/plans/office.md` the price is "Ask about offices", with no `period`, and its description loses the amounts; `price` goes from the `office-*` records of `data/zones/` and of the two blocks over `zones`; "offices from $790" goes from the description of `pages/plans.liquid`.
- **No prices**: `price` and `period` go from `data/plans/`, `price` from `data/zones/` (and the two blocks over it); "what it costs" goes from the sentence above the plan (`parts/plan-section.liquid` and its block), the amounts from the descriptions in `data/plans/` and the features of `data/plans/room-by-the-hour.md`, from `data/plans-faq/try-a-day.md`, and from the descriptions of `pages/index.liquid` and `pages/plans.liquid`; "Day pass $25" becomes the hours in `parts/front.liquid` and `parts/visit-form.liquid` (and its block). Prices up front are what visitors come for: it is the maker's call.

When removed: delete `pages/plans.liquid`, `parts/plan-rows.liquid`, `parts/with-every-plan.liquid`, `parts/joining.liquid`, `parts/how-it-works.liquid`, `data/plans-included/`, `data/plans-steps/`, `data/floor-rules/`, `data/plans-faq/`, the `plans` navigation record and `blocks/footer/footer-overhead-floor/data/plans.md`; "Every plan, side by side" goes from `parts/plan-section.liquid` and `blocks/features/features-overhead-plan/block.liquid`. The home page's plan (`/#plan`) keeps the picker and the list of rooms, and `data/plans/` stays for it. `parts/questions.liquid` stays for `/rooms` and `parts/day-band.liquid` for `/about`, while those pages do. No image is shown only here.

### Meeting rooms (`/rooms`)

The two meeting rooms as wide rows with their photo, rates and place on the plan, the whole floor in the evening, the request form and questions.

#### Who can book a room?

- **Anyone, by request** (as built): the form, members' hours first.
- **Members only**: `hour`, `half_day` and `day_rate` go from the meeting rooms' records in `data/zones/`, and `price` says what the plans include; "for members and anyone else" goes from the introduction of `pages/rooms.liquid` and "for anyone" from the heading of `parts/two-rooms.liquid`; delete `data/plans/room-by-the-hour.md` (and from `order` in its `_datasource.yaml`). In `parts/room-request.liquid`, "I'm a member", the phone and the whole floor go, `member` and `phone` from `data/room-requests/`, and the aside loses paying by card.
- **On the space's own booking tool**: ask for its address. "Ask for this room" becomes "Book online" and links there (`parts/room-rows.liquid`, `parts/two-rooms.liquid`, the block `services-overhead-rooms`), as `cta` and `href` of `data/plans/room-by-the-hour.md`. Delete `parts/room-request.liquid` and its render in `pages/rooms.liquid`, `data/room-requests/`, `fragments/room-requests-thanks.liquid`, and the lines on `room` in `scripts/prefill.js`; "Ask about an evening" (`parts/whole-floor.liquid`, `parts/hire-band.liquid`) becomes an email link.

#### Do you hire out the whole floor?

- **Yes, on evenings and Saturdays** (as built).
- **No**: delete `parts/whole-floor.liquid` and its render in `pages/rooms.liquid`, `parts/hire-band.liquid` and its render in `pages/events/index.liquid`, and the third card of `parts/room-request.liquid`; the introduction and the descriptions of `pages/rooms.liquid` lose the whole floor. `media/river-room.webp` stays for the plan and the walk.

When removed: delete `pages/rooms.liquid`, `parts/room-rows.liquid`, `parts/whole-floor.liquid`, `parts/room-request.liquid`, `parts/hire-band.liquid` and its render in `pages/events/index.liquid`, `data/room-requests/`, `fragments/room-requests-thanks.liquid`, `data/rooms-faq/`, `blocks/services/services-overhead-rooms/`, the `rooms` navigation record, `blocks/footer/footer-overhead-floor/data/rooms.md`, and the lines on `room` in `scripts/prefill.js`. The home page's two rooms keep their rates, and their button (`parts/two-rooms.liquid`) leads to `/visit?for=tour#visit` as "Come and see it"; so does `href` of `data/plans/room-by-the-hour.md`. `parts/questions.liquid` stays for `/plans`, while that page does. Every image here also shows elsewhere (`media/sample-room.webp` only in the list of rooms under the plan).

### Events (`/events`)

What happens every week, the coming events as dated rows, the members' directory, the whole floor for hire, and a page per event with its seats to save.

#### Who comes to the events?

- **Some are open to all, marked, with an RSVP on their page** (as built).
- **Members only**: every record of `data/events/` has `open: members`; delete `parts/rsvp.liquid` and its render in `pages/events/[events].liquid`, `data/rsvps/` and `fragments/rsvps-thanks.liquid`. "Open to all" never shows then; rewrite "A few evenings a month are open to anyone" in `pages/events/index.liquid` (introduction and descriptions), `data/floor-week/show.md`, the note for members in `pages/events/[events].liquid`, and the last lines of `data/events/open-floor-day.md`.
- **Tickets on an outside page**: ask for each address and put it in `booking`, which adds "Get tickets" to the row and, on the page, takes the place of the form. When every event has one, delete the files of the RSVP named above.

#### Do members appear by name?

- **Yes, in the directory, with their permission** (as built): ask for the real list, or keep only the section's closing line.
- **No**: delete `parts/directory.liquid` and its render in `pages/events/index.liquid`, `data/members/` and `blocks/about/about-overhead-directory/`.

#### A page for each event?

- **Yes** (as built).
- **The list only**: delete `pages/events/[events].liquid`, `parts/rsvp.liquid`, `data/rsvps/` and `fragments/rsvps-thanks.liquid`; `cover` and the body go from `data/events/` with `media/tax-form.jpg`, `notebook.jpg` and `potluck.jpg` and their `.json`. In `parts/event-row.liquid` "Details" goes, and in `parts/events-band.liquid` the row is no longer a link. The visit form takes the seats: "An event" joins its choices (`parts/visit-form.liquid` and its block, `data/visits/_datasource.yaml`), and the rows link to `/visit#visit`.

When removed: delete `pages/events/`, `parts/every-week.liquid`, `parts/coming-up.liquid`, `parts/event-row.liquid`, `parts/directory.liquid`, `parts/hire-band.liquid`, `parts/rsvp.liquid`, `parts/events-band.liquid` and its render in `pages/index.liquid`, `data/events/`, `data/floor-week/`, `data/members/`, `data/rsvps/`, `fragments/rsvps-thanks.liquid`, `blocks/about/about-overhead-directory/`, the `events` navigation record, `blocks/footer/footer-overhead-floor/data/events.md`, and the media only the events show, with their `.json`: `river-winter.jpg`, `tax-form.jpg`, `notebook.jpg` and `potluck.jpg`. `data/team/andre-whitfield.md` is about the events: rewrite it or remove it.

### Visit (`/visit`)

The visit form beside the front's facts, how to get here by bus, on foot, by bike and by car, the hours, access, and questions. Its form follows how someone comes in for a day and what is on the floor, chosen with the home page.

#### What does a first visit look like?

- **A tour or a paid day, the visitor's pick** (as built).
- **The first day is free**: in `parts/visit-form.liquid` (and its block) "A day pass, for a few of us" becomes "A free first day"; "Day pass $25" becomes "Day pass $25 · your first one's on us" there and in `parts/front.liquid`; `data/plans/day-pass.md` and `data/plans-faq/try-a-day.md` say how often; the introduction of `pages/visit.liquid`, `data/plans-steps/come.md` and `data/visit-faq/book.md` lose paying for the first one.
- **Tours only, at set times**: in `parts/visit-form.liquid` (and its block) the day and the part of the day become a choice of the maker's times ("Tuesday at 10", "Thursday at 4"), and "A day pass, for a few of us" goes; in `data/visits/_datasource.yaml`, `day` becomes that choice and `part` and the day pass go; `fragments/visits-thanks.liquid` (and its copy in the block) says the time; `"day-pass"` goes from `scripts/prefill.js`, and `data/visit-faq/book.md` says the day pass is paid at the front table.

When removed: delete `pages/visit.liquid`, `parts/visit-form.liquid`, `parts/getting-here.liquid`, `parts/hours-table.liquid`, `parts/access.liquid`, `parts/questions-by-topic.liquid`, `data/visits/`, `fragments/visits-thanks.liquid`, `data/visit-faq/`, `data/getting-here/`, `data/access-notes/`, `blocks/forms/forms-overhead-visit/`, `media/blue-bridge.jpg` and its `.json`, the `visit` navigation record and `blocks/footer/footer-overhead-floor/data/visit.md`. "Come for a day" leads to the phone (`tel:`) or the space's booking tool in `parts/header.liquid` (twice), `parts/hero.liquid`, `parts/after-hours.liquid`, `parts/day-band.liquid`, `parts/footer.liquid` and the blocks `hero-overhead-front`, `cta-overhead-after-hours` and `footer-overhead-floor`; so do the five `href` of `data/plans/` that name `/visit`, and `parts/two-rooms.liquid` if the meeting rooms' page went. `data/hours/` stays for the footer, which keeps the address, the hours and the bus.

### About (`/about`)

The story of the building and the floor with a historic picture, the people, the floor then and now as two plans, and a closing band.

#### Who appears on the page?

- **The people by name** (as built): four square portraits, or initials on maple until the maker sends photos.
- **The founder only**: one record in `data/team/`, its photo large, in their own words, adapted from the gallery's `about-founder-note` in `parts/people.liquid`; the names said elsewhere (see "When adapting") become roles ("ask at the front table").
- **Nobody by name**: delete `parts/people.liquid`, its render in `pages/about.liquid` and `data/team/`; the names said elsewhere go too, Lena's in `parts/story.liquid` included, and "the people who run the floor now" from the descriptions of `pages/about.liquid`.

#### Does the building have a past to tell?

- **Yes** (as built): the story, the historic picture, the two plans.
- **No**, for a new or plain building: `parts/story.liquid` tells the people's story with a photo of the maker's in place of `media/salesroom.jpg`, and `media/desk-catalog.jpg` goes; in `parts/then-and-now.liquid` the first figure goes and the heading becomes "The floor today"; rewrite the descriptions of `pages/about.liquid` and the headline of `parts/hero.liquid` (and its block), and choose the front's `look`.

When removed: delete `pages/about.liquid`, `parts/story.liquid`, `parts/people.liquid`, `parts/then-and-now.liquid`, `data/team/`, `media/salesroom.jpg`, `media/desk-catalog.jpg` and their `.json`, the `about` navigation record and `blocks/footer/footer-overhead-floor/data/about.md`. Nothing else links here; the footer keeps the building's name, and `parts/day-band.liquid` stays for `/plans`. The names of the people said elsewhere stay true or go (see "When adapting").
