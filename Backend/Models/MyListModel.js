import mongoose from "mongoose";

const MylistSchema = new mongoose.Schema({
   productId: {
       type: String,
       required: true
   },
    userId: {
        type: String,
        required: true,
      },
      productTital:{
        type:String,
        required: true,
      },
      image:{
        type:String,
        required:true
      },
      rating:{
          type:Number,
          required:true
      },
      price:{
          type:Number,
          required:true
      },
      Oldprice:{
        type:Number,
        required:true
    },
   brand:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const MyListModel = mongoose.model("MyListSchema",MylistSchema)
export default MyListModel