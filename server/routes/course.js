const express = require("express");
const courseController = require("../controllers/course");
const router = express.Router();
const passport = require("passport");

//route to get all a users courses
router.get(
  "/api/course",
  passport.authenticate("jwt", { session: false }),
  courseController.returnCourses
);

//route to get all a users meditations
router.get(
  "/api/meditation",
  passport.authenticate("jwt", { session: false }),
  courseController.returnMeditations
);

//route to get all a users badges
router.get(
  "/api/badges",
  passport.authenticate("jwt", { session: false }),
  courseController.returnBadges
);

//route to create a new course upon sign up quiz submission
router.post(
  "/api/course/start",
  passport.authenticate("jwt", { session: false }),
  courseController.starterCourse
);

//route to begin next course
router.post(
  "/api/course/begin_next",
  passport.authenticate("jwt", { session: false }),
  courseController.nextCourse
);

//route to add new course from quiz
router.post(
  "/api/course/add",
  passport.authenticate("jwt", { session: false }),
  courseController.addCourse
);

//route to update users current meditation
router.post(
  "/api/course/update-meditation",
  passport.authenticate("jwt", { session: false }),
  courseController.setCurrentMeditation
);

//route to get users info
router.get(
  "/api/account/get-user",
  passport.authenticate("jwt", { session: false }),
  courseController.getUser
);

//route to update users email
router.post(
  "/api/account/update-email",
  passport.authenticate("jwt", { session: false }),
  courseController.updateEmail
);

//route to deactivate account
router.post(
  "/api/account/deactivate-account",
  passport.authenticate("jwt", { session: false }),
  courseController.deactivateAccount
);

router.get(
  "/api/account/check-badges",
  passport.authenticate("jwt", { session: false }),
  courseController.checkBadges
);

module.exports = router;
