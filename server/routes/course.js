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
router.post("/api/course/begin_next", courseController.nextCourse);

module.exports = router;
