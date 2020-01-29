const User = require("../models/User");

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
    allUsers.forEach((allUser) => {
      if(allUser.email === email) {
        isDuplicate = true;
      }
    })

    if (user.email === email) {
      res.send("no change")
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
    user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};