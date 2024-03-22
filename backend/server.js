import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import cors from "cors";
import * as http from "http";
import express from "express";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { logger } from "./middleware/logger.js";
import corsOptions from "./config/corsOptions.js";
import errorHandler from "./middleware/errorHandler.js";

//routes
import rootRoute from "./routes/root.js";
import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import courseRoute from "./routes/course.route.js";
import facultyRoutes from "./routes/faculty.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import roomBookingRoutes from "./routes/roomBooking.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import newTimetableRoutes from "./routes/newTimetable.routes.js";
import sessionRoomBooking from "./routes/sessionRoomBooking.routes.js";
import sessionRoutes from "./routes/session.routes.js";

const app = express();
const PORT = process.env.PORT || 3010;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//connect to the mongoDB
connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(join(__dirname, "public")));

app.use("/", rootRoute);

console.log(new Date());

app.use("/api/user", authRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/course", courseRoute);
app.use("/api/faculty", facultyRoutes);
app.use("/api/enroll", enrollmentRoutes);
app.use("/api/sessionRoom", sessionRoomBooking);
app.use("/api/room-booking", roomBookingRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/newTimetable", newTimetableRoutes);
app.use("/api/session", sessionRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Fund");
  }
});

app.use(errorHandler);

const server = http.createServer(app);

export const io = new Server(server);

io.on("connect", () => {
  // io.emit("Hi I GOT YOUR DATA");
  console.log("CONNECTED");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan);
});
