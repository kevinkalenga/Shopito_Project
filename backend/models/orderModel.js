const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({

    user: {
       type:mongoose.Schema.Types.ObjectId,
       required: true,
       ref: "User",
    },
    orderDate: {
      type: String,
      required: [true, "Please add an order date"],
      trim: true,
    },
    orderTime: {
        type:String,
        required: [true, "Please add an order date"],
        trim: true
    },
    orderAmount: {
        type: Number,
        required: [true, "Please add an order amount"],
        trim: true
    },
    orderStatus: {
        type: String,
        required: [true, "Please add an order status"],
        trim: true
    },
    paymentMethod: {
        type: String,
        trim: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },

    tx_ref: {
        type: String,
        unique: true,
        sparse: true
    },

    transactionId: {
        type: String,
        default: undefined
    },
    cartItems: {
        // type: String,
        type: [Object],
        required: [true],
    },
    shippingAddress: {
        //type: String,
        type: Object,
        required: true,
    },
    coupon: {
        //type: String,
        type: Object,
        required: true,
        default: {
            name: "nil"
        }
    }

}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;