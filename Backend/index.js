const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/mainRouter");
router.use("/api/v1", mainRouter);

app.use(router);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
