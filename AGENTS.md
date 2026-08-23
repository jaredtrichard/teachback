# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.

## Web kit

Product-facing frontend lives in `ui_kits/web/`. Serve from the repo root: `python3 -m http.server` then open `/ui_kits/web/`.

Visual tokens are v3 (`tokens/`): cream `#FAF8F2`, desaturated clover `#2F8F5B`, teal Mastered, Sora / DM Sans, 1px / 3px hard edges, no XP. After changing components, tokens, cards, or web screens, run `node scripts/build-design-system.mjs` to regenerate `_ds_bundle.js` and `_ds_manifest.json`.

Captain locks: 181 bite cells colored by that bite's readiness; learner-set exam date; even-spread calendar including stubs; pace is remaining modules ÷ remaining days; left nav; Course switcher; circular profile after login; same-page teach-back; QBank is right/wrong only.
