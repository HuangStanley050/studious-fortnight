const express = require("express");
const courseController = require("../controllers/course");
const router = express.Router();

//route to get all a users courses
router.get("/api/course", courseController.returnCourses);

//route to get all a users meditations
router.get("/api/meditation", courseController.returnMeditations);

//route to create a new course upon sign up quiz submission
router.post("/api/course/start", courseController.starterCourse);

//route to begin next course
router.post("/api/course/begin_next", courseController.nextCourse);

module.exports = router;