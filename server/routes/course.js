const express = require("express");
const CourseController = require("../controllers/course");
const router = express.Router();

router.get("/course", (req, res) => {
  res.send("course route");
});

router.post("/course/start", (req, res) => {
  //recieve info from user survey for starting difficulty level:
  const { userId, startingChoice } = req.body;

  //create mongoose models required from the user
  if (startingChoice === "beginner") {
    //beginner session: 3 minutes each, 3 sessions
    //access model to user, meditation
    //based on user ID => 
  } else if (startingChoice === "intermediate") {
    //intermediate session: 5 minutes each, 4 sessions
  } else if ( startingChoice === "expert" ) {
    //expert session: 10 minutes each, 5 sessions
  }

  res.send(`in course post ${userId} ${startingChoice}`);

});

module.exports = router;