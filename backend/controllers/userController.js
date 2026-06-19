const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
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
       res.status(200).json(
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
   console.log(req.cookies);
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

const updatePhoto = asyncHandler(async (req, res) => {
   
    const {photo} = req.body
    const user = await User.findById(req.user._id);

    user.photo = photo

    const updatedPhoto = await user.save()
    res.status(200).json(updatedPhoto)

})

// Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
  // 1. Generate raw token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // 2. Hash token before saving in DB (SECURITY BEST PRACTICE)
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 3. Save hashed token + expiration
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min

  await user.save();

  // 4. Send raw token to frontend/email
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  // console.log(resetUrl)

   

    try {
      await sendEmail(
        user.email,
        "Password Reset Request",
        `Click here to reset your password: ${resetUrl}`
      );

      res.status(200).json({
        message: "Reset email sent",
      });

    } catch (error) {
      console.log("EMAIL ERROR:", error);

      res.status(500);
      throw new Error("Email could not be sent");
    }
});

// Reset Password
// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  // 🔥 IMPORTANT : on met le password brut
  user.password = newPassword;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    message: "Password reset successful",
  });
});





module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    getLoginStatus,
    updateUser,
    updatePhoto,
    forgotPassword,
    resetPassword,
}