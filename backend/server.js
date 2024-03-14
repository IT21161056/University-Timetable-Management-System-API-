const express = require("express");
var colors = require("colors");
const app = express();
require("dotenv").config();
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { UnauthorizedError } = require("./exceptions/baseException");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3010;

connectDB();

const userRoutes = require("./routes/user.routes");
const courseRoutes = require("./routes/course.routes");

const username = "kevin";
const password = "123";

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);

app.post("/login", (request, response, next) => {
  try {
    if (
      request.body.username != username ||
      request.body.password != password
    ) {
      throw new UnauthorizedError();
    }
    response.json("Good Job Mofo");
  } catch (error) {
    next(error);
  }
});

app.all("*", (req, res) => {
  res.status(404);

  // if req has accepts header
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    //if its json request
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Fund");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on `.bgCyan + ` port >>> ${PORT}`.cyan);
});
