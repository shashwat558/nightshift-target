import express from "express";
import { getPets } from "../store.js";

export const statsRouter = express.Router();
statsRouter.get("/", (_req, res) => {
  res.json({ pets: getPets().length, uptime_seconds: Math.floor(process.uptime()) });
});
