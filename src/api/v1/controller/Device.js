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
            return res.status(400).json({
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

// -----------------------Function to get device by id-----------------------
const GetDeviceById = async (req, res) => {
  const { deviceId } = req.params;

  try {
    // Check device already available
    const Device = await DeviceModel.findOne({ _id: deviceId }).exec();
    if (!Device) {
      return res.status(404).json({
        status: false,
        success: { message: "No device available for the provided device id!" },
      });
    }

    return res.status(200).json({
      status: true,
      device: Device,
      success: { message: "Successfully fetched the device!" },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: { message: "Failed to fetch the device due to server error!" },
    });
  }
};

// -----------------------Function to update device-----------------------
const UpdateDevice = async (req, res) => {
    // Request params
    const { deviceId } = req.params;

    // Request body
    const { dateUpdated, timeUpdated } = req.body;

    try {
      // Check device already available
      const Device = await DeviceModel.findOne({ _id: deviceId }).exec();
      if (!Device) {
        return res.status(404).json({
          status: false,
          error: { message: "No device available for the provided device id!" },
        });
      }
  
      // Properties validation
      if (!dateUpdated || !timeUpdated) {
        return res.status(400).json({
          status: false,
          error: {
            message: "Not provided updated date or time information!",
          },
        });
      }  
      // Update device
      const UpdatedDevice = await DeviceModel.findOneAndUpdate(
        { _id: deviceId },
        {
            $set:req.body
        },
        {
          new: true,
        }
      );
  
      return res.status(200).json({
        status: true,
        device: UpdatedDevice,
        success: {
          message: "Successfully updated device details!",
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: false,
        success: { message: "Failed to update the device due to server error!" },
      });
    }
};

// -------------------- Function to Delete device --------------------
const DeleteDevice = async(req , res) => {
  // Request params
  const { deviceId } = req.params;

  try {

    // Check UserId already exsits or not
    const Device = await DeviceModel.findOne({_id:deviceId}).exec();

    if(!Device){
        return res.status(404).json({
            status: false,
            error: {
                message: "No device found for the provided device id!"
            }
        });
    }
    // Delete User
    const DeleteDevice =  await Device.deleteOne();

    if(DeleteDevice){
        return res.status(200).json({
            status: true,
            success: {
                message: "Device delete successfully!"
            }
        });
    }
    
} catch (error) {
    console.log(error);
    return res.status(500).json({
        status:false,
        error:{
          message: "Failed to delete device due to server error!"
        }  
    });
  }
};  


module.exports = { 
    CreateNewDevice,
    GetAllDevices,
    UpdateDevice,
    DeleteDevice,
    GetDeviceById, 
};