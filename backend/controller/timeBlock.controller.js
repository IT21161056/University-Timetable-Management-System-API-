const TimeBlock = require("../models/timeBlock.model");

const createTimeBlock = async (req, res) => {
  try {
    const {
      startDateTime,
      endDateTime,
      course,
      location,
      available,
      duration,
    } = req.body;

    if (
      !startDateTime ||
      !endDateTime ||
      !course ||
      !location ||
      !available ||
      !duration
    )
      throw new Error("All fields are required!");

    const timeBlock = new TimeBlock({
      startDateTime,
      endDateTime,
      course,
      location,
      available,
      duration,
    });

    const newTimeBlock = await timeBlock.save();

    if (!newTimeBlock) throw new Error("TimeBlock create failed!");

    res.status(201).json(newTimeBlock);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllTimeBlocks = async (req, res) => {
  const timeBlocks = await TimeBlock.find();

  req.status(200).json(timeBlocks);
};

module.exports = {
  createTimeBlock,
  getAllTimeBlocks,
};
