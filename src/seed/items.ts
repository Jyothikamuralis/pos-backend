import mongoose from "mongoose";
import Item from "../models/Item";
import { connectDB } from "../db";

(async () => {
  try {
    await connectDB();

    // ❌ Clear old items
    await Item.deleteMany({});

    // ✅ Insert ONLY 6 final items
    await Item.insertMany([
      { name: "Lux Soap", price: 50 },
      { name: "Rice", price: 45 },
      { name: "Britannia Biscuit", price: 20 },
      { name: "5rs Chips", price: 5 },
      { name: "Milk Packet", price: 30 },
      { name: "Sugar", price: 42 }
    ]);

    console.log("✅ Items seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
})();
