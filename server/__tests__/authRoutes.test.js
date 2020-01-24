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
  //expect(res.text).toBe("Password is not correct");
  expect(res.statusCode).toBe(400);
  //mongoose.connection.close();
  done();
});

test("Local login should work with right password", async done => {
  const res = await request.post("/api/auth/local/login").send({
    email: "test@test.com",
    password: "password"
  });
  //console.log(res);
  //expect(res.text).toBe("Password is not correct");
  expect(res.statusCode).toBe(200);
  //mongoose.connection.close();
  done();
});

test("Local register should fail with invalid email", async done => {
  const res = await request.post("/api/auth/local/register").send({
    email: "asdfadsf@dddd",
    password: "asdfasdf"
  });
  expect(res.statusCode).toBe(400);
  done();
});

test("Local register should fail with invalid password", async done => {
  const res = await request.post("/api/auth/local/register").send({
    email: "asdfadsf@dddd.com",
    password: "asdfasdf"
  });
  expect(res.statusCode).toBe(400);
  done();
});

test("Local register should be okay with valid password", async done => {
  const res = await request.post("/api/auth/local/register").send({
    email: "asdfadsf@dddd.com",
    password: "asdfasdf1A@ddsaf"
  });
  expect(res.statusCode).toBe(200);
  done();
});
