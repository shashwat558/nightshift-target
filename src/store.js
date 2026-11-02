// In-memory store seeded at boot from data/pets.json via loadSeed().
import { loadSeed } from "./seed.js";

let pets = [];

export function initStore() {
  return loadSeed().then((seed) => {
    pets = seed.slice();
    return pets;
  });
}

export function getPets() {
  return pets;
}

export function getPet(id) {
  return pets.find((p) => p.id === id) ?? null;
}

export function addPet(pet) {
  pets.push(pet);
  return pet;
}

export function listIdsMax() {
  return pets.reduce((m, p) => Math.max(m, p.id), 0);
}
