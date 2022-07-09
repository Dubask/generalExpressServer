'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const ItemSchema = new mongoose_1.Schema({
  title: String,
  description: String,
  author: String,
  date_published: Date,
  analytics: [mongoose_1.Types.ObjectId],
  book_notes: [mongoose_1.Types.ObjectId],
  tags: [String],
})
ItemSchema.index(
  { title: 'text', description: 'text', tags: 'text' },
  { background: true, name: 'titleSearch' }
)
// ItemSchema.index({ title: 1 });
const Item = (0, mongoose_1.model)('Item', ItemSchema)
exports.default = Item
//# sourceMappingURL=Item.js.map
