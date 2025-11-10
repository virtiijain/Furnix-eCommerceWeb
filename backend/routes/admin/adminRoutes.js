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
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);

    await Promise.all([
      Order.deleteMany({ userId }),
      Cart.deleteMany({ userId }),
      Wishlist.deleteMany({ userId }),
    ]);

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User and related data deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});

router.get("/users/:id/orders", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id })
      .populate("userId", "name email")
      .populate("items.productId", "name price image category");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Error fetching user orders", error: error.message });
  }
});

router.delete("/cleanup/unknown-orders", async (req, res) => {
  try {
    const validUserIds = await User.distinct("_id");
    const result = await Order.deleteMany({ userId: { $nin: validUserIds } });

    res.json({ message: `Deleted ${result.deletedCount} orders with unknown users` });
  } catch (error) {
    res.status(500).json({ message: "Error cleaning unknown orders", error: error.message });
  }
});

router.delete("/cleanup/unknown-carts", async (req, res) => {
  try {
    const validUserIds = await User.distinct("_id");
    const result = await Cart.deleteMany({ userId: { $nin: validUserIds } });

    res.json({ message: `Deleted ${result.deletedCount} carts with unknown users` });
  } catch (error) {
    res.status(500).json({ message: "Error cleaning unknown carts", error: error.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

router.post("/products", async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required" });
    }

    const newProduct = new Product({
      name,
      price,
      image: image || "https://via.placeholder.com/150",
      category,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image, category },
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
});

router.get("/carts", async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price image category");

    res.status(200).json(carts);
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ message: "Error fetching carts", error: error.message });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price image category");

    const validOrders = orders.filter(order => order.userId !== null);
    res.status(200).json(validOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

export default router;
