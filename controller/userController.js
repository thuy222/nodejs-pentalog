const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

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

module.exports = createUser;
