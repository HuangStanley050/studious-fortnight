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
  done();

  afterAll(async () => {
    // drop connection to the collection
    const connection = mongoose.connection;

    await connection.disconnect();
    console.log(connection);
  });
});
