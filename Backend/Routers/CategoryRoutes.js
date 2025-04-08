import express from 'express'
import upload from '../Middleware/multer.js'
import { CategoryRemoveImageController, createCategoryController, deleteCategoryController, getCategoryController, getCategoryCountController, getSubCategoryCountController, singleCategoryController, updateCategoryController, uploadsimages } from '../Controller/CategoryController.js'
import { requireSignIn } from '../Middleware/authMiddleware.js'


let CategoryRoute = express.Router()


CategoryRoute.post("/uploadsimages",requireSignIn, upload.array("images"), uploadsimages)
CategoryRoute.post("/create",requireSignIn, createCategoryController)
CategoryRoute.get("/getCategory", getCategoryController)
CategoryRoute.get("/CategoryCount",getCategoryCountController)
CategoryRoute.get("/SubCategoryCount",getSubCategoryCountController)
CategoryRoute.get("/create/:categoryId", singleCategoryController);
CategoryRoute.get("/RemoveImage",CategoryRemoveImageController);                       //check 
CategoryRoute.delete("/create/:categoryId",requireSignIn,deleteCategoryController);
CategoryRoute.put("/create/:categoryId",requireSignIn,updateCategoryController);
export default  CategoryRoute