import express from "express";
import { getPets, getPet, addPet, listIdsMax } from "../store.js";
import { paginate } from "../pagination.js";

export const petsRouter = express.Router();

const ALLOWED_SPECIES = new Set(["cat", "dog", "hamster", "canary", "gecko", "axolotl"]);

petsRouter.get("/", (req, res) => {
  const all = getPets();
  const page = Number.parseInt(req.query.page ?? "1", 10);
  const limit = Number.parseInt(req.query.limit ?? "5", 10);
  res.json(paginate(all, page, limit));
});

petsRouter.get("/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const pet = getPet(Number.isNaN(id) ? -1 : id);
  if (!pet) {
    return res.status(404).json({ error: "not_found", id: req.params.id });
  }
  res.json(pet);
});

petsRouter.post("/", (req, res) => {
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  if (!name || name.length > 32) {
    return res.status(400).json({ error: "invalid_name" });
  }

  const species = req.body?.species;
  if (!species || !ALLOWED_SPECIES.has(species)) {
    return res.status(400).json({ error: "invalid_species" });
  }

  const pet = {
    id: listIdsMax() + 1,
    name,
    species,
  };
  addPet(pet);
  res.status(201).json(pet);
});
