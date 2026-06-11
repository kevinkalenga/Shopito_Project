const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken"); 
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    try {
        //   the user is loged in with the cookie 
        const token = req.cookies.token
        if(!token) {
            res.status(401);
            throw new Error("Not authorized, please login")
        }
        // verify token 
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // get user id from the token 
        const user = await User.findById(verified.id).select("-password")
        if(!user) {
            res.status(401);
            throw new Error("User not found")
        }
        // set the user coming from de db to the req.user
        req.user = user
        next()
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, please login")
    }
})

module.exports = {
    protect
}