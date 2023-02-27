const bcrypt = require("bcryptjs");
const User = require("../../database/userModel");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// If we can't find a user, a new user is created with the encrypted password

// If a user is found, the encrypted password is compareed against the pass in our database

// Our Local Strategy:

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    // Match our user
    User.findOne({ email: email })
      .then((user) => {
        // Create a new user if not exists
        if (!user) {
          const newUser = new User({ email, password });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  return done(null, user);
                })
                .catch((err) => {
                  return done(null, false, { message: err });
                });
            });
          });

          // Else the user exists, lets return that user
        } else {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            // If password matches db password, return the user
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Wrong password provided" });
            }
          });
        }
      })
      .catch((err) => {
        return done(null, false, { message: err });
      });
  })
);

module.exports = passport;
