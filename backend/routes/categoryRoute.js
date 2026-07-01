const express = require("express");
const router = express.Router();

const {createCategory} = require("../controllers/categoryController");
const {protect, adminOnly} = require("../middleware/authMiddleware")


router.post("/createCategory", protect, adminOnly, createCategory);



module.exports = router;