const express = require("express");
const router = express.Router();

const { registerUser, loginUser, logout, getUser, getLoginStatus, updateUser, updatePhoto, forgotPassword, resetPassword} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware")


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/getLoginStatus", getLoginStatus);
router.patch("/updateUser", protect, updateUser);
router.patch("/updatePhoto", protect, updatePhoto);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;