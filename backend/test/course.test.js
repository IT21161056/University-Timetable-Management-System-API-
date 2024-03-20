import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { BASE_URL } from "../constants/constants.js";

const server = use(chaiHttp);

use(chaiHttp);

describe("createCourse function", () => {
  it("should create a new course with valid data", async () => {
    const newCourseData = {
      courseId: "CSE102",
      courseName: "Introduction to Computer Science",
      faculty: "65f2aa9803cc9521fd9ff4d2",
      description:
        "A beginner-level course covering fundamentals of computer science.",
    };

    const res = await server
      .request(BASE_URL)
      .post("/course")
      .send(newCourseData);

    expect(res).to.have.status(200);
    expect(res.body)
      .to.have.property("courseId")
      .to.equal(newCourseData.courseId);
    expect(res.body)
      .to.have.property("courseName")
      .to.equal(newCourseData.courseName);
    expect(res.body)
      .to.have.property("faculty")
      .to.equal(newCourseData.faculty);
    expect(res.body)
      .to.have.property("description")
      .to.equal(newCourseData.description);
  });

  // Add more test cases for error scenarios if needed
});

describe("Retrieve all the courses.", () => {
  it("should return an array of courses", async () => {
    // Make a GET request to the endpoint
    const response = await server.request(BASE_URL).get("/course");

    // Check status code
    expect(response.status).to.equal(200);

    // Check response body
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.lengthOf.at.least(1); // Assuming courses exist in the database
    // You might want to add more detailed checks based on your specific application logic
  });
});
