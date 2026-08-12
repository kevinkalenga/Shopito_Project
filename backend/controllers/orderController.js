const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { calculateTotalPrice } = require("../utils");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY) 
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const { orderSuccessEmail } = require("../emailTemplate/orderTemplate");

const createOrder = asyncHandler(async (req, res) => { 
  // coming from the frontend
    const {orderDate, orderTime, orderAmount, orderStatus, cartItems, shippingAddress, paymentMethod, coupon} = req.body
  
    // Validation 
   if(!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
       res.status(404);
       throw new Error("Order data missing");
   }

   
    // Récupérer l'utilisateur
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
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
  
   
  const emailTemplate = orderSuccessEmail(user.name, cartItems)
  
  
  //  Send Order Email to the user
  await sendEmail(
    user.email,
    "Order Confirmation - Shopito",
    `Hello ${user.name}, your order has been successfully created.`,
    emailTemplate,
    process.env.EMAIL_USER
  );
    
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
      if(order.user.toString() !== req.user._id.toString()) {
        res.status(404);
        throw new Error("User not authorized to view the order");
      }

      res.status(200).json(order);
}); 

// Update Order Status 
const updateOrderStatus = asyncHandler(async (req, res) => { 
  

     const {orderStatus} = req.body;
     const {id} = req.params 

     const order = await Order.findById(id);

      if(!order) {
        res.status(404);
        throw new Error("Order not found");
      }

      // Update the order status 
      await Order.findByIdAndUpdate(
        {_id: id},
        {
          orderStatus
        },
        {
          new: true,
          runValidators: true
        }
      )

      res.status(200).json({message: "Order status updated"});
}); 

// Pay With Stripe 

const payWithStripe = asyncHandler(async (req, res) => {
     const {items, shipping, description, coupon} = req.body;

     const products = await Product.find()

     let orderAmount;
     orderAmount = calculateTotalPrice(products, items)
     if(coupon !== null && coupon?.name !== "nil") {
      let totalAfterDicount = orderAmount - (orderAmount * coupon.discount) / 100 
      orderAmount = totalAfterDicount;
     }

     const paymentIntent = await stripe.paymentIntents.create({
      amount: orderAmount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      description,
      shipping: {
        address: {
          line1: shipping.line1,
          line2: shipping.line2,
          city: shipping.city,
          country: shipping.country,
          postal_code: shipping.postal_code,
          
        },
        name: shipping.name,
        phone: shipping.phone
      }
     });

     res.send({
       clientSecret: paymentIntent.client_secret,
     })

})



module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  payWithStripe
}