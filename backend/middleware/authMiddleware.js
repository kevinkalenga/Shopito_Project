const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken"); 
const User = require("../models/userModel");



const protect = asyncHandler(async (req, res, next) => {
  try {
    console.log("========== PROTECT ==========");
    console.log("TOKEN :", req.cookies?.token);

    const token = req.cookies?.token;

    if (!token) {
      console.log("NO TOKEN");
      return res.status(401).json({ message: "No token" });
    }

    console.log("TOKEN FOUND");

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    console.log("TOKEN VERIFIED :", verified);

    const user = await User.findById(verified.id).select("-password");

    console.log("USER :", user);

    if (!user) {
      console.log("USER NOT FOUND");
      return res.status(401).json({ message: "User not found" });
    }

    console.log("USER FOUND :", user._id);
    console.log("ROLE :", user.role);

    req.user = user;

    next();

  } catch (error) {
    console.log("PROTECT ERROR :", error);
    return res.status(401).json({
      message: "Invalid token",
      error: error.message
    });
  }
});



// const protect = asyncHandler(async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;

//     if (!token) {
//       return res.status(401).json({ message: "No token" });
//     }

//     const verified = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(verified.id).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// });

// Admin Only 
const adminOnly = (req, res, next) => {
  if(req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(401)
    throw new Error("Not authorized as an admin.")
  }
}

module.exports = {
    protect,
    adminOnly
}