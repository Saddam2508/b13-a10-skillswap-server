import CookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import logger from "./middleware/logger.js";

import globalErrorHandler from "./middleware/globalErrorHandler.js";
import { tasksRoute } from "./modules/tasks/tasks.route.js";

const app = express();

app.use(CookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:3000" ||
      "https://b13-a10-skillswap.vercel.app", // ✅
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  //res.send("Hello World!");
  res.status(200).json({
    message: "Express Server",
    author: "Next Level",
  });
});

app.use("/api/tasks", tasksRoute);

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
