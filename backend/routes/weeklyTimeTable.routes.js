const express = require("express");
const router = express.Router();

const {
  createSession,
  getSessions,
  removeSession,
  updateSession,
  getSessionsInGivenPeriod,
} = require("../controller/weeklyTimeTable.controller");

router.route("/").post(createSession);
router.route("/").get(getSessions);
router.route("/").patch(updateSession);
router.route("/").delete(removeSession);
router.route("/check-availability").post(getSessionsInGivenPeriod);

module.exports = router;
