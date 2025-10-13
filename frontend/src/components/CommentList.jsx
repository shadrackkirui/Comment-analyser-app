import React, { useState, useEffect } from "react";
import { getPositiveComments } from "../api/commentService";

const CommentList = ({ refreshKey }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchComments = async () => {
      try {
        const data = await getPositiveComments();
        setComments(data);
      } catch (err) {
        setError("Failed to fetch comments. Is the backend server running?");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [refreshKey]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading comments...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Recent customer Feedbacks</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500 text-center">No positive comments to display yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
              <p className="text-gray-300 italic">"{comment.text}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;