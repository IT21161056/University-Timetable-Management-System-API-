import Notification from "../models/notification.model.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";

const getAllNotifications = tryCatch(async (req, res) => {
  const notifications = await Notification.find();

  if (!notifications)
    return res.status(200).json({ message: "there are no notifications" });

  res.status(200).json(notifications);
});

export { getAllNotifications };
