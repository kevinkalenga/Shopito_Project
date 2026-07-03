const asyncHandler = require("express-async-handler"); 
const Coupon = require("../models/couponModel");

const createCoupon = asyncHandler(async (req, res) => {
 
    const {name, expiresAt, discount} = req.body 

    if(!name || !expiresAt || !discount) {
       res.status(400)
        throw new Error("Please fill in all fields")
    }

    const coupon = await Coupon.create({
      name,
      expiresAt,
      discount
    })

    res.status(201).json(coupon);

});


const getCoupons = asyncHandler(async (req, res) => {
    // sorting base on the creation date
   const coupons = await Coupon.find().sort("-createdAt")
    res.status(200).json(coupons)
})


module.exports = {
  createCoupon,
  getCoupons
}