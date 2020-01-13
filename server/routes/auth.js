const express = require("express");
const passport = require("passport");
const router = express.Router();

router
  .get(
    "/auth/github",
    passport.authenticate("github", {
      scope: ["user:email"],
      session: false
    }),
    (req, res) => {
      console.log("something is wrong");
    }
  )
  .get(
    "/auth/github/callback",
    passport.authenticate("github", { session: false }),
    (req, res) => {
      console.log(req.user);
      res.send("hello");
    }
  );

module.exports = router;
