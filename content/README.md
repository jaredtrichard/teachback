# Product content

Committed source for the 181 official outline bites and the tiny authored QBank.

- `outline_notes.py` — no-AI notes unpacked from the FINRA SIE Content Outline ©2024.
- `qbank.json` — right/wrong items for the three authored demo bites. QBank never writes Gap / Rusty / Exam-Ready / Mastered.
- `compile.py` — overlays notes onto the kit metadata and writes `bites.json` plus `ui_kits/web/data.js`.
- `bites.json` — compiled kit bundle (regenerate; do not hand-edit).

```sh
python3 content/compile.py
```

`status` on each bite:

- **authored** — B008 SIPC, B010 investors, B019 primary market. Specific figures stay.
- **outline** — official bullet + parentheticals + Knowledge-of lists. No invented dollar figures.
- **stub** — leftover labeled stub. The compiler fails if a non-authored id is missing from `outline_notes.py`, so stubs are deliberate.

Per-user progress is not stored here. See `docs/backend-plan.md` and `store/tb-store.js`.

The generic generator in `~/Developer/firstmate/projects/teachback-skill` is a different local repo. Do not vendor it.
