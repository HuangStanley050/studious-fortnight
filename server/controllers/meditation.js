const Course = require("../models/Courses");
const Meditation = require("../models/Meditation");
const User = require("../models/User");

exports.returnUserMeditation = async (req, res) => {
    const { id } = req.user;
    
    let user = await User.findOne({
        _id: id
    });
    
    const currentMeditation_id = user.currentMeditation

    let currentMeditation = await Meditation.findOne({
        _id: currentMeditation_id
    })

    return res.json(currentMeditation);
  };