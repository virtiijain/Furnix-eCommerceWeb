const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5500; 

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Furnix Backend Running 🚀");
});


// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
