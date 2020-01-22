const express = require("express");
const passport = require("passport");
const AuthController = require("../controllers/auth");
const router = express.Router();

router
  .post("/api/auth/local/password_reset", AuthController.resetPassword)
  .post(
    "/api/auth/local/password_new",
    passport.authenticate("jwt", { session: false }),
    AuthController.setNewPassword
  )
  .post("/api/auth/local/login", AuthController.localLogin)
  .post("/api/auth/local/register", AuthController.localRegister)
  .get(
    "/api/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false
    })
  )
  .get(
    "/api/auth/google/callback",
    passport.authenticate("google", { session: false }),
    AuthController.oAuthLogin
  )
  .get(
    "/api/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["email"],
      session: false
    })
  )
  .get(
    "/api/auth/facebook/callback",
    passport.authenticate("facebook", { session: false }),
    AuthController.oAuthLogin
  )
  .get(
    "/api/auth/github",
    passport.authenticate("github", {
      scope: ["user:email", "read:org"],
      session: false
    })
  )
  .get(
    "/api/auth/github/callback",
    passport.authenticate("github", {
      session: false
    }),
    (req, res) => {
      console.log(req);
      res.send("hello");
    }
  );

module.exports = router;
