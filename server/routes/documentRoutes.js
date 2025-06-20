import express from "express";
import upload from "../middleware/upload.js";
import userAuth from "../middleware/userAuth.js";
import {
  uploadDocument,
  getAllDocuments,
  downloadDocument,
  deleteDocument,
} from "../controllers/documentController.js";
import DocumentModel from "../models/documentModel.js";

const router = express.Router();

router.post("/upload", userAuth, upload.single("file"), uploadDocument);
router.get("/", userAuth, getAllDocuments);
router.get("/download/:id", userAuth, downloadDocument);
router.delete("/delete/:id", userAuth, deleteDocument);

export default router;
