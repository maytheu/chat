const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  password: "",
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);

    connection.query(
      "SELECT * FROM user WHERE profileId = ?",
      [id],
      (err, user) => {
        if (err) throw err;

        connection.release();

        done(null, user);
      }
    );
  });
});

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "auth/google/callback",
      proxy: true
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
              "INSERT INTO user SET profileId = ?, name = ?",
              [profile.id, profile.displayName],
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
