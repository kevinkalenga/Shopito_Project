const asyncHandler = require("express-async-handler"); 


const createCoupon = asyncHandler(async (req, res) => {
 
    res.send("Send a coupon")

});


module.exports = {
  createCoupon
}