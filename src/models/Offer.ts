import mongoose, { Schema, Types } from "mongoose";

export interface IOffer {
  item: Types.ObjectId;
  type: string;
  buyQty?: number;
  freeQty?: number;
  discountPercent?: number;
  priority: number;
}

const OfferSchema = new Schema<IOffer>({
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  buyQty: Number,
  freeQty: Number,
  discountPercent: Number,
  priority: {
    type: Number,
    default: 0,
  },
});

const Offer = mongoose.model<IOffer>("Offer", OfferSchema);
export default Offer;
