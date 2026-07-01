const express = require("express");
const router = express.Router();

const {createCategory, getCategories} = require("../controllers/categoryController");
const {protect, adminOnly} = require("../middleware/authMiddleware")


router.post("/createCategory", protect, adminOnly, createCategory);
router.get("/getCategories", protect, adminOnly, getCategories);



module.exports = router;