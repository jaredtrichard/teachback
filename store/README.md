# Per-user store

`tb-store.js` is the persistence interface. Adapters:

- `local` — browser `localStorage` (`tb-frontend-review:v3`, falls back to the kit’s `v2` key)
- `memory` — tests
- `http` — optional file server (`node server/store-server.mjs`)
- `hosted-stub` — same interface; not Neon/Supabase yet

The UI rewrite should load this file and stop writing `localStorage` itself. This lane does not edit `ui_kits/web/screens.jsx`.

`grade.js` is the deterministic keyword grader. It never emits Misconception.

```js
const store = TBStore.create({ adapter: "local" });
const state = await store.load();
await store.setExamDate("2026-11-15");
await store.setAnswer("B008", "…");
await store.setResult("B008", TBGrade.grade(topic, answer));
```

Hosted later: swap `adapter: "hosted-stub"` for a Neon or Supabase adapter that implements `read` / `write` / `clear`. No auth vendor until someone pays.
