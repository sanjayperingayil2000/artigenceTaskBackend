import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "../routes/auth.js";
import postRoutes from "../routes/post.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error(err));

// ✅ Important: Export app as handler (not app.listen)
export default app;
