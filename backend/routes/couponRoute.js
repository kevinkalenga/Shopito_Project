const express = require("express");
const router = express.Router();


const {createCoupon, getCoupons} = require("../controllers/couponController");
const {protect, adminOnly} = require("../middleware/authMiddleware")


router.post("/createCoupon", protect, adminOnly, createCoupon);
router.get("/getCoupons", protect, adminOnly, getCoupons);




module.exports = router;