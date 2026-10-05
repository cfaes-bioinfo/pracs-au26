# Style guide (authoring notes)

Notes for maintaining consistent styling across `.qmd` source files.
This file is plain Markdown and is intentionally **not** rendered as part
of the Quarto site (only `*.qmd` files are rendered per `_quarto.yml`).

## Line breaks in source files

In `.qmd` and `.md` source files, start a new line after each sentence
or sentence part (e.g. after a clause ending in a comma),
rather than only wrapping lines when they reach the ruler.
These line breaks are invisible in the rendered output,
but they make diffs smaller and the source easier to read and edit.

## Punctuation in lists

- No period at the end of items that are just a link, a citation,
  or a sentence fragment
- A period at the end of items that are full sentences,
  or that end with a description (e.g. after ` --- ` or ` -- `)

For example:

```markdown
- Ohio State's [AI landing page](https://ai.osu.edu)
- [Claude Academy](https://academy.claude.com) ---
  Multiple free short courses by Anthropic on using AI.
- For more, see the [AI section of the Resources page](../ref/resources.qmd#ai).
```

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

**Slides only: single-fence `.quiz` variant.** In reveal.js slides, use the
shorter form with a `.quiz` class directly on the callout. Because `quiz`
doesn't start with `callout-`, Quarto's revealjs renderer keeps it and
produces the same wrapper-div structure, so only one fence is needed:

```markdown
::: {.callout-note .quiz}
## Question
What do you think will happen if you run this command without `sudo`?
:::
```

Other classes, such as `.fragment data-fragment-index="1"`, can go on the
same fence. Only `slides.css` styles `.quiz`, so on website pages keep
using the two-fence `.callout-quiz` form.

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

### Punctuation in `<summary>` labels

A `<summary>` is a clickable control, like a button, so it gets no
terminal period, even when it's a full sentence or an imperative:

```html
<details><summary>{{< fa check-circle >}} &nbsp; _Click to see the answer_</summary>
```

Question-style summaries keep their question mark.
