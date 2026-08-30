# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Product grain

Explanation-first SIE prep. 181 official outline bites, 34 FINRA leaves. Teach-back readiness (Gap / Misconception / Rusty / Exam-Ready / Mastered) is the module assessment. QBank is right/wrong only and never writes those states. Plan: `docs/backend-plan.md`. UI blueprint (do not re-litigate): firstmate data `tb-review-teachback-frontend-interactivity-73/report.md`.

Study has two modes: overview Home (today's notes, days until exam, pace merged with progress-versus-plan, summary readiness) and a sequential work path (note alone → teach-back + Signal after submit → next bite). Calendar is its own nav item. Outline is the section-grouped 181-bite grid, not a second home. Product behavior: `readme.md`.

## Content vs user state

Product content is compiled from `content/` into `ui_kits/web/data.js` (`python3 content/compile.py`). Per-user progress, exam date, answers, results, and QBank history belong in `store/tb-store.js` (local-first). Hosted cloud is a stub. Optional file server: `node server/store-server.mjs` (writes gitignored `data/users/`).

Do not invent dollar figures, holding periods, or coverage limits on outline notes. Leftovers stay labeled stub. Authored exceptions: B008, B010, B019.

Keyword grader: `store/grade.js`. It never emits Misconception.

## Lane split

Another worker owns `ui_kits/web/screens.jsx`. Do not edit that file from a backend/content lane.

The generic outline-to-HTML generator is a different local repo: `~/Developer/firstmate/projects/teachback-skill`.

## Verify

```sh
python3 content/compile.py
node store/tb-store.test.mjs
```

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.

## Web kit

Product behavior and local review instructions are owned by `readme.md`.

Visual tokens are owned by `tokens/`. After changing components, tokens, cards, or web screens, run `node scripts/build-design-system.mjs` to regenerate `_ds_bundle.js` and `_ds_manifest.json`.
