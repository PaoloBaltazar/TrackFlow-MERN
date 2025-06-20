import Task from "../models/taskModel.js";
import Document from "../models/documentModel.js";

export const searchData = async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    return res.status(400).json({ success: false, message: "Query required" });
  }

  try {
    const regex = new RegExp(q, "i");

    const [tasks, documents] = await Promise.all([
      Task.find({ title: { $regex: regex } }).limit(5),
      Document.find({ name: { $regex: regex } }).limit(5),
    ]);

    const taskResults = tasks.map((task) => ({
      _id: task._id,
      title: task.title,
      type: "task",
    }));

    const docResults = documents.map((doc) => ({
      _id: doc._id,
      title: doc.name,
      type: "document",
    }));

    res.json({ success: true, results: [...taskResults, ...docResults] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
