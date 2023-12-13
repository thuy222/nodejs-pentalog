const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getAllUser,
  getUserInfo,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
} = require("../controller/userController");
const {
  authMiddleware,
  isAdminMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUserCtrl);

router.get("/get-users", getAllUser);

router.get("/user-info/:id", authMiddleware, isAdminMiddleware, getUserInfo);

router.delete("/user-info/:id", deleteUser);

router.put("/user-info/:id", authMiddleware, updateUser);

router.put("/block-user/:id", authMiddleware, isAdminMiddleware, blockUser);

router.put("/unblock-user/:id", authMiddleware, isAdminMiddleware, unBlockUser);

module.exports = router;
