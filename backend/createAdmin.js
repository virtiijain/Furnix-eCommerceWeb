import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/admin.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    // delete any old admins
    await Admin.deleteMany({});

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    mongoose.disconnect();
  })
  .catch((err) => console.error("❌ Error:", err));
