// server/controllers/dashboardController.js
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import Document from "../models/documentModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalTasks,
      completedTasks,
      pendingTasks,
      users,
      documents,
      recentTasks,
    ] = await Promise.all([
      Task.countDocuments(),
      Task.countDocuments({ status: "Completed" }),
      Task.countDocuments({ status: "In Progress" }),
      User.countDocuments(),
      Document.countDocuments(),
      Task.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("assignee", "name department"),
    ]);

    res.json({
      success: true,
      stats: {
        totalTasks,
        completedTasks,
        pendingTasks,
        users,
        documents,
        recentTasks,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
