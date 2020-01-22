const Course = require('../models/Courses');
const Meditation = require('../models/Meditation');
const User = require('../models/User');

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
}

const createCourse = async (userId, startingChoice, courseDetail, res) => {
  try {
    const newCourse = await Course.create( {courseDetail, userId} );
    //create new meditation:
    let meditationArray = []; 
    let i = 0;

    for (i; i < courseDetail.levels; i++) {
      const newMeditation = await Meditation
      .create({
        sessionDetail: createSessionDetail(startingChoice, i),
        completed: false,
        userId,
        courseId: newCourse
      });
      meditationArray.push(newMeditation);
    };
    newCourse.meditationId = meditationArray;
    await newCourse.save();

    //find the user based on id
    //push courseid into user courseId as an array;
    //push meditation array into meditationId;
    User.findOne( {_id: userId} ).then( (user) => {
      if (user.courseId !== null) {
        user.courseId = [
          ...user.courseId,
          newCourse
        ];
      } else {
        user.courseId = [
          newCourse
        ];
      }
      user.meditationId = [
        ...user.meditationId,
        ...meditationArray 
      ];
      user.save();
    });


    console.log("=================================")
    console.log("success");
    res.status(200).json({
      title: "New course",
      newCourse,
      title2: "Meditations:",
      newMeditations: meditationArray
    });
  } catch (err) {
    console.log("=================================")
    console.log("in error hmm");
    console.log(err);
    res.status(402).json(err);
  }
}

exports.returnCourses = async (req, res) => {
  const { userId } = req.body;

  Course.find({userId: userId})
  .then((allCourses) => {
    res.json(allCourses);
  })
  .catch( (err) => res.json(err) );
}

exports.returnMeditations = async (req, res) => {
  const { userId } = req.body;

  Meditation.find({userId: userId})
  .then((allMeditations) => {
    res.json(allMeditations);
  })
  .catch( (err) => res.json(err) );
}

exports.starterCourse = async (req, res) => {
  //purpose: to create new course for specific user based on initial quiz. 
  //recieve info from user survey for starting difficulty level:

  const { userId, startingChoice } = req.body;

  console.log(userId, startingChoice);
  //create mongoose models required from the user
  if (startingChoice === "beginner") {
    //beginner session: 3 minutes each, 3 sessions
    const courseDetail = {
      difficulty: "beginner",
      levels: 3,
      music: "testmusic.mp3" //dummy data used for now.
    };
    //create new course: 
    createCourse(userId, startingChoice, courseDetail, res);
  } else if (startingChoice === "intermediate") {
    //intermediate session: 5 minutes each, 4 sessions
    const courseDetail = {
      difficulty: "intermediate",
      levels: 4,
      music: "testmusic.mp3" //dummy data used for now.
    };
    //create new course:
    createCourse(userId, startingChoice, courseDetail, res);
  } else if ( startingChoice === "expert" ) {
    //intermediate session: 5 minutes each, 5 sessions
    const courseDetail = {
      difficulty: "expert",
      levels: 5,
      music: "testmusic.mp3" //dummy data used for now.
    };
    createCourse(userId, startingChoice, courseDetail, res);
  }

  User.findById({_id: userId}).then((user) => {
    user.badges[0].unlocked = "true";
    user.save();
  }).catch((err) => {
    res.send(err);
    console.log(err);
  });
};


exports.nextCourse = async (req, res) => {
  const { userId } = req.body;

  User.findOne( {_id: userId} ).then( (user) => {
    const lastCourseId = user.courseId[user.courseId.length - 1]

    Course.findOne( {_id: lastCourseId }).then( (course) => {
        const courseDifficulty = course.courseDetail.difficulty;
        let courseDetail;
        switch(courseDifficulty) {
          case "beginner": 
            console.log("added beginner course");
            //create a new course with choice as "intermediate"
            courseDetail = {
              difficulty: "intermediate",
              levels: 4,
              music: "testmusic.mp3" //dummy data used for now.
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
              music: "testmusic.mp3" //dummy data used for now.
            };
            createCourse(userId, "expert", courseDetail, res);
            res.send("added expert course, intermediate finished");
            break;
          case "expert":
            console.log("added no courses, you finished expert!")
            res.send("added no courses");
            //do something to say "completed all?" or do nothing for now.. MVP
            break;
          default:
            //unreachable code basically
            break;
        } 
    }).catch((err) => {
      res.send("the user has not started any courses yet. Where are you accessing this API link?")
    })

  });

}