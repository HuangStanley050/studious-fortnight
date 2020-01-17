const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
{   
    beginnerCourse: [{
        level: Number,  
        music: String,
        time: Number,
        quote: String
      }],
      intermediateCourse: [{
        level: Number,  
        music: String,
        time: Number,
        quote: String
      }],
      advancedCourse: [{
        level: Number,  
        music: String,
        time: Number,
        quote: String
      }],
      meditationId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meditation"
      }],
}, {collection: 'course'}
)


module.exports = mongoose.model('course', courseSchema);