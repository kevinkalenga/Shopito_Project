const express = require("express");
const router = express.Router();

const {createProduct} = require("../controllers/productController");
const {protect, adminOnly} = require("../middleware/authMiddleware")

router.post("/", protect, adminOnly ,createProduct);


module.exports = router;