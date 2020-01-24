const Course = require("../models/Courses");
const Meditation = require("../models/Meditation");
const User = require("../models/User");

exports.returnUserMeditation = async (req, res) => {
    const { id } = req.user;
    // const {id} = req.body;
    // console.log("id ==>", id);

    const result = await User.findOne({_id: id})
    const meditationId = result.currentMeditation
    const meditation = await Meditation.findOne({_id: meditationId});
    return res.send(meditation);
};

exports.updateUserMeditation = async (req, res ) => {
    const {currentTime, completed} = req.body

    const user = await User.findById({ _id: id })
    const meditation = await Meditation.findOne({_id: user.currentMeditation})
    
    meditation.sessionDetail.currentTime = currentTime
    if (completed){
        meditation.completed = true
    }
    await meditation.save()
}