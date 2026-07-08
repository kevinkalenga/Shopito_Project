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

// Get Orders
const getOrders = asyncHandler(async (req, res) => { 
    let orders;
    if(req.user.role === "admin") {
      // All Orders
      orders = await Order.find().sort("-createdAt");
      return res.status(200).json(orders);
    }
    // user specific orders  
     orders = await Order.find({user:req.user._id}).sort("-createdAt");

      return res.status(200).json(orders);
}); 


module.exports = {
  createOrder,
  getOrders,
}