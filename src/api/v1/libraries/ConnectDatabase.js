// -------------------- Third pary libraries and modules --------------------
const mongoose = require("mongoose");

// -------------------- CUstom Libraries and Models --------------------
const config = require("../../../config");

// -------------------- Function to initialize the mongo db connection --------------------
const ConnectDatabase = async() => {
    return await mongoose.connect(config.MONGO_DB_URL);
}

module.exports = {ConnectDatabase};