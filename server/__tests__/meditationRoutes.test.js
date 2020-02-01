const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const User = require("../models/User");
const makeEmail = require("../utils/makeEmail");
const request = supertest(app);

const password = "Password@1";
const email = "doNotDelete@test.com";
let token;
let userEmail;
let currentTime;

beforeAll(async done => {
  //jest.setTimeout(30000);
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
  //console.log(response);
  //console.log("token from beforeEach: ", token);
  done();
});

afterAll(async done => {
  await User.findOneAndDelete({ email });
  done();
});

test("Route '/api/meditation_user' should return the current meditation base on user id", async done => {
  const startingChoice = "beginner";

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

  await request
    .post("/api/course/meditation_update")
    .send({ currentTime })
    .set("Authorization", "bearer " + token);

  // const updatedCurrentMeditation = await User.findOne(
  //   { email: userEmail },
  //   "currentMeditation"
  // );

  // console.log("Meditation array: ", JSON.stringify(meditations, null, 3));
  // console.log("Updated meditation: ", updatedCurrentMeditation);
  // console.log("current meditation: ", currentMeditation);

  done();
}, 30000);
