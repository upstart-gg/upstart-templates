# Dogear

Dogear is the website of an independent bookshop that reads like its front table on a Tuesday, when the new books come in: this week's staff picks lie side by side in a mosaic at their true sizes, and from behind each book rises the card its bookseller tucked into it, with their name and the one line they would say at the till. The rest is the shop at work: "Hold a copy" on every book, one form to hold or order anything in print, readings that know which one is tonight, four book clubs, gift cards asked for and paid by phone, and the café corner. It was written for Half Title Books & Coffee, a bookshop with a café corner in a 1912 corner pharmacy in the Armory District of Providence, Rhode Island; it suits a neighborhood bookshop, a bookshop café, a children's bookshop, a used and rare bookshop (the picks become the week's finds), a comic shop, a record shop (whose staff picks carry the same cards), or a library's friends' shop. Keep the structure; rewrite the books and their cards, the booksellers, the readings, the clubs, the café's menu and the town.

## How it is made

- Every page shares the header (`parts/header.liquid`: the name "Half Title" with "Books & coffee" from `parts/logo.liquid`, the pages from `navigation`, an "Order a book" button; a Menu button below 1280 px) and the footer (`parts/footer.liquid`, on ink: the name, the Tuesday letter's sign-up from `parts/newsletter.liquid`, the address, phone and email, the week from `hours`, and the links).
- `parts/pick.liquid` is a staff pick: the jacket with its bookseller's card (`picked_by` and `note`) tucked behind it, peeking in the hero, standing full elsewhere. `parts/hold-link.liquid` is every "Hold a copy" (or "Order it in" when `available` is off), which opens `/order` with the book's title and author written in.
- The lists: `products` (labeled Books: the hero's mosaic and the staff picks where `pick`, the book of the week where `featured`, the new row where `new`, the signed copies where `badge` is "Signed", a page per book), `team` (the booksellers, matched to a card by `first_name`), `events` (the readings, a page each; a reading's `book` names a book by its title), `clubs` (a club's `next_book` names a book by its title), `hours`, `menu` (the café, courses `drinks` and `pastries`), `getting-here`, `clubs-steps`, `order-steps`, `gift-uses`, `events-faq`, `order-faq`, `visit-faq` and `navigation`. Five collected datasources take what visitors send: `special-orders`, `rsvps`, `club-signups`, `gift-card-requests` and `newsletter`, each answered by its fragment in `fragments/`.

## When adapting

- The name (Half Title Books & Coffee) is in `parts/logo.liquid`, every page's title and description, the footer's last line, `parts/gift-card.liquid` and `parts/story.liquid`. The address (58 Gilder Street, Providence, RI 02909) is in the header's menu, the footer, `parts/hours-address.liquid` and `parts/story.liquid`, with "Get directions" links to a map search for it: change it in those links too. The phone ((401) 555-0163) and the emails are in the footer, `parts/order-band.liquid`, `parts/order-form.liquid`, `parts/faq.liquid`, `parts/hours-address.liquid`, `pages/events/index.liquid` and `pages/clubs.liquid`.
- Set `data-tz` to the maker's city's time zone ("Europe/Paris", "America/Chicago") on the footer (`parts/footer.liquid`), the readings list (`parts/readings.liquid`) and the reading page's header (`pages/events/[events].liquid`), so "Tonight" follows the shop's clock. Readings' dates and their `starts` (24-hour, "19:00") are facts; write `time` as the site's visitors read it (7 pm, or 19 h 00 in French).
- The hours, prices, the club discount (15%), the hold time (ten days), the mailing fee ($5) and the readings' prices are facts: ask for them, or keep the example and say so. "Coffee at the old soda counter from 8" in `parts/hero.liquid`, `parts/soda-counter.liquid`, `parts/cafe-menu.liquid` and the footer's café line must match `hours`.
- The history of the building (`parts/story.liquid`, `parts/soda-counter.liquid`) is invented: replace it with the maker's, or keep it short and true rather than guess.

## Pages

### Home (`/`)

The headline beside the front table (this week's picks in a mosaic with their cards peeking), the book of the week with its bookseller's paragraph, new this Tuesday, the next three readings on ink, the book clubs on endpaper, the order band in ochre and the soda counter.

#### How do customers get a book?

- **They ask, and pay at the till** (as built): "Hold a copy" and the order form on `/order`; requests arrive in the Content tab and the shop calls back. Keep it as it is.
- **They can also buy online, on the shop's own store**: ask for the store's address, never invent it. Put each book's address on the store in its `order_link`: "Buy online" then shows beside "Hold a copy" on its page and the book of the week. The header's "Order a book" stays for what isn't listed.
- **By phone only**: every "Hold a copy" and "Order a book" becomes "Call to order" (`tel:`): rewrite `parts/hold-link.liquid` as one `tel:` link, and change the buttons that open `/order`: the header's two (`parts/header.liquid`, beside the menu and inside it), the hero's "Order a book" (`parts/hero.liquid`), the order band's (`parts/order-band.liquid`) and the Books page's (`parts/ask-band.liquid`); on `/events`, "Keep me a signed copy" (`/order?kind=signed`, in `pages/events/index.liquid`) becomes "Call us to keep a signed copy". Delete `parts/order-form.liquid`, `data/special-orders/`, `fragments/special-orders-thanks.liquid` and the order form's part of `scripts/prefill.js` (title, author and kind; keep amount and club); on `/order` keep the title, the steps and the questions, with the phone set large in place of the form.

#### How are the covers shown?

- **Drawn jackets, with the maker's photos where they have them** (as built): every book keeps its `jacket`, `tone` and `format`; a photo in `image` replaces the drawing book by book.
- **Photos of the real covers everywhere**: the maker sends a photo of each book (taken in the shop, or from the publisher's catalog); put each in the book's `image`. Keep the jackets' fields as the fallback for a book still without one. Never fetch a cover from the web.

#### Who signs the cards?

- **The booksellers by name** (as built): "Nadia's pick", the rows by bookseller on `/books` and the portraits on `/visit`.
- **The shop, unsigned**: for a shop of one or two. Empty every book's `picked_by`, so the cards read "Our pick"; remove `{% render 'by-bookseller' %}` from `pages/books/index.liquid` and `{% render 'booksellers' %}` from `pages/visit.liquid`, and the "See …'s picks" line from the book page.

### Books (`/books`)

The staff picks as a grid of jackets with their cards standing full, each bookseller with their picks, new this Tuesday, the signed copies, and a band to order a book; and a page per book with its jacket and card, its facts, the bookseller's note, its reading or club, and three other picks.

#### What does the page list?

- **Staff picks, new this Tuesday and signed copies** (as built).
- **Staff picks only**: for a shop that will not update a weekly list. Remove `{% render 'new-row' %}` and `{% render 'signed' %}` from `pages/books/index.liquid` and `{% render 'new-row' %}` from the home page; delete the books that are only `new`.
- **Picks grouped by shelf**: in place of `{% render 'by-bookseller' %}`, a section that loops over the shelves (each book's `category`: Fiction, Mystery, Kids…) and shows each shelf's picks as small jackets, written like `parts/by-bookseller.liquid`.

#### A page for each book?

- **Yes** (as built): each jacket opens its page with the bookseller's note.
- **No**: delete `pages/books/[products].liquid`; in `parts/pick.liquid`, `parts/book-of-the-week.liquid`, `parts/new-row.liquid`, `parts/by-bookseller.liquid`, `parts/signed.liquid`, `parts/clubs.liquid`, `parts/readings.liquid` and the reading page (`pages/events/[events].liquid`: its book's jacket when the book has no card, and "About the book"), point each book's link to `/order?title={{ book.name | url_encode }}&author={{ book.author | url_encode }}&kind=hold#order`; the book of the week's "Read … note" link goes, and so does "About the book" on the reading page. The notes stay as the cards' lines.

When removed: delete `pages/books/`, the parts only that page shows (`parts/staff-picks.liquid`, `parts/by-bookseller.liquid`, `parts/signed.liquid`, `parts/ask-band.liquid`) and the `books` navigation record; the hero, the book of the week and the new row stay on the home page with their jackets and the reading page's linking to `/order?title=…` as above. The links into the Books page go too: "This week's picks" in `parts/hero.liquid` points to the book of the week (`/#week`), "All new books" (`/books#new`) leaves `parts/new-row.liquid`, and "See …'s picks" (`/books#<name>`) leaves `parts/booksellers.liquid`.

### Events (`/events`)

The readings still to come, each with its date block, "Tonight" on the day, its book's jacket and how to come; a line for a signed copy kept for those who can't, a line for authors and publicists, and questions; and a page per reading with its book and card, the evening, the RSVP and two other readings.

#### How do people come to a reading?

- **An RSVP, free, tickets paid at the door** (as built): `parts/rsvp-form.liquid` on each reading's page; RSVPs arrive in the Content tab.
- **On an outside ticket page**: ask for each reading's ticket address, never invent it, and put it in its `booking`: the reading then says "Get tickets" and its page shows no RSVP form. With every reading booked outside, delete `parts/rsvp-form.liquid`, `data/rsvps/` and `fragments/rsvps-thanks.liquid`.
- **They just come**: set every reading's `rsvp` to `walk-in` and its `price` to "Free, no need to RSVP"; delete `parts/rsvp-form.liquid`, `data/rsvps/` and `fragments/rsvps-thanks.liquid`, and the RSVP sentence of `parts/readings-band.liquid` and the page's intro.

When removed: delete `pages/events/`, `parts/readings.liquid`, `parts/readings-band.liquid`, `parts/rsvp-form.liquid`, `data/events/`, `data/rsvps/`, `fragments/rsvps-thanks.liquid`, `data/events-faq/`, `scripts/upcoming.js`, `"shoot"` in `template.json` and the `events` navigation record; remove `{% render 'readings-band' %}` from the home page (the order band moves up in its place) and the reading part of the book page.

### Book clubs (`/clubs`)

Each club as a wide panel (when, who leads it, what it reads, its next meeting and next book), how the clubs work, the sign-up form, and a line for groups with a club of their own.

#### How do readers join?

- **With the sign-up form** (as built): `parts/club-form.liquid`; sign-ups arrive in the Content tab.
- **They just come**: delete `parts/club-form.liquid`, `data/club-signups/`, `fragments/club-signups-thanks.liquid` and the club part of `scripts/prefill.js`; each club's "Join this club" in `parts/clubs.liquid` becomes the line "Just come, and tell us at the till for the discount".
- **By email**: "Join this club" becomes a `mailto:` link with the club's name as its subject; delete the form as above.

When removed: delete `pages/clubs.liquid`, `parts/clubs.liquid`, `parts/club-form.liquid`, `data/clubs/`, `data/clubs-steps/`, `data/club-signups/`, `fragments/club-signups-thanks.liquid` and the `clubs` navigation record; remove `{% render 'clubs-band' %}` from the home page and the club part of the book page.

### Order a book (`/order`)

The request form (a hold, an order or a signed copy kept; the book; how to reach the customer; mailing) beside the shop's promises and phone, how an order goes in five steps, and questions in two columns. Its form follows how customers get a book, chosen with the home page.

#### What can people ask for?

- **A hold, an order or a signed copy, mailed if they like** (as built).
- **Orders only**: for a shop without a list of its stock. In `parts/hold-link.liquid` both links read "Ask for this book" with `kind=order`; remove the first choice ("What you'd like") from `parts/order-form.liquid` and `kind` from `data/special-orders/_datasource.yaml`; remove `{% render 'signed' %}` from the Books page.
- **Pickup only**: remove the mail checkbox and the address field from `parts/order-form.liquid`, `mail` and `address` from `data/special-orders/_datasource.yaml`, and `data/order-faq/mail.md`.

When removed: delete `pages/order.liquid`, `parts/order-form.liquid`, `data/special-orders/`, `fragments/special-orders-thanks.liquid`, `data/order-steps/`, `data/order-faq/` and the `order` navigation record. Every link to `/order` becomes "Call to order" (`tel:`): the header's two buttons (`parts/header.liquid`), the hero's "Order a book" (`parts/hero.liquid`), the order band's (`parts/order-band.liquid`, which then says "Call us and we'll get it"), the Books page's (`parts/ask-band.liquid`) and every "Hold a copy" (`parts/hold-link.liquid`); on `/events`, "Keep me a signed copy" (`/order?kind=signed`, in `pages/events/index.liquid`) becomes "Call us to keep a signed copy". Remove the order form's part of `scripts/prefill.js` (title, author and kind).

### Gift cards (`/gift-cards`)

The drawn gift card, ochre cloth with a pasted bookplate, which fills in as the visitor writes the request beside it; then what the card is good for.

#### How are gift cards sold?

- **A request, paid by phone** (as built): `parts/gift-form.liquid`; requests arrive in the Content tab and the shop calls to take payment.
- **On the shop's own gift card page**: ask for its address, never invent it. Replace the form in `parts/gift-form.liquid` with a "Buy a gift card" button linking there; delete `data/gift-card-requests/`, `fragments/gift-card-requests-thanks.liquid` and `scripts/gift-card.js`. The drawn card stays with its sample label.
- **At the till only**: delete the form as above; the card stays, with "Any amount, at the till" beside it.

When removed: delete `pages/gift-cards.liquid`, `parts/gift-form.liquid`, `parts/gift-card.liquid`, `parts/uses.liquid`, `data/gift-card-requests/`, `fragments/gift-card-requests-thanks.liquid`, `data/gift-uses/`, `scripts/gift-card.js` and the `gift-cards` navigation record; the footer's last line adds "Gift cards at the till".

### Visit (`/visit`)

The building's story with its photo, the week day by day beside the address and phone, the café's menu at the soda counter, the booksellers, how to get there, and questions.

#### Is there a café?

- **A coffee counter with a short menu** (as built).
- **No café**: remove `{% render 'cafe-menu' %}` from `pages/visit.liquid` and `{% render 'soda-counter' %}` from the home page (put `{% render 'story' %}`'s photo and the hours there if the maker wants the shop shown), the café sentence from `parts/hero.liquid`, `parts/footer.liquid` and `data/hours/`, and delete `data/menu/`.

#### Who appears on the page?

- **The booksellers by name** (as built): `parts/booksellers.liquid`, with initials on ochre until the maker sends portraits (each bookseller's `photo`).
- **The owner only**: `team` keeps one record; replace `{% render 'booksellers' %}` with a section that shows them large beside their own words about the shop, written like `parts/story.liquid`.

When removed: delete `pages/visit.liquid`, `parts/story.liquid`, `parts/hours-address.liquid`, `parts/cafe-menu.liquid`, `parts/booksellers.liquid`, `parts/finding-us.liquid`, `data/getting-here/`, `data/visit-faq/` and the `visit` navigation record; the footer keeps the address and hours, and "Plan a visit" in `parts/soda-counter.liquid` points to the footer (`#visit`).
