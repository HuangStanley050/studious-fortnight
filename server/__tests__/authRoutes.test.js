const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const mongoose = require("mongoose");
const request = supertest(app);

test("Local login should fail with incorrect password", async done => {
  const res = await request.post("/api/auth/local/login").send({
    email: "test@test.com",
    password: "password2222"
  });
  //console.log(res);
  expect(res.text).toBe("Unable to login");
  expect(res.statusCode).toBe(400);
  //mongoose.connection.close();
  done();
});
