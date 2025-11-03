import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

// ✅ POST: Add item to wishlist
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

// ✅ GET: Fetch user wishlist
router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate("items.productId");
    res.json({ items: wishlist ? wishlist.items : [] });
  } catch (err) {
    res.status(500).json({ message: "Error fetching wishlist", error: err.message });
  }
});

// ✅ DELETE: Remove item from wishlist
router.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    // 🧠 Fix: handle both populated + non-populated productIds
    wishlist.items = wishlist.items.filter((item) => {
      const id =
        typeof item.productId === "object"
          ? item.productId._id.toString()
          : item.productId.toString();
      return id !== productId;
    });

    await wishlist.save();
    res.json({ message: "Item removed from wishlist ✅" });
  } catch (err) {
    console.error("Error removing wishlist item:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



export default router;
