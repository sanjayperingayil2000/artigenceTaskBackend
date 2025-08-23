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
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];

//       // allow server-to-server or curl (no origin)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );
app.use(cors());

app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// ✅ Connect DB once
connectDB()
  .then(async () => {
    await seedDefaultPost();
    console.log("✅ Database connected & seeded");
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err);
  });

// ✅ Export app for Vercel (no app.listen)
export default app;
