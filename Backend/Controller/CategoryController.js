
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import SignupModel from '../Models/UserModel.js';
import  CategoryModel from '../Models/CategoryModel.js';
export default cloudinary.config({
//   url: process.env.CLOUDINARY_URL ,
  cloud_name: 'dizrz6ejl',
  api_key: '822293373532438',
  api_secret: 'V4GBX7Uk9brjhr03twZUf_bHSkI',
  secure: true
});


// upload image 

export async function uploadsimages(req, res) {
    try {
     
        const { files } = req;

        // 🟨 Example: Get user ID from authenticated request
        const userId = req.user?._id;

         

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. User ID not found.",
            });
        }

        const user = await SignupModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!files || files.length === 0) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "No image files were uploaded."
            });
        }

        const options = {
            unique_filename: false,
            overwrite: false,
        };

        const imagesArray = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Delete previous avatar (optional)
            if (user.avatar) {
                const urlParts = user.avatar.split('/');
                const publicId = urlParts[urlParts.length - 1].split('.')[0];
                try {
                    const delResult = await cloudinary.uploader.destroy(publicId);
                    console.log("🗑️ Previous image deleted:", delResult);
                } catch (deleteErr) {
                    console.warn("⚠️ Failed to delete previous avatar:", deleteErr.message);
                }
            }

            try {
                const result = await cloudinary.uploader.upload(file.path, options);
                imagesArray.push(result.secure_url);
                fs.unlinkSync(file.path); // clean local file
                console.log("✅ Uploaded image:", result.secure_url);
            } catch (uploadError) {
                console.error("❌ Error uploading:", uploadError);
                return res.status(500).json({
                    error: true,
                    success: false,
                    message: "Error uploading image to Cloudinary.",
                    details: uploadError.message,
                });
            }
        }

        return res.status(200).json({
            success: true,
            message: "Category Images uploaded successfully.",
            images: imagesArray,
        });

    } catch (error) {
        console.error('❌ Server error:', error);
        return res.status(500).json({
            error: true,
            success: false,
            message: "Category Images uploaded Internal server error.",
            details: error.message,
        });
    }
}


// createCategory
export async function createCategoryController(req, res) {
    try {
        //  🔐 Check if user is logged in
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login to create a category.",
            });
        }
        let category = new CategoryModel({
            name: req.body.name,
            images: req.body.imagesArray,  // ✅ fixed key name
            parentId: req.body.parentId,
            parentCartName: req.body.parentCartName
        });

        category = await category.save();

        return res.status(200).json({
            success: true,
            message: "Category created successfully.",
            category: category
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: "Category creation failed.",
            details: error.message
        });
    }
}

export async function getCategoryController(req, res) {
    try {
        const categories = await CategoryModel.find(); // Fetch all categories
        const categoryMap = {};

        // Populate the categoryMap with categories
        categories.forEach((category) => {
            // Initialize children array if it doesn't exist
            if (!categoryMap[category._id]) {
                categoryMap[category._id] = { ...category._doc, children: [] }; // Create a copy of the category and initialize children
            } else {
                categoryMap[category._id] = category; // Just in case there's duplicate entry, keep it as is
            }
        });

        const rootCategory = [];

        // Build the parent-child structure
        categories.forEach(cat => {
            if (cat.parentId === null) {
                // If it's a root category, push to rootCategory array
                rootCategory.push(categoryMap[cat._id]);
            } else {
                // If it's not a root category, push it as a child of its parent
                if (categoryMap[cat.parentId]) {
                    categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
                }
            }
        });

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully.",
            categories: rootCategory,
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: "Failed to fetch categories.",
            details: error.message,
        });
    }
}

// Get Category count

export async function getCategoryCountController(req, res) {
    try {
        const count = await CategoryModel.countDocuments(); // Count the number of documents in the Category collection

        return res.status(200).json({
            success: true,
            message: "Category count fetched successfully.",
            count,
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: "Failed to fetch category count.",
            details: error.message,
        });
    }
}


// Get sub Category count
// localhost:7000/api/category/SubCategoryCount?parentId=67f3f8ddee35e6c979bebb39
// asa url lakhana ha category ka id
export async function getSubCategoryCountController(req, res) {
    try {
        const { parentId } = req.query; // Get the parentId from query params

        if (!parentId) {
            return res.status(400).json({
                success: false,
                message: "Parent ID is required.",
            });
        }

        // Find all categories
        const categories = await CategoryModel.find();
        
        if (!categories || categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No categories found.",
            });
        }

        // Filter the categories that have the given parentId
        const subCategories = categories.filter(category => {
            // Check if category.parentId is not null before calling toString()
            return category.parentId && category.parentId.toString() === parentId;
        });
        
        // Return the count of subcategories
        return res.status(200).json({
            success: true,
            message: "Sub-category count fetched successfully.",
            count: subCategories.length,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch subcategory count.",
            details: error.message,
        });
    }
}


// get single category
// localhost:7000/api/category/67f3f8ddee35e6c979

