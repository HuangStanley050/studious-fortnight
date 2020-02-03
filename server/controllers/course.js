const Course = require("../models/Courses");
const Meditation = require("../models/Meditation");
const User = require("../models/User");
const quotes = require("../hardcoded_data/quotes.js");
const {
  createCourse,
  updateCurrentMeditation,
  createSessionDetail
} = require("../utils/starterCourseHelper.js");

//===
//for the discover page:
const createCourseDiscover = async (id, startingChoice, courseDetail, res) => {
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
    res.status(200).json({
      title: "New course",
      newCourse,
      title2: "Meditations:",
      newMeditations: meditationArray
    });
  } catch (err) {
    console.log("=================================");
    console.log("in error hmm");
    console.log(err.message);
    res.status(400).json(err);
  }
};

const updateCurrentMeditationDiscover = async (id, res) => {
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
    await Meditation.findOne({
      _id: user.currentMeditation
    });
  } catch (err) {
    console.log(
      "==============this is in updateCurrentMeditation catch block====>"
    );
    console.log(err.message);
  }
};
exports.returnCourses = async (req, res) => {
  const { id } = req.user;

  const courses = await Course.find({ userId: id });
  return res.json(courses);
};

exports.returnMeditations = async (req, res) => {
  const { id } = req.user;

  let meditations = await Meditation.find({ userId: id });
  return res.json(meditations);
};

exports.returnBadges = async (req, res) => {
  const { id } = req.user;

  let user = await User.find({ _id: id });
  return res.json(user[0].badges);
};

exports.starterCourse = async (req, res) => {
  //purpose: to create new course for specific user based on initial quiz.
  //recieve info from user survey for starting difficulty level:
  const { id } = req.user;
  const { startingChoice = "beginner" } = req.body;

  console.log(id, startingChoice);
  //create mongoose models required from the user
  if (startingChoice === "beginner") {
    //beginner session: 3 minutes each, 3 sessions
    const courseDetail = {
      difficulty: "beginner",
      levels: 3,
      music: "MkPlp1Vt8YY" //dummy data used for now.
    };
    //create new course:
    await createCourse(id, startingChoice, courseDetail, res);
    updateCurrentMeditation(id, res);
  } else if (startingChoice === "intermediate") {
    //intermediate session: 5 minutes each, 4 sessions
    const courseDetail = {
      difficulty: "intermediate",
      levels: 4,
      music: "MkPlp1Vt8YY" //dummy data used for now.
    };
    //create new course:
    await createCourse(id, startingChoice, courseDetail, res);
    updateCurrentMeditation(id, res);
  } else if (startingChoice === "expert") {
    //intermediate session: 5 minutes each, 5 sessions
    const courseDetail = {
      difficulty: "expert",
      levels: 5,
      music: "MkPlp1Vt8YY" //dummy data used for now.
    };
    await createCourse(id, startingChoice, courseDetail, res);
    updateCurrentMeditation(id, res);
  }

  //unlocks badge for starting
  const unlockStarterBadge = async () => {
    const user = await User.findById({ _id: id });
    user.badges[0].unlocked = "true";
    await user.save();
  };
  unlockStarterBadge();
  // we need to return the currnet meditation data here
};

exports.nextCourse = async (req, res) => {
  const { userId } = req.body;

  User.findOne({ _id: userId }).then(user => {
    const lastCourseId = user.courseId[user.courseId.length - 1];

    Course.findOne({ _id: lastCourseId })
      .then(course => {
        const courseDifficulty = course.courseDetail.difficulty;
        let courseDetail;
        switch (courseDifficulty) {
          case "beginner":
            console.log("added beginner course");
            //create a new course with choice as "intermediate"
            courseDetail = {
              difficulty: "intermediate",
              levels: 4,
              music: "MkPlp1Vt8YY" //dummy data used for now.
            };
            createCourse(userId, "intermediate", courseDetail, res);
            res.send("added intermediate course, beginner finished");
            break;
          case "intermediate":
            console.log("added intermediate course");
            //create a new course with choice as "advanced"
            courseDetail = {
              difficulty: "expert",
              levels: 5,
              music: "MkPlp1Vt8YY" //dummy data used for now.
            };
            createCourse(userId, "expert", courseDetail, res);
            res.send("added expert course, intermediate finished");
            break;
          case "expert":
            console.log("added no courses, you finished expert!");
            res.send("added no courses");
            //do something to say "completed all?" or do nothing for now.. MVP
            break;
          default:
            //unreachable code basically
            break;
        }
      })
      .catch(err => {
        res.send(
          "the user has not started any courses yet. Where are you accessing this API link?"
        );
      });
  });
};

