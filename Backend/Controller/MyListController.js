import MyListModel from '../Models/MyListModel.js';
import SignupModel from '../Models/UserModel.js';



// addMyList 
// localhost:7000/api/MyList/createMyList
export const addToMyListController = async (req, res) => {
  try {
    const userId = req.user._id; // from middleware
    const { productId, productTital, image, rating, price, Oldprice, brand, discount } = req.body;

    // Validate required fields
    if (!productId || !productTital || !price) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields (productId, productTital, price).',
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

    // Check if the product is already in MyList
    const existingProduct = await MyListModel.findOne({
      productId,
      userId,
    });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: 'Product already exists in MyList.',
      });
    }

    // Create a new MyList item
    const newMyListItem = new MyListModel({
      productId,
      userId,
      productTital,
      image,
      rating,
      price,
      Oldprice,
      brand,
      discount,
    });

    // Save to MyList collection
    await newMyListItem.save();

    return res.status(201).json({
      success: true,
      message: 'Product added to MyList successfully.',
      myListItem: newMyListItem,
    });
  } catch (error) {
    console.error('❌ Error adding to MyList:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error occurred while adding to MyList.',
      error: error.message,
    });
  }
};

// addMYListDelete 
// localhost:7000/api/MyList/delete-from-mylist/67f45d15a8c49cfa5ef7ebd6
export const deleteFromMyListController = async (req, res) => {
    try {
      const userId = req.user._id; // from middleware
      const { productId } = req.params; // productId to delete from MyList
  
      // Check if productId is provided
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: 'ProductId is required to delete.',
        });
      }
  
      // Find the product in the user's MyList
      const myListItem = await MyListModel.findOne({ productId, userId });
  
      if (!myListItem) {
        return res.status(404).json({
          success: false,
          message: 'Product not found in MyList.',
        });
      }
  
      // Delete the product from MyList
      await MyListModel.findByIdAndDelete(myListItem._id);
  
      return res.status(200).json({
        success: true,
        message: 'Product deleted from MyList successfully.',
        myListItem: myListItem,
      });
    } catch (error) {
      console.error('server Error deleting from MyList:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Server error occurred while deleting from MyList.',
        error: error.message,
      });
    }
  };
  


  // addMYListGet 
//   localhost:7000/api/MyList/get-mylist
export const getMyListController = async (req, res) => {
    try {
      const userId = req.user._id; // from middleware
  
      // Find all items in the user's MyList
      const myListItems = await MyListModel.find({ userId });
  
      if (!myListItems || myListItems.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No items found in My List.',
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'My List all items fetched successfully.',
        myList: myListItems,
      });
    } catch (error) {
      console.error('server Error fetching MyList:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Server error occurred while fetching My List.',
        error: error.message,
      });
    }
  };