// Seed the store from a remote feed when SEED_URL is set, else from the
// bundled JSON file. All seeding is a single attempt — BACKLOG-4 asks the
// crew to add retry with exponential backoff for the remote path only.

async function fetchRemoteSeed() {
  const response = await fetch(process.env.SEED_URL, {
    signal: AbortSignal.timeout(3000),
  });
  if (!response.ok) throw new Error(`seed feed ${response.status}`);
  return response.json();
}

export async function loadSeed() {
  if (process.env.SEED_URL) {
    return fetchRemoteSeed();
  }
  const { readFile } = await import("node:fs/promises");
  const raw = await readFile(new URL("./data/pets.json", import.meta.url), "utf8");
  return JSON.parse(raw);
}
