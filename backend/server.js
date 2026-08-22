const dotenv = require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");
const couponRoute = require("./routes/couponRoute");
const orderRoute = require("./routes/orderRoute");
const transactionRoute = require("./routes/transactionRoute");
const stripeRoute = require("./routes/stripeRoute");
const flutterwaveRoute = require("./routes/flutterwaveRoute");
const errorHandler = require("./middleware/errorMiddleware")

const app = express() 

// Middlewares

app.use(cookieParser());

app.use("/api/stripe", stripeRoute);
app.use("/api/flutterwave", flutterwaveRoute);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
  cors({
    origin: [
       "http://localhost:3000",
      "https://shopitoapp.vercel.app",
      "https://shopito-frontend-chi.vercel.app",
      "https://shopito-frontend-bkqhikkra-kevin-kalengas-projects.vercel.app",
      "https://shopito-frontend-ewldlngh7-kevin-kalengas-projects.vercel.app"
    ],
    credentials: true
  })
)
// Routes 
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/order", orderRoute);
app.use("/api/transaction", transactionRoute);



app.get("/", (req, res) => {
    res.send("Home Page ....")
})

// Error middleware
app.use(errorHandler);


const PORT  = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
        console.log("mongodb connected")
    })
}).catch((err) => console.log(err))