exports.addCourse = async (req, res) => {
  const { id } = req.user;
  const { courseName } = req.body;

  if (courseName === "beginner") {
    //beginner session: 3 minutes each, 3 sessions
    const courseDetail = {
      difficulty: "beginner",
      levels: 3,
      music: "MkPlp1Vt8YY" //dummy data used for now.
    };
    //create new course:
    await createCourseDiscover(id, courseName, courseDetail, res);
    updateCurrentMeditationDiscover(id);
  } else if (courseName === "intermediate") {
    //intermediate session: 5 minutes each, 4 sessions
    const courseDetail = {
      difficulty: "intermediate",
      levels: 4,
      music: "MkPlp1Vt8YY" //dummy data used for now.
    };
    //create new course:
    await createCourseDiscover(id, courseName, courseDetail, res);
    updateCurrentMeditationDiscover(id);
  } else if (courseName === "expert") {
    //intermediate session: 5 minutes each, 5 sessions
    const courseDetail = {
      difficulty: "expert",
      levels: 5,
      music: "MkPlp1Vt8YY" //dummy data used for now.
    };
    await createCourseDiscover(id, courseName, courseDetail, res);
    updateCurrentMeditationDiscover(id);
  } else {
    console.log("invalid data provided!");
  }
};

exports.setCurrentMeditation = async (req, res) => {
  const { id } = req.user;
  const { meditationId } = req.body;

  //look up user
  //set their currentMeditation
  try {
    let user = await User.findById({ _id: id });
    user.currentMeditation = meditationId;
    let result = await user.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getTheJourneyItems = async (req, res) => {
  const { id } = req.user;
  try {
    let meditations = await Meditation.find({ userId: id });
    res.send(meditations);
    // console.log(meditations);
  } catch (err) {
    res.status(500).send(err);
  }
};

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
    allUsers.forEach(allUser => {
      if (allUser.email === email) {
        isDuplicate = true;
      }
    });

    if (user.email === email) {
      res.send("no change");
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
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.checkBadges = async (req, res) => {
  const { id } = req.user;
  // const { id } = req.body;

  try {
    const user = await User.findOne({ _id: id });
    const meditations = await Meditation.find({ userId: id });
    //badge 3, 4, 5
    const courses = await Course.find({ userId: id });
    courses.forEach(course => {
      const completed = course.courseDetail.completed;
      if (completed === true) {
        switch (course.courseDetail.difficulty) {
          case "beginner":
            //unlock badge 3
            user.badges[2].unlocked = true;
            break;
          case "intermediate":
            //unlock badge 4
            user.badges[3].unlocked = true;
            break;
          case "expert":
            //unlock badge 5
            user.badges[4].unlocked = true;
            break;
          default:
            break;
        }
      }
    });
    //badge 2, 6, 7 (runStreak logic here)

    //badge 8, 9, 10
    let totalTime = 0;
    meditations.forEach(meditation => {
      if (meditation.completed === true) {
        totalTime += meditation.sessionDetail.totalTime;
      }
    });

    if (totalTime / 60 > 30) {
      //unlock badge 8
      user.badges[7].unlocked = true;
    }
    if (totalTime / 60 > 60) {
      //unlock badge 9
      user.badges[8].unlocked = true;
    }
    if (totalTime / 60 > 6000) {
      //unlock badge 10
      user.badges[9].unlocked = true;
    }

    user.save();
    res.send(user.badges);
  } catch (err) {
    res.status(500).send(err);
  }
};
