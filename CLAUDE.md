# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
always call me "bé iu của anh"

## Project overview

A badminton court scheduling app ("Hệ Thống Sắp Xếp Sân Cầu Lông"). It manages a pool of 16 players and arranges them into balanced 2v2 teams across 2 courts each round, tracking who has already played together so it can avoid repeat pairings. Backend is Node/Express; frontend is vanilla HTML/CSS/JS. Code comments and UI text are in Vietnamese.

## Commands

- `npm start` — run the server (`node server.js`) on http://localhost:3000
- `npm run dev` — run the server with nodemon (auto-reload on file changes)
- `npm test` — runs `jest`, but **jest is not installed** (not in devDependencies) and no test files exist; this command will currently fail. There is no test suite in this repo.

## Architecture

All player/match state is held in-process, in plain JS arrays/objects in `src/data/players.js` — there is no database. State resets on server restart, or via the `/api/reset` endpoint.

Request flow: `server.js` mounts `src/routes/matchRoutes.js` at `/api`, which calls into `src/services/matchService.js` for the actual scheduling logic, operating on the shared `players`/`matchHistory` arrays from `src/data/players.js`.

- `src/data/players.js` — generates the initial 16 players (random level 1–3, `playedCount: 0`, empty `teammates` list) and exports the mutable `players` and `matchHistory` arrays shared across the app.
- `src/utils/shuffle.js` — shuffles `players` in place as a side effect of being required (in-place Fisher–Yates).
- `src/services/matchService.js` — core scheduling algorithm:
  - `getNextMatch` picks the 8 players with the lowest `playedCount`, increments their `playedCount`, sorts them by `level`, then splits them into two groups of 4 (one per court).
  - `createTeamForCourt` takes 4 players and tries all 3 possible 2v2 pairings, scoring each by how many pairs have already played together (`getTeamScore`/`getPairScore`/`hasPLayedTogether`), and picks the lowest-scoring (least-repeated) option.
  - `updateTeamHistory` records new teammate pairings onto each player's `teammates` array after a court's teams are chosen.
  - `addNewRound` runs `getNextMatch` and appends a deep-copied snapshot of the round to `matchHistory`.
- `src/routes/matchRoutes.js` — two GET endpoints:
  - `/api/match-history` — generates a new round (`addNewRound`) and returns the full `matchHistory` plus current `players` state.
  - `/api/reset` — clears `matchHistory` and resets every player's `playedCount` to 0 (does not reset `teammates` history or re-shuffle).
- `public/` — static frontend served directly by Express (`express.static('public')`):
  - `index.html` has two buttons ("Xếp Hiệp Tiếp Theo" / next round, "Reset") and two containers (`#playerList`, `#matchHistory`).
  - `script.js` fetches from the two API endpoints and re-renders the player list and full match history from scratch on each response (no incremental DOM updates).
