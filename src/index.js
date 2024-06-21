// -------------------- Third-party components and modules --------------------
const express = require("express");
require("dotenv/config");

// -------------------- Custom libraries and modules --------------------
const config = require("./config");
const {ConnectDatabase} = require("./api/v1/libraries");

// -------------------- Third-party components and modules --------------------
const app = express();
const PORT  = config.PORT || 3308;

// -------------------- Base Url --------------------
app.get("/" , (req,res) => {
    res.status(200).json({ status: true , message: `Welcome to the Server!` });
});

// -------------------- Start Server --------------------
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
