// ----------------------- Custom libraries and modules -----------------------
const { UserModel , DeviceModel } = require("../models");

// -------------------- Function to create new device --------------------
const CreateNewDevice = async( req , res ) => {
    // Request Body
    const {
        id,
        name,
        imageUrl,
        group,
        owner,
        onState,
        activeState,
        dateCreated,
        timeCreated,
        dateUpdated,
        timeUpdated
    } = req.body;

    try {
        // Check if a device with the same name exists within the same group
        const Device = await DeviceModel.findOne({name , group});

        if(Device){
            return res.staus(400).json({
                status: false,
                error:{
                    message: "Device with the same name already exists in this group."
                }
            });
        }

        // Create new device
        const NewDevice = new DeviceModel({
            id,
            name,
            imageUrl,
            group,
            owner,
            onState,
            activeState,
            dateCreated,
            timeCreated,
            dateUpdated,
            timeUpdated 
        });

        await NewDevice.save();

        return res.status(201).json({
            status:true,
            success:{
                message:"Device created successfully"
            },
            device:NewDevice
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            error: {
              message: "Failed to create a new device due to server error!",
            },
        });
    }
}

// -----------------------Function to get all devices-----------------------
const GetAllDevices = async (req, res) => {
    try {
      const devices = await DeviceModel.find().exec();
  
      return res.status(200).json({
        status: true,
        devices: devices,
        success: { message: "Successfully fetched all devices!" },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: false,
        error: { message: "Failed to fetch all devices due to server error!" },
      });
    }
};


module.exports = { 
    CreateNewDevice,
    GetAllDevices, 
};