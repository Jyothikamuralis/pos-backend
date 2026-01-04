import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  price: number;
  offers?: string[]; // Array of offer IDs
}

const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    offers: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IItem>("Item", itemSchema);
