const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const createOrder = asyncHandler(async (req, res) => { 
  // coming from the frontend
    const {orderDate, orderTime, orderAmount, orderStatus, cartItems, shippingAddress, paymentMethod, coupon} = req.body
  // Validation 
   if(!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
       res.status(404);
       throw new Error("Order data missing");
   }

  //  Create Order 
  await Order.create({
    user: req.user._id,
    orderDate, 
    orderTime, 
    orderAmount, 
    orderStatus, 
    cartItems, 
    shippingAddress, 
    paymentMethod, 
    coupon
  })
   res.status(200).json({message: "Order has been Created"});
}); 


module.exports = {
  createOrder
}