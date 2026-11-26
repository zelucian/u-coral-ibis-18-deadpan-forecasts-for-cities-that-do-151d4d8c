// Deadpan forecast for a city that does not exist.
// Deterministic: writes one validated forecast line to entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "A cold front reaches Port Halloway by morning, bringing 40 mph winds, two inches of snow, and the return of three boats that left in 1962.";

function main(): void {
  const line = LINE.trim();
  if (line.length < 1 || line.length > 160) {
    throw new Error(`entry line must be 1-160 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
}

main();
