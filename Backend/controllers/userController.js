const passport = require('passport');
const User = require('../modals/userModel');
const bcrypt = require('bcrypt');
require('../middleware/passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;






const signupUser = async (req, res) => {
  let { username, password } = req.body;

  try {
    const newUser = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10)
    });
    res.status(200).json({ "msg": "Success" });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(400).json({ error: 'An error occurred while signing up user' });
  }
};

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err); // Pass any errors to the next middleware
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Log in the user manually
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};


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
