const express = require("express");
const passport = require("passport");
const router = express.Router();

router
  .get(
    "/auth/twitter",
    passport.authenticate("twitter", {
      scope: ["profile", "email"],
      session: false
    })
  )
  .get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", { session: false }),
    (req, res) => {
      console.log(req.user);
      res.send("hello");
    }
  );
