import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const productObj = product.toObject();

    if (productObj.image && !productObj.image.startsWith("http")) {
      productObj.image = `https://ecommerceweb-backend.onrender.com${productObj.image}`;
    }

    res.json(productObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/add", async (req, res) => {
  try {
    let { image, ...rest } = req.body;
     if (image && !image.startsWith("http")) {
      image = `https://ecommerceweb-backend.onrender.com/images/${image}`;
    }
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product added successfully!", product });
  } catch (error) {
    res.status(400).json({ message: "Error adding product", error });
  }
});

export default router;
