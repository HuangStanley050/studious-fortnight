const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donationAmount: {
      type: Number
    },
    timeDonated: {
      type: Date
    },
    paymentReference: {
      type: String
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { collection: "meditation", timestamps: true }
);

module.exports = mongoose.model("donation", donationSchema);
