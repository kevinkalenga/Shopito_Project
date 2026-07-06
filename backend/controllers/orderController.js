const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => { 
    res.send("Order has been created")
});


module.exports = {
  createOrder
}