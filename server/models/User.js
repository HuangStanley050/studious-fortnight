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
      type: String
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
      type: Boolean
    },
    courseId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ],
    meditationId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meditation"
      }
    ],
    donationId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donation"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
