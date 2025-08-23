import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import postsRoutes from "./src/routes/posts.routes.js";
import seedDefaultPost from "./src/utils/seed.js";
import serverless from "serverless-http";

dotenv.config();
const app = express();

// CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(express.json({ limit: "1mb" }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Routes
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// DB connect
connectDB()
  .then(async () => {
    await seedDefaultPost();
    console.log("✅ Database connected & seeded");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
  });

// Instead of app.listen(), export handler
export const handler = serverless(app);
