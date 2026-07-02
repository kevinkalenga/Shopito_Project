const express = require("express");
const router = express.Router();


const {createCoupon} = require("../controllers/couponController");
const {protect, adminOnly} = require("../middleware/authMiddleware")


router.post("/createCoupon", protect, adminOnly, createCoupon);




module.exports = router;