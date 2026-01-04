import express from "express";
import Item from "../models/Item";
import Offer from "../models/Offer";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Items array required" });
    }

    let total = 0;
    let billItems: any[] = [];

    for (const cartItem of items) {
      const item = await Item.findById(cartItem.itemId);
      if (!item) continue;

      let quantityToPay = cartItem.quantity;

const offer = await Offer.findOne({ item: item._id })
  .sort({ priority: -1 });

if (
  offer &&
  offer.type === "BUY_X_GET_Y" &&
  offer.buyQty &&
  offer.freeQty
) {
  const sets = Math.floor(
    cartItem.quantity / (offer.buyQty + offer.freeQty)
  );
  const freeItems = sets * offer.freeQty;
  quantityToPay = cartItem.quantity - freeItems;
}

      const itemTotal = quantityToPay * item.price;
      total += itemTotal;

      billItems.push({
        name: item.name,
        price: item.price,
        quantity: cartItem.quantity,
        payableQuantity: quantityToPay,
        itemTotal
      });
    }

    res.json({ items: billItems, totalAmount: total });

  } catch (error) {
    res.status(500).json({ message: "Billing error", error });
  }
});

export default router;
