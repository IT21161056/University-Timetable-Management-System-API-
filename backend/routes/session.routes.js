const express = require("express");
const router = express.Router();

const { createSession } = require("../controller/session.controller");

router.route("/").post(createSession);

module.exports = router;
