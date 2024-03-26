const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}

const User=require("../modals/userModel");
const { compareSync } = require("bcrypt");
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(
  new GoogleStrategy(
    {
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/user/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // console.log(accessToken, profile);
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


opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECERET;

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  User.findOne({ id: jwt_payload.id }, function (err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  });
}));



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