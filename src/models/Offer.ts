import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    type: {
      type: String,
      enum: ["PERCENTAGE", "QTY_DISCOUNT", "BUY_X_GET_Y"],
      required: true,
    },
    minQty: Number,
    discountPercent: Number,
    buyQty: Number,
    freeQty: Number,
    priority: {
      type: Number,
      default: 1,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Offer", OfferSchema);
