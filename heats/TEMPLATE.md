# Heats

Heats is an open project's site drawn as an engineering sheet on graph paper. Its first screen is the family as a numbered index, a ruled row per model with its figures, beside the command to copy; its benchmarks are heats, races between the same four lanes whose bars finish in the order of their figures. It was written for Dunlin, an imaginary family of open-weights language models made by the Dunlin Project, a nonprofit with no office. It suits another open model (language, vision, speech, image), a library (the index lists its packages, the heats compare operations per second or size), a command-line tool (the tabs hold the package managers) or a database (the heats race queries per second and latency). Keep the structure; rewrite the index, the heats and their lanes, the commands, the ledger, the license, the report, the revisions, the people and the sponsors.

## How it is made

- Every page shares the header (`parts/header.liquid`: the engraved bird of `parts/mark.liquid`, the links of `navigation` whose place is header, "Get the weights"; a menu button below 1280 px) and the footer (`parts/footer.liquid`, a drawing's title block, with `navigation`'s columns and its social links). Each page passes its sheet number to the footer and writes it at its head.
- `models` fills the index (`parts/index.liquid`: the home page, `/models`, the foot of each model card), the machines table and each card, whose commands are built from its `ollama`, `hf` and `gguf` fields by `parts/run-strip.liquid`. `runtimes` fills the tabs of the home page (those marked `home`) and of `/run`.
- `heats` and `lanes` fill every heat: `parts/heats.liquid` picks the heats, `parts/heat-lanes.liquid` draws one, `parts/heats-table.liquid` is Table 1 and holds the footnote. A lane's `lane` field says which figure of a heat is its own (`ours`, `earlier`, `baseline_a`, `baseline_b`). The home page shows the heats marked `home`, the evals page all, the report two (named in `parts/report-figures.liquid`), the featured model's card the home page's.
- `openness` (the ledger), `license-terms`, `releases`, `home-figures` and `sponsors` fill the home page's other sections; `title-block` the hero's cells.

## When adapting

- The project's name is in `parts/header.liquid`, `parts/hero.liquid`, `parts/footer.liquid` (the name, "Drawn by", the revision, the last line), `data/title-block/`, `data/lanes/`, `parts/home-heats.liquid` ("Lane 1 is Dunlin 3"), `parts/bibtex.liquid`, `parts/report-cover.liquid`, `parts/blueprint.liquid`, `parts/prints.liquid`, `parts/rerun.liquid`, `parts/checksums.liquid`, `parts/license-text.liquid` (its last line), each page's title, description and sheet label, the records of `models`, `runtimes`, `releases` and `license-terms`, and the fragments.
- Addresses (GitHub, Hugging Face, the forum, the chat, the PDF, arXiv), package names, repository paths and checksums are invented and never stay. Ask for each, or remove its line: never invent one, which could belong to someone else. They are in `data/models/`, `data/runtimes/`, `data/run-steps/`, `data/checksums/`, `data/openness/`, `data/heats/` (`config`), `data/releases/` (`upgrade`), `data/sponsors/`, `data/channels/`, `data/navigation/`, `pages/report.liquid` and `parts/time-zones.liquid`.
- Every eval figure is a placeholder and never stays: ask for the maker's results, heat by heat, or remove a heat. A heat with fewer than two figures is removed, since it races nothing. The figures are also in the tables of the model cards. In `data/models/`, the sizes and memory are facts too.
- The community's figures (`data/home-figures/`, "212" in `parts/people.liquid`, the hero, the footer, the report and the community page) and the sponsors with their amounts are invented: ask for the real ones, with their date, or remove the figures and the ledger.
- The maintainers' names, pronouns, cities and time zones come from the people themselves. A photo goes in a maintainer's `photo` only with their agreement; until then their initials stand.
- The bird is Dunlin's. For another project, replace `media/dunlin-plate-1.webp` (header, report's cover, sponsor form) and `media/dunlin-plate-2.webp` (the people section) with engravings of its own emblem in the same style, or remove them, and the two photos at the head of `/community` with them. `parts/prints.liquid` draws the bird in characters: redraw it or remove the section.
- The sheets are numbered 01 to 08 in the pages' order: number them again when a page goes ("of 08" is in each page's head and in `parts/footer.liquid`). The home page's section labels (`02 · Heats`…) follow the same way.

