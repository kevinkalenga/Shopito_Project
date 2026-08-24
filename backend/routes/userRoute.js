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
    saveCart, getCart, addToWishlist, getWishlist, removeFromWishlist} = require("../controllers/userController");
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

// Cart
router.get("/getCart", protect, getCart);
router.patch("/saveCart", protect, saveCart);

// wishlist
router.get("/addToWishlist", protect, addToWishlist);
router.get("/getWishlist", protect, getWishlist);
router.put("/wishlist/:productId", protect, removeFromWishlist);

// Admin
router.get("/", protect, adminOnly, getUsers);
router.patch("/:id", protect, adminOnly, updateUserByAdmin);
router.delete("/:id", protect, adminOnly, deleteUser);



module.exports = router;