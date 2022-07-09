import { Schema, model, Types } from 'mongoose'

const NoteSchema = new Schema({
  title: String,
  description: String,
  date_published: Date,
  book: Types.ObjectId,
  image: String,
  tags: [String],
})
NoteSchema.index({ title: 'text', description: 'text', tags: 'text' })
const Note = model('Note', NoteSchema)
Note.createIndexes()

module.exports = Note
