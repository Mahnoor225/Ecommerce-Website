
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import SignupModel from '../Models/UserModel.js';
import  productModel from '../Models/productModel.js';
import ProductModel from '../Models/productModel.js';
export default cloudinary.config({
//   url: process.env.CLOUDINARY_URL ,
  cloud_name: 'dizrz6ejl',
  api_key: '822293373532438',
  api_secret: 'V4GBX7Uk9brjhr03twZUf_bHSkI',
  secure: true
});


// upload image 

// export async function uploadsimages(req, res) {
//     try {
     
//         const { files } = req;

//         // 🟨 Example: Get user ID from authenticated request
//         const userId = req.user?._id;

         

//         if (!userId) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized. User ID not found.",
//             });
//         }

//         const user = await SignupModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         if (!files || files.length === 0) {
//             return res.status(400).json({
//                 error: true,
//                 success: false,
//                 message: "No image files were uploaded."
//             });
//         }

//         const options = {
//             unique_filename: false,
//             overwrite: false,
//         };

//         const imagesArray = [];

//         for (let i = 0; i < files.length; i++) {
//             const file = files[i];

//             // Delete previous avatar (optional)
//             if (user.avatar) {
//                 const urlParts = user.avatar.split('/');
//                 const publicId = urlParts[urlParts.length - 1].split('.')[0];
//                 try {
//                     const delResult = await cloudinary.uploader.destroy(publicId);
//                     console.log("🗑️ Previous image deleted:", delResult);
//                 } catch (deleteErr) {
//                     console.warn("⚠️ Failed to delete previous avatar:", deleteErr.message);
//                 }
//             }

//             try {
//                 const result = await cloudinary.uploader.upload(file.path, options);
//                 imagesArray.push(result.secure_url);
//                 fs.unlinkSync(file.path); // clean local file
//                 console.log("✅ Uploaded image:", result.secure_url);
//             } catch (uploadError) {
//                 console.error("❌ Error uploading:", uploadError);
//                 return res.status(500).json({
//                     error: true,
//                     success: false,
//                     message: "Error uploading image to Cloudinary.",
//                     details: uploadError.message,
//                 });
//             }
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Category Images uploaded successfully.",
//             images: imagesArray,
//         });

//     } catch (error) {
//         console.error('❌ Server error:', error);
//         return res.status(500).json({
//             error: true,
//             success: false,
//             message: "Category Images uploaded Internal server error.",
//             details: error.message,
//         });
//     }
// }


// product category
export async function productController(req, res) {
    try {
        const {
            name,
            description,
            imagesArray,
            brand,
            price,
            oldprice,
            cartName,
            cartId,
            SubCartId,
            SubCart,
            SubCartName,
            thirdSubCartName,
            thirdSubCart,
            thirdSubCartId,
            category,
            CountInStock,  // ✅ corrected spelling
            rating,
            isFeatured,
            discount,
            productRam,
            Size,
            productWeight,
            DateCreated
        } = req.body;

        // Create product
        let product = new productModel({
            name,
            description,
            images: imagesArray, // ✅ imagesArray used properly
            brand,
            price,
            oldprice,
            cartName,
            cartId,
            SubCartId,
            SubCart,
            SubCartName,
            thirdSubCartName,
            thirdSubCart,
            thirdSubCartId,
            category,
            CountInStock, // ✅ correct spelling
            rating,
            isFeatured,
            discount,
            productRam,
            Size,
            productWeight,
            DateCreated
        });

        product = await product.save();

        if (!product) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Product creation failed.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product created successfully.",
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating product.",
            details: error.message
        });
    }
}
 
// Get all product  

export async function getAllProducts(req, res) {
    try {
      // Fetch all products from the database
      const products = await ProductModel.find();
  
      if (products.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No products found.",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully.",
        products,
      });
    } catch (error) {
      console.error('❌ Error fetching products:', error.message);
      return res.status(500).json({
        success: false,
        message: "Error occurred while fetching products.",
        details: error.message,
      });
    }
  }


