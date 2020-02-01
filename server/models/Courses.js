const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseDetail: {
      difficulty: String,
      levels: Number,
      music: String,
      completed: { type: Boolean, default: false }
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    meditationId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "meditation"
      }
    ]
  },
  { collection: "course", timestamps: true }
);

module.exports = mongoose.model("course", courseSchema);
