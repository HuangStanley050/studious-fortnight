const mongoose = require("mongoose");

const meditationSchema = new mongoose.Schema(
  {
    sessionDetail: {
      level: String,
      quote: String,
      currentTime: Number,
      totalTime: Number
    },
    completed: Boolean,
    active: Boolean,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course"
    }
  },
  { collection: "meditation", timestamps: true }
);

module.exports = mongoose.model("meditation", meditationSchema);
