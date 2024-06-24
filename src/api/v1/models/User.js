// -----------------------Third-party libraries and modules-----------------------
const mongoose = require("mongoose");

// -----------User schema-----------
const UserSchema = new mongoose.Schema({
    
    fullName: {
          type: String,
          required: true,
      },
    emailAddress: {
          type: String,
          required: true,
      },
    imageUrl: {
        type: String,
      },
    contact: {
        type: String,
        required: true,
      },
    nic: {
        type: String,
        required: true,
      },
    gender: {
        type: String,
        required: true,
      },
    birthday: {
        type: String,
        required: true,
      },
    userType: {
        type: String,
        required: true,
      },
    sendEmailStatus: {
        type: String,
        required: true,
      }, 
    password:{
        type:String,
        require:true
      },
    dateCreated: {
        type: String,
        require:true
      },
    timeCreated: {
        type: String,
        require:true
      },
    dateUpdated: {
        type: String,
        require:true
      },
    timeUpdated: {
        type: String,
        require:true
      },
} ,{ timestamps: true });

module.exports = mongoose.model("User", UserSchema);
