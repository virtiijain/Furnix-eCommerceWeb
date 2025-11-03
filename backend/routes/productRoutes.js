import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 🟢 Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // fetch all products
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔵 Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// (optional) Add new product manually for testing
router.post("/add", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product added successfully!", product });
  } catch (error) {
    res.status(400).json({ message: "Error adding product", error });
  }
});

export default router;
