const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const User = require("../models/User");
const makeEmail = require("../utils/makeEmail");
const request = supertest(app);
jest.setTimeout(30000);

test("Route '/api/meditation_user' should return the current meditation base on user id", async done => {
  const password = "Password@1";
  const email = "doNotDelete@test.com";
  await User.findOneAndDelete({ email });
  await request.post("/api/auth/local/register").send({
    email,
    password
  });
  const res = await request.post("/api/auth/local/login").send({
    email,
    password
  });
  const response = JSON.parse(res.text);
  const token = response.token;

  const startingChoice = "beginner";

  const currentMeditation = await request
    .post("/api/course/start")
    .send({ startingChoice })
    .set("Authorization", "bearer " + token);

  expect(currentMeditation.statusCode).toBe(200);
  done();
});

test("Route '/api/course/meditation_update' should update current meditation", () => {});
