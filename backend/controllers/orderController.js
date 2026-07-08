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
// Get Single Order
const getOrder = asyncHandler(async (req, res) => { 
     const order = await Order.findById(req.params.id);
      if(!order) {
        res.status(404);
        throw new Error("Order not found");
      }

      if(req.user.role === "admin") {
        return res.status(200).json(order);
      } 

      // Match order to the user 
      if(order.user.toString() !== req.user._id) {
        res.status(404);
        throw new Error("User not authorized");
      }

      res.status(200).json(order);
}); 


module.exports = {
  createOrder,
  getOrders,
  getOrder
}