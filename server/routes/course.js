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

//route to add new course from discover page
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

exports.getUser = async (req, res) => {
  const { id } = req.user;
  console.log("====================");
  console.log("in get user");
  try {
    let user = await User.findById({ _id: id });
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateEmail = async (req, res) => {
  const { id } = req.user;
  const { email } = req.body;
  console.log(req.body);
  try {
    let user = await User.findById({ _id: id });

    let allUsers = await User.find({});
    let isDuplicate = false;
    allUsers.forEach((allUser) => {
      if(allUser.email === email) {
        isDuplicate = true;
      }
    })

    if (user.email === email) {
      res.send("no change")
    } else if (isDuplicate === false) {
      user.email = email;
      user.save();
      res.send("success");
    } else if (isDuplicate === true) {
      res.send("failure");
    }

  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deactivateAccount = async (req, res) => {
  const { id } = req.user;
  try {
    let user = await User.findById({ _id: id });
    user.activeUser = false;
    user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = router;
