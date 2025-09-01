const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = [];  // Temporary in-memory user store

// Signup Logic
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = { email, password: hashedPassword };
  users.push(newUser);  // Temporarily store user

  // Generate JWT token
  const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Send token in cookie
  res.cookie("token", token, { httpOnly: true }).json({ message: "Signup successful" });
};

// Login Logic
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Compare password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Send token in cookie
  res.cookie("token", token, { httpOnly: true }).json({ message: "Login successful" });
};
