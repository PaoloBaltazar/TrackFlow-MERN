import express from "express";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.get("/", userAuth, getTasks);
router.post("/", userAuth, createTask);
router.put("/:id/status", userAuth, updateTaskStatus);
router.delete("/:id", userAuth, deleteTask);

export default router;
