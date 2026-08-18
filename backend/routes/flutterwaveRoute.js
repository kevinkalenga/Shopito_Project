const express = require("express");
const router = express.Router();

const {flutterwaveWebhook} = require("../controllers/flutterwaveController");



router.post("/webhook",  flutterwaveWebhook);


module.exports = router;