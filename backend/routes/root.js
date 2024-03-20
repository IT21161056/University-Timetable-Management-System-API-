import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);

router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(join(dirname(__filename), "..", "views", "index.html"));
});

export default router;
