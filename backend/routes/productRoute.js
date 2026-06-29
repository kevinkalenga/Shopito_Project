const express = require("express");
const router = express.Router();

const {createProduct, getProducts, getProduct, deleteProduct, updateProduct, reviewProduct, reviewDelete, reviewUpdate} = require("../controllers/productController");
const {protect, adminOnly} = require("../middleware/authMiddleware")

router.post("/create", protect, adminOnly ,createProduct);
router.get("/" ,getProducts);
router.get("/:id" ,getProduct);
router.delete("/:id", protect, adminOnly ,deleteProduct);
router.patch("/:id", protect, adminOnly, updateProduct);


router.patch("/review/:id", protect, reviewProduct);
router.delete("/deleteReview/:id", protect, reviewDelete);
router.patch("/updateReview/:id", protect, reviewUpdate);


module.exports = router;