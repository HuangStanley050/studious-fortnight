const express = require("express");
const path = require("path");
const authRouter = require("./routes/auth");
const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => res.send("all api routes"));
app.use(authRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}../client/build/index.html`));
});

module.exports = app;
