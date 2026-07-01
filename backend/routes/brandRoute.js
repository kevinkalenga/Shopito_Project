const express = require("express");
const router = express.Router();

const {createBrand, getBrands, deleteBrand, updateBrand} = require("../controllers/brandController");
const {protect, adminOnly} = require("../middleware/authMiddleware")


router.post("/createBrand", protect, adminOnly, createBrand);
router.get("/getBrands", protect, adminOnly, getBrands);
router.delete("/:slug", protect, adminOnly, deleteBrand);
router.put("/:slug", protect, adminOnly, updateBrand);



module.exports = router;