import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// 1. Initialize the LangChain model for Vertex AI.
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash", // A stable and widely available model
  // model: "gemini-1.5-flash-latest", // Use the modern, fast, and widely available flash model
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Analyzes the sentiment of a given text using the Gemini API.
 * @param {string} commentText The text of the comment to analyze.
 * @returns {Promise<"POSITIVE"|"NEGATIVE"|null>} The sentiment of the text, or null if analysis fails.
 */
export const analyzeSentiment = async (commentText) => {
  try {
    // 2. A simple, direct prompt is more efficient for single-comment analysis.
    const prompt = `You are an AI sentiment analysis expert. Your task is to classify a user's comment as either "POSITIVE" or "NEGATIVE". Do not provide any explanation or other words. Respond with only a single word: "POSITIVE" or "NEGATIVE".

Here is the comment: "${commentText}"`;

    const response = await model.invoke(prompt);
    const sentiment = response.content.trim().toUpperCase();

    // 3. Validate the model's response
    if (sentiment === "POSITIVE" || sentiment === "NEGATIVE") {
      return sentiment;
    } else {
      // The model returned an unexpected response
      console.warn(`Unexpected sentiment analysis result: ${sentiment}`);
      return null;
    }
  } catch (error) {
    console.error("Error in LangChain/Google GenAI sentiment analysis:", error);
    return null; // Return null to indicate a failure in analysis
  }
};