# Petshop — Night Shift target service BACKLOG

Small, pointed tasks the Night Shift crew picks up at night, one at a time.
Each item names the headline files it may touch. Two pairs are deliberately
curated for the phase-4 file-collision negotiation demo (they share files
on purpose).

| # | Task | Headline files allowed | Curated demo role |
| --- | --- | --- | --- |
| BACKLOG-1 | Add input validation to POST /pets — empty or 33+ char name, or unknown species, must 400 with `{error:"invalid_name"}` / `{error:"invalid_species"}` (species: cat/dog/hamster/canary/gecko/axolotl) | `src/routes/pets.js`, `test/` | P3 receipts walkthrough |
| BACKLOG-2 | GET /pets/:id on a missing id currently throws a raw 500 (message includes the id and words "pet with id"). Add a proper 404 branch: `{error:"not_found", id}` with a test, without touching the happy path | `src/routes/pets.js`, `test/` | P3 receipts walkthrough |
| BACKLOG-3 | Fix the pagination off-by-one: `GET /pets?page=2` returns page 1's items (`safePage - 2` in the offset). Write the failing test first, then fix the offset to `safePage - 1` | `src/pagination.js`, `test/` | P3 receipts walkthrough |
| BACKLOG-4 | Add retry with exponential backoff (up to 3 attempts, jitter free is fine) to the remote seed path in `loadSeed()` when `SEED_URL` is set; keep the bundled-file path single-shot | `src/seed.js`, `test/` | P3 receipts walkthrough |
| BACKLOG-5 | Tiny new endpoint `GET /stats` returning `{pets: <total count>, uptime_seconds: <int>}`. Addendum: also register the route inside `createApp` in `src/app.js` | `src/routes/stats.js`, `src/app.js`, `test/` | P4 collision pair A (shares `src/app.js`) |
| BACKLOG-6 | Tiny new endpoint `GET /version` returning `{service:"petshop", version:"0.1.0"}`. Addendum: also register the route inside `createApp` in `src/app.js`, and note it in this repo's README | `src/routes/version.js`, `src/app.js`, `README.md`, `test/` | P4 collision pair B (shares `src/app.js`) |
