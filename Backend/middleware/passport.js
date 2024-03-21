const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User=require("../modals/userModel");
const { compareSync } = require("bcrypt");

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
    const user = await User.findById(id);
    done(err, user);
  });

module.exports = passport;