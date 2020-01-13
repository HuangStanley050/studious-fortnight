const express = require("express");
const path = require("path");
const authRouter = require("./routes/auth");
const app = express();
require("./config/githubOauth");

//if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "../client/build")));
//}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.get("/api", (req, res) => res.send("all api routes"));

app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}../client/build/index.html`));
});

module.exports = app;
