const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

// Transfer fund
const transferFund = asyncHandler(async(req, res) => {
    const {amount, sender, receiver, description} = req.body 

    // Validate 
    if(!amount || !sender || !receiver) {
      res.status(400)
      throw new Error("Please fill in all fields")
    }

    // Check senders account 
    const user = await  User.findOne({email: sender}) 

    if(user.balance < amount) {
      res.status(400)
      throw new Error("Insufficient balance")
    }

    // Decrease sender account balance
    await User.findOneAndUpdate(
      {email: sender},
      {
        $inc: {balance: -amount}
      }
    )
    
    // Increase receiver account balance
    await User.findOneAndUpdate(
      {email: receiver},
      {
        $inc: {balance: amount}
      }
    )

    // Save transaction 
    await Transaction.create(req.body)


    res.status(200).json({message: "Transaction successsful!"})

    
});


// verify account
const verifyAccount = asyncHandler(async(req, res) => {
    
     const user = await  User.findOne({email: req.body.receiver}) 

     if(!user) {
        res.status(400)
        throw new Error("User account not found")
     }


      res.status(200).json({message: "Account verification successsful!"})
    
});
// Get user transactions
const getUserTransactions = asyncHandler(async(req, res) => {
    if(req.user.email !== req.body.email) {
        res.status(400)
        throw new Error("Not authorized to view transactions.")
    }
   const transactions = await Transaction.find({
     $or: [{sender: req.body.email}, {receiver: req.body.email}]
   }).sort(
    {createdAt: -1}
   ).populate("sender").populate("receiver");

   res.status(200).json(transactions);
    
});

module.exports = {
    transferFund,
    verifyAccount,
    getUserTransactions
}




