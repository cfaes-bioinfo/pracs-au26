# Style guide (authoring notes)

Notes for maintaining consistent styling across `.qmd` source files.
This file is plain Markdown and is intentionally **not** rendered as part
of the Quarto site (only `*.qmd` files are rendered per `_quarto.yml`).

## Callouts

Quarto natively supports five callout types: `note`, `tip`, `warning`,
`important`, `caution`. Colors for these are overridden in `styles.css`
(website) and `slides.css` (reveal.js slides) to match the site's palette.

### Quiz / question callout

For posing a question to students (distinct from the five built-in types),
use a `.callout-note` callout wrapped in an outer `.callout-quiz` div.
Quarto's callout rendering strips any class it doesn't recognize from the
callout div itself, so `.callout-note .callout-quiz` on one `:::` block
**does not work** — the `callout-quiz` class is silently dropped. Instead,
nest the callout inside a plain wrapper div that keeps the custom class:

```markdown
::: {.callout-quiz}
::: {.callout-note}
## Question
What do you think will happen if you run this command without `sudo`?
:::
:::
```

CSS in both `styles.css` and `slides.css` targets
`.callout-quiz div.callout.callout-note` to override the color (purple,
`#6f42c1`) and icon (Bootstrap `question-circle-fill`). This works in both
website pages and reveal.js slides.

For click-to-reveal behavior in reveal.js slides, `collapse` (an HTML-only
Quarto callout feature) doesn't work; wrap the answer content in a
`.fragment` div instead so it appears on a click:

```markdown
::: {.callout-quiz}
::: {.callout-note}
## Question
What do you think will happen if you run this command without `sudo`?

::: {.fragment}
It will fail with a permissions error.
:::

:::
:::
```

### Quiz-styled `<details>` block

For a click-to-reveal question (e.g. on a website page, where reveal.js
fragments don't apply), use a plain `<details>` element with the
`details-quiz` class instead. This isn't a Quarto callout, so there's no
class-stripping issue -- the class can go directly on the `<details>` tag:

```html
<details class="details-quiz">
<summary>Can you think of a reason to use a supercomputer instead of your own laptop?</summary>

Answer goes here.

</details>
```

CSS in both `styles.css` and `slides.css` styles `details.details-quiz` to
match `.callout-quiz` as closely as possible: purple border/accent, a
tinted `<summary>` background, and the same question-mark icon.
