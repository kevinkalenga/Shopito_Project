const express = require("express");
const router = express.Router();


const {createCoupon, getCoupons, getCoupon, updateCoupon, deleteCoupon} = require("../controllers/couponController");
const {protect, adminOnly} = require("../middleware/authMiddleware")


router.post("/createCoupon", protect, adminOnly, createCoupon);
router.get("/getCoupons", protect, adminOnly, getCoupons);
router.get("/getCoupon/:couponName", protect, getCoupon);
router.put("/:id", protect, adminOnly, updateCoupon);
router.delete("/:id", protect, adminOnly, deleteCoupon);




module.exports = router;