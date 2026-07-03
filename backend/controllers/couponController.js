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

    if(!coupon) {
       res.status(400)
        throw new Error("Coupon not found")
    }

    res.status(201).json(coupon);

});


const getCoupons = asyncHandler(async (req, res) => {
    // sorting base on the creation date
   const coupons = await Coupon.find().sort("-createdAt")
   console.log(coupons);
    res.status(200).json(coupons)
})
const getCoupon = asyncHandler(async (req, res) => {
   
    // sorting base on the creation date
   const coupon = await Coupon.findOne({
   
      name: req.params.couponName,
      expiresAt: { $gt: new Date() }
    //   expiresAt: {$gt: Date.now()}
   })
    
  
    if(!coupon) {
       res.status(404)
        throw new Error("Coupon not found or has expired")
    }
    res.status(200).json(coupon)
})

const updateCoupon = asyncHandler(async (req, res) => {
  
  const { id } = req.params;

  const coupon = await Coupon.findById(id);

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }

  const updatedCoupon = await Coupon.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,        // retourne le document mis à jour
      runValidators: true // applique les règles du schema
    }
  );

    res.status(200).json(updatedCoupon);
});

const deleteCoupon = asyncHandler(async (req, res) => {
  
  const { id } = req.params;

  const coupon = await Coupon.findById(id);

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }

  await Coupon.findByIdAndDelete(id);

  res.status(200).json({
    message: "Coupon deleted successfully",
    id
  });
});

module.exports = {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon
}