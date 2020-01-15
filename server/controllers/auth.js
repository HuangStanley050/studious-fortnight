const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = [
  // simulate database for User collection
  {
    // password is 'password'
    email: "test@test.com",
    password: "$2y$15$itxqOKHwMoGSiSpFJhnp6.wR8PNaws9OQpR/uFKlQWoh/j7jootCy"
  },
  {
    // password is 'test1234'
    email: "test@test2.com",
    password: "$2y$15$0NSv/m4O6uYeUKKvb7lDC.t1jR78qFgVIkFpvLdWXQhX/p1UdZck2"
  }
];

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
    user = User.find(account => account.email === email); // simulate data base look up
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
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    let user = User.find(account => account.email === email);
    if (user) {
      throw new Error("User already exists");
    }
    const newUser = { email, password: hash };
    User.push(newUser);
    return res.send({ msg: "user registered", newUser });
  } catch (err) {
    console.log(err);
  }
};
