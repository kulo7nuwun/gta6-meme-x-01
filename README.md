# gta6-meme-x-01 — "Waited 13 years for GTA 6"

Entry for the make.fun bounty **"Post a GTA 6 meme on X"** ($500 shared by the
top 50, deadline 2026-11-23 14:00 UTC).

## The meme

A gamer slouched on the couch at launch night, controller in hand, watching a
neon Vice City sunset fill the TV — while make.fun's ghost sits beside him on
the couch, star coin in hand.

- Top caption: **"WAITED 13 YEARS FOR GTA 6"**
- Bottom caption: **"MY AI AGENT GOT PAID FIRST"**
- The picture carries make.fun twice: its ghost mascot in the scene and the
  name `make.fun` in the corner. The ghost is the real mark from
  https://make.fun/press/ (press kit); the scene is AI-made, the captions are
  typeset, and the whole picture is the agent's own making.

The joke: thirteen years of waiting for GTA VI — and the AI agent still beat
its human to the first payday, on make.fun.

## The post (posted by Abi from @Kulonuwunmqmx)

Attach `assets/meme.png` as the picture and post exactly this text:

```text
Waited 13 years for GTA 6. My AI agent got paid first 😂

On make.fun, people and their AI agents build things and earn real money in bounties.

Play code: makefun-walnut-zucchini-ridge
Referral: 75kwewt5

@makefunai
```

Notes:

- `makefun-walnut-zucchini-ridge` is the account's play code for this bounty
  (from `GET /api/competitions/gta6-meme-x-01/play-code`, n=0). The gate
  requires one of the account's `makefun-...` play codes in the post text.
- `75kwewt5` is the account's referral code — kept in the post as well.
- No raw link in the text (links cut X reach); `make.fun` written out plus
  the `@makefunai` tag carry the make.fun mention.
- Post between the bounty opening (2026-11-19 14:00 UTC) and the deadline,
  from the public account, and keep the post up and the account public until
  the results are out (2026-12-08).

## The program

`main.ts` (Node 22, standard library only, no network) stages the grader's
output in `/output`:

- `entry.png` — a byte-identical copy of `assets/meme.png` (1024×1024 PNG,
  under 1 MiB), verified with a PNG signature check and a sha256 comparison.
- `POST.json` — copied from the repository root when present.

Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Status / submit-time steps (not done yet)

- [x] Meme made, `main.ts` written and verified locally.
- [ ] Abi posts the meme + text above from @Kulonuwunmqmx.
- [ ] Add `POST.json` with the real post address:
      `{"url": "https://x.com/Kulonuwunmqmx/status/<id>"}`
- [ ] Re-run `main.ts`, then from the kit directory:
      `node cli/makefun.mjs check --kit . --repo <this repo> --transcripts transcripts.tar.gz`
- [ ] Submit with the kit (`submit --competition gta6-meme-x-01 ...`), with the
      session bundle. One entry per competition; this repo's latest submission
      is the final entry.
