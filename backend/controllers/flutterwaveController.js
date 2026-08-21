const asyncHandler = require("express-async-handler");
const axios = require("axios");

const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

const flutterwaveWebhook = asyncHandler(async (req, res) => {

    console.log("========== FLUTTERWAVE WEBHOOK ==========");

    const secretHash = process.env.FLW_SECRET_HASH;

    const signature = req.headers["verif-hash"];

    // Vérification du webhook
    if (!signature || signature !== process.env.FLW_SECRET_HASH) {
        return res.status(401).json({
            message: "Invalid signature"
        });
    }

    const data = req.body;

    console.log(
        "Flutterwave webhook data:",
        JSON.stringify(data, null, 2)
    );

    const transactionId = data?.data?.id;
    const txRef = data?.data?.tx_ref;

    if (!transactionId || !txRef) {
        console.log(" Missing transaction information");

        return res.status(400).json({
            message: "Missing transaction information"
        });
    }

    // Vérification directement auprès de Flutterwave
    const response = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
        {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    const transaction = response.data.data;

    console.log(
        "Verified Flutterwave transaction:",
        JSON.stringify(transaction, null, 2)
    );

    // Vérifications importantes
    if (transaction.status !== "successful") {
        console.log(" Payment not successful");

        return res.status(200).json({
            received: true
        });
    }

    if (transaction.tx_ref !== txRef) {
        console.log(" tx_ref mismatch");

        return res.status(400).json({
            message: "Transaction reference mismatch"
        });
    }

    // On vérifie qu'il s'agit bien d'un dépôt wallet
    if (!txRef.startsWith("wallet-")) {
        console.log("Not a wallet transaction");

        return res.status(200).json({
            received: true
        });
    }

    // Récupérer l'userId depuis le tx_ref
    const parts = txRef.split("-");

    const userId = parts[1];

    if (!userId) {
        console.log(" User ID missing");

        return res.status(400).json({
            message: "User ID missing"
        });
    }

    // Vérifier que l'utilisateur existe
    const user = await User.findById(userId);

    if (!user) {
        console.log("❌ User not found");

        return res.status(404).json({
            message: "User not found"
        });
    }

    // Éviter le double crédit
    const existingTransaction = await Transaction.findOne({
        flutterwaveTransactionId: transactionId
    });

    if (existingTransaction) {
        console.log("⚠️ Transaction already processed");

        return res.status(200).json({
            received: true
        });
    }

    const amount = Number(transaction.amount);

    // Créditer le wallet
    await User.findByIdAndUpdate(
        userId,
        {
            $inc: {
                balance: amount
            }
        }
    );

    // Enregistrer la transaction
    await Transaction.create({
        amount,
        sender: "Flutterwave",
        receiver: user.email,
        description: "Wallet deposit via Flutterwave",
        status: "success",
        flutterwaveTransactionId: transactionId
    });

    console.log(
        ` Wallet credited: ${user.email} +$${amount}`
    );

    return res.status(200).json({
        received: true
    });
});


const flutterwaveWalletResponse = asyncHandler(async (req, res) => {
  const { status, tx_ref, transaction_id } = req.query;

  if (status !== "successful" || !tx_ref || !transaction_id) {
    return res.redirect(
      `${process.env.FRONTEND_URL}/wallet?payment=failed`
    );
  }

  const response = await axios.get(
    `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
    {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const transaction = response.data.data;

  if (
    transaction.status !== "successful" ||
    transaction.tx_ref !== tx_ref
  ) {
    return res.redirect(
      `${process.env.FRONTEND_URL}/wallet?payment=failed`
    );
  }

  if (!tx_ref.startsWith("wallet-")) {
    return res.redirect(
      `${process.env.FRONTEND_URL}/wallet?payment=failed`
    );
  }

  const parts = tx_ref.split("-");
  const userId = parts[1];

  const user = await User.findById(userId);

  if (!user) {
    return res.redirect(
      `${process.env.FRONTEND_URL}/wallet?payment=failed`
    );
  }

  const existingTransaction = await Transaction.findOne({
    flutterwaveTransactionId: transaction_id,
  });

  if (!existingTransaction) {
    const amount = Number(transaction.amount);

    await User.findByIdAndUpdate(userId, {
      $inc: { balance: amount },
    });

    await Transaction.create({
      amount,
      sender: "Flutterwave",
      receiver: user.email,
      description: "Wallet deposit via Flutterwave",
      status: "success",
      flutterwaveTransactionId: transaction_id,
    });
  }

  return res.redirect(
    `${process.env.FRONTEND_URL}/wallet?payment=successful`
  );
});

module.exports = {
    flutterwaveWebhook,
    flutterwaveWalletResponse
};