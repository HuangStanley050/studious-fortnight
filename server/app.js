const express = require("express");
const path = require("path");
const passport = require("passport");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const courseRouter = require("./routes/course");
const paymentRouter = require("./routes/payment");

const app = express();
require("./config/githubOauth");
require("./config/facebookOauth");
require("./config/jwtStrategy");
require("./config/googleOauth");

mongoose.connect(process.env.MONGODB_URI, () =>
  console.log("connected to mongDB")
);

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(courseRouter);

app.use(paymentRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}../client/build/index.html`));
});

module.exports = app;
