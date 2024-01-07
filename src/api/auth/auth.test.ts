import request from "supertest";
import app from "../../app";
import knex from "knex";
const config = require("../../../knexfile");
const db = knex(config.development);

describe("Create a new User", () => {
  test("It Should Create a new User", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "yefo@gmail.com",
      password: "Zigah",
      role: "admin",
    });
    console.log(res);
    expect(res.statusCode).toBe(201);
  });
});

/*

describe("Login Create a new User", () => {
  test("It Should Create a login User", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "efo@gmail.com",
      password: "Zigah",
    });
    expect(res.statusCode).toBe(201);
  });
});


describe("Logout authenticated User", () => {
  test("It Should Create a login User", async () => {
    const res = await request(app).get("/auth/logout");
    expect(res.statusCode).toBe(200);
  });
});

*/
