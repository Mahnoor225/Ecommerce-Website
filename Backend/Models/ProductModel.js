import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true        
    },
  description: {
    type: String,
    required: true
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    // required:true
 },
  images: [
    {
        type: String,
        required: true
      }
  ],
  brand:{
    type: String,
    default:"",
  },
  price: {
    type: Number,
    required: true
  },
  oldprice:{
    type:Number,
    default:0
  },
  cartName:{
    type:String,
    default:""
  },
  cartId:{
    type:String,
    default:"",
    required:true
  },
  SubCartName:{
    type:String,
    default:"",
  },
  SubCartId:{
    type:String,
    default:""
  },
  thirdSubCartName:{
    type:String,
    default:"",
  },
  thirdSubCartId:{
    type:String,
    default:"",
    },
     CountInStock:{
        type:Number,
        required:true
     },
     rating:{
        type:Number,
        default:0
     },
     isFeatured:{
        type:Boolean,
        default:false
     },
     discount:{
        type:Number,
        required:true,
     },
     productRam:[
        {
            type:String,
            required:true
        }
     ],
     Size:[
        {
            type:String,
            default:null,
        }
     ],
     productWeight:[
        {
            type:String,
            default:null
        }
     ],
    DateCreated:{
        type:Date,
        default:Date.now()
    },
},
    {
        timestamps: true
    }
)

let ProductModel = mongoose.model("Product",ProductSchema)
export default ProductModel