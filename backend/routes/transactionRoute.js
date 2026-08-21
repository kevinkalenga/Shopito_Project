const express = require("express");
const router = express.Router();

const {protect, adminOnly} = require("../middleware/authMiddleware");

const {transferFund, verifyAccount, getUserTransactions, depositFundStripe, depositFundFlutterwave} = require("../controllers/transactionController") 

const {
  flutterwaveWalletResponse
} = require("../controllers/flutterwaveController");


router.post("/transferFund", protect, transferFund);
router.post("/verifyAccount", protect, verifyAccount);
router.get("/getUserTransactions", protect, getUserTransactions);
router.post("/depositFundStripe", protect, depositFundStripe);
router.post(
  "/depositFundFlutterwave",
  protect,
  depositFundFlutterwave
);

router.get(
  "/flutterwave-wallet-response",
  flutterwaveWalletResponse
);



module.exports = router;