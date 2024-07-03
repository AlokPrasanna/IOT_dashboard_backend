// -----------------------Third-party libraries and modules-----------------------
const express = require("express");

// -----------------------Custom libraries and modules-----------------------
const { 
    CreateNewUser,
    LoginUser,
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser
} = require("../controller");

// -----------Initialize the router-----------
const router = express.Router();

// -----------Routes-----------
// Create a new user
router.post("/create-new-user", CreateNewUser);

// Login User
router.post("/login" , LoginUser);

// Get All users
router.get("/all" , GetAllUsers);

// Get user by Id
router.get("/one/:userId" , GetUserById);

// Update user
router.put("/update/:userId" , UpdateUser);

// Delete user
router.delete("/delete/:userId" , DeleteUser);

module.exports = router;