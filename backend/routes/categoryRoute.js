const express = require("express");
const router = express.Router();

const {createCategory, getCategories, deleteCategory, updateCategory} = require("../controllers/categoryController");
const {protect, adminOnly} = require("../middleware/authMiddleware")


router.post("/createCategory", protect, adminOnly, createCategory);
router.get("/getCategories", protect, adminOnly, getCategories);
router.delete("/:slug", protect, adminOnly, deleteCategory);
router.put("/:id", protect, adminOnly, updateCategory);



module.exports = router;