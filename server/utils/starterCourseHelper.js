const Course = require("../models/Courses");
const Meditation = require("../models/Meditation");
const User = require("../models/User");
const quotes = require("../hardcoded_data/quotes.js");

const createSessionDetail = (startingChoice, level) => {
  switch (startingChoice) {
    case "beginner":
      return {
        level: level + 1,
        quote: quotes.beginner[level],
        currentTime: 0,
        totalTime: 180 // in seconds, 3 minutes
      };
    case "intermediate":
      return {
        level: level + 1,
        quote: quotes.intermediate[level],
        currentTime: 0,
        totalTime: 300 // in seconds, 5 minutes
      };
    case "expert":
      return {
        level: level + 1,
        quote: quotes.expert[level],
        currentTime: 0,
        totalTime: 600 // in seconds, 10 minutes
      };
    default:
      break;
  }
};
const createCourse = async (id, startingChoice, courseDetail, res) => {
  try {
    const newCourse = await Course.create({ courseDetail, userId: id });
    //create new meditation:
    let meditationArray = [];
    let i = 0;

    for (i; i < courseDetail.levels; i++) {
      const newMeditation = await Meditation.create({
        sessionDetail: createSessionDetail(startingChoice, i),
        completed: false,
        userId: id,
        courseId: newCourse._id,
        music: courseDetail.music
      });
      meditationArray.push(newMeditation);
    }
    newCourse.meditationId = meditationArray;
    await newCourse.save();

    //find the user based on id
    //push courseid into user courseId as an array;
    //push meditation array into meditationId;
    //
    //console.log("user id: ", id);
    let user = await User.findOne({ _id: id });
    //console.log("user in createCourse: ", user);
    if (user.courseId !== null) {
      user.courseId = [...user.courseId, newCourse];
    } else {
      user.courseId.push(newCourse);
    }
    user.meditationId = [...user.meditationId, ...meditationArray];
    await user.save();

    // User.findOne({ _id: id }).then(user => {
    //   if (user.courseId !== null) {
    //     user.courseId = [...user.courseId, newCourse];
    //   } else {
    //     user.courseId = [newCourse];
    //   }
    //   user.meditationId = [...user.meditationId, ...meditationArray];
    //   user.save();
    // });

    console.log("=================================");
    console.log("success");
    // res.status(200).json({
    //   title: "New course",
    //   newCourse,
    //   title2: "Meditations:",
    //   newMeditations: meditationArray
    // });
  } catch (err) {
    console.log("=================================");
    console.log("in error hmm");
    console.log(err.message);
    res.status(400).json(err);
  }
};
const updateCurrentMeditation = async (id, res) => {
  try {
    const user = await User.findById({ _id: id });
    console.log("userId in updateCurrentMeditation: ", user._id);
    const meditation = await Meditation.findOne({
      userId: user._id,
      completed: false
    });
    if (!meditation) {
      throw new Error("unable to find meditation based on conditions");
    }
    /*
          for some reason sometimes it can't find the meditation that we are looking for. I can't always re produce the error but it does happen

          meditation._id =====> sometimes is null

     */
    user.currentMeditation = meditation._id;
    console.log("before hitting the error block: ", meditation._id);
    // console.log("before updating user meditation: ", meditation.id);
    // console.log("Updating user meditation: ", user.currentMeditation);
    await user.save();
    let currentMeditation = await Meditation.findOne({
      _id: user.currentMeditation
    });
    return res.send(currentMeditation);
  } catch (err) {
    console.log(
      "==============this is in updateCurrentMeditation catch block====>"
    );
    console.log(err.message);
  }
};

module.exports = { createSessionDetail, createCourse, updateCurrentMeditation };
