// ----------------------- Third-party libraries and modules -----------------------
const bcrypt = require("bcrypt");

// ----------------------- Custom libraries and modules -----------------------
const { UserModel } = require("../models");

// ------------------- Function to register a new user ---------------------
const CreateNewUser = async(req , res) => {
    // Request Body
    const {
        fullName,
        emailAddress,
        imageUrl,
        contact,
        nic,
        gender,
        birthday,
        userType,
        sendEmailStatus,
        password,
        dateCreated,
        timeCreated,
        dateUpdated,
        timeUpdated, 
    } = req.body;

    try {
        // Check if email address or phone number already available
        const User = await UserModel.findOne({emailAddress});

        if(User){
            return res.status(400).json({
                status: false,
                error: {
                    message: "Email already exist!",
                },
            });
        }

        // Password encryptions
        const EncryptedPassword = await bcrypt.hash(password, 8);

          // New user
    const NewUser = new UserModel({
        fullName,
        emailAddress,
        imageUrl,
        contact,
        nic,
        gender,
        birthday,
        userType,
        sendEmailStatus,
        password: EncryptedPassword,
        dateCreated,
        timeCreated,
        dateUpdated,
        timeUpdated,
      });

    // Save new user to the database
    const SavedUser = await NewUser.save();

    return res.status(201).json({
        status: true,
        user: SavedUser,
        success: {
          message: "Successfully created a new user!",
        },
    });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            error: {
              message: "Failed to create a new user due to server error!",
            },
        });
    }
}

module.exports = {
    CreateNewUser,
}