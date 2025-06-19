import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserNotifications } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", userAuth, getUserNotifications);

export default router;
