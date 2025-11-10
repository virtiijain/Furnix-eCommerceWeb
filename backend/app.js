import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import adminAuthRoutes from "./routes/admin/adminAuthRoutes.js";
import UserAuthRoutes from "./routes/UserAuthRoutes.js"
import protectedRoutes from "./routes/protectedRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/auth", UserAuthRoutes);
app.use("/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/adminAuth", adminAuthRoutes);

app.use("/api", protectedRoutes);
app.use("/images", express.static("images"));

app.get("/", (req, res) => {
  res.send("Server is up & MongoDB is connected!");
});

export default app;
