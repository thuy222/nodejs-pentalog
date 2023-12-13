const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongoDbId");

//create new user
const createUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    //create new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    //user already exist
    throw new Error("User already exist");
  }
});

//handle login
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser && findUser.isPasswordMatched(password)) {
    res.json({
      id: findUser._id,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      email: findUser.email,
      mobile: findUser.mobile,
      token: generateToken(findUser.id),
      role: findUser.role,
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//get all users
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const findUsers = await User.find();
    res.json(findUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//get single user
const getUserInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    let user = await User.findById(id);

    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

//delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateMongoDbId(id);
  try {
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

//update user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        role: req.body.role,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//block user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const bockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//unblock user
const unBlockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const bockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User Unblocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getAllUser,
  getUserInfo,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
};
