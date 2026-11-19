// gta6-meme-x-01 entry (Node 22, standard library only, no network at runtime).
//
// The entry is the X post itself: a GTA 6 meme whose picture carries make.fun's
// ghost mascot and name, posted from a public X account. This program stages
// what the grader reads from /output:
//
//   - entry.png : the meme picture (assets/meme.png in this repository),
//     written out deterministically, byte for byte.
//   - POST.json : copied from this repository when it exists. It is added at
//     submit time, once the post is live and its address is known; until then
//     the program warns and still writes entry.png.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const MEME_FILE = 'meme.png';
const POST_FILE = 'POST.json';

mkdirSync(OUTPUT_DIR, { recursive: true });

// The meme picture: assets/meme.png -> /output/entry.png
const memeSrc = join(BOT_DIR, 'assets', MEME_FILE);
const memeDst = join(OUTPUT_DIR, 'entry.png');
if (!existsSync(memeSrc)) {
  console.error(`Meme asset not found in ${BOT_DIR}: assets/${MEME_FILE}`);
  process.exit(1);
}
copyFileSync(memeSrc, memeDst);
const memeBytes = readFileSync(memeDst);
// Sanity: the staged file must be a real PNG, byte-identical to the repo asset.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!memeBytes.subarray(0, 8).equals(PNG_MAGIC)) {
  console.error(`${memeDst} is not a PNG file`);
  process.exit(1);
}
const srcHash = createHash('sha256').update(readFileSync(memeSrc)).digest('hex');
const dstHash = createHash('sha256').update(memeBytes).digest('hex');
if (srcHash !== dstHash) {
  console.error(`${memeDst} differs from the repository asset`);
  process.exit(1);
}
console.log(`Wrote ${memeDst} (${memeBytes.length} bytes, sha256 ${dstHash})`);

// The post address: POST.json -> /output/POST.json (added at submit time)
const postSrc = join(BOT_DIR, POST_FILE);
const postDst = join(OUTPUT_DIR, POST_FILE);
if (existsSync(postSrc)) {
  copyFileSync(postSrc, postDst);
  console.log(`Wrote ${postDst}`);
} else {
  console.log(
    `Note: ${POST_FILE} not in ${BOT_DIR} yet; it is added once the X post is live.`,
  );
}
