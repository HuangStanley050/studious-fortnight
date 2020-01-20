const mongoose = require("mongoose");

const meditationSchema = new mongoose.Schema(
  {
    sessionDetail: {
      level: String,
      quote: String,
      currentTime: Date,
      totalTime: Date
    },
    completed: Boolean,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses"
    }
  },
  { collection: "meditation", timestamps: true }
);

module.exports = mongoose.model("meditation", meditationSchema);
