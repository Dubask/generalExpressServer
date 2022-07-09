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
import { ERRORS } from "./utils/consts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const errorHandler = new ErrorHandler(logger);
// app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/book", BookController);
app.use("/book-notes", (req, res) => {});

// MIDDLEWARES
app.use(errorMiddleware);

// ERROR HANDLING
process.on(ERRORS.UNCAUGHT_EXCEPTION, async (error: Error) => {
  await errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) process.exit(1);
});

process.on(ERRORS.UNHANDLED_REJECTION, (reason: Error) => {
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

// MISC
app.listen(PORT, () => console.log(`${HOST_LISTEN_TEXT}${PORT}`));

mongoose.connect(process.env.MONGO_DB_URI, () => console.log("db connect"));
