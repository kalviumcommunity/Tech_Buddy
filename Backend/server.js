require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express =require("express");
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo'); // Instantiate MongoStore with session
const app = express()

app.use(express.static(__dirname + '/public'));


app.use(cors());


app.use(
  session({
    secret: process.env.SECERET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(passport.initialize());
app.use(passport.session()); 



const userRoutes=require("./routes/user")

app.use(express.json());
app.use("/api/user",userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("🚀 Listening on port 🚀", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));

module.exports = app;