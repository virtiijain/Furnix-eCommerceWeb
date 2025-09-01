const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const products = require("./products.json");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Temporary in-memory user store (replace with DB later)
let users = [];

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

app.use("/auth", authRoutes);

app.get("/signup", (req, res) => {
  res.send("Signup page");
});

app.get('/api/products', (req, res) => {
  res.json(products); // frontend ko JSON data bhej rahe
});
app.use("/images", express.static("images"));

// Signup Route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = { email, password: hashedPassword };
    users.push(newUser); // Temporarily storing user

    // Generate JWT token
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration
    });

    // Send JWT token in cookies
    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong during signup" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
