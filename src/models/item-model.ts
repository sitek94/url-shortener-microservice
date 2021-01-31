import { Schema, model } from 'mongoose';

const ItemSchema = new Schema({
  original_url: { type: String, required: true },
  short_url: { type: Number, required: true },
});

const Item = model('Item', ItemSchema);

export default Item;