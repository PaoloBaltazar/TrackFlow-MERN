import express from "express";
import { searchData } from "../controllers/searchController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.get("/", userAuth, searchData);

export default router;
