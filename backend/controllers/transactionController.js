const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const { stripe } = require("../utils");


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

// Deposit fund stripe 
const depositFundStripe = asyncHandler(async(req, res) => {
   const {amount} = req.body 
   // We have access to the user who is protected
   const user = await User.findById(req.user._id);

   // Create stripe customer 

   if(!user.stripeCustomerId) {
     const customer = await stripe.customers.create({
       email: user.email,

     })
     user.stripeCustomerId = customer.id 
     user.save()
   }

  //  Create stripe session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shopito wallet deposit...",
            description: `Make a deposit of $${amount} to your shopito wallet...`
          },
          unit_amount: amount * 100
        },
        quantity: 1
      }
    ],
    customer: user.stripeCustomerId,
    success_url: `${process.env.FRONTEND_URL}/wallet?payment=successful&amount=${amount}`,
    cancel_url: `${process.env.FRONTEND_URL}/wallet?payment=failed`,
  })

  return res.json(session)
})

module.exports = {
    transferFund,
    verifyAccount,
    getUserTransactions,
    depositFundStripe
}




