const Donation = require("../models/Donation");
const User = require("../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handlePayment = async (req, res, next) => {
  const accountId = req.body.id;
  const { id, email } = req.user;
  // payment to stripe api

  let paymentResult = await stripe.charges.create({
    amount: 500, // do a fixed amount for now
    currency: "aud",
    source: accountId,
    description: "$5 for a donation"
  });
  //console.log(paymentResult);
  // make a new donation document
  const newDonation = new Donation({
    donationAmount: 5,
    timeDonated: Date.now(),
    paymentReference: paymentResult.id,
    userId: id
  });

  // save document to collection Donation
  let result = await newDonation.save();
  console.log(result);
  // find existing user
  let user = await User.findById({ _id: id });
  console.log(user);
  // push the result of donation to donation field in user model
  user.donationId.push(result.id);
  await user.save();
  res.send({ msg: "Payment successful" });
};
