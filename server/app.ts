import express, { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import BookController from "./controllers/BookController";
import { HOST_LISTEN_TEXT } from "./utils/consts";
import { ErrorHandler } from "./utils/errors/ErrorHandler";
import { logger } from "./utils/errors/logger";
import { BaseError } from "./utils/errors/BaseError";

dotenv.config();

const app = express();
// app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const errorHandler = new ErrorHandler(logger);

app.use("/book", BookController);
app.use("/book-notes", (req, res) => {});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`${HOST_LISTEN_TEXT}${PORT}`));

mongoose.connect(process.env.MONGO_DB_URI, () => console.log("db connect"));

process.on("uncaughtException", async (error: Error) => {
  await errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) process.exit(1);
});

process.on("unhandledRejection", (reason: Error) => {
  throw reason;
});

async function errorMiddleware(
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
    return;
  }
  await errorHandler.handleError(err);
}
