import express from "express";
import Offer, { IOffer } from "../models/Offer";

const router = express.Router();

// GET all offers
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// POST new offer
router.post("/", async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();

    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
