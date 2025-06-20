import Task from "../models/taskModel.js";
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignee", "name department role") // include only relevant fields
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createTask = async (req, res) => {
  const { title, description, assignee, dueDate, priority } = req.body;

  if (!title || !description || !assignee || !dueDate || !priority) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  try {
    const task = await Task.create({
      title,
      description,
      assignee,
      dueDate,
      priority,
      status: "Todo",
      createdBy: req.user.id,
    });

    // ✅ Create notification for assignee
    await Notification.create({
      user: assignee, // this should be a user ID
      title: "Task Assigned",
      message: `You have been assigned to "${title}"`,
      type: "info",
      icon: "document",
    });

    res.status(201).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;
  const userId = req.user.id; // from userAuth middleware

  try {
    const task = await Task.findById(id).populate("assignee"); // Add populate to get full assignee info
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    // 🔧 Compare user ID instead of name
    if (task.assignee?._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to change this task's status.",
      });
    }

    task.status = newStatus;
    await task.save();

    res.json({ success: true, message: "Status updated", task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
