// -----------------------Imports-----------------------
const {
    CreateNewUser,
    LoginUser,
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser
} = require("./User");

const {
    CreateNewDevice,
    GetAllDevices
} = require("./Device");

// -----------------------Exports-----------------------
module.exports = {
    CreateNewUser,
    LoginUser,
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser,
    CreateNewDevice,
    GetAllDevices,
}