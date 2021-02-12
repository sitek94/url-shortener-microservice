import { Schema, model, Document } from 'mongoose';

export type ItemDocument = Document & {
  original_url: string;
  short_url: number;
}

const ItemSchema = new Schema({
  original_url: { type: String, required: true },
  short_url: { type: Number, required: true },
});

export const Item = model<ItemDocument>('Item', ItemSchema);
