import axios from "axios";

// Create an axios instance configured to use the backend API URL from the .env file
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/**
 * Fetches the 5 most recent positive comments from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of comment objects.
 */
export const getPositiveComments = async () => {
  try {
    const response = await api.get("/comments");
    return response.data;
  } catch (error) {
    console.error("Error fetching positive comments:", error);
    throw error; // Re-throw the error so the UI component can handle it
  }
};

/**
 * Submits a new comment to the backend for analysis.
 * @param {string} text The text of the comment to submit.
 * @returns {Promise<Object>} A promise that resolves to the response data from the server.
 */
export const submitComment = async (text) => {
  try {
    const response = await api.post("/comments", { text });
    return response.data;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error; // Re-throw the error so the UI component can handle it
  }
};