import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: String,
  type: String,
  size: String,
  uploadedBy: String,
  uploadDate: { type: Date, default: Date.now },
  category: String,
  path: String, // file system path
});

export default mongoose.model("Document", documentSchema);
