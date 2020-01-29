const Course = require("../models/Courses");
const Meditation = require("../models/Meditation");
const User = require("../models/User");

// might not need this anymore, we are getting the current meditation details to the front end so the front end can provide dummy data for now
exports.getVideo = async (req, res) => {
  const { id } = req.user;
  const result = await User.findOne({ _id: id });
  const meditation = await Meditation.findOne({ userId: result._id });
  const userLevel = meditation.sessionDetail.level;

  let videoURL = "";

  switch (userLevel) {
    // 3minutes below
    case "1":
      videoURL = "iHdviZkM7S4";
      break;
    case "2":
      videoURL = "4Lm0o3XGKIY";
      break;
    case "3":
      videoURL = "UIrLyE7iz50";
      break;
    //5minutes below
    case "4":
      videoURL = "W0bSen8Qjg";
      break;
    case "5":
      videoURL = "xTczn5RUgnk";
      break;
    case "6":
      videoURL = "6_akBtKZdE";
      break;
    case "7":
      videoURL = "nkqnuxKj8Dk";
      break;
    //10 minutes below
    case "8":
      videoURL = "KAHKP313P2I";
      break;
    case "9":
      videoURL = "4ASKMcdCc3g";
      break;
    case "10":
      videoURL = "OvxwaacXTUA";
      break;
    case "11":
      videoURL = "smZbpBsny9c";
      break;
    case "12":
      videoURL = "Ihq64W33cyo";
  }

  return res.send(videoURL);
};

exports.returnUserMeditation = async (req, res) => {
  // const {id} = req.body;
  // console.log("id ==>", id);
  //console.log("returning user meditation......from returnUserMeditation");
  //console.log("result of finding the meditation from user: ", result);

  const { id } = req.user;
  // const {id} = req.body;
  // console.log("id ==>", id);
  //console.log("returning user meditation......from returnUserMeditation");
  try {
    const result = await User.findOne({ _id: id });
    //console.log("result of finding the meditation from user: ", result);
    if (!result.currentMeditation) {
      throw new Error("user has no existing meditation");
    }
    const meditationId = result.currentMeditation;

    let meditation = await Meditation.findOne({ _id: meditationId });
    //console.log(meditation);
    return res.send(meditation);
  } catch (err) {
    console.log("no current Meditation");
    return res.status(500).send({ msg: "Unable to find current meditation" });
  }
};

// exports.updateUserMeditation = async (req, res) => {
//   const { id } = req.user;
//   const { currentTime, completed } = req.body;

//   const user = await User.findById({ _id: id });
//   const meditation = await Meditation.findOne({ _id: user.currentMeditation });

//   meditation.sessionDetail.currentTime = currentTime;
//   if (completed) {
//     meditation.completed = true;
//   }
//   await meditation.save();

//   //need to return something here, otherwise client might timeout....
// };

exports.updateUserMeditation = async (req, res) => {
  console.log("in update user medittion")
  const { id } = req.user;
  let { currentTime, completed } = req.body;

  // console.log(id)
  // currentTime = Math.round(currentTime);
  // console.log(currentTime)
  // console.log(completed)

  const user = await User.findById({ _id: id });
  const meditation = await Meditation.findOne({ _id: user.currentMeditation });

  // console.log(user.currentMeditation, "<==user current med")

  // console.log(meditation.sessionDetail.level,"<== meditation level");
  // console.log(meditation.sessionDetail.quote,"<== meditation quote");

  meditation.sessionDetail.currentTime = currentTime;
  if (completed) {
    meditation.completed = true;

    //update currentMeditation
    let newCurrentMeditation = "";
    const usersMeditations = await Meditation.find({userId: id})
    usersMeditations.forEach((theMeditation) => {
      if(meditation.sessionDetail.totalTime === theMeditation.sessionDetail.totalTime && theMeditation.completed === false) {
        newCurrentMeditation = theMeditation;
      } else if (theMeditation.completed === false){
        newCurrentMeditation = theMeditation;
      } else {
        //do nothing
        //at the end of the sessions all complete
      }
    });

    // console.log(user.currentMeditation, "<==user current med")

    // console.log(meditation,"<== meditation");

    user.currentMeditation = newCurrentMeditation;
    user.save();
  }
  await meditation.save();
};