import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { BASE_URL } from "../constants/constants.js";

const server = use(chaiHttp);

use(chaiHttp);

describe("createCourse function", () => {
  console.log("afaaw");
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
