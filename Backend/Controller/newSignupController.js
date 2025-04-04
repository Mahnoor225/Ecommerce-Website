
import { comparingPassword, hashPassword } from '../utils/hasingPassword.js';
import JWT from 'jsonwebtoken';
import SignupModel from '../Models/UserModel.js';
// For hashing passwords
import bcrypt from 'bcrypt'; 
import { verifactionEmailTemplate } from '../utils/VerifyEmailTemplate.js';
import { sendEmailFun } from '../database/SendEmail.js';

// Register Api 
export const RegisterController = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Ensure both password and confirmPassword are provided
        if (!name) {
            return res.send({ Message: "Name is required" });
        }
        if (!email) {
            return res.send({ Message: "Email is required" });
        }
        if (!password) {
            return res.send({ Message: "Password is required" });
        }

   
        // Check if the user already exists
        let existingUser = await SignupModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                Message: "User already exists with this email",
            });
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash the password using bcrypt
        let finalHashedPassword = await bcrypt.hash(password, 10);  // Use bcrypt.hash instead of hashPassword
        // Create a new user or admin
        let NewUser = await new SignupModel({
            name,
            email,
            password: finalHashedPassword, 
            otp: verifyCode,
            otpExpiry: Date.now() + 600000,
            // role: role || 'user'  
        }).save();
        console.log("NewUser object before sending email:", NewUser);

        // Send EmailVerification
        
        // const verifyEmail = await sendEmailFun({
        //     sendTo: NewUser.email,  // Corrected from user.email
        //     name: NewUser.name,     // Corrected from user.name
        //     verifyCode: verifyCode, // Account Verification
        //     otp: verifyCode,        // OTP
        //     subject: "Verify Email from Ecommerce App",
        //     text: "",
        //     html: verifactionEmailTemplate(NewUser, verifyCode),
        // });
        const verifyEmail = await sendEmailFun(
            NewUser.email,  // sendTo
            "Verify Email from Ecommerce App",  // subject
            "",  // text (empty in your case)
            verifactionEmailTemplate(NewUser, verifyCode),  // html
            verifyCode,  // otp
            NewUser.name  // name
        );
        
       console.log(verifyEmail);
        // create a jwt token for verification purpose
        const Cookie_token = JWT.sign({ email: NewUser.email, _id: NewUser._id },
            process.env.JWT_Key,
            { expiresIn: "1d" }
        );
            // Send response with token
            res.send({
                success: true,
                error: false,
                Message: "User registered successfully! please verify your email",
                token : Cookie_token,
                NewUser
            });
        // // Send response with user data
        // res.status(201).send({
        //     success: true,
        //     Message: "User registered successfully",
        //     NewUser
        // });
    } catch (error) {
        res.status(500).send({
            success: false,
            Message: "Internal Server Error",
            error: error.message
        });
    }
};


// Email Varifation 
export const EmailVerification = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        // Find user by email
        const user = await SignupModel.findOne({ email });
        
        if (!user) {
            return res.status(404).send({
                success: false,
                Message: "User not found",
                error: "User not found"
            });
        }

        // Check if the OTP matches and is not expired
        const isValid = user.otp === otp;
        const isExpired = Date.now() > user.otpExpiry;

        if (isValid && !isExpired) {
            // OTP is valid and not expired
            user.verify_email = true;
            user.otp = null;
            user.otpExpiry = null;
            await user.save();

            return res.status(200).send({
                success: true,
                Message: "Email verified successfully",
                user
            });
        } else if (isExpired) {
            // OTP has expired
            return res.status(400).send({
                success: false,
                Message: "OTP has expired",
                error: "OTP has expired"
            });
        } else {
            // Invalid OTP
            return res.status(400).send({
                success: false,
                Message: "Invalid OTP",
                error: "Invalid OTP"
            });
        }
    } catch (error) {
        // Handle unexpected errors
        res.status(500).send({
            success: false,
            Message: "Internal Server Error during email verification",
            error: error.message
        });
    }
};

