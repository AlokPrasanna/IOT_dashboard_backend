// -----------------------Third-party libraries and modules-----------------------
const mongoose = require("mongoose");

// ---------- Device Schema ----------
const DeviceSchema = new mongoose.Schema({
    id: {
        type:String,
        require:true,
    },
    name: {
        type:String,
        require:true,
    },
    imageUrl: {
        type:String,
    },
    group: {
        type:String,
        require:true,
    },
    owner: {
        type:String,
        require:true,
    },
    onState: {
        type:Boolean,
        require:true,
    },
    activeState: {
        type:Boolean,
        require:true,
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
},{ timestamps: true });

module.exports = mongoose.model("Device" , DeviceSchema);