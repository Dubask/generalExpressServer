import { Schema, model, Types } from "mongoose";

const BookSchema = new Schema({
  title: String,
  description: String,
  author: String,
  date_published: Date,
  analytics: [Types.ObjectId],
  book_notes: [Types.ObjectId],
  tags: [String],
});
BookSchema.index({ title: "text", description: "text", tags: "text" });
const Book = model("Book", BookSchema);
Book.createIndexes();

module.exports = Book;
