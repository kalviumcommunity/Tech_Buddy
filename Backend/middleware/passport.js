const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User=require("../modals/userModel");
const { compareSync } = require("bcrypt");
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(
  new GoogleStrategy(
    {
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/user/google/",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(accessToken, profile);
      const user = await User.findOne({ googleId: profile.id });
      if (!user) {
        let newUser = new User({
          username: profile.displayName,
        });

        newUser.save();
        return cb(null, newUser);
      } else {
        return cb(null, user);
      }
    }
  )
);

passport.use(new LocalStrategy(
  async function(username, password, done) {
    const user = await User.findOne({ username: username });
    if (!user) { return done(null, false,{message:"Incorrect Username."}); }
    if (!compareSync(password, user.password)) { return done(null, false,{message:"Incorrect password."}); }
    return done(null, user);
}
));

passport.serializeUser(function(user, cb) {
    cb(null,user.id)
});
  
  
passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});




module.exports = passport;