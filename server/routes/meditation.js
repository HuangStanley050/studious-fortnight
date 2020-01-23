const express = require("express");
const router = express.Router();
const meditationController = ("../controllers/meditation")
const passport = require("passport");

/*
    -post request when pause or close the meditation ## update current time ##
    -
*/
router.get(
    "/api/meditation_user",
    passport.authenticate("jwt", { session: false }),
    meditationController.returnUserMeditation
  );


    
    
module.exports = router;