import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart, RefreshCw, Eye, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addtoCart } from "../../redux/action/action";

const Electronics = () => {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://dummyjson.com/products/category/smartphones"
      );
      setProducts(data.products);
    };
    fetchData();
  }, []);

  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const senditem = (product) => {
    dispatch(addtoCart(product));
  };

  return (
    <section className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6">Smartphones</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const discountedPrice = (
            product.price -
            (product.price * product.discountPercentage) / 100
          ).toFixed(0);

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 relative group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
                {product.discountPercentage}% OFF
              </div>

              {/* Product Image */}
              <div className="relative h-36 px-4 py-2 flex items-center justify-center overflow-hidden rounded-t-2xl">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-full w-20 object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 truncate">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center mt-3">
                  <span className="text-gray-400 line-through text-sm mr-2">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-gray-900 font-bold">
                    ₹{discountedPrice}
                  </span>
                </div>
                <button
                  onClick={() => senditem(product)}
                  className="mt-4 w-full py-2 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  ADD TO CART
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Electronics;
