import express from "express";
import { petsRouter } from "./routes/pets.js";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "petshop" });
  });

  app.use("/pets", petsRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "not_found" });
  });

  return app;
}
