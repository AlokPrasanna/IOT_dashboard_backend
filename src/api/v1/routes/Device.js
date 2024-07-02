// -----------------------Third-party libraries and modules-----------------------
const express = require("express");

// -----------------------Custom libraries and modules-----------------------
const {
    CreateNewDevice,
    GetAllDevices,
    UpdateDevice
} = require("../controller");

// -----------Initialize the router-----------
const router = express.Router();

// -----------Routes-----------
// Create a new device
router.post("/create-new-device", CreateNewDevice);

// Get All devices
router.get("/all" , GetAllDevices);

// Update device
router.put("/update/:deviceId" , UpdateDevice);



module.exports = router;