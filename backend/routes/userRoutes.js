import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Access granted ✅",
    user: req.user,
  });
});

export default router;
