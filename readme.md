# teachback

Explanation-first SIE prep. Read a bite, teach it back.

Product-facing frontend kit on the frozen product grain:

- Home pairs a one-week look-ahead calendar (today is the first column; arrows shift the window; Month view scrolls continuously to the exam date) with a section-grouped **181**-bite readiness grid; each grid cell is colored by its bite's own readiness. Yellow is today. Coral is overdue authored unready work only — stubs are never coral.
- Pace is remaining modules divided by remaining study days
- Same-page note, teach-back, and readiness feedback (no read-gate)
- Frontend-only email, Google, Facebook, and Apple login stubs
- Left nav is Home / Outline / Brush-up. Brush-up is flashcards for spaced recall (Gap / Misconception / Rusty / quiz misses / unassessed authored) plus Create quiz in the top right; generated questions are honest stubs, scored right/wrong only, and never write readiness. Grading a card only schedules the next due date.
- v3 tokens: cream, desaturated clover, Sora / DM Sans, no XP

## Review the frontend

From the repo root (paths in the kit are relative to here):

```sh
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/ui_kits/web/

Three demo bites have real notes (SIPC, investor categories, primary market). The rest are title stubs so you can walk the full outline.

## Source outline

https://www.finra.org/sites/default/files/SIE_Content_Outline.pdf
