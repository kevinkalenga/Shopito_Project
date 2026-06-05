const dotenv = require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express() 

// Routes 
app.get("/", (req, res) => {
    res.send("Home Page ....")
})

const PORT  = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
        console.log("mongodb connected")
    })
}).catch((err) => console.log(err))