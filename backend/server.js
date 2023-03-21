import chalk from "chalk";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { morganMiddleware, systemLogs } from "./utils/Logger.js";
import connectDB from "./config/connectDb.js";
import mongoSanitize from "express-mongo-sanitize";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";

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
  res.json({ Hi: "Welcome to the Invoice App" });
});

app.use("/api/v1/auth", authRoutes);

// Error Handler

app.use(notFound);
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 1997;

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
