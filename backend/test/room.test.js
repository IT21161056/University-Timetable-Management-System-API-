import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { BASE_URL } from "../constants/constants.js";
import Room from "../models/room.model.js";

const server = use(chaiHttp);

use(chaiHttp);

describe("POST /createRoom", () => {
  it("should create a new room", async () => {
    const roomData = {
      roomName: "Test Room",
      building: "Test Building",
      floor: 1,
      capacity: 50,
    };

    // Make a POST request to the endpoint with room data
    const response = await server
      .request(BASE_URL)
      .post("/room")
      .send(roomData);

    // Check status code
    expect(response.status).to.equal(201);

    // Check response body
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("_id");
    expect(response.body.roomName).to.equal(roomData.roomName);
    expect(response.body.building).to.equal(roomData.building);
    expect(response.body.floor).to.equal(roomData.floor);
    expect(response.body.capacity).to.equal(roomData.capacity);

    //remove added room
    await server.request(BASE_URL).delete(`/room/${response.body._id}`);
  });

  it("should handle errors gracefully", async () => {
    // Make a POST request without sending any room data
    const response = await server.request(BASE_URL).post("/room").send({});

    // Check status code
    expect(response.status).to.equal(500);

    // Check response body
    expect(response.body).to.have.property("message").to.be.a("string");
    expect(response.body)
      .to.have.property("message")
      .to.equal("All fields are required!");
  });
});

describe("GET /getAllRooms", () => {
  it("should return all rooms when rooms exist", async () => {
    // Make a GET request to the endpoint
    const response = await server.request(BASE_URL).get("/enrollment");

    // Check status code
    expect(response.status).to.equal(200);

    // Check response body
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.lengthOf.at.least(2); // Assuming at least 2 rooms exist in the database
    // Add more assertions as needed to match your room details
  });
});

describe("GET /getRoomById", () => {
  it("should return a room when a valid ID is provided", async () => {
    // Create a sample room in the database
    const sampleRoom = {
      roomID: "65f2df3c14aabf8fad239dd7",
    };

    // Make a GET request to the endpoint with the ID of the created room
    const response = await server
      .request(BASE_URL)
      .get(`/room/${sampleRoom.roomID}`);

    console.log(response.body);

    // Check status code
    expect(response.status).to.equal(200);

    // Check response body
    expect(response.body).to.be.an("object");
    expect(response.body._id).to.equal(sampleRoom.roomID.toString()); // MongoDB returns ObjectId as string
  });

  it("should return an error when an invalid ID is provided", async () => {
    const invalidRoom = {
      roomID: "65f2df3c14aabf8fad239dda",
    };
    // Make a GET request to the endpoint with an invalid ID
    const response = await server
      .request(BASE_URL)
      .get(`/room/${invalidRoom.roomID}`);

    // Check status code
    expect(response.status).to.equal(404);

    // Check response body
    expect(response.body).to.be.an("object");
    expect(response.body)
      .to.have.property("message")
      .to.equal("Room not found");
  });
});
