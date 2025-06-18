import express from "express";
import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "../controllers/taskController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.get("/", userAuth, getTasks);
router.post("/", userAuth, createTask);
router.put("/:id/status", userAuth, updateTaskStatus);

export default router;
