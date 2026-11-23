# Covered

Covered is the marketing site of a work tool for people who stand all day. Its first screen is split down the middle, a baker at dawn with a small card of the product floating over the photo beside a deep jade panel; under it, a paper schedule taped to the walk-in door, covered in sticky notes and crossings-out, sorts itself once into the product's clean week. The product is then shown one job at a time in tabs, every screen of it HTML drawn from the theme. It was written for Staff Meal, a scheduling and timesheet product for restaurant and café crews of 5 to 60, made in Kansas City; it suits any tool sold to small teams who are not at a desk: the booking tool of salons and clinics, the job scheduler of a cleaning or landscaping crew, a volunteer rota, a delivery round planner, an inventory app for small shops, a staff training app for retail. Keep the structure; rewrite the product's parts and the records that fill them, the plans, the stories and the help.

## How it is made

- Every page shares the header (`parts/header.liquid`: the wordmark `parts/logo.liquid`, the links of `navigation` whose place is header, "Log in", the "Start free trial" button; a menu button below 1280 px) and the footer (`parts/footer.liquid`, on espresso: the address, the phone and its hours, the email, `navigation`'s columns and social links).
- The product is drawn in the page from records: `parts/ui-week.liquid` from `shifts`, `ui-timesheets` from `timesheets`, `ui-swaps` from `swaps`, `ui-payroll` from `crew`, `ui-phone` (the first of `crew`, the first offered swap) and `ui-card` (the first approved swap). `parts/job-panel.liquid` picks one by a job's `panel`. Times are 24-hour in the records, shown by `parts/time.liquid`.
- The tidy-up (`parts/tidy-up.liquid`, `scripts/tidy-up.js`) draws the paper from the same `shifts`: each record's `paper` says how it starts (in place, moved from `paper_from`, a sticky note's words in `paper_note`, or written beside the crossed-out `paper_struck`).
- Every "Start your free trial" leads to `/start#trial` and every "Get a demo" to `/start#demo`.

## When adapting

- The product's name (Staff Meal) is in `parts/logo.liquid`, the footer's last line, every page's title and description, the hero, the product page's title, `parts/not-does.liquid`, the stories and the help articles. The company's address, phone ((816) 555-0134), hours (7 am to 10 pm Central) and email (hello@staffmeal.app) are in the footer, `parts/faq.liquid`, `data/contact-ways/`, `data/start-promises/`, the article page's last box and the fragments: they are facts, ask for them.
- The figures (`home-figures`, `customers-figures`), the ratings and the four stories are invented and never stay: ask for real ones, or remove them (the figures row goes rather than keep a made-up number; see Customers for the stories).
- Rewrite the demo week with the product's own example: `shifts`, `crew`, `timesheets` and `swaps`, the paper's three notes and the week's names, the labels in `parts/ui-week.liquid` ("Week of March 8", the draft's "Week of March 15" and "Copied from March 8", the days' dates, "Bramble & Bun · Waldo"), `parts/ui-phone.liquid` ("with Priya, Kenji, Dana") and the toast ("sent to 11 phones"). For another product, rewrite the parts themselves: bookings in a salon's day, jobs on a crew's board, rounds on a delivery map drawn as a list, never a map; keep each part a picture made of HTML from the theme.
- `parts/time.liquid` shows "6a–2p": for a site in French, German or most of Europe, make it write the 24-hour time as it is ("06:00–14:00").
- Prices, limits, the trial's length and the product's features are facts: ask for them once the page is built, or leave them out rather than guess.
- "Log in" leads to `/help/logging-in`: point it at the product's real address once the maker gives it, never an invented one.
- Ask the maker for their privacy policy and terms and add them as pages then; never write them.

## Pages

### Home (`/`)

The split screen (the photo with its floating card beside the jade panel), the tidy-up from the paper on the walk-in door to the clean week, the figures, the four jobs in tabs, the crew's phone, customer stories, the plans in short, questions and the closing band.

#### How does someone start?

