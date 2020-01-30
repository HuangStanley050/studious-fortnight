const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sgMail = require("@sendgrid/mail");
const badges = require("../hardcoded_data/badges");
const emailValidate = require("../utils/emailValidate");
const passwordValidate = require("../utils/passwordValidate");
sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  let user;
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  try {
    user = await User.findOne({ email });
    const msg = {
      to: email,
      from: "CMCFlow@meditation.com",
      subject: "Password Reset Link",
      text: "To reset your password",
      html: `<a href="${process.env.PASSWORD_REDIRECT}reset_password/${user._id}/${token}">Reset your password</a>`
    };
    sgMail.send(msg);
    return res.status(200).send("Email sent for reset password");
  } catch (err) {
    // user doesn't exists
    // or other issues
    return res.status(400).send({
      msg: "Unable to reset password"
    });
  }
};
exports.setNewPassword = async (req, res) => {
  const { email } = req.user;
  const password = req.body.email;

  try {
    let user = await User.findOne({ email });
    if (user.externalProvider) {
      throw new Error("user has an oauth account");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    await user.save();
    res.send("set new password");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unable to set new password");
  }
};
exports.oAuthLogin = (req, res, next) => {
  const payload = {
    ...req.user
  };
  if (payload.deactivated) {
    return res.redirect(`/auth?jwt=false`);
  }
  //console.log(payload);
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  //console.log(req.user);
  //console.log(token);
  //res.send({ message: "Authenticated", token });
  return res.redirect(`/auth?jwt=${token}`);
};
exports.localLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email }); // simulate data base look up
    if (!user) {
      throw new Error("User doesn't exist");
    }
    if (user.externalProvider) {
      throw new Error("User has an account already");
    }
    if (!user.activeUser) {
      throw new Error("User account is deactivated");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Password is not correct");
    }
    const payload = {
      email: user.email,
      id: user.id
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h"
    });
    return res.send({ msg: "login success", token, userInfo: payload });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ msg: err.message });
  }
};
exports.localRegister = async (req, res, next) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    if (!emailValidate(email)) {
      throw new Error("Email is not valid");
    }
    if (!passwordValidate(password)) {
      throw new Error("Password not valid");
    }
    let user = await User.findOne({ email });
    //console.log(user);
    if (user) {
      //throw new Error("User already exists");
      throw new Error("User already exists");
    }
    const newUser = new User({ email, password: hash });
    //pre-load badges with unlocked: false as default setting
    newUser.badges = badges;

    let registerUser = await newUser.save();
    return res.send({ msg: "user registered", registerUser });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ msg: err.message });
  }
};
