const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

router.post("/api/dontation", (req, res) => res.send("donation route"));

module.exports = router;