- **A trial request, set up with a person** (as built): every "Start your free trial" leads to `/start#trial`; requests arrive in the Content tab and the maker texts the log-in. Nothing to change.
- **On the product's own sign-up page**: ask for its address, never invent it. Every trial button links there and says "Start free": `parts/hero.liquid`, `parts/closing.liquid`, `parts/header.liquid` ("Start free trial"), the story page's band, and each plan's `href` in `data/plans/`. `/start` keeps the demo form and its steps: remove `{% render 'trial-form' %}` from `pages/start.liquid` and delete `parts/trial-form.liquid`, `data/trials/` and `fragments/trials-thanks.liquid`. In `parts/proof.liquid` drop "We set up your first week with you"; rewrite `data/start-steps/` as signing up alone.
- **A demo first**, for a product sold to groups rather than single places: every trial button says "Get a demo" and leads to `/start#demo` (the same files, and the plans' `cta` and `href`). Remove the trial form as above. `parts/proof.liquid` becomes "20 minutes on a call · We'll build your first week with you".

#### How is it priced?

- **Per location, the whole crew included** (as built).
- **Per person**: in `data/plans/` each price becomes a price per person ("$3") and each `limit` a minimum ("From 5 people"); in `parts/plan-cards.liquid` "per location a month" becomes "per person a month"; the home page's heading in `parts/pricing-short.liquid` becomes "Pay for the people on the schedule, nobody else"; `parts/compare.liquid`'s "a location", `data/pricing-compare/` (the people row) and `data/pricing-faq/` follow, and the pricing page's title and description.
- **A free plan and one paid plan**: `data/plans/counter.md` becomes Free (one location, up to 10 people, price "$0", its button "Start free"), Full house stays, and Group becomes "Talk to us" with no price and "Get a demo"; `parts/plan-cards.liquid` shows "Ask us" where a plan has no price.

#### How is the product shown?

- **Drawn in the page from the theme** (as built): the parts `parts/ui-*.liquid`, filled by `shifts`, `crew`, `timesheets` and `swaps`; the Theme tab restyles them with the site.
- **The maker's screenshots**: tell the maker first that the Theme tab will no longer restyle the product. Each part's render gives way to an image in `media/` in a plain card (`rounded-box border border-base-300 soft-shadow`), in `parts/job-panel.liquid` and `parts/hero.liquid` (the card); the crew's phone frame (`parts/ui-phone.liquid`) keeps a screenshot inside `.phone-screen`. The tidy-up becomes a still before and after: in `parts/tidy-up.liquid` a photo of the paper beside the screenshot of the week, with no flight; delete `scripts/tidy-up.js` and the `paper`, `paper_from`, `paper_note` and `paper_struck` fields of `data/shifts/`.

### Product (`/product`)

The four jobs as chapters under a sticky rail that marks the one in view, each with its piece of the product, large, and three small things; what it doesn't do; the crew's numbers in plain words; the closing band.

#### One page, or a page per job?

- **One page with the rail** (as built): four chapters, the rail marking the one in view. Nothing to change.
- **A page per job**, for a product with much to say about each: move `parts/chapters.liquid`'s section into `pages/product/[jobs].liquid` (one job, `record`, with its panel, its small things and, for swaps, the crew's phone) and keep `pages/product.liquid` as `pages/product/index.liquid` with the rail and an overview; the rail's links (`parts/rail.liquid`) become `/product/{{ job.id }}` with `aria-current="page"` on the current one, and the home page's tabs link there (`parts/job-tabs.liquid`). Delete `scripts/tab-rail.js`.

When removed: delete `pages/product.liquid`, `parts/rail.liquid`, `parts/chapters.liquid`, `parts/not-does.liquid`, `parts/crew-numbers.liquid`, `data/product-not/`, `data/crew-privacy/`, `scripts/tab-rail.js` and the `product` navigation record and its footer link. The home page's tabs keep their panels and lose their "More about…" link (`parts/job-tabs.liquid`); the tidy-up's "How the schedule works" link goes.

### Pricing (`/pricing`)

The plans with the Monthly or Yearly switch, the comparison table, what every plan includes, billing questions and a pale jade band for groups.

#### Do you show the prices?

- **Yes** (as built).
- **On request**: in `data/plans/` remove `monthly` and `yearly`, and set each plan's button to "Ask us" and `/start#demo`; `parts/plan-cards.liquid` shows "Ask us" in place of the price; remove the switch from `parts/plans-toggle.liquid` (keep the monthly cards only) and the price line from `parts/compare.liquid`'s heading. The home page's pricing section keeps the plans' names and limits.

#### Is there a yearly price?

- **Yes, two months free** (as built): the switch.
- **Monthly only**: remove the fieldset and the yearly cards from `parts/plans-toggle.liquid`, and the `yearly` field from `data/plans/`.

