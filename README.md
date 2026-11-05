# petshop — the Night Shift target service

A deliberately small Express API the Night Shift crew works on through the
Switch room. It is its own git repository, nested inside the outer
`night-shift` monorepo (the outer repo ignores this directory).

## Run + test

```sh
npm install
npm test          # node:test, boots the app in-process on an ephemeral port
npm start         # listens on PORT, default 3001
```

## Endpoints

- `GET /health` — `{status:"ok"}`
- `GET /version` — `{service:"petshop", version:"0.1.0"}`
- `GET /pets?limit=&page=` — seeded list, 7 pets, pagination metadata
- `GET /pets/:id` — one pet (missing ids currently 500 — BACKLOG-2's domain)
- `POST /pets` `{name, species}` — create (unvalidated — BACKLOG-1's domain)

## The crew flow (main is protected in spirit)

- All code work happens on branches named `shift/<task-id>`.
- The only automated committer besides CI is the Night Shift supervisor, and
  only after a receipt passes gate review with human sign-off.
- No direct pushes to `main`: every change arrives as a labeled draft PR
  with a receipts block; rollbacks are recorded as reverts.
- See the outer repo's `docs/SPEC.md` for the contracts the crew follows.
