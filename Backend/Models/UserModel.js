import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true        
    },
    email: {
        type: String,
        required: true,
        unique: true,        
    },
    password: {
        type: String,
        required: true,      
    },
    avatar:{
        type:String,
        default:""
    },
    mobile: {
        type:  Number,
        default: null,        
    },
    verify_email:{
        type:Boolean,
        default:false
    },
    last_login_data:{
        type:Date,
        default:Date.now

    },
    Status: {
        type: String,
        enum: ['active', 'inactive', 'Suspended'],  // Valid roles are 'active', 'inactive'
        default: 'active',  // Default role is 'active'
      },
    address_detail:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'address'
        }
    ],
    Shopping_cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'cartProduct'
        },
    ],
    Order_History:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'order'
        },
    ],
    // forgetPassword_otp: {
    //     type: String,
    //     default: null,        
    // },
    // forgetPasswordExpiry: {
    //     type: Date,
    //     default: null,        
    // },
    otp:{
        type:String,
    },
    otpExpiry:{
        type:Date,
        },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],  // Valid roles are 'user', 'admin', 'superadmin'
        default: 'user',  // Default role is 'user'
      },
},
    {
        timestamps: true
    }
)

let SignupModel = mongoose.model("UsersSchema",signupSchema)
export default SignupModel