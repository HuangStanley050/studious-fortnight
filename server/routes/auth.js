const express = require("express");
const passport = require("passport");
const router = express.Router();

router
  .get("/auth", (req, res) => res.send("auth route"))
  .get("/auth/facebook", passport.authenticate("facebook", { session: false }))
  .get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { session: false })
  )
  .get(
    "/auth/github",
    passport.authenticate("github", {
      scope: ["user:email", "read:org"],
      session: false
    })
  )
  .get(
    "/auth/github/callback",
    passport.authenticate("github", {
      session: false
    }),
    (req, res) => {
      console.log(req);
      res.send("hello");
    }
  );

module.exports = router;
