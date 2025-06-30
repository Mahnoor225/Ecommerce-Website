import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Heart,
  RefreshCw,
  Eye,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { addtoCart } from "../../redux/action/action";
import { useDispatch } from "react-redux";
const Furniture = () => {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const sliderRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("https://dummyjson.com/products/category/furniture");
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

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const senditem=(product)=>{
    dispatch(addtoCart(product));
  }

  return (
    <section className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Furniture</h2>
      <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        {/* Product Slider */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 pb-6 pt-2 px-2 -mx-2 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
              <div
                className="flex-shrink-0 w-[250px] bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl relative"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discountPercentage}% OFF
                </div>

                {/* Product Image */}
                <Link to={`/product/${product.id}`} key={product.id}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover Actions */}
                  <div
                    className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                      hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        wishlist.includes(product.id)
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-800 hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          wishlist.includes(product.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                      <RefreshCw className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-800">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.description.slice(0, 50)}...
                  </p>
                  <div className="flex items-center mb-3">
                    <span className="text-gray-400 line-through text-sm mr-2">
                      ₹{product.price?.toLocaleString()}
                    </span>
                    <span className="text-gray-900 font-bold">
                      ₹
                      {(
                        product.price -
                        (product.price * product.discountPercentage) / 100
                      )?.toFixed(0)}
                    </span>
                  </div>
                  <button className="w-full py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2" onClick={() => senditem(product)}>
                    <ShoppingCart className="w-4 h-4" />
                    ADD TO CART
                  </button>
                </div>
              </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>
    </section>
  );
};

export default Furniture;
