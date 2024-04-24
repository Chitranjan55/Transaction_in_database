const express = require("express");
const router = express.Router();
const userRoute = require("./user");
const amountRoute = require("./amount")

router.use("/users", userRoute);
router.use("/amount", amountRoute);

module.exports = router;