const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    {
      usernameField: 'username',  // Use username for login
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: "No user found" });
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return done(null, false, { message: "Incorrect password" });
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id); // Store user id in session
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
