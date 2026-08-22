import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { createServer } from "node:http";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const storePath = fileURLToPath(new URL("./tb-store.js", import.meta.url));
const gradePath = fileURLToPath(new URL("./grade.js", import.meta.url));
const TBStore = require(storePath);
const { grade } = require(gradePath);

const sipc = {
  id: "B008",
  criteria: [
    { id: "c1", label: "SIPC covers brokerage failure", keys: ["sipc", "broker"], fb: { hit: "hit", miss: "miss" } },
    { id: "c2", label: "Coverage limits", keys: ["500", "250"], fb: { hit: "hit", miss: "miss" } },
    { id: "c3", label: "Market losses excluded", keys: ["market", "loss"], fb: { hit: "hit", miss: "miss" } },
  ],
};

async function testMemoryRoundTrip() {
  const s = TBStore.create({ adapter: "memory" });
  const empty = await s.load();
  assert.equal(empty.version, 3);
  assert.equal(empty.examDate, null);
  await s.setExamDate("2026-11-15");
  await s.setUser("ada@example.com");
  await s.setAnswer("B008", "SIPC backstops a broker.");
  const result = grade(sipc, "SIPC backstops a broker. $500k including $250k cash. Not market loss.");
  assert.equal(result.state, "Exam-Ready");
  assert.ok(!("xp" in result));
  assert.notEqual(result.state, "Misconception");
  await s.setResult("B008", result);
  await s.setQBank("Q001", { answer: 1, correct: true, at: result.gradedAt });
  const loaded = await s.load();
  assert.equal(loaded.examDate, "2026-11-15");
  assert.equal(loaded.user, "ada@example.com");
  assert.equal(loaded.results.B008.state, "Exam-Ready");
  assert.equal(loaded.qbank.Q001.correct, true);
  await s.clear();
  assert.equal((await s.load()).examDate, null);
}

async function testLegacyNormalize() {
  const s = TBStore.create({
    adapter: "memory",
    seed: { user: "x", xp: 60, answers: { B008: "hi" }, results: { B008: { state: "Gap" } } },
  });
  const state = await s.load();
  assert.equal(state.version, 3);
  assert.equal(state.answers.B008, "hi");
  assert.equal(state.results.B008.state, "Gap");
  assert.equal(state.examDate, null);
  assert.ok(!("xp" in state));
}

async function testHostedStub() {
  const s = TBStore.create({ adapter: "hosted-stub" });
  assert.equal(s.adapter, "hosted-stub");
  assert.match(s.hostedNote, /stub/i);
  await s.setExamDate("2027-01-01");
  assert.equal((await s.load()).examDate, "2027-01-01");
}

async function testGradeNeverMisconception() {
  const gap = grade(sipc, "I like stocks.");
  assert.equal(gap.state, "Gap");
  const rusty = grade(sipc, "SIPC helps a broker. Coverage is 500 including 250 cash.");
  assert.equal(rusty.state, "Rusty");
  assert.notEqual(gap.state, "Misconception");
  assert.notEqual(rusty.state, "Misconception");
}

async function testHttpAdapter() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "tb-store-"));
  const server = createServer(async (req, res) => {
    const id = decodeURIComponent((req.url || "").split("/").pop() || "");
    const file = path.join(dir, `${id}.json`);
    res.setHeader("access-control-allow-origin", "*");
    if (req.method === "GET") {
      try {
        const text = await fs.readFile(file, "utf8");
        res.writeHead(200, { "content-type": "application/json" });
        res.end(text);
      } catch {
        res.writeHead(404);
        res.end("{}");
      }
      return;
    }
    if (req.method === "PUT") {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      await fs.writeFile(file, Buffer.concat(chunks));
      res.writeHead(200, { "content-type": "application/json" });
      res.end(Buffer.concat(chunks));
      return;
    }
    if (req.method === "DELETE") {
      try {
        await fs.unlink(file);
      } catch {
        /* missing is fine */
      }
      res.writeHead(204);
      res.end();
      return;
    }
    res.writeHead(405);
    res.end();
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const s = TBStore.create({
    adapter: "http",
    baseUrl: `http://127.0.0.1:${port}`,
    userId: "kit-user",
  });
  await s.setExamDate("2026-12-01");
  await s.setAnswer("B019", "Proceeds go to the issuer.");
  const again = TBStore.create({
    adapter: "http",
    baseUrl: `http://127.0.0.1:${port}`,
    userId: "kit-user",
  });
  const state = await again.load();
  assert.equal(state.examDate, "2026-12-01");
  assert.match(state.answers.B019, /issuer/);
  await s.clear();
  const cleared = await again.load();
  assert.equal(cleared.examDate, null);
  await new Promise((resolve) => server.close(resolve));
  await fs.rm(dir, { recursive: true, force: true });
}

async function testContentBundle() {
  const bitesPath = fileURLToPath(new URL("../content/bites.json", import.meta.url));
  const qbankPath = fileURLToPath(new URL("../content/qbank.json", import.meta.url));
  const bites = JSON.parse(await fs.readFile(bitesPath, "utf8"));
  const qbank = JSON.parse(await fs.readFile(qbankPath, "utf8"));
  assert.equal(bites.length, 181);
  const byStatus = Object.create(null);
  for (const b of bites) byStatus[b.status] = (byStatus[b.status] || 0) + 1;
  assert.equal(byStatus.authored, 3);
  assert.ok(byStatus.outline >= 170);
  const authored = bites.filter((b) => b.status === "authored").map((b) => b.id).sort();
  assert.deepEqual(authored, ["B008", "B010", "B019"]);
  const stubTitles = bites.filter((b) => (b.inShort || []).some((line) => /title stub for frontend review/i.test(line)));
  assert.equal(stubTitles.length, 0);
  const sipcBite = bites.find((b) => b.id === "B008");
  assert.match(sipcBite.precision.join(" "), /500,000/);
  const gifts = bites.find((b) => b.id === "B179");
  assert.match(gifts.precision.join(" ").toLowerCase(), /stub/);
  assert.ok(!/\$100/.test(gifts.precision.join(" ")));
  assert.equal(qbank.length, 6);
  for (const item of qbank) {
    assert.ok(["B008", "B010", "B019"].includes(item.biteId));
    assert.equal(item.choices[item.answer] === undefined, false);
  }
}

const tests = [
  testMemoryRoundTrip,
  testLegacyNormalize,
  testHostedStub,
  testGradeNeverMisconception,
  testHttpAdapter,
  testContentBundle,
];

for (const fn of tests) await fn();
console.log(`ok ${tests.length}`);
