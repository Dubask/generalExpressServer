import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import BookController from "./controllers/ItemController";
import { HOST_LISTEN_TEXT } from "./utils/consts";
import handleErrors from "./middlewares/handleErrors";
import status from "statuses";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_DB_URI);
const db = mongoose.connection;
db.on("error", () => console.log("DB connection error"));
db.once("open", () => console.log("db connect"));

// app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/book", BookController);
app.use("/book-notes", (req, res) => {});
app.get("*", function (req, res, next) {
  const notFound = status(404);

  next(notFound);
});

// MIDDLEWARES
app.use(handleErrors);

// MISC
app.listen(PORT, () => console.log(`${HOST_LISTEN_TEXT}${PORT}`));
