import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// ✅ POST: Add item to cart
router.post("/", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId }] });
    } else {
      const exists = cart.items.some(
        (item) => item.productId.toString() === productId
      );
      if (!exists) cart.items.push({ productId });
    }

    await cart.save();
    res.json({ message: "Added to cart successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
});

// ✅ GET: Fetch user cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate("items.productId") // shows product details
      .populate("userId", "name email"); // shows user details (just name & email)

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart); // return full cart (now includes user info too)
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
});

// DELETE /api/cart/:userId/:productId
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
