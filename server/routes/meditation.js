const express = require("express");
const meditationController = require("../controllers/meditation");
const router = express.Router();
const passport = require("passport");

/*
    -post request when pause or close the meditation ## update current time ##
    -
*/
//get the current meditation based off the User_Id
router.get(
  "/api/meditation_user",
  passport.authenticate("jwt", { session: false }),
  meditationController.returnUserMeditation
);

//  Update the Current Meditation Time
router.post(
  "/api/meditation_update",
  passport.authenticate("jwt", { session: false }),
  meditationController.updateUserMeditation
)
  
module.exports = router;