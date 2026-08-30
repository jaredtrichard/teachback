# teachback

Explanation-first SIE prep. Read a bite, teach it back.

Product-facing frontend kit on the frozen product grain:

- Two study modes: an overview Home, and a sequential flow-state work path
- Home is today's notes, days until the exam (not the exam date itself), pace with progress-versus-plan merged in, and summary readiness. Yellow is today. Coral is overdue authored unready work only — stubs are never coral.
- Calendar is its own nav item (week look-ahead; today is the first column; arrows shift the window; Month view scrolls continuously to the exam date). Exam date is set here.
- Outline is a section-grouped map of the **181** bites with section and leaf names. Cells show bite titles (hover for the full title and state). It is a map of the SIE, not a second home.
- Work path: note page only → teach-back page (explanation only until submit; Signal appears after) → next bite. Note and explanation are never on the same page. No left TOC, calendar, countdown, pace, or readiness summary in the flow. No empty Signal placeholder before submit.
- Pace is remaining modules divided by remaining study days
- Frontend-only email, Google, Facebook, and Apple login stubs
- Left nav is Home / Outline / Calendar / Brush-up. Brush-up is flashcards for spaced recall (Gap / Misconception / Rusty / quiz misses / unassessed authored) plus Create quiz in the top right; generated questions are honest stubs, scored right/wrong only, and never write readiness. Grading a card only schedules the next due date.
- v3 tokens: cream, desaturated clover, Sora / DM Sans, no XP
- **181** official outline bites, **34** FINRA leaves as folders
- QBank is right/wrong only — it does not write Gap / Rusty / Exam-Ready / Mastered

## Review the frontend

From the repo root (paths in the kit are relative to here):

```sh
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/ui_kits/web/

Notes are outline-derived from the ©2024 SIE Content Outline. Three bites are authored (SIPC, investor categories, primary market) and may carry specific figures. Everything else unpacks the official bullet and parentheticals; leftover numbers stay labeled **stub**.

## Persistence

The live kit still writes `localStorage`. The contract the UI rewrite should switch to is `store/tb-store.js` (local-first, hosted stub, optional file server). Plan: `docs/backend-plan.md`.

```sh
python3 content/compile.py
node store/tb-store.test.mjs
node server/store-server.mjs   # optional; writes gitignored data/users/
```

## Source outline

https://www.finra.org/sites/default/files/SIE_Content_Outline.pdf

## Skills pack

The generic “drop in an outline, get an HTML app” generator is a different local repo: `~/Developer/firstmate/projects/teachback-skill`. Not this product.
