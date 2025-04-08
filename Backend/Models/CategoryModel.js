import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
 name:{
    type:String,
    required:true,
    trim:true
 },
 images:[
    {
        type:String,
        required:true
     }
 ],
 parentCartName:{
    type:String,
 },
 parentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
    default:null,
 },
},{
    timestamps: true,
})  

const CategoryModel = mongoose.model('Category', CategorySchema);
export default CategoryModel