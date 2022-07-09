import express from "express";
import mongoose from "mongoose";
import { Book } from "../types/Book.type";
const BookModel = require("../models/Book");
const BookController = express.Router();

BookController.get("/", async (req, res, next) => {
  try {
    const books: Book[] = await BookModel.find({});

    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
});

BookController.get("/search", async (req, res, next) => {
  try {
    const { title } = req.query;
    const books: Book[] = await BookModel.find({ $text: { $search: title } });

    if (!books) {
      const error = new Error("not found");
      error["code"] = 404;

      throw error;
    }
    res.status(200).send(books);
  } catch (err) {
    next(err);
  }
});

BookController.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const book: Book = await BookModel.findById(id);
    if (!book) {
      const error = new Error("not found");
      error["code"] = 404;

      throw error;
    }
    res.status(200).send(book);
  } catch (err) {
    next(err);
  }
});

BookController.post("/", async (req, res, next) => {
  try {
    const book = new BookModel(req.body.book);
    // check if this book already exists
    // add validation

    await book.save();

    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

BookController.put("/:id", async (req, res, next) => {
  try {
    const { book } = req.body;

    const updatedBook = await BookModel.findByIdAndUpdate(
      book._id,
      { ...book },
      { new: true }
    );

    res.status(200).send(updatedBook?._doc);
  } catch (err) {
    next(err);
  }
});

BookController.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    await BookModel.deleteOne({ id });

    res.status(204).send("OK");
  } catch (err) {
    next(err);
  }
});

export default BookController;
