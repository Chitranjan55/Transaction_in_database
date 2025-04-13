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
router.post("/sendmoney", authMiddleware, async (req, res) => {
    try {
        const { amount, to } = req.body;

        const validateSender = await Account.findOne({ userId: req.userId });
        if (!validateSender || validateSender.balance < amount) {
            if (!validateSender) {
                return res.status(401).send("Sender account not found");
            } else {
                return res.status(401).send("Insufficient funds");
            }
        }

        const receiver = await Account.findOne({ userId: to });
        if (!receiver) {
            return res.status(404).send("Receiver account not found");
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
        await Account.updateOne({ userId: to }, { $inc: { balance: +amount } });

        res.status(200).send("Transfer successful");
    } catch (error) {
        console.error("Error sending money:", error);
        res.status(500).send("Internal server error");
    }
});



module.exports = router;
