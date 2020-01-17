const mongoose = require("mongoose");

const meditationSchema = new mongoose.Schema(
  {
    completedSession: [
      {
        name: String,
        level: Number,
        time_completed: Date,
        quote: String
      }
    ],
    activeSession: {
      name: String,
      current_time: Date
    },
    completed: [
      {
        name: String
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { collection: "meditation" }
);

module.exports = mongoose.model("meditation", meditationSchema);
