import express from "express";  // if using ES modules (package.json type: "module")
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json()); // parse JSON bodies

// simple test route
app.get("/", (req, res) => {
  res.send("Hello from GreenFarm backend 🌱");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
