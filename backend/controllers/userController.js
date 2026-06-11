const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
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
        // secure: true,
        // samesite: "none"
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

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body 

    if(!email || !password) {
      res.status(400)
      throw new Error("Please add email and password");
      
    }

    // Check if user exists 
    const user = await User.findOne({email});
    if(!user) {
        res.status(400)
       throw new Error("User not found, please sign up");
    }

    // User exists, check if pwd is correct 
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
      res.status(400);
      throw new Error("Invalid email or password");
    }

    // Generate Token
    const token = generateToken(user._id)

    if(user && passwordIsCorrect) {
      const newUser = await User.findOne({email}).select("-password")
       res.cookie("token", token, {
        path: "/",
        httpOnly: true, 
        expires: new Date(Date.now() + 1000 * 86400),
        // secure: true,
        // samesite: "none"
       })
       // Send user data to the frontend 
       res.status(201).json(
          newUser
       )    
    } else {
        res.status(400)
        throw new Error("Invalid email or password");
    }
    
   
})

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    path: "/",
    httpOnly: true,
    // sameSite: "lax",
    // secure: false
  });

  res.status(200).json({ message: "Successfully Logged Out" });
});

// Get user 

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password")
    // Send the user to the frontend
    if(user) {
      res.status(200).json(user);
    } else {
        res.status(400)
        throw new Error("User Not Found");
    }
})

// Get Login Status
const getLoginStatus = asyncHandler(async (req, res) => {
  
  const token = req.cookies.token;

  console.log("cookies:", req.cookies);
  console.log("token:", req.cookies?.token);

  if (!token) {
    return res.json(false);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json(true);
  } catch (error) {
    return res.json(false);
  }
});


const updateUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);

   if(user) {
     const {name, phone, address} = user;
     user.name = req.body.name || name;
     user.phone = req.body.phone || phone;
     user.address = req.body.address || address;

     const updatedUser = await user.save()
     res.status(200).json(updatedUser)
   } else {
      res.status(400)
      throw new Error("User Not Found");
   }
})





module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    getLoginStatus,
    updateUser
}