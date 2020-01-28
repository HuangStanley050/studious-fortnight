const Course = require("../models/Courses");
const Meditation = require("../models/Meditation");
const User = require("../models/User");

exports.returnUserMeditation = async (req, res) => {
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
