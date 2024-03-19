require("dotenv").config();
const mongoose = require("mongoose");
const express =require("express");
const app = express()

const userRoutes=require("./routes/user")

app.use(express.json());
app.use("/user",userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("🚀 Listening on port 🚀", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));

module.exports = app;