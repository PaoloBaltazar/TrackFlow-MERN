import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  getUserNotifications,
  deleteNotification,
  toggleNotificationRead,
  markAllNotificationsAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", userAuth, getUserNotifications);
router.delete("/:id", userAuth, deleteNotification);
router.put("/:id/read", userAuth, toggleNotificationRead);
router.put("/mark-all-read", userAuth, markAllNotificationsAsRead);

export default router;
