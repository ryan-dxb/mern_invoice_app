import chalk from "chalk";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { morganMiddleware, systemLogs } from "./utils/Logger.js";
import connectDB from "./config/connectDb.js";
import mongoSanitize from "express-mongo-sanitize";

await connectDB();
const app = express();

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(mongoSanitize());

// app.use(morganMiddleware);

// Routes
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "API is running.." });
});

app.get("/", (req, res) => {
  res.send("API is running..");
});

// Error Handler

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    chalk.blue.bold(
      `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );

  // systemLogs.info(
  //   `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  // );
});
