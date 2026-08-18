const express = require("express");
const router = express.Router();

const {protect, adminOnly} = require("../middleware/authMiddleware");

const {transferFund, verifyAccount} = require("../controllers/transactionController") 


router.post("/transferFund", protect, transferFund);
router.post("/verifyAccount", protect, verifyAccount);



module.exports = router;