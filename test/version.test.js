import { test } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";

test("GET /version returns the service and version", async () => {
  const server = createApp().listen(0, "127.0.0.1");
  try {
    const url = `http://127.0.0.1:${server.address().port}/version`;
    const response = await fetch(url);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { service: "petshop", version: "0.1.0" });
  } finally { await new Promise(resolve => server.close(resolve)); }
});