export async function singleCategoryController(req, res) {
    try {
        const { categoryId } = req.params;  // Assuming you pass category ID in the URL path
         console.log(categoryId);
        // Find category by ID
        const category = await CategoryModel.findById(categoryId);
        
        console.log(category);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "single Category fetched successfully.",
            category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch category.",
            details: error.message,
        });
    }
}



// deleteimage from clounadary

// removeimageCloundary 

export async function CategoryRemoveImageController(req, res) {
    try {
        const imgurl = req.query.img;

        if (!imgurl) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Missing 'img' query parameter.",
            });
        }

        const urlArr = imgurl.split('/');
        const lastSegment = urlArr[urlArr.length - 1];

        if (!lastSegment || !lastSegment.includes('.')) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Invalid image URL format.",
            });
        }

        const publicId = lastSegment.split('.')[0];

        const result = await cloudinary.uploader.destroy(publicId);
        console.log("📦 Cloudinary Response:", result);

        if (result.result === 'not found') {
            return res.status(404).json({
                error: true,
                success: false,
                message: "Image not found in Cloudinary.",
            });
        }

        return res.status(200).json({
            message: "ok",
            success: true,
            message: "✅ Image removed successfully from Cloudinary.",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: "Error removing image from Cloudinary.",
            details: error.message,
        });
    }
}



// deletecategory

// export async function deleteCategoryController(req, res) {
//     try {
//         const { categoryId } = req.params;  // Get category ID from URL

//         // Find the category by ID
//         const category = await CategoryModel.findById(categoryId);

//         if (!category) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Category not found.",
//             });
//         }

//         // Find all subcategories associated with this category
//         const subCategories = await CategoryModel.find({ parentId: categoryId });

//         // Delete all subcategories
//         if (subCategories.length > 0) {
//             await CategoryModel.deleteMany({ parentId: categoryId });
//             console.log("Subcategories deleted.");
//         }

//         // Delete the parent category
//         await CategoryModel.findByIdAndDelete(categoryId);
//         console.log("Parent category deleted.");

//         return res.status(200).json({
//             success: true,
//             message: "Category and its subcategories deleted successfully.",
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Failed to delete category and subcategories.",
//             details: error.message,
//         });
//     }
// }
export async function deleteCategoryController(req, res) {
    try {
        const { categoryId } = req.params;  // Get category ID from URL

        // Find the category by ID
        const category = await CategoryModel.findById(categoryId);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        // If the category has an image, delete it from Cloudinary
        if (category.image) {
            const urlParts = category.image.split('/');
            const publicId = urlParts[urlParts.length - 1].split('.')[0];
            try {
                await cloudinary.uploader.destroy(publicId);
                console.log("Parent category image deleted from Cloudinary.");
            } catch (deleteErr) {
                console.warn("Failed to delete parent category image from Cloudinary:", deleteErr.message);
            }
        }

        // Find all subcategories associated with this category
        const subCategories = await CategoryModel.find({ parentId: categoryId });

        // Delete all subcategories and their images from Cloudinary
        if (subCategories.length > 0) {
            for (const subCategory of subCategories) {
                // If subcategory has an image, delete it from Cloudinary
                if (subCategory.image) {
                    const urlParts = subCategory.image.split('/');
                    const publicId = urlParts[urlParts.length - 1].split('.')[0];
                    try {
                        await cloudinary.uploader.destroy(publicId);
                        console.log(`Subcategory image deleted from Cloudinary: ${subCategory.name}`);
                    } catch (deleteErr) {
                        console.warn(`Failed to delete subcategory image from Cloudinary: ${subCategory.name}`, deleteErr.message);
                    }
                }
            }

            // Now, delete the subcategories
            await CategoryModel.deleteMany({ parentId: categoryId });
            console.log("Subcategories deleted.");
        }

        // Delete the parent category
        await CategoryModel.findByIdAndDelete(categoryId);
        console.log("Parent category deleted.");

        return res.status(200).json({
            success: true,
            message: "Category and its subcategories deleted successfully, including images from Cloudinary.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete category and subcategories, including images from Cloudinary.",
            details: error.message,
        });
    }
}



// update category 
export async function updateCategoryController(req, res) {
    try {
        const { categoryId } = req.params; // Get category ID from URL params
        const { name, parentId, image } = req.body; // Get updated details from request body

        // Check if category exists
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        // If the image is updated, delete the old image from Cloudinary
        if (image && category.image !== image) {
            // Delete the old image from Cloudinary (if any)
            if (category.image) {
                const urlParts = category.image.split('/');
                const publicId = urlParts[urlParts.length - 1].split('.')[0];
                try {
                    await cloudinary.uploader.destroy(publicId);
                    console.log("Old category image deleted from Cloudinary.");
                } catch (deleteErr) {
                    console.warn("Failed to delete old category image from Cloudinary:", deleteErr.message);
                }
            }
        }

        // Update the category with the new data
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            categoryId,
            {
                name: name || category.name,
                parentId: parentId || category.parentId,
                image: image || category.image,
            },
            { new: true } // Return the updated document
        );

        return res.status(200).json({
            success: true,
            message: "Category updated successfully.",
            category: updatedCategory,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update category.",
            details: error.message,
        });
    }
}