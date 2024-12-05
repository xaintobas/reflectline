require("dotenv").config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`DB Connected Successfully`);
  })
  .catch((err) => {
    console.error("DB Connection Error", err);
  });

// Serve static files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
