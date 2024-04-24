const express = require("express");
const mongoose = require("mongoose");
const { authMiddleware } = require("../middlewares/authMiddleWare");
const { Account } = require("../db");

const router = express.Router();
router.use(express.json());

// route to get balance
router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const account = await Account.findOne({ userId });
        
        if (!account) {
            // Account not found for the userId
            return res.status(404).json({ message: "Account not found" });
        }
        
        // Account found, return the balance
        return res.json({
            balance: account.balance,
        });
    } catch (error) {
        console.error("Error retrieving balance:", error);
        res.status(500).send("Internal server error");
    }
});


// route to send money
router.post("/sendmoney", authMiddleware,async (req, res) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const { amount, to } = req.body;

        // Find the sender's account
        const validateSender = await Account.findOne({ userId: req.userId }).session(session);

        // Check if the sender's account exists and has sufficient balance
        if (!validateSender || validateSender.balance < amount) {
            await session.abortTransaction();
            if (!validateSender) {
                return res.status(401).send("Sender account not found");
            } else {
                return res.status(401).send("Insufficient funds");
            }
        }

        // Find the receiver's account
        const receiver = await Account.findOne({ userId: to }).session(session);

        // Check if the receiver's account exists
        if (!receiver) {
            await session.abortTransaction();
            return res.status(404).send("Receiver account not found");
        }

        // Perform the money transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: +amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();

        res.status(200).send("Transfer successful");
    } catch (error) {
        console.error("Error sending money:", error);
        res.status(500).send("Internal server error");
    }
});


module.exports = router;
