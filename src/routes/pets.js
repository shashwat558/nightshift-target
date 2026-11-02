import express from "express";
import { getPets, getPet, addPet, listIdsMax } from "../store.js";
import { paginate } from "../pagination.js";

export const petsRouter = express.Router();

petsRouter.get("/", (req, res) => {
  const all = getPets();
  const page = Number.parseInt(req.query.page ?? "1", 10);
  const limit = Number.parseInt(req.query.limit ?? "5", 10);
  res.json(paginate(all, page, limit));
});

petsRouter.get("/:id", (req, res, next) => {
  const id = Number.parseInt(req.params.id, 10);
  const pet = getPet(Number.isNaN(id) ? -1 : id);
  if (!pet) {
    return next(new Error(`pet with id ${req.params.id} not found`));
  }
  res.json(pet);
});

petsRouter.post("/", (req, res) => {
  const pet = {
    id: listIdsMax() + 1,
    name: req.body?.name,
    species: req.body?.species,
  };
  addPet(pet);
  res.status(201).json(pet);
});
