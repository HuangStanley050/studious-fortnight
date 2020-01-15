const jwt = require("jsonwebtoken");

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
exports.localLogin = (req, res, next) => {};
exports.localRegister = (req, res, next) => {};