When removed: delete `pages/pricing.liquid`, `parts/plans-toggle.liquid`, `parts/compare.liquid`, `parts/compare-cell.liquid`, `parts/included.liquid`, `parts/billing-faq.liquid`, `data/pricing-compare/`, `data/pricing-included/`, `data/pricing-faq/` and the `pricing` navigation record and its footer link. The home page's pricing section stays; remove its "Compare the plans" link.

### Start (`/start`)

Two ways to start side by side, a trial request and a demo request, their answers, what happens next in four steps, and three reassurances. Its forms follow how someone starts, chosen with the home page.

#### Who sets up the first week?

- **A person, with them** (as built): the trial's answer offers to type it in from a photo of the paper, and the steps say so.
- **They do it alone**: `data/start-steps/` becomes "Sign up", "Add your crew", "Post the week", "Your crew get the app"; drop "We set up your first week with you" from `parts/proof.liquid`, the offer from `fragments/trials-thanks.liquid`, "Your first week set up with you" from `data/pricing-included/`, and the photo card, `data/contact-ways/photo.md`.

When removed: delete `pages/start.liquid`, `parts/trial-form.liquid`, `parts/demo-form.liquid`, `parts/start-steps.liquid`, `data/trials/`, `data/demos/`, `data/start-steps/`, `data/start-promises/`, `fragments/trials-thanks.liquid` and `fragments/demos-thanks.liquid`, and the footer's "Start a free trial" and "Get a demo" links. Point every trial button to the product's sign-up page (ask for it) and every "Get a demo" to the phone (`tel:`) or an email (`mailto:`).

### Customers (`/customers`)

The stories as rows with their cover scenes and quotes, the figures across customers and the closing band, with a page per story: each story's page has its facts, before and now, the story, the owner's quote and figures, and two other stories.

#### How do customers appear?

- **Their places and their initials** (as built): a cover scene of each place in `cover`, the owner's initials on jade (`parts/avatar.liquid`). The four stories are invented: replace them with the maker's real customers, or keep one example and say so.
- **With their portraits**: photos the customers send, with their permission, in each story's `portrait` field; `parts/avatar.liquid` shows it in place of the initials. A portrait goes only where the person agreed to be shown.
- **Quotes only**: delete `pages/customers/[stories].liquid`; in `parts/stories-list.liquid` and `parts/stories-home.liquid` the rows stop being links and lose "Read the story"; remove `headline`, `before`, `now`, `figures`, `work_photo` and the body from `data/stories/`.

When removed: delete `pages/customers/`, `parts/stories-list.liquid`, `parts/stories-home.liquid`, `parts/avatar.liquid`, `data/stories/`, `data/customers-figures/` and the `customers` navigation record and its footer column. On the home page, remove `{% render 'stories-home' %}`; the closing band follows the questions.

### Help (`/help`)

The articles by topic, each a summary and a link to its page, three ways to talk to a person and the support form, with a page per article: each article's page has its topic, its date, its numbered steps and "Still stuck?".

#### Where does help live?

- **Articles on this site** (as built).
- **An outside help center**: ask for its address; "Help" in `data/navigation/help.md` and the footer's help column link to it. `/help` keeps `parts/talk.liquid` and `parts/support-form.liquid` under the title "Talk to us"; delete `pages/help/[help-articles].liquid`, `parts/help-topics.liquid` and `data/help-articles/`. "Log in" (`parts/header.liquid`) then points to the product's own address.

When removed: delete `pages/help/`, `parts/help-topics.liquid`, `parts/talk.liquid`, `parts/support-form.liquid`, `data/help-articles/`, `data/contact-ways/`, `data/support/`, `fragments/support-thanks.liquid` and the `help` navigation record and its footer column. The footer keeps the phone and the email; "Log in" points to the product's address, or goes.

### Changelog (`/changelog`)

The dated changes with their plain pills and the job each touches, and a monthly email strip.

#### Do people get it by email?

- **Yes, once a month** (as built): the strip over `newsletter`.
- **No**: remove `{% render 'newsletter' %}` from `pages/changelog.liquid` and delete `parts/newsletter.liquid`, `data/newsletter/` and `fragments/newsletter-thanks.liquid`.

When removed: delete `pages/changelog.liquid`, `parts/changes.liquid`, `parts/newsletter.liquid`, `data/changes/`, `data/newsletter/` and `fragments/newsletter-thanks.liquid`, and the footer's "What's new" link.
