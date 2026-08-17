const express = require("express");
const router = express.Router();

const {protect, adminOnly} = require("../middleware/authMiddleware");

const {transferFund} = require("../controllers/transactionController") 


router.post("/transferFund", protect, transferFund);



module.exports = router;