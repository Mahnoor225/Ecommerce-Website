import { useState, useEffect } from "react";
import axios from "axios";
import { Star, ShoppingCart, Heart, Share2, Truck } from "lucide-react";
import { useParams } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        console.log(data);
        setProduct(data);
        if (data.sizes?.length) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  if (!product) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="flex flex-col-reverse md:flex-row gap-4 lg:w-3/5">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 mt-4 md:mt-0">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`border-2 rounded cursor-pointer ${
                  selectedImage === index
                    ? "border-gray-800"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`Product thumbnail ${index + 1}`}
                  className="w-16 h-20 object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Image with Magnifier */}
          <div className="flex-1 ">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: product.title,
                  isFluidWidth: true,
                  src: product.images[selectedImage],
                },
                largeImage: {
                  src: product.images[selectedImage],
                  width: 1000,
                  height: 1000,
                },
                enlargedImageContainerStyle: {
                  background: "#fff",
                  zIndex: 10,
                  overflow: "hidden", // ⛔ Prevent scrollbars
                },
                enlargedImageContainerDimensions: {
                  width: "70%",
                  height: "60%", // Adjust this to avoid page overflow
                },
                isHintEnabled: true,
                shouldHideHintAfterFirstActivation: false,
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-2/5">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-600">
              Brands: <span className="font-medium">{product.brand}</span>
            </span>
            <div className="flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= product.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600 text-sm">
                Review ({product.reviewsCount || 0})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-gray-500 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>

          <div className="bg-green-50 text-green-700 px-3 py-2 rounded-md mb-4">
            Available In Stock:{" "}
            <span className="font-medium">{product.stock} Items</span>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Size Selection */}
          {product.sizes && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">SIZE:</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`h-10 w-10 flex items-center justify-center rounded-md border ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-900"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              QUANTITY:
            </h3>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-l-md"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number.parseInt(e.target.value) || 1)
                }
                className="w-16 h-10 border-t border-b border-gray-300 text-center"
              />
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-r-md"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
              <Heart className="h-5 w-5" />
              <span className="sr-only sm:not-sr-only">Wishlist</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
              <Share2 className="h-5 w-5" />
              <span className="sr-only sm:not-sr-only">Share</span>
            </button>
          </div>

          {/* Shipping Info */}
          <div className="flex items-center gap-2 text-gray-600 border-t border-gray-200 pt-4">
            <Truck className="h-5 w-5 text-green-600" />
            <span>Free Shipping (Est. Delivery Time 2-3 Days)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
