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
