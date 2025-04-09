import express from 'express'
import upload from '../Middleware/multer.js'
import { requireSignIn } from '../Middleware/authMiddleware.js'
import { addToCart, deleteCartItem, getCartItems, updateCartItem } from '../Controller/CartController.js'


let CartRoute = express.Router()


CartRoute.post("/createCart",requireSignIn, addToCart)
CartRoute.get('/get-cart-items',requireSignIn, getCartItems);
CartRoute.put('/update-cart-item',requireSignIn, updateCartItem);
CartRoute.delete('/delete-cart-item/:cartItemId', requireSignIn, deleteCartItem);

export default  CartRoute