//   get single product 
// localhost:7000/api/product/Get-all-singleproduct/67f45d15a8c49cfa5ef7ebd6
export async function singleproduct(req, res) {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Product ID is required.",
        });
    }

    try {
        // Find the product by its ID
        const product = await ProductModel.findById(id).populate('category'); // Assuming you want to populate the category field

        // If no product is found
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        // Successfully found and return the product
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            product
        });

    } catch (error) {
        console.error("Error fetching product:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the product.",
            error: error.message
        });
    }
}



  // Get all product  ByCartId
  export async function getProductsByCartId(req, res) {
    try {
        const { cartId } = req.params; 
        
        // Agar cartId nahi hai
        if (!cartId) {
            return res.status(400).json({
                success: false,
                message: "Cart ID is required."
            });
        }

        // MongoDB query to find products by cartId
        const products = await ProductModel.find({ cartId });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found for the given cartId.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            products,
        });
    } catch (error) {
        console.error('❌ Error fetching products by cartId:', error.message);
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching products.",
            details: error.message,
        });
    }
}


  // Get all product  ByCartName
//   localhost:7000/api/product/create-Product-by-cartName/test
  export async function getAllProductsByCartName(req, res) {
    try {
        const { cartName } = req.params; // Assuming cartName is passed as a URL parameter

        // Find all products where cartName matches the given value
        const products = await ProductModel.find({ cartName });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found for the given cartName.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            products,
        });
    } catch (error) {
        console.error('❌ Error fetching products:', error.message);
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching products.",
            details: error.message,
        });
    }
}


 // Get all product  BySubCart id

 export async function getAllProductsBySubCartId(req, res) {
    try {
        const { subCartId } = req.params; // Get the subCartId from the URL parameter

        // Find all products where SubCartId matches the given value
        const products = await ProductModel.find({ SubCartId: subCartId });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found for the given SubCartId.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            products,
        });
    } catch (error) {
        console.error('❌ Error fetching products:', error.message);
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching products.",
            details: error.message,
        });
    }
}

// getAllProductsBysubCartName

export async function getAllProductsBySubCartName(req, res) {
    try {
        const { subCartName } = req.params; // Get the subCartName from the URL parameter

        // Find all products where subCartName matches the given name
        const products = await ProductModel.find({ subCartName: subCartName });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found for the given sub-cart name.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            products,
        });
    } catch (error) {
        console.error('❌ Error fetching products:', error.message);
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching products.",
            details: error.message,
        });
    }
}


  // Get all product  category name
//   export async function getAllProductsByCategoryName(req, res) {
//     try {
//         const { categoryName } = req.params; // Get the category name from the URL parameter

//         // Find all products where category matches the given name
//         const products = await ProductModel.find({ category: categoryName });

//         if (products.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No products found for the given category name.",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Products fetched successfully.",
//             products,
//         });
//     } catch (error) {
//         console.error('❌ Error fetching products:', error.message);
//         return res.status(500).json({
//             success: false,
//             message: "Error occurred while fetching products.",
//             details: error.message,
//         });
//     }
// }

// thirdSubCartName
export async function getAllProductsByThirdSubCartName(req, res) {
    try {
        const { thirdSubCartName } = req.params; // Get thirdSubCartName from the URL parameter

        // Find all products where thirdSubCartName matches the given name
        const products = await Product.find({ thirdSubCartName: thirdSubCartName });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found for the given third sub-cart name.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            products,
        });
    } catch (error) {
        console.error('❌ Error fetching products:', error.message);
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching products.",
            details: error.message,
        });
    }
}


// thirdSubCartId
export async function getAllProductsByThirdSubCartId(req, res) {
    try {
        const { thirdSubCartId } = req.params; // Get thirdSubCartId from the URL parameter

        // Find all products where thirdSubCartId matches the given ID
        const products = await Product.find({ thirdSubCartId: thirdSubCartId });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found for the given third sub-cart ID.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            products,
        });
    } catch (error) {
        console.error('❌ Error fetching products:', error.message);
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching products.",
            details: error.message,
        });
    }
}



