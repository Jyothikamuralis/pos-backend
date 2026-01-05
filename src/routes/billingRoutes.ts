import express from "express";
import Item from "../models/Item";
import Offer from "../models/Offer";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;

    const billItems: any[] = [];
    let grandTotal = 0;

    for (const cartItem of items) {
      const item = await Item.findById(cartItem.itemId);
      if (!item) continue;

      const qty = cartItem.quantity;
      const originalTotal = item.price * qty;

      let discount = 0;
      let finalTotal = originalTotal;
      let offerApplied = "None";
      let freeQty = 0;

      // 🔥 FETCH OFFERS FOR ITEM
      const offers = await Offer.find({
        item: item._id,
        active: true,
      }).sort({ priority: 1 });

      if (offers.length > 0) {
        const offer = offers[0]; // apply ONLY ONE offer

        // ✅ BUY X GET Y
        if (
          offer.type === "BUY_X_GET_Y" &&
          offer.buyQty &&
          qty >= offer.buyQty
        ) {
          freeQty = Math.floor(qty / offer.buyQty) * (offer.freeQty || 0);
          offerApplied = `Buy ${offer.buyQty} Get ${offer.freeQty} Free`;
        }

        // ✅ PERCENTAGE DISCOUNT
        else if (
          offer.type === "PERCENTAGE" &&
          offer.discountPercent
        ) {
          discount = (originalTotal * offer.discountPercent) / 100;
          finalTotal = originalTotal - discount;
          offerApplied = `${offer.discountPercent}% OFF`;
        }

        // ✅ QTY DISCOUNT
        else if (
          offer.type === "QTY_DISCOUNT" &&
          offer.minQty &&
          offer.discountPercent &&
          qty >= offer.minQty
        ) {
          discount = (originalTotal * offer.discountPercent) / 100;
          finalTotal = originalTotal - discount;
          offerApplied = `Buy ${offer.minQty}+ Get ${offer.discountPercent}% OFF`;
        }
      }

      grandTotal += finalTotal;

      billItems.push({
        name: item.name,
        quantity: qty,
        originalTotal,
        discount,
        freeQty,
        finalTotal,
        offerApplied,
      });
    }

    res.json({ items: billItems, grandTotal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Billing failed" });
  }
});

export default router;
