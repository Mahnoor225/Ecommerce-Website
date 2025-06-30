import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Banner from './Banner'
import axios from "axios";
// all products data 
import {
  Heart,
  RefreshCw,
  Eye,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Banner1 from "./Banner1";
import Banner3 from "./Banner3";
import Electronics from "./Electronics";
import Beauty from "./Beauty";
import Fragrances from "./Fragrances";
import Furniture from "./Furniture";
import { useDispatch } from "react-redux";
import { addtoCart } from "../../redux/action/action";

const categories = [
  "ALL",
  "FASHION",
  "ELECTRONICS",
  "BAGS",
  "FOOTWEAR",
  "GROCERIES",
  "BEAUTY",
  "WELLNESS",
];

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "ALL"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
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

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons();
      window.addEventListener("resize", checkScrollButtons);
    }

    return () => {
      if (slider) {
        slider.removeEventListener("scroll", checkScrollButtons);
      }
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  useEffect(() => {
    setTimeout(checkScrollButtons, 100);
  }, [selectedCategory, products]);

  const senditem=(product)=>{
    dispatch(addtoCart(product));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Popular Products</h1>
        <p className="text-gray-600">
          Do not miss the current offers until the end of March.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "text-white bg-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            } rounded-md`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading ? (
        <div className="text-center text-lg py-12">Loading products...</div>
      ) : (
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md opacity-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          {/* Product Slider */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 pb-6 pt-2 px-2 -mx-2 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredProducts.map((product) => (
              <div
              key={product.id}
              className="flex-shrink-0 w-[250px] bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl relative flex flex-col"
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
                </div>
              </Link>
            
              {/* Product Info */}
              <div className="flex-grow p-4">
                <h3 className="font-bold text-gray-800 text-sm">{product.title}</h3>
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
                <button
                  className="w-full py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  onClick={() => senditem(product)}
                >
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
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            } transition-opacity`}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      )}


      {/* <Electronics/> */}
      {/* <Banner/> */}
      <Banner/>
      <Beauty/>
      <Banner1/>
      <Electronics/>
        <Banner3/>
        <Beauty/>
       <Fragrances/>
       <Furniture/>
    </div>
  );
};

export default Product;
