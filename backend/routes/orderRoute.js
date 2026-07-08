const express = require("express");
const router = express.Router();

const {createOrder, getOrders} = require("../controllers/orderController");
const {protect} = require("../middleware/authMiddleware")


router.post("/createOrder", protect, createOrder);
router.get("/getOrders", protect, getOrders);


module.exports = router;
