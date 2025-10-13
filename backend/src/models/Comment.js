import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Comment text is required."],
      trim: true,
    },
    sentiment: {
      type: String,
      required: [true, "Sentiment is required."],
      enum: {
        values: ["POSITIVE", "NEGATIVE"],
        message: "{VALUE} is not a supported sentiment.",
      },
    },
  },
  {
    // Automatically add `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
