const Course = require("../models/Courses");
const Meditation = require("../models/Meditation");
const User = require("../models/User");

exports.returnUserMeditation = async (req, res) => {
  const { id } = req.user;

  try {
    const result = await User.findOne({ _id: id });

    if (!result.currentMeditation) {
      throw new Error("user has no existing meditation");
    }
    const meditationId = result.currentMeditation;

    let meditation = await Meditation.findOne({ _id: meditationId });

    return res.send(meditation);
  } catch (err) {
    console.log("no current Meditation");

    return res.status(500).send({ msg: "Unable to find current meditation" });
  }
};

exports.updateUserMeditation = async (req, res) => {
  console.log("in update user medittion");
  const { id } = req.user;
  let { currentTime } = req.body;

  currentTime = Math.round(currentTime);

  const user = await User.findById({ _id: id });
  const meditation = await Meditation.findOne({ _id: user.currentMeditation });
  const course = await Course.findOne({ _id: meditation.courseId });

  meditation.sessionDetail.currentTime = currentTime;
  if (currentTime >= meditation.sessionDetail.totalTime) {
    meditation.completed = true;
    if (
      meditation.sessionDetail.totalTime == 180 &&
      meditation.sessionDetail.level == 3
    ) {
      course.courseDetail.completed = true;
      await course.save();
      console.log("beginner course finish");
    } else if (
      meditation.sessionDetail.totalTime == 300 &&
      meditation.sessionDetail.level == 4
    ) {
      course.courseDetail.completed = true;
      await course.save();
      console.log("intermediate course finish");
    } else if (
      meditation.sessionDetail.totalTime == 600 &&
      meditation.sessionDetail.level == 5
    ) {
      course.courseDetail.completed = true;
      await course.save();
      console.log("expert course finish");
    }
    //update currentMeditation
    let newCurrentMeditation = meditation;
    const usersMeditations = await Meditation.find({ userId: id });
    usersMeditations.map((theMeditation, index) => {
      if (
        theMeditation.completed == false &&
        parseInt(meditation.sessionDetail.level) + 1 ==
          theMeditation.sessionDetail.level
      ) {
        newCurrentMeditation = theMeditation;
      } else if (
        theMeditation.completed == false &&
        course.courseDetail.completed
      ) {
        // newCurrentMeditation = theMeditation;
        console.log(" the course is completed");
      } else {
        //do nothing
        //at the end of the sessions all complete
      }
    });

    // console.log(user.currentMeditation, "<==user current med")

    // console.log(meditation,"<== meditation");

    user.currentMeditation = newCurrentMeditation;
    await user.save();
  }
  await meditation.save();
  return res.send("Meditation updated");
};
