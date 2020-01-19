const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseDetail: {
      difficulty: String,
      level: Number,
      music: String
    },
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    meditationId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meditation"
      }
    ]
  },
  { collection: "course", timestamps: true }
);

module.exports = mongoose.model("course", courseSchema);
