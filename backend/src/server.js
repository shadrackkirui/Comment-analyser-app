import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import apiRoutes from "./routes/api.js";

// --- Initialization ---
const app = express();

// --- Database Connection ---
connectDB();

// --- Middleware ---

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // Your local frontend for development
  'https://comment-analyser-app.vercel.app' // **REPLACE THIS WITH YOUR VERCEL URL**
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
// To parse JSON request bodies
app.use(express.json());

// --- API Routes ---
app.use("/api", apiRoutes);

// --- Server Startup ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
