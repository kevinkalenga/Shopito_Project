const express = require("express");
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    logout,
    getUser, 
    getLoginStatus, 
    updateUser,
    updatePhoto, 
    forgotPassword, 
    resetPassword, 
    getUsers,
    updateUserByAdmin, 
    deleteUser, 
    saveCart, getCart} = require("../controllers/userController");
const {protect, adminOnly} = require("../middleware/authMiddleware")


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/getLoginStatus", getLoginStatus);
router.patch("/updateUser", protect, updateUser);
router.patch("/updatePhoto", protect, updatePhoto);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/", protect, adminOnly, getUsers);
router.patch("/:id", protect, adminOnly, updateUserByAdmin);
router.delete("/:id", protect, adminOnly, deleteUser);

// Cart
router.patch("/getCart", protect, getCart);
router.patch("/saveCart", protect, saveCart);

module.exports = router;