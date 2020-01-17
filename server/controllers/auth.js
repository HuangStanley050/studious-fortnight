const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.oAuthLogin = (req, res, next) => {
  const payload = {
    ...req.user
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  console.log(req.user);
  console.log(token);
  //res.send({ message: "Authenticated", token });
  res.send(token);
};
exports.localLogin = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email }); // simulate data base look up
    if (!user) {
      throw new Error("User doesn't exist");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Password is not correct");
    }
    const payload = {
      email: user.email
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    return res.send({ msg: "login success", token });
  } catch (err) {
    console.log(err);
  }
};
exports.localRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    let user = await User.findOne({ email });
    console.log(user);
    if (user) {
      throw new Error("User already exists");
    }
    const newUser = new User({ email, password: hash });
    let registerUser = await newUser.save();
    return res.send({ msg: "user registered", registerUser });
  } catch (err) {
    console.log(err);
  }
};
