import express from 'express'
import upload from '../Middleware/multer.js'
import {  createCategoryController, uploadsimages } from '../Controller/CategoryController.js'
import { requireSignIn } from '../Middleware/authMiddleware.js'
import { deleteProduct, getAllFeaturedProducts, getAllProducts, getAllProductsByCartName, getAllProductsByCount, getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCartId, getAllProductsBySubCartName, getAllProductsByThirdSubCartId, getAllProductsByThirdSubCartName, getProductsByCartId, productController, singleproduct, updateProduct } from '../Controller/ProductController.js'


let ProductRoute = express.Router()


// ProductRoute.post("/uploadsimages",requireSignIn, upload.array("images"), uploadsimages)
ProductRoute.post("/create-Product",requireSignIn,productController)
ProductRoute.get('/Get-all-products',getAllProducts);
ProductRoute.get('/Get-all-singleproduct/:id',singleproduct);
ProductRoute.get('/Get-all-products-cartId/:cartId', getProductsByCartId);
ProductRoute.get('/Get-all-products-by-cartName/:cartName', getAllProductsByCartName);
ProductRoute.get('/Get-all-products-by-subCartId/:subCartId', getAllProductsBySubCartId);
ProductRoute.get('/Get-all-products-by-subCartName/:subCartName', getAllProductsBySubCartName);
// ProductRoute.get('/Get-products-by-category-name/:categoryName', getAllProductsByCategoryName);
ProductRoute.get('/Get-all-products-by-thirdsubcart-name/:thirdSubCartName', getAllProductsByThirdSubCartName);
ProductRoute.get('/Get-all-products-by-thirdsubcart-id/:thirdSubCartId', getAllProductsByThirdSubCartId);

ProductRoute.get('/Get-all-products-by-price', getAllProductsByPrice);
ProductRoute.get('/Get-all-products-by-rating', getAllProductsByRating);
ProductRoute.get('/Get-all-products-by-count',getAllProductsByCount);  
ProductRoute.get("/getfeaturedproduct", getAllFeaturedProducts);
ProductRoute.delete("/deleteproduct/:id", deleteProduct);
// productRoutes.js
ProductRoute.put("/putproduct/:id", updateProduct);

export default  ProductRoute