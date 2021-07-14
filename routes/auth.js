const express = require("express");
const router = express.Router();
const passport = require("passport");

const { user } = require("../middleware/user");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
});

router.get("/", user, (req, res) => {
  res.status(200).json({
    isUserAuth: true,
    profileId: req.session.passport.user[0].profileId,
    name: req.session.passport.user[0].name,
    email: req.session.passport.user[0].email,
  });
});

module.exports = router;
