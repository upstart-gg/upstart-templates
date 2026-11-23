---
name: dogear-design
description: The Dogear template's design notes — read before changing this site's pages, sections, styles or lists.
---

# Dogear

A bookshop's site that reads like its front table on a Tuesday: books drawn as objects at their true sizes, each staff pick with its bookseller's card tucked in behind it, and around them a plain, useful neighborhood shop. Quiet and warm, never precious: the books and the booksellers' words are the decoration.

## Type

- Brygada 1918 for headings, the wordmark, labels and figures. Headings are 500, sentence case; small headings (a book, a reading, a club) 600 at about 1.375 rem. The hero is `text-[clamp(2.75rem,5vw+1rem,5.75rem)] leading-[1.02]`; a page's title `text-[clamp(2.75rem,5vw+1rem,5.25rem)]`; a section's `text-[clamp(2rem,2.5vw+1rem,3.25rem)]`.
- Brygada's italic is the booksellers' voice: only on the cards' lines and the wordmark, never on a heading or an accent word.
- `label`: Brygada in small caps, above headings and before facts ("Reads mostly", "Led by"). `facts`: Brygada's lining, tabular figures for prices, pages, times, dates and hours.
- Libre Franklin for the body (`body-copy`, 80 % of the ink, at most about 62 characters a line), buttons (600, sentence case) and the cards' bands (700, uppercase, spaced).
- The wordmark is `parts/logo.liquid`: "Half Title" in Brygada 600 italic with "Books & coffee" in small caps.

## Color and shape

- Paper (`bg-base-100`) for most of the page; greyboard (`bg-base-200`) for the tiles books stand on, the forms' panels and one band; endpaper lavender (`bg-secondary`) for the clubs band, the gift card band and some tiles; ochre (`bg-primary`) for buttons, the cards' bands, the date blocks, the order band and the gift card's cloth; ink (`bg-neutral`) for the readings band on the home page and the footer.
- Ochre is never text on paper or greyboard: only a fill, and the 2 px tape under links (`text-link`, which fills the line on hover; `on-dark` on ink, where links are ochre). Ribbon red (`accent`) is rare: the "Tonight" tag (paper on red), "Signed copy" and the required marks, as text on paper only.
- Corners are nearly square (`rounded-box`, 0.25 rem); fields are outlined in ink at 55 %. No shadows but the books' own contact shadow and the cards' hairline.

## Effects, and what turns each on

- **Jackets** (`parts/jacket.liquid`, CSS only): a book's `data-jacket` (band, frame, type, cloth, art), `data-tone` (ochre, umber, ink, paper, endpaper, board, all made from the theme) and `data-format` (hardcover 2:3, paperback 0.65, pocket 0.6, picture 5:4, large 0.8). Each jacket is a size container: its type scales with the book. The art layout blends its black-on-white print into the jacket's tone (inverted on ink and umber). A photo in the book's `image` takes the drawing's place. To set a jacket in a column at its true width, wrap it in `<span class="block w-[calc(var(--f)*100%)]" data-format="…">`: `--f` makes a pocket book narrower than a hardcover.
- **Shelf-talkers** (`parts/pick.liquid`, pass `book` and `talker`): a `<figure>` with the jacket's link, then the card as its `<figcaption>`, tucked behind the book. `talker: 'full'` stands the whole card above the book, lifting a little on hover or focus; `talker: 'peek'` (the hero) shows only its ochre band where a pointer can hover, and the card rises and widens to be read on hover or focus; on a touch screen it stands full. A narrow card's band keeps the name alone. Put picks in an element with `data-picks` (`data-picks="load"` in the first screen): `scripts/talkers.js` lowers each card behind its book and raises it, one after another, as they come into view. A book without a `note` shows no card. Cards rise straight up: never tilted, never sliding sideways, no string.
- **The front table** (`parts/hero.liquid`): `.front-table-wrap` > `.front-table`, tiles (`.tile` with `data-format` and `data-ground`: board, endpaper, ochre) on a dense grid, four columns from 768 px; hardcovers span two rows, picture and large books two columns. Its first seven picks and one photo tile fill it exactly; on a phone, the first four and the photo.
- **Tonight** (`scripts/upcoming.js`): any element with `data-event`, `data-date` and `data-starts` (24-hour) gets `data-when` (past, today, tonight) in the time zone of the page's `data-tz`. Inside it, `<span data-tag="tonight">Tonight</span>` and `<span data-tag="today">Today</span>` show on their day. A list with `data-upcoming` leaves past readings out; `data-upcoming="3"` (or 2) shows only its first readings still to come. Readings are sorted by date.
- **The gift card** (`parts/gift-card.liquid`, `data-gift-card`): its `data-slot` (amount, for, from) sample words are replaced by what the visitor types in the form marked `data-gift-form` (`scripts/gift-card.js`).
- **Prefilled forms** (`data-prefill` on a form, `scripts/prefill.js`): `?title=`, `?author=`, `?kind=` (hold, order, signed) on the order form, `?club=` (an option's `data-id`) on the club sign-up, `?amount=` on the gift card form. Every "Hold a copy" is `parts/hold-link.liquid`.
- **Reveals** (`scripts/reveal.js`): `data-reveal` on a section's text, `data-reveal="stagger"` on a list. Never on picks.
- Nothing scrolls smoothly, nothing slides sideways, no page transitions, no loader. Reduced motion and edit mode show every card at rest.

## Lists

- `products` (labeled Books): `pick` puts a book on the front table and the staff picks; `featured` makes it the book of the week; `new` puts it in "New this Tuesday"; `badge` "Signed" in the signed copies; `available` off turns "Hold a copy" into "Order it in"; `picked_by` (a bookseller's first name) and `note` (90 characters at most) make its card; `order_link` adds "Buy online". The order of the list is the table's order.
- `team`: `first_name` matches the books' `picked_by` and makes the anchor on `/books` (`#walt`); initials on ochre until there is a `photo`.
- `events` (by date): `book` and `clubs`' `next_book` match a book by its exact title; `rsvp` (rsvp, ticketed, walk-in) and `booking` (an outside ticket page) set how people come.
- `hours`, `menu` (courses `drinks` and `pastries`), `clubs-steps`, `order-steps`, `gift-uses`, `events-faq`, `order-faq`, `visit-faq`, `navigation`.
- Collected: `special-orders`, `rsvps`, `club-signups`, `gift-card-requests`, `newsletter`, each answered by its fragment.

## Rules for the site's whole life

- Never put a photo of a real book's cover found on the web, nor a cover made with lettering by a model: titles are always typed. A cover photo comes from the maker.
- A card's line is the bookseller's own words, signed, under 90 characters.
- One ochre band and one endpaper band a page at most; ink only for the readings band and the footer.
- Ochre never colors text on paper; red only for what is tonight, signed or required.
- No walls of wooden shelves with ladders, open-book icons, coffee-and-book flat lays, burgundy and gold, or pages that curl: the drawn books and the cards are the shop's picture.
