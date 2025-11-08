import express from "express";
import bcrypt from "bcryptjs"; // ✅ use bcryptjs everywhere
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Include admin info in response
    res.json({ 
      message: "Login successful", 
      token, 
      admin: { name: admin.name, email: admin.email, role: admin.role } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", err });
  }
});

router.get("/reset-admin", async (req, res) => {
  try {
    const hashed = await bcrypt.hash("admin123", 10); // ✅ bcryptjs here
    await Admin.updateOne({ email: "admin@gmail.com" }, { password: hashed });
    res.json({ message: "Admin password reset to admin123" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting admin password" });
  }
});

export default router;
