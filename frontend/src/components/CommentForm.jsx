import React, { useState } from "react";
import { submitComment } from "../api/commentService";
import toast from "react-hot-toast";

const CommentForm = ({ onCommentSubmit }) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    setIsSubmitting(true);

    const submissionPromise = submitComment(text);

    toast.promise(submissionPromise, {
      loading: "Analyzing your comment...",
      success: (response) => {
        setText(""); // Clear the form on success
        onCommentSubmit(); // Trigger a refresh of the comment list
        return response.message; // Display the success message from the backend
      },
      error: "Something went wrong. Please try again.",
    });

    try {
      await submissionPromise;
    } catch (error) {
      // The toast.promise handles displaying the error message
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Share Your Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          rows="4"
          placeholder="What do you think about our services and products? We will appreciate if you mention your name so that new customers actually appreciate that you proudly liked our service. Type your comment here...."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:bg-gray-500 disabled:cursor-not-allowed">
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;