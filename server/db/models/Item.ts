import { Schema, model, Types, set } from 'mongoose';

const ItemSchema = new Schema({
  title: String,
  description: String,
  author: String,
  date_published: Date,
  analytics: [Types.ObjectId],
  book_notes: [Types.ObjectId],
  tags: [String],
});

ItemSchema.index(
  { title: 'text', description: 'text', tags: 'text' },
  { background: true, name: 'titleSearch' }
);

// ItemSchema.index({ title: 1 });
const Item = model('Item', ItemSchema);

export default Item;