// getallproduct-price 
// localhost:7000/api/product/Get-all-products-by-price?minPrice=10000&maxPrice=50000
export async function getAllProductsByPrice(req, res) {
    try {
        const { minPrice, maxPrice } = req.query; // Get minPrice and maxPrice from query parameters

        // Ensure minPrice and maxPrice are numbers
        if (isNaN(minPrice) || isNaN(maxPrice)) {
            return res.status(400).json({
                success: false,
                message: "Invalid price range provided.",
            });
        }

        // Find all products where the price is within the given range
        const products = await ProductModel.find({
            price: { $gte: minPrice, $lte: maxPrice }
        });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found for the given price range.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            products,
        });
    } catch (error) {
        console.error('❌ Error fetching products by price:', error.message);
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching products by price.",
            details: error.message,
        });
    }
}


// getallproduct-rating
// localhost:7000/api/product/Get-all-products-by-rating?minRating=4&maxRating=5
export async function getAllProductsByRating(req, res) {
    try {
        let { minRating, maxRating } = req.query;

        // Convert to numbers
        minRating = parseFloat(minRating);
        maxRating = parseFloat(maxRating);

        // Validation
        if (isNaN(minRating) || isNaN(maxRating)) {
            return res.status(400).json({
                success: false,
                message: "Invalid rating range provided.",
            });
        }

        // Query products within rating range
        const products = await ProductModel.find({
            rating: { $gte: minRating, $lte: maxRating },
        });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found for the given rating range.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            products,
        });
    } catch (error) {
        console.error('❌ Error fetching products by rating:', error.message);
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching products by rating.",
            details: error.message,
        });
    }
}



// getallproduct-count
// localhost:7000/api/product/Get-all-products-by-count
export async function getAllProductsByCount(req, res) {
try {
    const productCount = await ProductModel.countDocuments();
    if(!productCount){
        return res.status(404).json({
            success: false,
            message: "No products found.",
        }) 
    }
    return res.status(200).json({
        success: true,
        message: "Products fetched successfully.",
        productCount,
    }) 
} catch (error) {
    return res.status(500).json({
        success: false,
        message: "Error occurred while fetching products by count.",
        details: error.message,
    })
}
}

// getallFeaturedProducts
// localhost:7000/api/product/getfeaturedproduct
export async function getAllFeaturedProducts(req, res) {
    try {
        const featuredProducts = await ProductModel.find({ isFeatured: true }).populate('category');
       console.log(featuredProducts)
        if (!featuredProducts) {
            return res.status(404).json({
                success: false,
                message: "No featured products found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Featured products fetched successfully.",
            products: featuredProducts,
        });

    } catch (error) {
        console.error("Error fetching featured products:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching featured products.",
            error: error.message,
        });
    }
}




// deleteproduct
// localhost:7000/api/product/deleteproduct/67f45ce0a8c49cfa5ef7ebd4
export async function deleteProduct(req, res) {
    const { id } = req.params;

    try {
        // Find the product by ID and delete it
        const product = await ProductModel.findByIdAndDelete(id);

        // If the product doesn't exist, return a 404 error
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        // Return success response if the product is deleted
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting product:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the product.",
            error: error.message,
        });
    }
}



// putproduct
// update Product 
// localhost:7000/api/product/putproduct/67f45d15a8c49cfa5ef7ebd6
export async function updateProduct(req, res) {
    const { id } = req.params;  // Get the product ID from the URL parameter
    const updatedData = req.body;  // Get the new data from the request body

    // Validate the ID format (to check if it's a valid ObjectId)
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID."
        });
    }

    try {
        // Find the product by ID and update it with the new data
        const product = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        // If the product doesn't exist
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        // Successfully updated the product
        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product
        });

    } catch (error) {
        console.error("Error updating product:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the product.",
            error: error.message
        });
    }
}