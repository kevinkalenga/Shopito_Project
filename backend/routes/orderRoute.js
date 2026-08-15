const express = require("express");
const router = express.Router();

const {createOrder, getOrders, getOrder, updateOrderStatus, payWithStripe,  payWithFlutterwave} = require("../controllers/orderController");
const {protect, adminOnly} = require("../middleware/authMiddleware")


router.post("/createOrder", protect, createOrder);
router.get("/getOrders", protect, getOrders);
router.get("/:id", protect, getOrder);
router.patch("/:id", protect, adminOnly, updateOrderStatus);

router.post("/create-payment-intent", payWithStripe);
router.post("/create-flutterwave-payment", payWithFlutterwave);


module.exports = router;
