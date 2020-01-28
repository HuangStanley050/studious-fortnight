const Course = require("../models/Courses");
const Meditation = require("../models/Meditation");
const User = require("../models/User");

const createSessionDetail = (startingChoice, level) => {
  switch (startingChoice) {
    case "beginner":
      return {
        level: level + 1,
        quote: "A wise man says things here to a beginner meditator",
        currentTime: 0,
        totalTime: 180 // in seconds, 3 minutes
      };
    case "intermediate":
      return {
        level: level + 1,
        quote: "A wise man says things here to an intermediate meditator",
        currentTime: 0,
        totalTime: 300 // in seconds, 5 minutes
      };
    case "expert":
      return {
        level: level + 1,
        quote: "A wise man says things here to an expert meditator",
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

const updateCurrentMeditation = async id => {
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
    createCourse(id, startingChoice, courseDetail, res);
    updateCurrentMeditation(id);
  } else if (startingChoice === "intermediate") {
    //intermediate session: 5 minutes each, 4 sessions
    const courseDetail = {
      difficulty: "intermediate",
      levels: 4,
      music: "MkPlp1Vt8YY" //dummy data used for now.
    };
    //create new course:
    createCourse(id, startingChoice, courseDetail, res);
    updateCurrentMeditation(id);
  } else if (startingChoice === "expert") {
    //intermediate session: 5 minutes each, 5 sessions
    const courseDetail = {
      difficulty: "expert",
      levels: 5,
      music: "MkPlp1Vt8YY" //dummy data used for now.
    };
    createCourse(id, startingChoice, courseDetail, res);
    updateCurrentMeditation(id);
  }

  //unlocks badge for starting
  const unlockStarterBadge = async () => {
    const user = await User.findById({ _id: id });
    user.badges[0].unlocked = "true";
    await user.save();
  };
  unlockStarterBadge();
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
    createCourse(id, courseName, courseDetail, res);
    updateCurrentMeditation(id);
  } else if (courseName === "intermediate") {
    //intermediate session: 5 minutes each, 4 sessions
    const courseDetail = {
      difficulty: "intermediate",
      levels: 4,
      music: "MkPlp1Vt8YY" //dummy data used for now.
    };
    //create new course:
    createCourse(id, courseName, courseDetail, res);
    updateCurrentMeditation(id);
  } else if (courseName === "expert") {
    //intermediate session: 5 minutes each, 5 sessions
    const courseDetail = {
      difficulty: "expert",
      levels: 5,
      music: "MkPlp1Vt8YY" //dummy data used for now.
    };
    createCourse(id, courseName, courseDetail, res);
    updateCurrentMeditation(id);
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
