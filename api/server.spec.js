const test = require("supertest");

const server = require("../server.js");
const db = require("../data/dbconfig.js");

//test server for posting registration for success and fail
describe("GET /", function () {
  beforeEach(async () => {
    await db(server).truncate();
  });
  describe("POST /register", function () {
    it("should return status 201", function () {
      return test(server)
        .post("/register")
        .send({
          username: "sam",
          password: "apples",
          email: "email@email.com",
          role: "admin"
        })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
    it("should return a success message", function () {
      return test(server)
        .post("/register")
        .send({
          username: "jondoe",
        })
        .then((res) => {
          expect(res.status).toBe(500);
        });
    });
  });

  //test for post login in request  for success or failure
  describe("POST /login", function () {
    it("should return a fail message", function () {
      return test(server)
        .post("/login")
        .send({
          username: "jondoe",
          password: "winemaker",
        })
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
    it("should return authentication error", function () {
      return test(server)
        .post("/login")
        .send({
          username: "jondoe",
          password: "winemaker",
        })
        .then((res) => {
          expect(res.body.message).toBe(
            "Invalid username or password - no life hacks for you"
          );
        });
    });
  });

  //test for get request to pull life hacks
  describe("GET /getall", function () {
    describe("should return invalid credentials message", function () {
      return test(server)
        .get("/getall")
        .then((res) => {
          expect(res.body.message).toBe("invalid credentials");
        });
    });
    describe("should return status 400", function () {
      return test(server)
        .get("/getall")
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });
  });
});
