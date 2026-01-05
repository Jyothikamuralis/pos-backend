import mongoose from "mongoose";
import Item from "../models/Item";
import Offer from "../models/Offer";
import { connectDB } from "../db";

(async () => {
  try {
    await connectDB();

    // ❌ Clear old offers
    await Offer.deleteMany({});

    // 🔍 Find required items
    const lux = await Item.findOne({ name: "Lux Soap" });
    const rice = await Item.findOne({ name: "Rice" });
    const biscuit = await Item.findOne({ name: "Britannia Biscuit" });
    const milk = await Item.findOne({ name: "Milk Packet" });

    if (!lux || !rice || !biscuit || !milk) {
      throw new Error("❌ Required items not found. Seed items first.");
    }

    // ✅ Insert offers
    await Offer.insertMany([
      // Lux Soap → 25% OFF if buy 2
      {
        item: lux._id,
        type: "QTY_DISCOUNT",
        minQty: 2,
        discountPercent: 25,
        priority: 3,
        active: true
      },

      // Rice → 10% OFF
      {
        item: rice._id,
        type: "PERCENTAGE",
        discountPercent: 10,
        priority: 2,
        active: true
      },

      // Britannia Biscuit → Buy 2 Get 1 Chips Free
      {
        item: biscuit._id,
        type: "BUY_X_GET_Y",
        buyQty: 2,
        freeQty: 1,
        priority: 1,
        active: true
      },

      // Milk Packet → Buy 2 Get 1 Free
      {
        item: milk._id,
        type: "BUY_X_GET_Y",
        buyQty: 2,
        freeQty: 1,
        priority: 1,
        active: true
      }
    ]);

    console.log("✅ Offers seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
})();
