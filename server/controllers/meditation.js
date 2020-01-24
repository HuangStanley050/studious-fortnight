const Course = require("../models/Courses");
const Meditation = require("../models/Meditation");
const User = require("../models/User");

exports.returnUserMeditation = async (req, res) => {
  const { id } = req.user;
  // const {id} = req.body;
  // console.log("id ==>", id);

  const result = await User.findOne({ _id: id });
  const meditationId = result.currentMeditation;
  console.log("meditationId: ", meditationId);
  const meditation = await Meditation.findOne({ _id: meditationId });
  console.log("Meditation: ", meditation);
  return res.send(meditation);
};
