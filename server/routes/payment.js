const express = require("express");
const router = express.Router();
const passport = require("passport");
const PaymentController = require("../controllers/payment");

router.post(
  "/api/donation",
  passport.authenticate("jwt", { session: false }),
  PaymentController.handlePayment
);

module.exports = router;
