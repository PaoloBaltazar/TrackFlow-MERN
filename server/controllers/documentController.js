import Document from "../models/documentModel.js";
import path from "path";
import mime from "mime-types";
import fs from "fs";

export const uploadDocument = async (req, res) => {
  try {
    const file = req.file;

    const newDoc = new Document({
      name: file.originalname,
      type: path.extname(file.originalname).slice(1).toUpperCase(),
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadedBy: req.user.name, // ✅ get from userAuth
      category: req.body.category || "General",
      path: file.path,
    });

    // On upload:
    console.log("Saving document with name:", file.originalname); // should be e.g., "resume.pdf"

    await newDoc.save();

    res.status(200).json({ success: true, document: newDoc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ uploadDate: -1 });
    res.json({ success: true, documents: docs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const downloadDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const filePath = doc.path;

    // Infer content type from path
    const contentType = mime.lookup(filePath) || "application/octet-stream";

    // Ensure filename has correct extension
    let fileName = doc.name;
    const hasExt = path.extname(fileName);
    if (!hasExt) {
      const extension = mime.extension(contentType);
      fileName += extension ? `.${extension}` : "";
    }

    // Set headers properly
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    // Send file
    res.download(filePath, fileName);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) {
      console.log("No document found for deletion");
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }

    console.log("Deleted document:", doc.name);
    res.json({ success: true, message: "Document deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error during deletion" });
  }
};
