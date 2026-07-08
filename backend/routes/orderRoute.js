const express = require("express");
const router = express.Router();

const {createOrder, getOrders, getOrder} = require("../controllers/orderController");
const {protect} = require("../middleware/authMiddleware")


router.post("/createOrder", protect, createOrder);
router.get("/getOrders", protect, getOrders);
router.get("/:id", protect, getOrder);


module.exports = router;
