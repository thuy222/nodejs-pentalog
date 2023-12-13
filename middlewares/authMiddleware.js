const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        req.user = user;
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
  } else {
    throw new Error("There is no token attached to headers");
  }
});

const isAdminMiddleware = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdminMiddleware };
