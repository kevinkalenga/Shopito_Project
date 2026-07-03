const express = require("express");
const router = express.Router();


const {createCoupon, getCoupons, getCoupon, updateCoupon, deleteCoupon} = require("../controllers/couponController");
const {protect, adminOnly} = require("../middleware/authMiddleware")


router.post("/createCoupon", protect, adminOnly, createCoupon);
router.get("/getCoupons", protect, adminOnly, getCoupons);
router.get("/:couponName", protect, getCoupon);
router.put("/:id", updateCoupon);
router.delete("/:id", deleteCoupon);




module.exports = router;