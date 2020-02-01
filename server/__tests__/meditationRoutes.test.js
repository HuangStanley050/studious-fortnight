const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const User = require("../models/User");
const Course = require("../models/Courses");
const Meditation = require("../models/Meditation");
const makeEmail = require("../utils/makeEmail");
const request = supertest(app);

const password = "Password@1";
const email = "doNotDelete@test.com";
const startingChoice = "beginner";
let token;
let userId;
let userEmail;
let currentTime;

beforeAll(async done => {
  jest.setTimeout(30000);
  currentTime = 180;
  await request.post("/api/auth/local/register").send({
    email,
    password
  });
  const res = await request.post("/api/auth/local/login").send({
    email,
    password
  });
  const response = JSON.parse(res.text);
  token = response.token;
  userEmail = response.userInfo.email;
  userId = response.userInfo.id;
  //console.log(response);
  //console.log("token from beforeEach: ", token);
  done();
});

afterAll(async done => {
  await Course.deleteMany({ userId });
  await Meditation.deleteMany({ userId });
  await User.findOneAndDelete({ email });
  done();
});

test("Route '/api/meditation_user' should return the current meditation base on user id", async done => {
  const currentMeditation = await request
    .post("/api/course/start")
    .send({ startingChoice })
    .set("Authorization", "bearer " + token);

  expect(currentMeditation.statusCode).toBe(200);
  done();
});

test("Route '/api/course/meditation_update' should update current meditation", async done => {
  const user = await User.findOne({ email: userEmail }).populate(
    "meditationId"
  );
  //test only beginner time
  const meditations = user.meditationId; //all meditations in current user course
  const currentMeditation = user.currentMeditation;
  const positionCurrentMeditation = meditations.findIndex(meditation => {
    return meditation._id.equals(currentMeditation);
  });

  if (positionCurrentMeditation === meditations.length - 1) {
    // current meditation is at the end of meditation, no need to update
    expect(
      meditations[positionCurrentMeditation].toEqual(
        meditations[meditations.length - 1]
      )
    );
  } else {
    await request
      .post("/api/course/meditation_update")
      .send({ currentTime })
      .set("Authorization", "bearer " + token);

    const updatedCurrentMeditation = await User.findOne(
      { email: userEmail },
      "currentMeditation"
    );

    const positionUpdatedMeditation = meditations.findIndex(meditation => {
      return meditation._id.equals(updatedCurrentMeditation.currentMeditation);
    });

    expect(
      meditations[positionUpdatedMeditation]._id.equals(
        updatedCurrentMeditation.currentMeditation
      )
    ).toBe(true);
  }

  done();
});
