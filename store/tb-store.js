/**
 * Per-user persistence for Teachback.
 *
 * Adapters: local (browser localStorage), memory, http (optional file server),
 * hosted-stub (same interface; not a real cloud).
 *
 * UI rewrite should call TBStore.create() and stop writing localStorage itself.
 * Do not edit ui_kits/web/screens.jsx from this lane — that file is another worker.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.TBStore = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const VERSION = 3;
  const DEFAULT_KEY = "tb-frontend-review:v3";
  const LEGACY_KEY = "tb-frontend-review:v2";

  function emptyState() {
    return {
      version: VERSION,
      user: "",
      examDate: null,
      topicId: "",
      view: "home",
      answers: {},
      results: {},
      qbank: {},
    };
  }

  function asMap(value) {
    return value && typeof value === "object" && !Array.isArray(value) ? { ...value } : {};
  }

  function normalize(raw) {
    const base = emptyState();
    if (!raw || typeof raw !== "object") return base;
    return {
      version: VERSION,
      user: typeof raw.user === "string" ? raw.user : "",
      examDate: typeof raw.examDate === "string" && raw.examDate ? raw.examDate : null,
      topicId: typeof raw.topicId === "string" ? raw.topicId : "",
      view: typeof raw.view === "string" && raw.view ? raw.view : "home",
      answers: asMap(raw.answers),
      results: asMap(raw.results),
      qbank: asMap(raw.qbank),
    };
  }

  function memoryAdapter(seed) {
    let data = JSON.stringify(normalize(seed));
    return {
      name: "memory",
      async read() {
        return JSON.parse(data);
      },
      async write(state) {
        data = JSON.stringify(state);
      },
      async clear() {
        data = JSON.stringify(emptyState());
      },
    };
  }

  function localStorageAdapter(key) {
    const k = key || DEFAULT_KEY;
    return {
      name: "local",
      async read() {
        if (typeof localStorage === "undefined") return emptyState();
        try {
          const cur = localStorage.getItem(k);
          if (cur) return JSON.parse(cur);
          const legacy = localStorage.getItem(LEGACY_KEY);
          if (legacy) return JSON.parse(legacy);
        } catch {
          return emptyState();
        }
        return emptyState();
      },
      async write(state) {
        if (typeof localStorage === "undefined") return;
        localStorage.setItem(k, JSON.stringify(state));
      },
      async clear() {
        if (typeof localStorage === "undefined") return;
        localStorage.removeItem(k);
      },
    };
  }

  function hostedStubAdapter() {
    const mem = memoryAdapter();
    return {
      name: "hosted-stub",
      reason: "Hosted store is a stub. Wire Neon or Supabase free tier when someone pays.",
      async read() {
        return mem.read();
      },
      async write(state) {
        return mem.write(state);
      },
      async clear() {
        return mem.clear();
      },
    };
  }

  function httpAdapter(baseUrl, userId) {
    const url = `${String(baseUrl || "http://127.0.0.1:8787").replace(/\/$/, "")}/v1/users/${encodeURIComponent(userId || "local")}`;
    return {
      name: "http",
      async read() {
        const res = await fetch(url);
        if (res.status === 404) return emptyState();
        if (!res.ok) throw new Error(`store read ${res.status}`);
        return res.json();
      },
      async write(state) {
        const res = await fetch(url, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(state),
        });
        if (!res.ok) throw new Error(`store write ${res.status}`);
      },
      async clear() {
        const res = await fetch(url, { method: "DELETE" });
        if (!res.ok && res.status !== 404) throw new Error(`store clear ${res.status}`);
      },
    };
  }

  function create(opts) {
    const options = opts || {};
    const kind = options.adapter || "local";
    let adapter;
    if (kind === "memory") adapter = memoryAdapter(options.seed);
    else if (kind === "local") adapter = localStorageAdapter(options.key);
    else if (kind === "hosted-stub" || kind === "hosted") adapter = hostedStubAdapter();
    else if (kind === "http") adapter = httpAdapter(options.baseUrl, options.userId);
    else throw new Error(`unknown adapter ${kind}`);

    let cache = null;

    async function load() {
      cache = normalize(await adapter.read());
      return cache;
    }

    async function save(state) {
      cache = normalize(state);
      await adapter.write(cache);
      return cache;
    }

    async function patch(partial) {
      const cur = cache || (await load());
      return save({ ...cur, ...partial });
    }

    return {
      adapter: adapter.name,
      hostedNote: adapter.reason || null,
      emptyState,
      load,
      save,
      patch,
      get() {
        return cache;
      },
      async setExamDate(iso) {
        return patch({ examDate: iso || null });
      },
      async setUser(user) {
        return patch({ user: user || "" });
      },
      async setAnswer(biteId, text) {
        const cur = cache || (await load());
        return save({ ...cur, answers: { ...cur.answers, [biteId]: text } });
      },
      async setResult(biteId, result) {
        const cur = cache || (await load());
        return save({ ...cur, results: { ...cur.results, [biteId]: result } });
      },
      async setQBank(itemId, attempt) {
        const cur = cache || (await load());
        return save({ ...cur, qbank: { ...cur.qbank, [itemId]: attempt } });
      },
      async clear() {
        await adapter.clear();
        cache = emptyState();
        return cache;
      },
    };
  }

  return { VERSION, DEFAULT_KEY, LEGACY_KEY, create, emptyState, normalize };
});
