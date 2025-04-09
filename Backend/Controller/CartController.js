
import  CartProductModel from '../Models/CartProductModel.js';
import SignupModel from '../Models/UserModel.js';
// addtoCartController
// localhost:7000/api/Cart/createCart
export async function addToCart(req, res) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user._id; // User from authentication middleware
      console.log(userId, "userId");
      console.log(productId, "productId");
      console.log(quantity, "quantity");
  
      // Validate input
      if (!productId || !quantity) {
        return res.status(400).json({
          success: false,
          message: 'ProductId and quantity are required',
        });
      }
  
      // Find the user
      const user = await SignupModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found.',
        });
      }
  
      // Check if the product already exists in the cart
      const existingProductIndex = user.Shopping_cart.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );
  
      if (existingProductIndex !== -1) {
        // If the product already exists, update the quantity
        const cartProductId = user.shopping_cart[existingProductIndex]._id;
  
        // Find and update the cartProduct document
        await CartProductModel.findByIdAndUpdate(cartProductId, {
          $inc: { quantity: quantity }, // Increment quantity by the added amount
        });
  
        return res.status(200).json({
          success: true,
          message: 'Product quantity updated in the cart.',
        });
      } else {
        // If product doesn't exist in the cart, create a new cart product
        const newCartProduct = new CartProductModel({
          productId: productId,
          quantity: quantity,
          userId: userId, // associate with the user
        });
  
        // Save the new cart product
        await newCartProduct.save();
  
        // Add the cartProductId to the shopping_cart array in the user's document
        user.Shopping_cart.push(newCartProduct._id);
        await user.save();
  
        return res.status(201).json({
          success: true,
          message: 'Product added to cart successfully.',
          cartItem: newCartProduct,
        });
      }
    } catch (error) {
      console.error('❌ Error adding product to cart:', error.message);
      return res.status(500).json({
        success: false,
        message: ' server Error occurred while adding product to cart.',
        details: error.message,
      });
    }
  }
  
// getCartitem
// localhost:7000/api/Cart/get-cart-items
export async function getCartItems(req, res) {
    try {
      const userId = req.user._id;
      // User ID is set by the authentication middleware
  
      // Fetch the user's cart items by their user ID
      const cartItems = await CartProductModel.find({ userId: userId }).populate('productId'); // Assuming you have a `productId` reference
  
     return res.status(200).json({
        success: true,
        message: 'Cart items fetched successfully.',
        cartItems,
      });

    } catch (error) {
      console.error(' Error fetching cart items:', error.message);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching cart items.',
        details: error.message,
      });
    }
  }



  // UpdateCartitem
//   localhost:7000/api/Cart/update-cart-item
  export async function updateCartItem(req, res) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user._id;
      // Assuming req.userId is available after authentication
  
      // Validate input
      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: 'ProductId and valid quantity are required.',
        });
      }
  
      // Find the cart item by userId and productId
      const cartItem = await CartProductModel.findOne({
        userId: userId,
        productId: productId,
      });
  
      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: 'Product not found in your cart.',
        });
      }
  
      // Update the quantity of the product in the cart
      cartItem.quantity = quantity;
  
      // Save the updated cart item
      await cartItem.save();
  
      return res.status(200).json({
        success: true,
        message: 'Cart item updated successfully.',
        cartItem,
      });
    } catch (error) {
      console.error('❌ Error updating cart item:', error.message);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while updating the cart item.',
        details: error.message,
      });
    }
  }


    // DeleteCartitem
    export async function deleteCartItem(req, res) {
      try {
        const userId = req.user._id; // Assuming auth middleware sets this
        const { cartItemId } = req.params;
    
        if (!cartItemId) {
          return res.status(400).json({
            success: false,
            message: 'Cart item ID is required.',
          });
        }
    
        // Find the cart item
        const cartItem = await CartProductModel.findById(cartItemId);
    
        if (!cartItem) {
          return res.status(404).json({
            success: false,
            message: 'Cart item not found.',
          });
        }
    
        // Check ownership
        if (cartItem.userId.toString() !== userId.toString()) {
          return res.status(403).json({
            success: false,
            message: 'Unauthorized. This cart item does not belong to you.',
          });
        }
    
        // Delete cart item
        await CartProductModel.findByIdAndDelete(cartItemId);
    
        // Remove from user's Shopping_cart array
        await SignupModel.findByIdAndUpdate(userId, {
          $pull: { Shopping_cart: cartItemId },
        });
    
        return res.status(200).json({
          success: true,
          message: 'Cart item deleted successfully.',
          cartItem: cartItem,
        });
      } catch (error) {
        console.error(' Error deleting cart item:', error.message);
        return res.status(500).json({
          success: false,
          message: 'Server error while deleting cart item.',
          details: error.message,
        });
      }
    }
    