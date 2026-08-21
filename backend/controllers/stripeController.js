const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const { stripe } = require("../utils");

const stripeWebhook = asyncHandler(async (req, res) => {
    const signature = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_ENDPOINT_SECRET
        );
    } catch (err) {
        console.error("Stripe webhook error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {

        case "checkout.session.completed": {
            const session = event.data.object;

            // Vérifie que le paiement est réellement payé
            if (session.payment_status !== "paid") {
                console.log("Payment not completed:", session.id);
                break;
            }

            const userId = session.metadata?.userId;

            if (!userId) {
                console.error("No userId in Stripe metadata");
                break;
            }

            // Évite de traiter deux fois le même paiement
            const existingTransaction = await Transaction.findOne({
                stripeSessionId: session.id
            });

            if (existingTransaction) {
                console.log("Webhook already processed:", session.id);
                break;
            }

            const user = await User.findById(userId);

            if (!user) {
                console.error("User not found:", userId);
                break;
            }

            // Stripe travaille en cents
            const amount = session.amount_total / 100;

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
                amount: amount,
                sender: "Stripe",
                receiver: user.email,
                description: "Wallet deposit via Stripe",
                status: "success",
                stripeSessionId: session.id
            });

            console.log(
                `Wallet credited: ${user.email} +$${amount}`
            );

            break;
        }

        default:
            console.log(`Unhandled Stripe event: ${event.type}`);
    }

    res.status(200).json({ received: true });
});

module.exports = {
    stripeWebhook
};