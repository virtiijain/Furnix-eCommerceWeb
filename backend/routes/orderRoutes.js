import express from "express";
import Order from "../models/Orders.js";
import Cart from "../models/Cart.js"; // ✅ make sure to import your Cart model

const router = express.Router();

// 🧾 Create new order
router.post("/", async (req, res) => {
  try {
    const { userId, items, totalPrice, address, paymentMethod } = req.body;

    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      address,
      paymentMethod,
    });

    await newOrder.save();

    // 🧹 After order is successfully saved, clear user's cart
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } }, // empty the cart
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully and cart cleared!",
      order: newOrder,
    });
  } catch (err) {
    console.error("Order save error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// 📦 Get all orders for a user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
});

export default router;
