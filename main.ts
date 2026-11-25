// The Excuse That Almost Works — entry program.
//
// Job: write the single line a gamer texts the boss to skip work on
// GTA 6 launch week. One line, plain text, at most 20 words, reading
// like a real text sent in a hurry.
//
// What the tired-manager judge rewards, in order: on-topic, almost
// believable (a real, specific, boring detail), funny on its own
// terms, hurried-text tone, and an angle the obvious excuses miss
// (no dead grandmother, no flat tyre, no sudden fever).
//
// Candidates I drafted and weighed:
//
// 1. "My boiler died overnight and the plumber can only come between
//    nine and one today, sorry."
//    Boring and believable, but flat: no detail the manager pictures,
//    no laugh in it. A safe excuse, not a winning one.
//
// 2. "The dentist moved my root canal to nine this morning and I only
//    saw the text at midnight."
//    Specific and boring — nobody fakes a root canal — and the
//    midnight text adds hurried realism. But the laugh is thin; it
//    reads more like a dentist's reminder than a text to a boss.
//
// 3. "My train's cancelled, next one's in two hours and the replacement
//    bus is already full."
//    Believable and boring, but every commuter has sent some version
//    of it. Nothing in it belongs to this texter.
//
// 4. "Sorry, my flat's got no water, the building's fixing a burst pipe
//    and I can't shower or flush."
//    The winner. A burst pipe is real, specific and boring — the kind
//    of domestic disaster that genuinely strands someone. The laugh
//    comes from the excuse's own logic: the texter overshares the
//    undignified detail ("can't shower or flush"), exactly the sort of
//    too-much-information nobody would invent, which is what makes a
//    tired manager almost believe it. Plain words, no setup, no
//    signature, reads typed in a hurry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CANDIDATES: { line: string; why: string }[] = [
  {
    line: "My boiler died overnight and the plumber can only come between nine and one today, sorry.",
    why: "boring and believable, but flat: no detail the manager pictures, no laugh in it.",
  },
  {
    line: "The dentist moved my root canal to nine this morning and I only saw the text at midnight.",
    why: "specific and boring, but the laugh is thin; it reads like a reminder, not a text to a boss.",
  },
  {
    line: "My train's cancelled, next one's in two hours and the replacement bus is already full.",
    why: "believable and boring, but every commuter has sent some version of it.",
  },
  {
    line: "Sorry, my flat's got no water, the building's fixing a burst pipe and I can't shower or flush.",
    why: "winner: a real, specific, boring domestic disaster, and the laugh comes from the excuse's own logic — the texter overshares the undignified detail nobody would invent, which is exactly what makes a tired manager almost believe it.",
  },
  {
    line: "I left my work laptop charger in the office and my laptop died overnight, sorry.",
    why: "funny self-own, but it invites the obvious reply ('come in and charge it here'), so it collapses on contact.",
  },
];

// The pick: the burst-pipe line. A burst pipe is the kind of boring,
// specific disaster that genuinely strands someone; the overshared
// detail ("can't shower or flush") is too undignified to be invented,
// which is what makes a tired manager almost believe it. Plain words,
// no setup, no signature, typed in a hurry — and it never mentions
// the game, because mentioning GTA 6 would be the confession.
function pickFinal(): string {
  const winner = CANDIDATES[3];
  return winner.line;
}

const FINAL_LINE = pickFinal();

function wordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

function main(): void {
  const line = FINAL_LINE;

  // Gate the entry the same way the sealed scorer does: UTF-8 text,
  // 1 to 140 characters, not only white space, one line, at most
  // 20 words.
  if (!line || line.trim().length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (line.length > 140) {
    throw new Error(`entry line is ${line.length} characters, over the 140 cap`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (wordCount(line) > 20) {
    throw new Error(`entry is ${wordCount(line)} words, over the 20-word cap`);
  }

  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, line, "utf8");

  // Read back and confirm the file holds exactly the line we chose.
  const written = readFileSync(outPath, "utf8");
  if (written !== line) {
    throw new Error("entry.txt does not match the chosen line");
  }
  console.log(`wrote ${written.length} chars, ${wordCount(written)} words: ${written}`);
}

main();
