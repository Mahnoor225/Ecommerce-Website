import express from 'express';
import { requireSignIn } from '../Middleware/authMiddleware.js';
import { addToMyListController, deleteFromMyListController, getMyListController } from '../Controller/MyListController.js';

let MylistRoute = express.Router();

// Routes for MyList
MylistRoute.post("/createMyList", requireSignIn, addToMyListController);
MylistRoute.delete('/delete-from-mylist/:productId', requireSignIn, deleteFromMyListController);
MylistRoute.get('/get-mylist', requireSignIn, getMyListController);

export default MylistRoute;
