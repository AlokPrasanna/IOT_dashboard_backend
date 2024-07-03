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
    GetAllDevices,
    UpdateDevice,
    DeleteDevice,
    GetDeviceById,
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
    UpdateDevice,
    DeleteDevice,
    GetDeviceById,
}