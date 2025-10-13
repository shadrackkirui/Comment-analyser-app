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
// Enable CORS for all routes
app.use(cors());
// To parse JSON request bodies
app.use(express.json());

// --- API Routes ---
app.use("/api", apiRoutes);

// --- Server Startup ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
