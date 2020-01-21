const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
  let user = await User.findOne({ email });

  const msg = {
    to: "ewgodhand@gmail.com", // test email for now
    from: "CMCFlow@meditation.com",
    subject: "Password Reset Link",
    text: "To reset your password",
    html: `<a href="${process.env.PASSWORD_REDIRECT}reset_password/${user._id}/${token}">Reset your password</a>`
  };
  sgMail.send(msg);
  res.send("reset password route");
};
exports.setNewPassword = async (req, res) => {
  res.send("set new password");
};
exports.oAuthLogin = (req, res, next) => {
  const payload = {
    ...req.user
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  console.log(req.user);
  console.log(token);
  //res.send({ message: "Authenticated", token });
  res.redirect(`/auth?jwt=${token}`);
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
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Password is not correct");
    }
    const payload = {
      email: user.email,
      id: user.id
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    return res.send({ msg: "login success", token, userInfo: payload });
  } catch (err) {
    console.log(err);
  }
};
exports.localRegister = async (req, res, next) => {
  const { email, password } = req.body;
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
