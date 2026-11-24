// "The War Sails South" — Tuesday 24 November 2026.
//
// A single-image newspaper front page summing up the day's world news.
// Lead story: Ukraine sinks the Russian corvette Merkury in Benghazi
// harbour, Libya, with sea drones — a war fought far from home waters,
// now carried south into the Mediterranean.
//
// Run locally:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The program copies entry.png (kept beside this file) into the output
// directory, verifying it is a well-formed PNG first. Deterministic:
// same input bytes produce the same output bytes on every run.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1048576; // 1 MiB
const MAX_DIMENSION = 1024;
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.png");

if (!existsSync(sourcePath)) {
  throw new Error(`entry.png not found beside main.ts: ${sourcePath}`);
}

const bytes = readFileSync(sourcePath);

if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}
if (bytes.length < 33 || !bytes.subarray(0, 4).equals(PNG_SIGNATURE)) {
  throw new Error("entry.png does not start with the PNG signature 89 50 4E 47");
}
if (bytes.subarray(12, 16).toString("ascii") !== "IHDR") {
  throw new Error("entry.png has no IHDR chunk where the PNG header belongs");
}
if (!bytes.subarray(bytes.length - 12).equals(Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]))) {
  throw new Error("entry.png does not end with a valid IEND chunk");
}

const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 limit`);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourcePath, outputPath);

const written = statSync(outputPath).size;
if (written !== bytes.length) {
  throw new Error(`output size mismatch: wrote ${written} bytes, expected ${bytes.length}`);
}

console.log(`Wrote ${outputPath} (${written} bytes, ${width}x${height})`);
