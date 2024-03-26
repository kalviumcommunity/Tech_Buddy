const passport = require('passport');
const User = require('../modals/userModel');
const { hashSync, compareSync } = require('bcrypt');
require('../middleware/passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var jwt = require('jsonwebtoken');




const signupUser = async (req, res) => {
  const password = req.body.password;

  // Regular expression to check if the password contains at least one letter, one symbol, and one capital letter, and is 8 characters long
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8}$/;

  if (!passwordRegex.test(password)) {
    return res.send({
      success: false,
      message: "Password must contain at least one letter, one symbol, one capital letter, and be 8 characters long."
    });
  }

  const user = new User({
    username: req.body.username,
    password: hashSync(password, 10)
  });

  user.save().then(user => {
    res.send({
      success: true,
      message: "User created successfully.",
      user: {
        id: user._id,
        username: user.username
      }
    });
  }).catch(err => {
    res.send({
      success: false,
      message: "Something went wrong",
      error: err
    });
  });
};





const loginUser = (req, res, next) => {
  User.findOne({ username: req.body.username }).then(user => {
      //No user found
      if (!user) {
          return res.status(401).send({
              success: false,
              message: "Could not find the user."
          })
      }

      //Incorrect password
      if (!compareSync(req.body.password, user.password)) {
          return res.status(401).send({
              success: false,
              message: "Incorrect password"
          })
      }

      const payload = {
          username: user.username,
          id: user._id
      }

      const token = jwt.sign(payload, "Random string", { expiresIn: "1d" })

      return res.status(200).send({
          success: true,
          message: "Logged in successfully!",
          token: "Bearer " + token
      })
  })
}


const logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: "Logout successful" });
};

const google = (req, res, next) => {
  passport.authenticate('google', { scope: ['email', 'profile'] })(req, res, next);
};

const googlecallback = (req, res, next) => {
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/home',
    failureRedirect: 'http://localhost:5173/login',
  })(req, res, next);
};

module.exports = { signupUser, loginUser ,logout,google,googlecallback};
