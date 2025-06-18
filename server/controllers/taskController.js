import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createTask = async (req, res) => {
  const { title, description, assignee, dueDate, priority } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      assignee,
      dueDate,
      priority,
    });
    res.status(201).json({ success: true, task });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;
  const userName = req.user.name; // from auth middleware

  try {
    const task = await Task.findById(id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    if (task.assignee !== userName) {
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
