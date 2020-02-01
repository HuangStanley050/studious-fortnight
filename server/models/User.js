const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    currentMeditation: {
      type: mongoose.Schema.Types.ObjectId
    },
    externalProvider: {
      type: String
    },
    dailyStreak: {
      type: Number
    },
    totalTimeMeditated: {
      type: Number
    },
    lastMeditated: {
      type: Date
    },
    badges: [
      {
        id: Number,
        name: String,
        unlocked: Boolean,
        image_url: String,
        description: String
      }
    ],
    preferredMeditationTime: {
      type: String
    },
    startingPoint: {
      type: String
    },
    purposeOfJoining: {
      type: String
    },
    activeUser: {
      type: Boolean,
      default: true
    },
    courseId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
      }
    ],
    meditationId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "meditation"
      }
    ],
    donationId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "donation"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
