import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [{ productId }] });
    } else {
      const exists = wishlist.items.some(
        (item) => item.productId.toString() === productId
      );
      if (!exists) wishlist.items.push({ productId });
    }

    await wishlist.save();
    res.json({ message: "Added to wishlist successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding to wishlist", error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate("items.productId");
    
    const items = wishlist ? wishlist.items.map(item => {
      const product = item.productId.toObject(); 
      if (product.image && !product.image.startsWith("http")) {
        product.image = `https://ecommerceweb-backend.onrender.com${product.image}`;
      }
      return { ...item.toObject(), productId: product };
    }) : [];

    res.json({ items });
  } catch (err) {
    res.status(500).json({ message: "Error fetching wishlist", error: err.message });
  }
});

router.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = wishlist.items.filter((item) => {
      const id =
        typeof item.productId === "object"
          ? item.productId._id.toString()
          : item.productId.toString();
      return id !== productId;
    });

    await wishlist.save();
    res.json({ message: "Item removed from wishlist" });
  } catch (err) {
    console.error("Error removing wishlist item:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



export default router;