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

// -----------------------Function to login user-----------------------
const LoginUser = async (req, res) => {
    // Request body
    const { emailAddress , password } = req.body;
  
    try {
      // Check if email address already available
      const User = await UserModel.findOne({ emailAddress }).exec();
      if (!User) {
        return res.status(401).json({
          status: false,
          error: { message: "Wrong Email Address!" },
        });
      }
  
      // Check if password matches
      const PassMatch = await bcrypt.compare(password, User.password);
      if (!PassMatch) {
        return res.status(401).json({
          status: false,
          error: { message: "Wrong password!" },
        });
      }
  
      // set userTpe in request body
      //req.body.userType = User.userType;
      //req.body.id = User._id;
  
      // Generate tokens
      //const { accessToken } = GenerateTokens(User);
  
      return res.status(200).json({
        status: true,
        //accessToken,
        //id:User._id,
        //name:User.fullName,
        //userType:User.userType,
        success: { message: "Successfully logged in the user!" },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: false,
        error: { message: "Failed to login the user due to server error!" },
      });
    }
  };

  // -----------------------Function to get all users-----------------------
const GetAllUsers = async (req, res) => {
    try {
      const users = await UserModel.aggregate([
        {
          $project: {
            password: 0 // Exclude password field from the results
          }
        }
      ]).exec();
  
      return res.status(200).json({
        status: true,
        users: users,
        success: { message: "Successfully fetched all users!" },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: false,
        error: { message: "Failed to fetch all users due to server error!" },
      });
    }
  };


module.exports = {
    CreateNewUser,
    LoginUser,
    GetAllUsers
}

