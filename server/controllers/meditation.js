const Course = require("../models/Courses");
const Meditation = require("../models/Meditation");
const User = require("../models/User");

exports.returnUserMeditation = async (req, res) => {
  const { id } = req.user;
  // const {id} = req.body;
  // console.log("id ==>", id);
  //console.log("returning user meditation......from returnUserMeditation");
  const result = await User.findOne({ _id: id });
  //console.log("result of finding the meditation from user: ", result);
  const meditationId = result.currentMeditation;

  let meditation = await Meditation.findOne({ _id: meditationId });

  return res.send(meditation);
};
