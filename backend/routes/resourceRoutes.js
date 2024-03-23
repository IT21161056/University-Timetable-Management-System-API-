import express from "express";
import {
  createResource,
  updateResource,
  deleteResource,
  getAllResources,
  getResourceById,
} from "../controller/resourceController.js";

const router = express.Router();

router.post("/", createResource);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);
router.get("/", getAllResources);
router.get("/:id", getResourceById);

export default router;
