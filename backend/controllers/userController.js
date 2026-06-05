const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const jwt = require("jsonwebtoken");
// the token that will signup the user directly after the registration
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}


//Register User 
const registerUser = asyncHandler(async (req, res) => {
   const {name, email, password} = req.body 

    if(!name || !email || !password) {
      res.status(400)
      throw new Error("Please fill all required fields");
      
    }

    if(password.length < 6) {
      res.status(400);
      throw new Error("Password must be up to 6 charactters");
    }

    // Check if user exists 
    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400)
       throw new Error("Email has already been used");
    }

    // Create new user 
    const user = await User.create({
        name,
        email,
        password
    })

    // Generate Token 
    const token = generateToken(user._id)
    
    // if user is created send the token to the frontend
    if(user) {
       const {_id, name, email, role} = user
       res.cookie("token", token, {
        path: "/",
        httpOnly: true, 
        expires: new Date(Date.now() + 1000 * 86400),
        secure: true,
        samesite: "none"
       })
       // Send user data to the frontend 
       res.status(201).json({
         _id, 
         name,
         email,
         role,
         token
       })  
    } else {
        res.status(400)
        throw new Error("Invalid user data");
    }
})

module.exports = {
    registerUser
}