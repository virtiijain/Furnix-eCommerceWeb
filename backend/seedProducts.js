import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Sofa Couch",
    price: 10578,
    colors: ["#D4A373", "#A68A64"],
    image: "/images/img6.png",
    category: "sofa",
  },
  {
    name: "Accent Chair",
    price: 3608,
    colors: ["#D4E1F5", "#90A4AE"],
    image: "/images/img7.png",
    category: "chair",
  },
  {
    name: "Flower Vase",
    price: 656,
    colors: ["#C5E1A5"],
    image: "/images/img8.png",
    category: "vase",
  },
  {
    name: "Modern Chair",
    price: 3116,
    colors: ["#78909C", "#9FA8DA", "#B39DDB"],
    image: "/images/img9.png",
    category: "chair",
  },
  {
    name: "Wood Chair",
    price: 1968,
    colors: ["#A1887F"],
    image: "/images/img10.png",
    category: "chair",
  },
  {
    name: "Modern Lamp",
    price: 984,
    colors: ["#FFF9C4"],
    image: "/images/img11.png",
    category: "lamp",
  },
  {
    name: "Aurla Chair",
    price: 4510,
    colors: ["#EDE7F6"],
    image: "/images/img12.png",
    category: "chair",
  },
  {
    name: "Wood Table",
    price: 8364,
    colors: ["#BCAAA4"],
    image: "/images/img13.png",
    category: "table",
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await Product.deleteMany(); // clear old data
    await Product.insertMany(products);
    console.log("products added successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.error("❌DB connection error:", err));
