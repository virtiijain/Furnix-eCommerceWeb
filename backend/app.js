import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import adminAuthRoutes from "./routes/admin/adminAuthRoutes.js";
import UserAuthRoutes from "./routes/UserAuthRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:4173",
  "https://e-commerce-webb.vercel.app",
  "https://ecommerceweb-backend.onrender.com",
];

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "cache-control",
      "X-Requested-With",
      "Accept",
    ],
     optionsSuccessStatus: 200,
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
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.send("Server is up & MongoDB is connected!");
});

export default app;
