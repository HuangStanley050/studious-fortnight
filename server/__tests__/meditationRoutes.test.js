const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const User = require("../models/User");
const makeEmail = require("../utils/makeEmail");
const request = supertest(app);

const password = "Password@1";
const email = "doNotDelete@test.com";
let token;
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
  console.log("token from beforeEach: ", token);
  done();
});

afterEach(async done => {
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
  //after update user current meditation should be the one after it in the array unless the previous meditation is already at the end of the array
  // [meditation1,meditation2,meditation3]
  // current meditation === meditation1
  // after update, current meditation should be meditation2 vice versa for meditation 2
  // if current meditation is meditation3
  // after update should not change, current meditation should still be meditation 3
  done();
});
