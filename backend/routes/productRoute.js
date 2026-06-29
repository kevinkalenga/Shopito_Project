const express = require("express");
const router = express.Router();

const {createProduct, getProducts} = require("../controllers/productController");
const {protect, adminOnly} = require("../middleware/authMiddleware")

router.post("/create", protect, adminOnly ,createProduct);
router.get("/" ,getProducts);


module.exports = router;