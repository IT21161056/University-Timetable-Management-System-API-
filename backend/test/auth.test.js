import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { BASE_URL } from "../constants/constants.js";

const server = use(chaiHttp);

use(chaiHttp);

// Assuming authUser is defined somewhere and accessible in the test file

describe("authUser function", () => {
  it("should authenticate user with valid credentials", async () => {
    const userData = {
      email: "testAdmin@gmail.com",
      password: "testPassword",
    };

    const res = await server
      .request(BASE_URL)
      .post("/user/auth")
      .send(userData);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("name");
    expect(res.body).to.have.property("email");
    expect(res.body).to.have.property("role");
  });

  it("should return 401 for invalid credentials", async () => {
    const invalidUserData = {
      email: "invalid@example.com",
      password: "invalidPassword",
    };
    const res = await server
      .request(BASE_URL)
      .post("/user/auth") // Assuming the endpoint is /auth
      .send(invalidUserData);

    expect(res).to.have.status(401);
    expect(res.body)
      .to.have.property("message")
      .to.equal("Invalid email or password");
  });
});

describe("registerUser function", () => {
  it("should register a new user", async () => {
    const newUser = {
      name: "Anoj Peiris",
      email: "anoj@gmail.com",
      mobile: "1234567890",
      password: "anoj123",
    };

    //Attempt to register new user
    const res = await server
      .request(BASE_URL)
      .post("/user/register")
      .send(newUser);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("name").to.equal(newUser.name);
    expect(res.body).to.have.property("email").to.equal(newUser.email);
    expect(res.body).to.have.property("role").to.equal("student");

    await server.request(BASE_URL).delete(`/user/${res.body._id}`).send();
  });

  it("should return 400 for existing user", async () => {
    const userDate = {
      name: "Anoj Peiris",
      email: "anoj@gmail.com",
      mobile: "1234567890",
      password: "anoj123",
    };

    //Attempt to register new user
    const newUser = await server
      .request(BASE_URL)
      .post("/user/register")
      .send(userDate);

    // Attempt to register the same user again
    const res = await server
      .request(BASE_URL)
      .post("/user/register") // Assuming the endpoint is /register
      .send(userDate);

    expect(res).to.have.status(400);
    expect(res.body)
      .to.have.property("message")
      .to.equal("User already exists");

    await server.request(BASE_URL).delete(`/user/${newUser.body._id}`).send();
  });
});

// Testing for user logout
describe("logoutUser function", () => {
  it("should clear JWT cookie and return 200 with a message", async () => {
    const res = await server.request(BASE_URL).post("/user/logout");

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("message").to.equal("User logged out");
  });
});

describe("Delete user ", () => {
  it("should return 200", async () => {
    //create a user
    const user = {
      name: "test user",
      email: "testuser@gmail.com",
      mobile: "0711234567",
      password: "test@123",
    };

    const res = await server
      .request(BASE_URL)
      .post(`/user/register`)
      .send(user);

    //delete user
    const deletedUserRes = await server
      .request(BASE_URL)
      .delete(`/user/${res.body._id}`)
      .send();

    expect(deletedUserRes).to.have.status(200);
    expect(deletedUserRes.body)
      .to.have.property("message")
      .to.equal("User deleted");
  });
});
