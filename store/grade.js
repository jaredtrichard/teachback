/**
 * Deterministic keyword grader. Same contract the kit already uses.
 * Never emits Misconception — that state is reserved for a later optional
 * classifier and must not be faked from a missed keyword.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.TBGrade = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function grade(topic, answer) {
    const a = String(answer || "").toLowerCase();
    const criteria = Array.isArray(topic && topic.criteria) ? topic.criteria : [];
    const crits = criteria.map((c) => {
      const keys = Array.isArray(c.keys) ? c.keys : [];
      const hits = keys.filter((k) =>
        String(k)
          .split("|")
          .some((alt) => alt && a.includes(alt.toLowerCase()))
      ).length;
      const outcome = hits === keys.length ? "hit" : hits > 0 ? "partial" : "missing";
      const fb = c.fb || {};
      return {
        ...c,
        outcome,
        feedback: outcome === "hit" ? fb.hit : fb.miss,
      };
    });
    const n = crits.filter((c) => c.outcome === "hit").length;
    const state =
      crits.length === 0
        ? "Unassessed"
        : n === crits.length
          ? "Exam-Ready"
          : n >= Math.ceil(crits.length / 2)
            ? "Rusty"
            : "Gap";
    return {
      crits,
      state,
      misses: crits.filter((c) => c.outcome !== "hit").map((c) => c.label),
      gradedAt: new Date().toISOString(),
    };
  }

  return { grade };
});
