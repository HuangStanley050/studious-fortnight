const express = require("express");
const router = express.Router();
const passport = require("passport");
const PaymentController = require("../controllers/payment");
const Donation = require("../models/Donation");

router.post(
  "/api/dontation",
  //passport.authenticate("jwt", { session: false }),
  PaymentController.handlePayment
);

module.exports = router;
