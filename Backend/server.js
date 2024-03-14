require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("🚀 Listening on port 🚀", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));

module.exports = app;