import express from "express";
import {
  submitComment,
  getPositiveComments,
} from "../controllers/commentController.js";

const router = express.Router();

// @route   POST /api/comments
// @desc    Submit a new comment for analysis
router.post("/comments", submitComment);

// @route   GET /api/comments
// @desc    Get 5 most recent positive comments
router.get("/comments", getPositiveComments);

export default router;
