const express = require("express");
const router = express.Router();
const { validateSignUp, validateSignIn } = require("../zod");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewares/authMiddleWare");
router.use(express.json());

//route for signUp

router.post("/signup", async (req, res) => {
    try {
        const payload = validateSignUp.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({ message: "Invalid inputs" });
        }

        const userExist = await User.findOne({ username: payload.data.username });
        if (userExist) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const user = await User.create(payload.data);
        console.log(user);
        await Account.create({
            userId: user._id,
            balance: Math.random() * 100000,
        });
        const token = jwt.sign({user}, JWT_SECRET);

        return res.status(201).json({
            message: "User created successfully",
            token: token

        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error in creating user" });
    }
});


//route for signIn

router.post("/signin", async (req, res) => {
    try {
        const payload = validateSignIn.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({
                msg: "invalid inputs",
            })
        };
        const user = await User.findOne({
            username: payload.data.username,
        });
        if (!user) {
            return res.status(401).json({
                message: "User does not exist"
            });
        } else {
            const token = jwt.sign({ user }, JWT_SECRET);
            return res.json({"token": token});

        };

    } catch (error) {
        console.log("Error in signing in:" + error);
        return res.status(500).json({ message: "Error in signing in" });
    }
});



// route to get username

router.get("/username", authMiddleware, async (req, res) => {
    try {
        const name = req.name;
        return res.status(200).json({ username: name });
    } catch (error) {
        // Handle errors if any
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//route for filter

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [
                {
                    firstName: {
                        '$regex': filter,
                        $options: 'i'
                    }
                },
                {
                    lastName: {
                        '$regex': filter,
                        $options: 'i'
                    }
                }
            ]
        });

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});





module.exports = router;