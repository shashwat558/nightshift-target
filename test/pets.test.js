import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";
import { initStore } from "../src/store.js";

let server;
let base;

before(async () => {
  await initStore();
  const app = createApp();
  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", () => resolve());
  });
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) await new Promise((resolve) => server.close(resolve));
});

test("GET /health returns ok", async () => {
  const response = await fetch(`${base}/health`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.status, "ok");
  assert.equal(body.service, "petshop");
});

test("GET /pets returns seeded pets with pagination metadata", async () => {
  const response = await fetch(`${base}/pets?limit=50`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.page, 1);
  assert.equal(body.limit, 50);
  assert.equal(body.total, 7);
  assert.ok(Array.isArray(body.items));
  assert.equal(body.items.length, 7);
});

test("GET /pets/:id returns a single pet", async () => {
  const response = await fetch(`${base}/pets/1`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.id, 1);
  assert.equal(body.name, "Tama");
  assert.equal(body.species, "cat");
});

test("POST /pets creates a pet with the next id", async () => {
  const response = await fetch(`${base}/pets`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Momo", species: "axolotl" }),
  });
  const body = await response.json();
  assert.equal(response.status, 201);
  assert.equal(body.id, 8);
  assert.equal(body.name, "Momo");

  const list = await (await fetch(`${base}/pets?limit=50`)).json();
  assert.equal(list.total, 8);
  assert.ok(list.items.some((p) => p.name === "Momo"));
});

test("POST /pets validates empty name and long name", async () => {
  const emptyRes = await fetch(`${base}/pets`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "", species: "cat" }),
  });
  assert.equal(emptyRes.status, 400);
  assert.deepEqual(await emptyRes.json(), { error: "invalid_name" });

  const longRes = await fetch(`${base}/pets`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "a".repeat(33), species: "cat" }),
  });
  assert.equal(longRes.status, 400);
  assert.deepEqual(await longRes.json(), { error: "invalid_name" });
});

test("POST /pets validates unknown species", async () => {
  const res = await fetch(`${base}/pets`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Goldie", species: "dragon" }),
  });
  assert.equal(res.status, 400);
  assert.deepEqual(await res.json(), { error: "invalid_species" });
});

test("GET /pets?page=1&limit=3 returns exactly the first three", async () => {
  const response = await fetch(`${base}/pets?page=1&limit=3`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.page, 1);
  assert.equal(body.limit, 3);
  assert.equal(body.items.length, 3);
  assert.deepEqual(
    body.items.map((p) => p.id).sort(),
    [1, 2, 3],
  );
});

test("unknown routes are a plain 404", async () => {
  const response = await fetch(`${base}/nope`);
  const body = await response.json();
  assert.equal(response.status, 404);
  assert.equal(body.error, "not_found");
});

test("GET /pets page two returns the next three ids", async () => {
  const response = await fetch(`${base}/pets?page=2&limit=3`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.page, 2);
  assert.deepEqual(body.items.map(p => p.id), [4, 5, 6]);
});
