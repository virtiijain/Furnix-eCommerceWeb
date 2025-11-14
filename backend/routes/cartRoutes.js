import express from "express";
import Cart from "../models/Cart.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing userId or productId" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const item = cart.items.find(
        (i) => i.productId.toString() === productId
      );
      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json({ message: "Added to cart successfully!", cart });
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId: userIdParam } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userIdParam)) {
      return res.status(400).json({ message: "Invalid userId" });
    }
    const userId = new mongoose.Types.ObjectId(userIdParam);
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) return res.json({ items: [] });

    res.json(cart);
  } catch (err) {
    console.error("Cart fetch error:", err);
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
});


router.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();

    res.json({ message: "Item removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;