import express from "express";
import mongoose from "mongoose";
import { Book } from "../types/Book.type";
import { Note } from "../types/Note.type";
const NoteModel = require("../models/Note");
const NoteController = express.Router();

NoteController.get("/", async (req, res, next) => {
  try {
    const notes: Note[] = await NoteModel.find({});

    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
});

NoteController.get("/search", async (req, res, next) => {
  try {
    const { title } = req.query;
    console.log(title);
    const notes: Book[] = await NoteModel.find({ $text: { $search: title } });

    if (!notes) {
      const error = new Error("not found");
      error["code"] = 404;

      throw error;
    }
    res.status(200).send(notes);
  } catch (err) {
    next(err);
  }
});

NoteController.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const book: Book = await NoteModel.findById(id);
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

NoteController.post("/", async (req, res, next) => {
  try {
    const note = new NoteModel(req.body.book);
    // check if this book already exists
    // add validation

    await note.save();

    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

NoteController.put("/:id", async (req, res, next) => {
  try {
    const { book } = req.body;

    const updatedNote = await NoteModel.findByIdAndUpdate(
      book._id,
      { ...book },
      { new: true }
    );

    res.status(200).send(updatedNote?._doc);
  } catch (err) {
    next(err);
  }
});

NoteController.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    await NoteModel.deleteOne({ id });

    res.status(204).send("OK");
  } catch (err) {
    next(err);
  }
});

export default NoteController;
