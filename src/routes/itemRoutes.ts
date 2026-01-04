import express from "express";
import Item, { IItem } from "../models/Item";

const router = express.Router();

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// POST new item
router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;

    const item = new Item({ name, price });
    await item.save();

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
