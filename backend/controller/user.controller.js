const User = require("../models/user.model");
// const LeavePolicy = require("../models/leavePolicy");
const bcrypt = require("bcrypt");
const session = require("express-session");

//@desc Get all users
//@route GET /users
//@access Private
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();

    if (!users) {
      return res.status(400).json({ message: "No users found" });
    }

    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//@desc Create new users
//@route POST /users
//@access Private
const createNewUser = async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;
    //confirm data
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //leave policy
    const leavePolicy = await LeavePolicy.find();
    console.log(leavePolicy[0]);
    const maxLeaveCount = leavePolicy[0].maxLeaveCount;

    //checks for duplicate
    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: "Duplicate username" });
    }

    //Hash password
    const hashedPwd = await bcrypt.hash(password, 10); //salt rounds

    const userObject = {
      username,
      password: hashedPwd,
      isAdmin,
      annualLeaveCount: maxLeaveCount,
    };

    //create and store new user
    const user = await User.create(userObject);

    if (user) {
      //created
      res
        .status(201)
        .json({ message: `New user ${username} created`, user: user });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

//@desc login users
//@route POST /users
//@access Private
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (req.session.authenticated) {
      // return res.json({ message: "Already logged in!", session: session });
      req.session.destroy();
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).send("wrong password");
    }
    console.log(req.sessionID);
    req.session.authenticated = true;
    if (user.isAdmin) {
      req.session.isAdmin = true;
    }
    req.session.username = user.username;
    req.session.userID = user._id;
    res.json(req.session);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const viewDetails = async (req, res) => {
  try {
    const userID = req.session.userID;
    if (!userID) {
      return res.json({ message: "UserID undefined" });
    }

    const user = await User.findById(userID).select("-password");

    if (!user) {
      return res.json({ message: "User not found" });
    }

    res.json({
      usename: user.username,
      remainingLeaveCount: user.annualLeaveCount,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//@desc Update a user
//@route PATCH /users
//@access Private
const updateUser = async (req, res) => {
  try {
    const { username, isAdmin, password } = req.body;

    let itemID = req.params.id;
    console.log(itemID);

    //confirm data
    if (!itemID || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(itemID).exec();

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.username = username;
    user.isAdmin = isAdmin;
    user.active = active;

    if (password) {
      // Hash passwrod
      user.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await user
      .save()
      .then(() => {
        res.json({ message: `${updatedUser.username} updated` });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//@desc Delete a user
//@route DELETE /users
//@access Private
const deleteUser = async (req, res) => {
  try {
    let userID = req.params.id;
    await User.findByIdAndDelete(userID)
      .then(() => {
        res.status(200).json({ message: "user deleted" });
      })
      .catch((error) => {
        res.json({ message: "Error with delete item", error: error.message });
      });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//@desc Patch all users
//@route Patch /users
//@access Private
const resetLeaveCount = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
      return res.status(400).json({ message: "No users found" });
    }

    //leave policy
    const leavePolicy = await LeavePolicy.find();

    if (!leavePolicy) {
      return res.status(400).json({ message: "No leave policy found" });
    }

    const maxLeaveCount = leavePolicy[0].maxLeaveCount;

    const updateDoc = {
      $set: {
        annualLeaveCount: maxLeaveCount,
      },
    };

    const result = await User.updateMany({}, updateDoc);

    res.json("Leave count reseted");
  } catch (error) {
    res.json({ message: error.message });
  }
};
module.exports = {
  getAllUsers,
  loginUser,
  createNewUser,
  updateUser,
  deleteUser,
  resetLeaveCount,
  viewDetails,
};
