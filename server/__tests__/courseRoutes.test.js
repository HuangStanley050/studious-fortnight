const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const User = require("../models/User");
const Course = require("../models/Courses");
const Meditation = require("../models/Meditation");
const request = supertest(app);

const password = "Password@1";
const email = "doNotDelete2@test.com";
const startingChoice = "beginner";
let token;
let userId;
let userEmail;

beforeAll(async done => {
  jest.setTimeout(30000);
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
  await request
    .post("/api/course/start")
    .send({ startingChoice })
    .set("Authorization", "bearer " + token);
  done();
});

afterAll(async done => {
  await Course.deleteMany({ userId });
  await Meditation.deleteMany({ userId });
  await User.findOneAndDelete({ email });
  done();
});

test("Route /api/course should return all user's course", async done => {
  const result = await request
    .get("/api/course")
    .set("Authorization", "bearer " + token);
  expect(result.statusCode).toBe(200);
  //console.log(result);
  done();
});
test("Route /api/meditations should return all user's meditations", async done => {
  const result = await request
    .get("/api/meditation")
    .set("Authorization", "bearer " + token);
  expect(result.statusCode).toBe(200);
  done();
});
test("Route /api/get-user should return all user information", async done => {
  const result = await request
    .get("/api/account/get-user")
    .set("Authorization", "bearer " + token);
  expect(result.statusCode).toBe(200);
  done();
});
test("Route /api/account/deactivate-account should set user field activeUser to false", async done => {
  await request
    .post("/api/account/deactivate-account")
    .set("Authorization", "bearer " + token);

  const user = await User.findOne({ email });
  expect(user.activeUser).toBe(false);
  done();
});
