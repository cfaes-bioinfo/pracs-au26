---
name: proofread
description: Comprehensively proofread a document (course site .qmd, README, etc.) and walk through suggestions one at a time so the user can approve or reject each individually. Use whenever the user asks to proofread, copyedit, or review a document for writing/content issues.
---

Proofread the target document(s) carefully and comprehensively, covering both:

- **Language**: typos, grammar, unclear or awkward phrasing, style consistency (with itself and with the rest of the site)
- **Content**: potential factual errors, misleading statements, poor pedagogy, inconsistencies with other course material
- **Teaching quality** (think outside the box — the goal is to improve this as teaching material, not just to fix mistakes):
  - Is each concept presented clearly and in a sensible order? Would a different (type of) example,
    analogy, visual, or demo work better for grad students with no prior computing background?
  - Are any key subtopics, common pitfalls, or "why does this matter" motivations missing
    that you know are important for this topic?
  - Is anything overexplained, unnecessary at this point in the course, or better moved to a later week
    (never an earlier, already-taught one)?
- **In-lecture exercises**: these should be relatively quick and not very hard, but should make students *think*.
  Flag exercises that are merely a recap posed as a question (i.e., only testing whether students paid attention),
  and suggest alternatives that push students just slightly beyond what was taught,
  or make them reason about implications of it (e.g., predict what a slight variation of a command will do,
  spot why something would fail, or apply a concept to a new but closely related situation).

## Process

1. Read the full document (and any directly related files needed for consistency, e.g. adjacent weeks' pages)
   before forming suggestions. Do not proofread from a partial read.
2. Work through the document and compile the full list of issues internally first — do not stop after the first few.
3. Present suggestions to the user **one at a time**, in order of importance.
   Teaching-quality and exercise suggestions are often larger, more open-ended changes:
   present these as proposals (with a concrete draft of the new text/example/exercise where feasible),
   not as silent rewrites. For each suggestion:
   - Quote the original snippet (with enough surrounding context to locate it)
   - Show the proposed fix
   - Give a one-line rationale if it's not self-evident (especially for content/factual concerns)
   - Present this with buttons I can click: accept, reject, alternatives to accept where appropriate
   - Always include clickable line numbers to refer to the original document, so I can see the context of the suggestion
   - Suggestions, especially smaller ones, can be presented in groups of up to four with tabs, with changes applied after each group.
4. Show a diff after each (set of) change(s) is applied, so I can see exactly what changed.
5. At the end, briefly summarize what was changed vs. skipped — not a re-listing of every item, just a short wrap-up.
