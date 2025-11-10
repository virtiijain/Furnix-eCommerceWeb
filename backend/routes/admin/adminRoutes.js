import express from "express";
import mongoose from "mongoose";
import User from "../../models/User.js";
import Product from "../../models/Product.js";
import Cart from "../../models/Cart.js";
import Order from "../../models/Orders.js";
import Wishlist from "../../models/Wishlist.js";
import { verifyToken, verifyAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken, verifyAdmin);

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    await Order.deleteMany({ userId: userObjectId });
    await Cart.deleteMany({ userId: userObjectId });
    await Wishlist.deleteMany({ userId: userObjectId });

    const deletedUser = await User.findByIdAndDelete(userObjectId);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User and all related data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

router.get("/users/:id/orders", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id })
      .populate("userId", "name email")
      .populate("items.productId", "name price image");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error });
  }
});

router.delete("/cleanup/unknown-orders", async (req, res) => {
  try {
    const validUserIds = await User.distinct("_id");
    const result = await Order.deleteMany({ userId: { $nin: validUserIds } });
    res.json({
      message: `Deleted ${result.deletedCount} orders with unknown users`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error cleaning unknown orders", error });
  }
});

router.delete("/cleanup/unknown-carts", async (req, res) => {
  try {
    const validUserIds = await User.distinct("_id");
    const result = await Cart.deleteMany({ userId: { $nin: validUserIds } });
    res.json({
      message: `Deleted ${result.deletedCount} carts with unknown users`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error cleaning unknown carts", error });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image },
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

router.get("/carts", async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price image");
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching carts", error });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price image");

    const validOrders = orders.filter((order) => order.userId !== null);
    res.status(200).json(validOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

export default router;
