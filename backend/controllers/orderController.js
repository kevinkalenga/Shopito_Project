const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { calculateTotalPrice, updateProductQuantity,  calculateFlutterwaveTotalPrice, } = require("../utils");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY) 
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const { orderSuccessEmail } = require("../emailTemplate/orderTemplate");
const axios = require("axios");

// const createOrder = asyncHandler(async (req, res) => { 
//   // coming from the frontend
//     const {orderDate, orderTime, orderAmount, orderStatus, cartItems, shippingAddress, paymentMethod, coupon,   paymentStatus,
//     tx_ref,
//     transactionId} = req.body
  
//     // Validation 
//    if(!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
//        res.status(404);
//        throw new Error("Order data missing");
//    }

   
//     // Récupérer l'utilisateur
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       res.status(404);
//       throw new Error("User not found");
//     }
  
  
//    //  Create Order 
//   await Order.create({
//     user: req.user._id,
//     orderDate, 
//     orderTime, 
//     orderAmount, 
//     orderStatus, 
//     cartItems, 
//     shippingAddress, 
//     paymentMethod, 
//     coupon,
//     paymentStatus: paymentStatus || "pending",
//     tx_ref: tx_ref || null,
//     transactionId: transactionId || null
  
//   })

//   // update product quantity after creating
//   await updateProductQuantity(cartItems)
  
   
//   const emailTemplate = orderSuccessEmail(user.name, cartItems)
  
  
//   //  Send Order Email to the user
//   await sendEmail(
//     user.email,
//     "Order Confirmation - Shopito",
//     `Hello ${user.name}, your order has been successfully created.`,
//     emailTemplate,
//     process.env.EMAIL_USER
//   );
    
//     res.status(200).json({message: "Order has been Created"});
// }); 


