import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { BASE_URL } from "../constants/constants.js";

const server = use(chaiHttp);

use(chaiHttp);

describe("POST /enrollUser", async () => {
  it("should enroll a user in a course", async () => {
    const enrollmentData = {
      userID: "65faf058545c81a14aa148f0",
      courseID: "65faafb99a165dbd198d8036",
    };

    // Make a POST request to the endpoint with enrollment data
    const response = await server
      .request(BASE_URL)
      .post("/enrollment/enroll")
      .send(enrollmentData);

    // Check status code
    expect(response).to.have.status(201);

    // Check response body
    expect(response.body).to.be.an("object");
    expect(response.body.userID).to.equal(String(enrollmentData.userID)); // MongoDB returns ObjectId as string
    expect(response.body.courseID).to.equal(String(enrollmentData.courseID)); // MongoDB returns ObjectId as string

    await server.request(BASE_URL).post("/enrollment/unenroll").send({
      userID: response.body.userID,
      courseID: response.body.courseID,
    });
  });

  it("should handle missing userID or courseID", async () => {
    const enrollmentData = {
      userID: "65faf058545c81a14aa148f0",
      courseID: "65faafb99a165dbd198d8036",
    };
    // Make a POST request with missing userID
    let response = await server
      .request(BASE_URL)
      .post("/enrollment/enroll")
      .send({ courseID: enrollmentData.courseID });

    // Check status code
    expect(response).to.have.status(500);

    // Check response body
    expect(response.body).to.have.property("message").to.be.a("string");
    expect(response.body)
      .to.have.property("message")
      .to.equal("All fields are required!");

    // Make a POST request with missing courseID
    response = await server
      .request(BASE_URL)
      .post("/enrollment/enroll")
      .send({ userID: enrollmentData.userID });

    // Check status code
    expect(response).to.have.status(500);

    // Check response body
    expect(response.body).to.have.property("message").to.be.a("string");
    expect(response.body)
      .to.have.property("message")
      .to.equal("All fields are required!");

    await server.request(BASE_URL).post("/enrollment/unenroll").send({
      userID: response.body.userID,
      courseID: response.body.courseID,
    });
  });
});

describe("POST /unenrollUser", () => {
  it("should unenroll a user from a course", async () => {
    // Create a sample enrollment in the database
    const enrollmentData = {
      userID: "65faf058545c81a14aa148f0",
      courseID: "65faafb99a165dbd198d8036",
    };

    const enrollment = await server
      .request(BASE_URL)
      .post("/enrollment/enroll")
      .send(enrollmentData);

    // Make a POST request to the endpoint with unenrollment data
    const response = await server
      .request(BASE_URL)
      .post("/enrollment/unenroll")
      .send({
        userID: enrollment.body.userID,
        courseID: enrollment.body.courseID,
      });

    // Check status code
    expect(response).to.have.status(200);

    // Check response body
    expect(response.body).to.be.an("object");
    expect(response.body.message).to.equal("User unenrolled from the course");
  });
});
