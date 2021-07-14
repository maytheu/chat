const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const pool = require("./query");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);
    connection.query(
      "SELECT * FROM user WHERE profileId = ?",
      [id[0].profileId],
      (err, user) => {
        if (err) throw err;
        connection.release();

        done(null, id);
      }
    );
  });
});

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log(`connection id ${connection.threadId}`);
        connection.query(
          "SELECT * FROM user WHERE profileId = ?",
          [profile.id],
          (err, existingUser) => {
            if (err) throw err;

            connection.release();

            if (existingUser.length > 0) return done(null, existingUser);

            connection.query(
              "INSERT INTO user SET profileId = ?, name = ?, email = ?",
              [profile.id, profile.displayName, profile.emails[0].value],
              (err, user) => {
                connection.release();

                done(null, user);
              }
            );
          }
        );
      });
    }
  )
);
