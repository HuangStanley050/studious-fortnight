Monday Stand-up:

# Setup APIS

API access points for when user submits the quiz after registration => set information based on experience level submitted

if user clicks on beginner course, send that to API and populate currentCourses based on this

when you select beginner course, start day 1.

When user completes a session, a new API post method is submitted with the new information and when they click the X, the page refreshes with a new API call.

## Proposal to refine the Course and Meditation Schema

```javascript
const meditationSchema = new mongoose.Schema(
  {
    sessionDetail: {
      level: String,
      quote: String,
      currentTime: Date
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
  { timestamps: true },
  { collection: "meditation" }
);
```

```javascript
const courseSchema = new mongoose.Schema(
  {
    courseDetail: {
      difficulty: String,
      level: Number,
      duration: Date,
      music: String
    },
    meditationId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meditation"
      }
    ]
  },
  { timestamps: true },
  { collection: "course" }
);
```

Tuesday Stand-up: 

- Mark: Basic react styling with CSS stuff 
  - navbar sticky to top
  - footer always on the bottom
  - do rough templates for discover and profile page
- Carl: continue with play meditation component
- Stanley: Auth / register


Badges: 
- Need to populate badges data into user on user creation w/ all "unlocked" turned off. 
- need to add fields to model: description "string"


DATA FLOW: 
Step 1: New user signs up (currently a post request on postman) => badge data auto seeded
Step 2: User completes quiz (currently a post request on postman, just need user Id and difficulty (auto set to beginner)) => populates a course (i.e. beginner) with meditation sessions (i.e. 3 for beginner, w/ duration) => unlocks journey starter badge


If API calls stop working:
authReducer.js => change isAuth to false and re-login. currently token works for 24hrs