#!/usr/bin/env python3
"""Compile outline notes + kit metadata into content/bites.json and ui_kits/web/data.js."""

from __future__ import annotations

import json
import re
from pathlib import Path

from outline_notes import NOTES

ROOT = Path(__file__).resolve().parents[1]
DATA_JS = ROOT / "ui_kits" / "web" / "data.js"
BITES_JSON = ROOT / "content" / "bites.json"
QBANK_JSON = ROOT / "content" / "qbank.json"
AUTHORED = {"B008", "B010", "B019"}


def extract_js_assign(src: str, name: str) -> str:
    token = f"window.{name}="
    start = src.index(token) + len(token)
    # value runs to the next "window." or end
    nxt = src.find("\nwindow.", start)
    raw = src[start:] if nxt < 0 else src[start:nxt]
    raw = raw.strip().rstrip(";").strip()
    return re.sub(r",(\s*[\]}])", r"\1", raw)


def load_existing(src: str) -> tuple[list, dict, list, dict, int]:
    bites = json.loads(extract_js_assign(src, "TB_BITES"))
    tree = json.loads(extract_js_assign(src, "TB_TREE"))
    # leftover assigns
    return bites, tree, [], {}, 181


def feedback_for(label: str) -> dict:
    return {
        "hit": f"{label} landed.",
        "miss": f"Cover: {label}.",
    }


def apply_note(bite: dict) -> dict:
    bite_id = bite["id"]
    out = dict(bite)
    if bite_id in AUTHORED:
        out["status"] = "authored"
        out["demo"] = True
        return out
    note = NOTES.get(bite_id)
    if not note:
        out["status"] = "stub"
        out["demo"] = False
        # keep existing stub chrome; mark it honestly
        if out.get("inShort") and "title stub" not in " ".join(out["inShort"]).lower():
            pass
        else:
            out["inShort"] = [
                out.get("subtitle") or out["title"],
                "stub: the official outline bullet is the note.",
                "Full prose ships when the outline prints more than the title.",
            ]
        return out
    out["status"] = note["status"]
    out["demo"] = False
    out["inShort"] = note["inShort"]
    out["core"] = note["core"]
    out["precision"] = note["precision"]
    crits = []
    for i, c in enumerate(note["criteria"], start=1):
        crits.append(
            {
                "id": f"c{i}",
                "label": c["label"],
                "keys": c["keys"],
                "fb": feedback_for(c["label"]),
            }
        )
    out["criteria"] = crits
    return out


def render_data_js(bites: list, tree: dict, qbank: list) -> str:
    states = [
        "Unassessed",
        "Gap",
        "Misconception",
        "Rusty",
        "Exam-Ready",
        "Mastered",
    ]
    desc = {
        "Unassessed": "Not taught back yet",
        "Gap": "The core principle was absent",
        "Misconception": "A rule was stated backwards — reserved for a later grader",
        "Rusty": "Has the idea, mixes details",
        "Exam-Ready": "States the principle and applies it",
        "Mastered": "Exam-ready again on a later day",
    }
    parts = [
        "window.TB_BITES=" + json.dumps(bites, ensure_ascii=False, separators=(",", ": ")) + ";",
        "window.TB_STATES=" + json.dumps(states, ensure_ascii=False) + ";",
        "window.TB_STATE_DESC=" + json.dumps(desc, ensure_ascii=False) + ";",
        "window.TB_TREE=" + json.dumps(tree, ensure_ascii=False, separators=(",", ": ")) + ";",
        "window.TB_BITE_COUNT=" + str(len(bites)) + ";",
        "window.TB_QBANK=" + json.dumps(qbank, ensure_ascii=False, separators=(",", ": ")) + ";",
        "",
    ]
    return "\n".join(parts)


def main() -> None:
    src = DATA_JS.read_text()
    bites, tree, *_ = load_existing(src)
    if len(bites) != 181:
        raise SystemExit(f"expected 181 bites, found {len(bites)}")
    compiled = [apply_note(b) for b in bites]
    missing = [b["id"] for b in compiled if b["id"] not in AUTHORED and b["id"] not in NOTES]
    if missing:
        raise SystemExit(f"notes missing for {missing}")
    qbank = json.loads(QBANK_JSON.read_text())
    BITES_JSON.write_text(json.dumps(compiled, indent=2, ensure_ascii=False) + "\n")
    DATA_JS.write_text(render_data_js(compiled, tree, qbank))
    counts = {}
    for b in compiled:
        counts[b["status"]] = counts.get(b["status"], 0) + 1
    print("wrote", BITES_JSON.relative_to(ROOT), "and", DATA_JS.relative_to(ROOT), counts)


if __name__ == "__main__":
    main()
