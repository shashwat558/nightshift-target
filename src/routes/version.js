import express from "express";

export const versionRouter = express.Router();
versionRouter.get("/", (_req, res) => {
  res.json({ service: "petshop", version: "0.1.0" });
});
