import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 5500;

connectDB();

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