## Pages

### Home (`/`)

The family's index under the headline, the statement and the command in tabs, with the drawing's title block; four heats and their table; what the project is for and not for; the ledger of what is published; the license in three columns; the report's cover on blueprint; the latest revisions; the people and the sponsors.

#### What does the first screen list?

- **The sizes, each with its figures** (as built): the index over `models`, and a card per model.
- **What it does, each with a figure**, for a project with one thing to install: in `parts/index.liquid` loop over `data["home-uses"]`, with a `figure` field added to it ("0 dependencies", "12 kB gzipped", "3 ms cold start") in place of the figures' columns, and no links. The run strip stays; remove `/models` as its section says, and `parts/uses.liquid` from the home page, since the index now shows its records.
- **Its packages or parts**, for a monorepo, a database with its drivers or a framework with its plugins: a `packages` list (name, version, size, license, what it is, its README's address) in place of `models`, in `parts/index.liquid`. `pages/models/` becomes `pages/packages/` with `[packages].liquid`, its run strip built from each package's install command, and the machines table goes.

#### What do the heats compare?

- **This release against its predecessor and two unnamed baselines** (as built): rewrite `data/lanes/` and the figures.
- **Your own releases only**: the lanes become the latest release and three earlier ones of the same size; in `data/lanes/` the latest is `solid` and the others `striped`. No outside project appears: the footnote in `parts/heats-table.liquid`, `data/evals-faq/baselines.md` and the note under the lanes follow.
- **Named projects, from your own published runs**: the lanes take the names the maker gives, with the figures from their own runs only. Each heat's `config` links to that run, and "Our runs" stays in the footnote. Never take a figure from memory, a paper or another site. `data/evals-faq/baselines.md` goes.

#### How do people get it?

- **A command to copy, in tabs** (as built).
- **Gated weights**, for a license to accept first: in `parts/run-strip.liquid` a line before the tabs, "Accept the license on Hugging Face", linked to the repository, the commands under it; in `data/title-block/license.md` the value becomes "Accept on Hugging Face". "Get the weights" keeps leading to `/run`.
- **Downloads per platform**, for an app or a command-line tool with installers: above the tabs of `parts/hero.liquid` and `pages/run.liquid`, a button each for macOS, Windows and Linux (`btn btn-primary`, then `btn btn-outline`), with the file's size and its checksum in `.mono`. The tabs keep the package managers (Homebrew, winget, apt).

### Models (`/models`)

The index again with the layers and release dates, base or instruct, and which size fits which machine; then a card per model: its figures, its commands, its files, the machine it runs on, and the card itself (intended use, training, evaluation, limits, citation).

#### A page per model?

- **Yes, a card each** (as built).
- **The index only**, for a project with one or two models: the rows of `parts/index.liquid` are no longer links (an `<a class="index-row …">` becomes a `<div class="index-row …">`, its arrow goes), nor are the names in `parts/machines.liquid`. Delete `pages/models/[models].liquid`; the files list moves to `pages/run.liquid`; the hero's "Read the model card" goes.

#### Do you publish quantized files?

- **Yes, several precisions per model** (as built): the "At 4-bit" column and the files with their sizes.
- **Full precision only**: the column becomes "On disk" and reads `bf16` (`parts/index.liquid`, the card's spec cells); each model's `files` holds one line and its `memory` one precision; `data/machines/` is read at full precision; the comments built in `parts/run-strip.liquid` say the full size. The Q4_K_M question of `data/run-faq/` and the 4-bit checksums go.

When removed: delete `pages/models/`, `parts/base-instruct.liquid`, `parts/machines.liquid`, `data/machines/` and `data/navigation/models.md`, and the "Models" link of `data/navigation/use-column.md`. The home page's index keeps `data/models/` with rows that are no longer links (`parts/index.liquid`), or lists what the project does. In `parts/hero.liquid`, point "Read the model card" to `/run`. `parts/run-strip.liquid` loses its "model" case. When the index no longer reads `models`, delete `data/models/` and the five `media/machine-*` photos with it.

### Evals (`/evals`)

The four lanes with their patterns, seven heats on quality, two on speed, Table 1 with every heat, how they are run, the command to run them again and questions. Its lanes follow what the heats compare, chosen with the home page.

#### What do the heats measure?

- **Quality and speed** (as built): the two groups.
- **Quality only**: delete the speed section of `pages/evals.liquid` and the heats whose `group` is speed; the intro and the description lose "how fast it does it"; `data/eval-method/decoding.md`, `data/evals-faq/benchmarks.md` and the abstract's "nine" follow.
- **Speed only**, for a library, a command-line tool or a database: the heats race operations per second, latency, memory or install size (`better: lower` where less is better); all are in one group and the quality section goes; `data/eval-method/` speaks of the machine and the runs, and `data/evals-faq/` follows.

#### How are the figures shown?

- **The heats, then the table** (as built).
- **The table only, with still bars**, for a maker who would rather not animate their results: in `parts/heats-table.liquid` each cell gets a thin bar of its figure (`.lane-track` with a `.lane-bar` under the number). On every page, remove `{% render 'heats' %}`, the "Run again" buttons, `data-heats`, `scripts/heats.js`, `parts/heats.liquid` and `parts/heat-lanes.liquid`; the report's Fig. 2 goes, and on the home page the heading no longer says "heats".

When removed: delete `pages/evals.liquid`, `parts/lanes.liquid`, `parts/eval-method.liquid`, `parts/rerun.liquid`, `parts/evals-faq.liquid`, `data/eval-method/`, `data/evals-faq/`, `data/navigation/evals.md` and the "Evals" link of `data/navigation/read-column.md`. In `parts/home-heats.liquid` remove "All nine heats"; the home page's heats and Table 1 stay. In `data/models/dunlin-3.md` the link to `/evals` under Evaluation goes. `parts/question.liquid` goes when `/run` is removed too.

### Run it (`/run`)

The six ways to run it in tabs with their notes, from zero to a first answer in four steps, what the program prints first, the checksums and questions by topic.

#### Where do people run it?

- **On their own machine** (as built): the six tabs, the steps, the checksums.
- **On their own machine, or on the project's hosted endpoint**: a "Hosted" record in `data/runtimes/` with a `curl` call to the project's own API and a line on its limits. Ask for the address and never invent a key. The intro's "with no account and no key" and the last question of `data/run-faq/` follow.
- **On their own servers**: in `data/runtimes/` the container and an inference server come first; `data/machines/` becomes a table of graphics cards; a "Serving" section is added after the steps (adapted from the gallery's `steps-numbered-line`).

When removed: delete `pages/run.liquid`, `parts/run-steps.liquid`, `parts/prints.liquid`, `parts/checksums.liquid`, `parts/run-faq.liquid`, `data/run-steps/`, `data/checksums/`, `data/run-faq/`, the records of `data/runtimes/` that are not marked `home`, `data/navigation/run.md` and the "Run it" link of `data/navigation/use-column.md`. Point "Get the weights" (`parts/header.liquid`) to the featured model's card, and remove "Every way to run it" from `parts/hero.liquid` and `pages/models/[models].liquid`. `parts/run-strip.liquid` loses its "all" case. `parts/question.liquid` goes when `/evals` is removed too.

### The report (`/report`)

The report's cover on blueprint with its two addresses, the abstract, its contents as a numbered index, two figures (the data by source, two heats), who did what and how to cite it.

#### How many papers?

- **One technical report, its page** (as built).
- **Several papers**: a `papers` list (title, authors, date, address), shown as ruled rows like `parts/revisions.liquid` without the triangle, in place of the cover, the abstract and the contents. Delete `parts/report-contents.liquid`, `parts/report-figures.liquid`, `data/report-sections/` and `data/data-mix/`.

When removed: delete `pages/report.liquid`, `parts/report-contents.liquid`, `parts/report-figures.liquid`, `parts/report-credits.liquid`, `parts/cite.liquid`, `data/report-sections/`, `data/report-credits/`, `data/data-mix/`, `data/navigation/report.md` and "The report" of `data/navigation/read-column.md`. In `parts/blueprint.liquid` point "Read the report" to the paper's own address; with no paper, remove `{% render 'blueprint' %}` from the home page and delete `parts/blueprint.liquid`, `parts/report-cover.liquid` and `parts/bibtex.liquid`. The answer `data/evals-faq/instruct-or-base.md`, the records of `data/releases/` and the Flock card speak of the report: they follow.

### Releases (`/releases`)

Every revision since 1.0, newest first, with its triangle, its date and its kind, and the release notes by email; then a page per revision: what changed, the command to upgrade, the notes, the previous and the next one.

#### A page per revision?

- **Yes** (as built).
- **The log only**: each row of `parts/revisions.liquid` links to the project's releases on GitHub (ask for the address). Delete `pages/releases/[releases].liquid` and the `changes`, `upgrade` and `notes` fields of `data/releases/`.

When removed: delete `pages/releases/`, `parts/revisions.liquid`, `parts/home-revisions.liquid`, `parts/rev-mark.liquid`, `data/releases/`, `data/navigation/releases.md` and the "Releases" link of `data/navigation/read-column.md`. Remove `{% render 'home-revisions' %}` from `pages/index.liquid`. The title block and the footer keep the latest revision as text; the release notes strip stays on `/community`.

### License (`/license`)

What you may, must and may not do in three columns, using it in a product, and the license's full text, folded on a phone.

#### What kind of license?

- **A permissive license, in plain words** (as built): Apache-2.0, MIT or BSD. For another than Apache-2.0, rewrite `data/license-terms/` and replace the text in `parts/license-text.liquid` with the license's own, word for word.
- **A license with conditions**, for an acceptable-use policy, a threshold of users or revenue, or research only: "You may not" (`data/license-terms/you-may-not.md`) grows; "See the conditions" joins `data/title-block/license.md` and the License cell of `pages/models/[models].liquid`; `data/license-faq/` explains the threshold. The maker gives the text.
- **A license per model**: a `license` field on `models`, shown in `parts/index.liquid` and in the card's License cell; the page lists each license in turn, three columns each.

When removed: delete `pages/license.liquid`, `parts/license-faq.liquid`, `parts/license-text.liquid`, `data/license-faq/` and the "License" link of `data/navigation/use-column.md`. The home page's three columns stay (`parts/license-columns.liquid`, `data/license-terms/`, whose `more` field goes); point "Read the license" in `parts/home-license.liquid` to the LICENSE file in the repository.

### Community (`/community`)

Two photos of the bird, where the project talks, how to contribute, the maintainers along a ruler of time zones, how decisions are made, the sponsors, the form to offer compute or funding, and the release notes by email.

#### Where do people talk?

- **A forum and a chat** (as built), with the office hours.
- **GitHub Discussions only**: `data/channels/` keeps the discussions, the issues and the mailing list; the office hours go unless the maker holds them, and the forum and the chat leave `data/navigation/join-column.md`. `data/decisions/rfcs.md` and `data/evals-faq/send-a-heat.md` follow; "people on the forum" leaves `data/home-figures/`.

#### Do you take compute or money?

- **Both, through the form** (as built): the ledger and the form.
- **Money through a fiscal host, compute through the form**: a "Give monthly" button under the ledger (`parts/sponsors.liquid`) to the fiscal host's page, whose address the maker gives; in `data/sponsor-offers/` and `parts/sponsor-form.liquid` the choices keep Compute and Storage or bandwidth, and the heading says "Offer compute".
- **Neither**: the ledger stays as thanks. Delete `parts/sponsor-form.liquid`, `data/sponsor-offers/` and `fragments/sponsor-offers-thanks.liquid`; remove "Offer compute" from `parts/people.liquid` and `data/navigation/join-column.md`.

When removed: delete `pages/community.liquid`, `parts/channels.liquid`, `parts/contribute-steps.liquid`, `parts/time-zones.liquid`, `parts/initials.liquid`, `parts/decisions.liquid`, `parts/community-sponsors.liquid`, `parts/sponsor-form.liquid`, `data/channels/`, `data/contribute-steps/`, `data/maintainers/`, `data/decisions/`, `data/sponsor-offers/`, `fragments/sponsor-offers-thanks.liquid`, `media/dunlin-flock.*`, `media/dunlin-feeding.*`, `data/navigation/community.md`, and "Community" and "Offer compute" of `data/navigation/join-column.md`. The home page's people and sponsors stay; its "Offer compute" (`parts/people.liquid`) becomes a `mailto:` to an address the maker gives. Point "Release notes by email" (`data/navigation/read-column.md`) to `/releases#notes`.
