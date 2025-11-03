import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Protected route
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Access granted ✅",
    user: req.user, // this comes from verifyToken middleware
  });
});

export default router;
