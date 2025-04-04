import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    orderId:{
        type:String,
        required:[true ,'Order Id is required'],
        unique:true
    },
    ProductId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    product_details:{
        name:string,
        image:Array,
    },
    paymentId:{
        type:String,
        required:[true,'Payment Id is required']
    },
    paymentStatus:{
        type:Boolean,
        default:""
        },
    delivery_address:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'address',
    },
    SubTotal:{
        type:Number,
        default:0
        },
    TotalAmount:{
        type:Number,
        default:0
    },
    invoiceId_receipt:{
        type:String,
        default:""
    },

},{
    timestamps:true
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order;