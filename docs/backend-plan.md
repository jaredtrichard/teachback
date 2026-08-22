# Backend, persistence, and content plan

Checkpoint the captain can revert against. Frontend rewrite of `ui_kits/web/screens.jsx` is a different lane; this plan does not touch that file.

Source outline: FINRA SIE Content Outline ©2024 (the PDF this repo already cites). Skills pack lives in a different local repo (`teachback-skill`); do not build it here.

## 1. Per-user cloud storage

Nobody uses this yet. Do not buy a region, a cluster, or an auth vendor.

**Default now:** local-first. The kit already writes `localStorage` key `tb-frontend-review:v2`. Keep that as the live adapter. Extract one `Store` interface so the UI rewrite can swap backends without a second persist path.

**Next, only if a second device or a second human appears:** a tiny optional file store (`data/users/<id>.json`, gitignored) behind the same interface. A 40-line local HTTP server is enough. No custom k8s.

**Later hosted (optional, stubbed now):** one `HostedStore` that talks to Neon or Supabase free tier. Same interface. Pick the one that is already in the founder defaults when someone pays. No Auth0 / Clerk / Cognito until there is a paying user.

Auth stays a frontend stub (email + password fields, nothing sent). A real identity vendor is lock-in we do not need.

## 2. Data maintenance

Two piles. Do not mix them.

**Product content (committed, one source of truth):**

- 181 outline bites (`id`, leaf, titles, note body, rubric)
- 34-leaf / 4-section tree
- State vocabulary (Unassessed → Gap → Misconception → Rusty → Exam-Ready → Mastered)
- QBank items when authored (right/wrong only; they never write module readiness)

Source files live under `content/`. `ui_kits/web/data.js` is a generated kit bundle the current `<script src="./data.js">` tag can load. Extra fields (`status`) are ignored by today’s screens and usable by the rewrite.

**Per-user (not committed):**

- `user` (stub identity string)
- `examDate` (ISO date or null)
- `answers` (teach-back text by bite id)
- `results` (state, criterion outcomes, misses, gradedAt)
- `qbank` (item id → {answer, correct, at})
- `view` / last bite (session chrome)
- `streak` (derived later; do not invent activity)

XP is out of the product grain. Do not persist it in the new schema. Old `xp` keys may remain in localStorage until the UI rewrite drops them.

Schema sketch:

```
UserState {
  version: 3
  user: string
  examDate: string | null
  topicId: string
  view: string
  answers: { [biteId]: string }
  results: { [biteId]: Result }
  qbank: { [itemId]: QBankAttempt }
}

Result {
  state: "Gap" | "Misconception" | "Rusty" | "Exam-Ready" | "Mastered"
  crits: { id, outcome, feedback }[]
  misses: string[]
  gradedAt: string
}

Bite {
  id, leaf, leafTitle, section, sectionTitle
  title, subtitle, read
  status: "authored" | "outline" | "stub"
  inShort: string[3]
  core: string[]
  precision: string[]
  prompt, placeholder
  criteria: { id, label, keys, fb }[]
  demo: boolean
}
```

`status`:

- **authored** — the three existing demo notes (B008 SIPC, B010 investors, B019 primary market). Specific figures stay; they were already shipped.
- **outline** — honest prose unpacked from the official bullet, parentheticals, and “Knowledge of” lists. No invented dollar figures, holding periods, or coverage limits.
- **stub** — still labeled stub. Used only when the outline bullet is a name with no nested structure we can unpack without inventing precision.

Plan math (calendar, weekly hours, today) uses **authored** bites only. Outline notes are walkable and gradable; they do not enter “progress vs plan.” Stubs never do.

## 3. No-AI first mockup

Fill as many title stubs as the ©2024 outline can honestly support. No paid API tokens.

Rules:

- In short / Core / Precision come from the official bullet + examples in the PDF (e.g. “CBOE, FINRA, MSRB”, “T, T + 1”, “prepaid tuition / savings plans”).
- Nested “Knowledge of” lists stay inside their owning leaf and become their own bites, matching the 181-cell split already in `data.js`.
- Rubrics stay keyword / deterministic. Keys are outline terms, not trivia we made up.
- If a fact needs a number the outline does not print (gift limit, SIPC figures on a non-demo bite, CE windows), leave that line labeled **stub** rather than guessing.
- Misconception is in `TB_STATES` for the UI key. The keyword grader still only emits Gap / Rusty / Exam-Ready. Do not fake Misconception from a missed keyword.

This pass is a mockup a learner can walk. It is not a claim that 181 notes are exam-mastery quality.

## 4. Later AI

Only after the non-AI mockup exists and someone is paying ~$99.

Budget test: one teach-back grade has to be cheaper than a rounding error on that price. A full-note rewrite model on every visit will not fit. A later optional path, not built here:

- Keep the keyword rubric as the default and the only thing that writes Gap / Rusty / Exam-Ready.
- Optional cheap classifier for **Misconception** only (rule stated backwards), behind a flag, hard cap per user per day.
- Never send the whole outline to a model to “generate the course.”

No model grader in this task.

## 5. Skills pack

`~/Developer/firstmate/projects/teachback-skill` is a different local-only repo: drop in an outline, get a generic Teachback HTML app. Not the SIE product. Point at it. Do not vendor it, do not build a generator here.

## What this lane will ship next (same branch)

1. `Store` interface + `localStorage` adapter + hosted stub.
2. Optional tiny file-backed server writing `data/users/` (gitignored).
3. Outline-derived notes in `content/` compiled into `ui_kits/web/data.js`. Stubs stay labeled stub.
4. No GitHub Actions. This repo has had no CI.
5. No edits to `ui_kits/web/screens.jsx`.
