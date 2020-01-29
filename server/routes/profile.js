// const express = require("express");
// const profileController = require("../controllers/profile");
// const router = express.Router();
// const passport = require("passport");

// //route to get users info
// router.get(
//   "/api/account/get-user",
//   passport.authenticate("jwt", { session: false }),
//   profileController.getUser 
// );

// //route to update users email
// router.post(
//   "/api/account/update-email",
//   passport.authenticate("jwt", { session: false }),
//   profileController.updateEmail
// );

// //route to deactivate account
// router.post(
//   "/api/account/deactivate-account",
//   passport.authenticate("jwt", { session: false }),
//   profileController.deactivateAccount
// );