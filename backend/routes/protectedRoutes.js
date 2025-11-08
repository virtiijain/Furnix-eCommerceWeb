import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", (req, res) => {
  res.json({ message: "Profile route working ✅" });
});

export default router;
