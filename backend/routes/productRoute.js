const express = require("express");
const router = express.Router();

const {createProduct, getProducts, getProduct} = require("../controllers/productController");
const {protect, adminOnly} = require("../middleware/authMiddleware")

router.post("/create", protect, adminOnly ,createProduct);
router.get("/" ,getProducts);
router.get("/:id" ,getProduct);


module.exports = router;