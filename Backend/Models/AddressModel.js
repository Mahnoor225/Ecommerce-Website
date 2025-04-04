import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
  },
  pinCode:{
    type:String,
    },
    country:{
        type:String,
    },
    MobileNo:{
        type:Number,
        default:null
    },
    Status:{
        type:Boolean,
        default:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: ""
      },

},{
    timestamps:true
})

const AddressModel = mongoose.model("AddressSchema",addressSchema)
export default AddressModel