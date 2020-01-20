const express = require("express");
const courseController = require("../controllers/course");
const router = express.Router();

router.get("/api/course", (req, res) => {
  res.send("course route");
});

//route to create a new course upon sign up quiz submission
router.post("/api/course/start", courseController.starterCourse);

router.post("/api/course/begin_next", courseController.nextCourse);

module.exports = router;