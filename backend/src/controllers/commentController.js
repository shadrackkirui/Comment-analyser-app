import Comment from "../models/Comment.js";
import { analyzeSentiment } from "../services/geminiService.js";

/**
 * @desc    Submit a new comment, analyze sentiment, and save if positive
 * @route   POST /api/comments
 * @access  Public
 */
export const submitComment = async (req, res) => {
  try {
    const { text } = req.body;

    // Basic validation for the incoming comment text
    if (!text || typeof text !== "string" || text.trim() === "") {
      return res
        .status(400)
        .json({ message: "Comment text is required and cannot be empty." });
    }

    const sentiment = await analyzeSentiment(text);

    if (!sentiment) {
      return res
        .status(500)
        .json({ message: "Failed to analyze comment sentiment." });
    }

    if (sentiment === "POSITIVE") {
      const newComment = await Comment.create({ text, sentiment });
      return res.status(201).json({
        message: "Positive comment saved successfully.",
        comment: newComment,
      });
    } else {
      // If sentiment is NEGATIVE, we acknowledge it without saving
      return res
        .status(200)
        .json({ message: "Comment was not positive and was not saved." });
    }
  } catch (error) {
    console.error("Error in submitComment controller:", error);
    res.status(500).json({ message: "Server error while submitting comment." });
  }
};

/**
 * @desc    Get the 5 most recent positive comments
 * @route   GET /api/comments
 * @access  Public
 */
export const getPositiveComments = async (req, res) => {
  try {
    const positiveComments = await Comment.find({ sentiment: "POSITIVE" })
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .limit(5);

    res.status(200).json(positiveComments);
  } catch (error) {
    console.error("Error in getPositiveComments controller:", error);
    res.status(500).json({ message: "Server error while fetching comments." });
  }
};
