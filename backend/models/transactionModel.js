const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({

   
    amount: {
        type: Number,
        required: true
    },
    sender: {
        type: String,
        required: true

    },
    receiver: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true

    },
    status: {
        type: String,
        required: true,
        default: "pending",

    },

    stripeSessionId: {
        type: String,
        unique: true,
        sparse: true
    },
    flutterwaveTransactionId: {
        type: String,
        unique: true,
        sparse: true
    },



}, {
    timestamps: true
})

const Transaction = mongoose.model("Transactions", transactionSchema);

module.exports = Transaction;