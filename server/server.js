import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import documentRouter from "./routes/documentRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import searchRouter from "./routes/searchRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = [
  "http://localhost:5173", // local dev (Vite)
  "http://localhost:3000", // local dev (CRA)
  "https://trackflow-mern-1.onrender.com", // your actual frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// API Endpoints
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/documents", documentRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/search", searchRouter);

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
