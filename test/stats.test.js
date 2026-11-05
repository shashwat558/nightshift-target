import { test } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";
import { initStore } from "../src/store.js";

test("GET /stats reports pet count and uptime", async () => {
  await initStore();
  const server = createApp().listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  try {
    const url = `http://127.0.0.1:${server.address().port}/stats`;
    const response = await fetch(url);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.pets, 7);
    assert.ok(Number.isInteger(body.uptime_seconds) && body.uptime_seconds >= 0);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
