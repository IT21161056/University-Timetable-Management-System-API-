import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { BASE_URL } from "../constants/constants.js";
import Faculty from "../models/faculty.model.js";

const server = use(chaiHttp);

use(chaiHttp);

describe("POST /addFaculty", () => {
  it("should add a new faculty", async () => {
    const facultyData = { facultyName: "Test Faculty" };

    // Make a POST request to the endpoint with a sample faculty name
    const response = await server
      .request(BASE_URL)
      .post("/faculty")
      .send(facultyData);

    // Check status code
    expect(response).to.have.status(200);

    // Check response body
    expect(response.body)
      .to.have.property("facultyName")
      .to.equal(facultyData.facultyName);

    //remove added faculty
    await server.request(BASE_URL).delete(`/faculty/${response.body._id}`);
  });

  it("should handle errors gracefully", async () => {
    // Make a POST request without sending facultyName
    const response = await server.request(BASE_URL).post("/faculty").send({});

    // Check status code
    expect(response.status).to.equal(500);

    // Check response body
    expect(response.body).to.have.property("message").to.be.a("string");
    expect(response.body)
      .to.have.property("message")
      .to.equal("Faculty name is required!");
  });
});

describe("DELETE /removeFaculty/:id", () => {
  it("should remove a faculty by ID", async () => {
    // Create a sample faculty in the database
    const facultyResponse = await server
      .request(BASE_URL)
      .post("/faculty")
      .send({ facultyName: "Test Faculty" });

    // Make a DELETE request to the endpoint with the ID of the created faculty
    const response = await server
      .request(BASE_URL)
      .delete(`/faculty/${facultyResponse.body._id}`);

    // Check status code
    expect(response).to.have.status(200);

    // Check response body
    expect(response.body).to.have.property("message").to.be.a("string");
    expect(response.body)
      .to.have.property("message")
      .to.equal("Faculty removed!");

    // // Check if faculty was deleted from the database
    // const deletedFaculty = await Faculty.findById(facultyResponse.body._id);
    // expect(deletedFaculty).to.not.exist;
  });

  it("should handle non-existent faculty", async () => {
    // Make a DELETE request with a valid but non-existent faculty ID
    const response = await server
      .request(BASE_URL)
      .delete("/faculty/123456789012345678901234");

    // Check status code
    expect(response.status).to.equal(500);

    // Check response body
    expect(response.body).to.be.an("object");
    expect(response.body.message).to.equal("Faculty delete error!");
  });
});

describe("GET /getAllFaculties", () => {
  it("should return all faculties", async () => {
    // Create sample faculties in the database

    // Make a GET request to the endpoint
    const response = await server.request(BASE_URL).get("/faculty");

    // Check status code
    expect(response.status).to.equal(200);

    // Check response body
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.lengthOf.at.least(2); // Assuming there are at least 2 faculties in the database
    // Check if faculties were returned correctly
    const facultyNames = response.body.map((faculty) => faculty.facultyName);
    expect(facultyNames).to.include("Computing");
  });
});