// Create Order
const createOrder = asyncHandler(async (req, res) => {

  // ==============================
  // CREATE ORDER CALLED
  // ==============================

  


  // ==============================
  // 1. GET DATA FROM FRONTEND
  // ==============================

  const {
    orderDate,
    orderTime,
    orderAmount,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod,
    coupon,
    paymentStatus,
    tx_ref,
    transactionId
  } = req.body;


  // ==============================
  // 2. VALIDATION
  // ==============================

  console.log("========== VALIDATION ==========");

  console.log("cartItems:", !!cartItems);
  console.log("orderStatus:", !!orderStatus);
  console.log("shippingAddress:", !!shippingAddress);
  console.log("paymentMethod:", !!paymentMethod);

  if (
    !cartItems ||
    !orderStatus ||
    !shippingAddress ||
    !paymentMethod
  ) {
    console.log("❌ ORDER DATA MISSING");

    res.status(400);
    throw new Error("Order data missing");
  }


  // ==============================
  // 3. FIND USER
  // ==============================

  console.log("========== FIND USER ==========");

  const user = await User.findById(req.user._id);

  console.log("USER FOUND:", user?._id);

  if (!user) {
    console.log("❌ USER NOT FOUND");

    res.status(404);
    throw new Error("User not found");
  }


  // ==============================
  // 4. CREATE ORDER
  // ==============================

  console.log("========== CREATING ORDER ==========");

  let order;

  try {

    order = await Order.create({
      user: req.user._id,
      orderDate,
      orderTime,
      orderAmount,
      orderStatus,
      cartItems,
      shippingAddress,
      paymentMethod,
      coupon,
      paymentStatus: paymentStatus || "pending",
      
       // Flutterwave uniquement
      ...(tx_ref ? { tx_ref } : {}),
      ...(transactionId ? { transactionId } : {})
    });

    console.log("========== ORDER CREATED ==========");
    console.log("ORDER ID:", order._id);

  } catch (error) {

    console.error("========== ORDER CREATE ERROR ==========");
    console.error("NAME:", error.name);
    console.error("MESSAGE:", error.message);
    console.error("ERROR:", error);

    // Afficher les erreurs de validation Mongoose
    if (error.errors) {

      console.error("========== MONGOOSE VALIDATION ERRORS ==========");

      Object.keys(error.errors).forEach((field) => {

        console.error(
          `${field}:`,
          error.errors[field].message
        );

      });
    }

    // Renvoyer l'erreur au middleware Express
    throw error;
  }


  // ==============================
  // 5. UPDATE PRODUCT QUANTITY
  // ==============================

  try {

    await updateProductQuantity(cartItems);

    console.log("PRODUCT QUANTITY UPDATED");

  } catch (error) {

    console.error(
      "PRODUCT QUANTITY UPDATE ERROR:",
      error.message
    );

    // La commande existe déjà en BD,
    // donc on ne supprime pas la commande
    // si la mise à jour du stock échoue.
  }


  // ==============================
  // 6. SEND ORDER EMAIL
  // ==============================

  try {

    const emailTemplate = orderSuccessEmail(
      user.name,
      cartItems
    );

   await sendEmail(
      user.email,
      "Order Confirmation - Shopito",
      `Hello ${user.name},

    Your order has been successfully created.

    Order Number : ${order._id}
    Amount : ${orderAmount} $

    Thank you for choosing Shopito!`
    );

    console.log("ORDER EMAIL SENT SUCCESSFULLY");

  } catch (error) {

    console.error(
      "ORDER EMAIL ERROR:",
      error.message
    );

    // L'email ne doit pas empêcher
    // la commande d'être créée.
  }


  // ==============================
  // 7. RESPONSE
  // ==============================

  console.log("========== ORDER RESPONSE ==========");

  res.status(201).json({
    message: "Order has been Created",
    order
  });

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

// Pay with flutterwave 
// Pay with Flutterwave
// const payWithFlutterwave = asyncHandler(async (req, res) => {
//   const { items, shipping, description, coupon } = req.body;

//   const products = await Product.find();

//   let orderAmount = calculateTotalPrice(products, items);

//   if (coupon !== null && coupon?.name !== "nil") {
//     orderAmount =
//       orderAmount - (orderAmount * coupon.discount) / 100;
//   }

//   const tx_ref = `shopito-${Date.now()}`;

//   const response = await axios.post(
//     "https://api.flutterwave.com/v3/payments",
//     {
//       tx_ref,
//       amount: orderAmount,
//       currency: "USD",
//       redirect_url: `${process.env.REACT_APP_BACKEND_URL}/api/order/flutterwave-response`,
//       customer: {
//         email: req.user?.email,
//         name: req.user?.name,
//         phonenumber: req.user?.phone,
//       },
//       customizations: {
//         title: "Shopito Online Store",
//         description: description || "Payment for product",
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   res.status(200).json({
//     tx_ref,
//     amount: orderAmount,
//     paymentLink: response.data.data.link,
//   });
// });

 const payWithFlutterwave = asyncHandler(async (req, res) => {
  try {
    const { items, shipping, description, coupon } = req.body;

    const products = await Product.find();

    let orderAmount = calculateFlutterwaveTotalPrice(products, items);

    if (coupon !== null && coupon?.name !== "nil") {
      orderAmount =
        orderAmount - (orderAmount * coupon.discount) / 100;
    }

    const tx_ref = `shopito-${Date.now()}`;

    const redirectUrl =
      "http://localhost:5000/api/order/flutterwave-response";

    console.log("========== FLUTTERWAVE REQUEST ==========");
    console.log("AMOUNT:", orderAmount);
    console.log("ITEMS:", items);
    console.log("CURRENCY:", "USD");
    console.log("REDIRECT URL:", redirectUrl);
    console.log("CUSTOMER EMAIL:", req.user?.email);
    console.log("CUSTOMER NAME:", req.user?.name);

    console.log(
      "FLW_SECRET_KEY:",
      process.env.FLW_SECRET_KEY
        ? `${process.env.FLW_SECRET_KEY.substring(0, 15)}...`
        : "UNDEFINED"
    );

    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref,
        amount: orderAmount,
        currency: "USD",
        redirect_url: redirectUrl,

        customer: {
          email: req.user.email,
          name: req.user.name,
          phonenumber: req.user.phone || "0000000000",
        },

        customizations: {
          title: "Shopito Online Store",
          description: description || "Payment for product",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    console.log("========== FLUTTERWAVE SUCCESS ==========");
    console.log("STATUS:", response.status);
    console.log(
      "DATA:",
      JSON.stringify(response.data, null, 2)
    );

    res.status(200).json({
      tx_ref,
      amount: orderAmount,
      paymentLink: response.data.data.link,
    });

  } catch (error) {

    console.error("========== FLUTTERWAVE ERROR ==========");
    console.error("STATUS:", error.response?.status);

    console.error(
      "DATA:",
      JSON.stringify(error.response?.data, null, 2)
    );

    console.error("MESSAGE:", error.message);
    console.error("CODE:", error.code);

    return res.status(502).json({
      message: "Flutterwave payment initialization failed",
      flutterwaveStatus: error.response?.status || null,
      flutterwaveError: error.response?.data || error.message,
    });
  }
});

const flutterwaveResponse = asyncHandler(async (req, res) => {
    const { transaction_id, tx_ref } = req.query;

    if (!transaction_id || !tx_ref) {
        res.status(400);
        throw new Error("Flutterwave transaction data missing");
    }

    const response = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    const transaction = response.data.data;

    console.log("Flutterwave transaction:", transaction);

    if (
        transaction.status !== "successful" ||
        transaction.tx_ref !== tx_ref
    ) {
        return res.redirect(
            `${process.env.REACT_APP_FRONTEND_URL}/checkout?payment=failed`
        );
    }

    return res.redirect(
        `http://localhost:3000/checkout-success?transaction_id=${transaction_id}&tx_ref=${tx_ref}&amount=${transaction.amount}`
    );
});







// const testEmail = asyncHandler(async (req, res) => {

//   const info = await sendEmail(
//     "nathanaelkalenga2@gmail.com",
//     "TEST SHOPITO",
//     "Ceci est un test d'envoi depuis Shopito.",
//     null
//   );

//   res.status(200).json({
//     message: "Email envoyé",
//     messageId: info.messageId,
//     accepted: info.accepted,
//     rejected: info.rejected,
//   });
// });



module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  payWithStripe,
  payWithFlutterwave,
  flutterwaveResponse,
  
}