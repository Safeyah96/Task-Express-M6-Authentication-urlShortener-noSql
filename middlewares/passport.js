const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    let passwordsMatch = false;
    if (user) {
      passwordsMatch = await bcrypt.compare(password, user.password);
    }

    if (passwordsMatch) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error);
  }
});

module.exports = localStrategy;
