'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const NoteSchema = new mongoose_1.Schema({
  title: String,
  description: String,
  date_published: Date,
  book: mongoose_1.Types.ObjectId,
  image: String,
  tags: [String],
})
NoteSchema.index({ title: 'text', description: 'text', tags: 'text' })
const Note = (0, mongoose_1.model)('Note', NoteSchema)
Note.createIndexes()
module.exports = Note
//# sourceMappingURL=Note.js.map
