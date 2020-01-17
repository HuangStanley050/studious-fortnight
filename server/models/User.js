const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String
    },
    email: {
      type: String,
      required: true
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
    badges: [{
      name: String,
      unlocked: Boolean,
      image: String 
    }],
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
    meditationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meditation"
    }
  }
)


module.exports = mongoose.model('user', userSchema);