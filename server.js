import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import postsRoutes from "./src/routes/posts.routes.js";
import seedDefaultPost from "./src/utils/seed.js";

dotenv.config();
const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(helmet());

app.use(
  cors({
    origin: "https://artigence-task-ui.vercel.app", // ✅ your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(morgan("dev"));

app.options("*", cors()); // ✅ Handle preflight requests

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

connectDB()
  .then(async () => {
    await seedDefaultPost();
    console.log("✅ Database connected & seeded");
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err);
  });

export default app;
