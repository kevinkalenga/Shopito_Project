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
    await Transaction.create({
        amount,
        sender,
        receiver,
        description,
        status: "success"
    })


    res.status(200).json({message: "Transaction successsful!"})

    
});


// verify account
const verifyAccount = asyncHandler(async(req, res) => {
    
     const user = await  User.findOne({email: req.body.receiver}) 

     if(!user) {
        res.status(400)
        throw new Error("User account not found")
     }


      res.status(200).json({receiverName: user.name, message: "Account verification successsful!"})
    
});
// Get user transactions
const getUserTransactions = asyncHandler(async(req, res) => {
    // if(req.user.email !== req.body.email) {
    //     res.status(400)
    //     throw new Error("Not authorized to view transactions.")
    // }
   const transactions = await Transaction.find({
    // we are getting the user because is protected inside the routes
     $or: [{sender: req.user.email}, {receiver: req.user.email}]
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
     await user.save()
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
    
    metadata: {
        userId: user._id.toString()
    },
    
    success_url: `${process.env.FRONTEND_URL}/wallet?payment=successful&amount=${amount}`,
    cancel_url: `${process.env.FRONTEND_URL}/wallet?payment=failed`,
  })

  return res.json(session)
})


const depositFundFlutterwave = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        res.status(400);
        throw new Error("Invalid deposit amount");
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const tx_ref = `wallet-${user._id}-${Date.now()}`;

    const response = await axios.post(
        "https://api.flutterwave.com/v3/payments",
        {
            tx_ref,
            amount,
            currency: "USD",

            redirect_url:
                `${process.env.BACKEND_URL}/api/transaction/flutterwave-wallet-response`,

            customer: {
                email: user.email,
                name: user.name,
                phonenumber: user.phone || "0000000000",
            },

            customizations: {
                title: "Shopito Wallet",
                description: `Deposit $${amount} into your Shopito wallet`,
            },

            meta: {
                userId: user._id.toString(),
                type: "wallet_deposit",
            },
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        }
    );

    res.status(200).json({
        tx_ref,
        amount,
        paymentLink: response.data.data.link,
    });
});




module.exports = {
    transferFund,
    verifyAccount,
    getUserTransactions,
    depositFundStripe,
    depositFundFlutterwave
}