// Login Api 
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;  // No need for confirmPassword here

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required"
            });
        }

        // Check if user exists in the database
        let user = await SignupModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not registered, please sign-up first"
            });
        }

        // if (user.status !== "Active") {
        //     return res.status(400).send({
        //         message: "Contact admin for account activation",
        //         success: false,
        //         isAccountInactive: true // Clearer error status indicating the account is not active
        //     });
        // }

        // Check if password matches the hashed password
        let match = await comparingPassword(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            });
        }

        // Generate JWT token
        let token = JWT.sign({ _id: user._id }, process.env.JWT_Key,  { expiresIn: "1d" });

        // Set token in cookie
        const cookieoptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None",  // For cross-origin requests
        };

        res.cookie("Cookie_token", token, cookieoptions);

        res.status(200).send({
            success: true,
            message: "Logged in successfully",
            user: user,
            token: token
        });


    } catch (error) {
        console.error("Error during login:", error);  // Log error for debugging
        res.status(500).send({
            success: false,
            message: "Something went wrong while logging in"
        });
    }
};



// logout Api 
export const logout = async (req, res) => {
    try {
        const requireSignIn = req.user._id;
        console.log("User ID:", requireSignIn);
        
        // Check if token is present in the cookie
        if (!req.cookies.token) {
            console.log("Token not found in cookies");
            return res.status(401).send({
                success: false,
                message: "Please login first"
            });
        }

        console.log("Token found, proceeding to logout");

        // Delete token from the cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None", // Cross-origin requests allowed for cookies
        });

        console.log("Token cleared successfully");

        res.status(200).send({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        console.error("Error during logout:", error); // Log the error for debugging purposes
        res.status(500).send({
            success: false,
            message: "Something went wrong while logging out"
        });
    }
};


 // Get all  Controller
// Get all Users API
export const getAllUsersController = async (req, res) => {
    try {
        // Fetch all users from the database
        let users = await SignupModel.find({ role: "user" });

        // If no users exist
        if (users.length === 0) {
            return res.status(404).send({
                success: false,
                Message: "No users found"
            });
        }

        // Return list of all users
        res.status(200).send({
            success: true,
            Message: "All Users retrieved successfully",
            users
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            Message: "Internal Server Error",
            error: error.message
        });
    }
};



 // put / update  all  Controller

// Update User API
export const updateUserController = async (req, res) => {
    try {
        // Extract user details from the request body and userId from the request parameters
        const { id} = req.params;
        console.log(id);
        const { name, email, password, confirmPassword } = req.body;

        // Check if the userId exists
        if (!id) {
            return res.status(400).send({
                success: false,
                Message: "User ID is required"
            });
        }

        // Find user by ID in the database
        let user = await SignupModel.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                Message: "User not found"
            });
        }

        // Optionally validate fields before updating
        if (name) user.name = name;
        if (email) user.email = email;
        

        // If password and confirmPassword are provided, check if they match
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                return res.status(400).send({
                    success: false,
                    Message: "Password and confirm password do not match"
                });
            }
            // Hash the password if it's being updated
            user.password = await hashPassword(password, confirmPassword);
        }

        // Save the updated user
        await user.save();

        // Send success response with the updated user details
        res.status(200).send({
            success: true,
            Message: "User updated successfully",
            user
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            Message: "User updated  Internal Server Error",
            error: error.message
        });
    }
};




 // delete Controller
// Delete User API
export const deleteUserController = async (req, res) => {
    try {
        // Extract userId (or id) from the request parameters
        const { id } = req.params;

        // Check if the userId exists
        if (!id) {
            return res.status(400).send({
                success: false,
                Message: "User delete ID is required"
            });
        }

        // Find and delete the user from the database
        let user = await SignupModel.findByIdAndDelete(id);

        // If the user doesn't exist
        if (!user) {
            return res.status(404).send({
                success: false,
                Message: "User not found"
            });
        }

        // Send success response
        res.status(200).send({
            success: true,
            Message: "User deleted successfully",
            user
            
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            Message: "Error deleting user",
            error: error.message
        });
    }
};

// export const dummyController = (req, res) =>{
//      res.send("hello")     
// }



