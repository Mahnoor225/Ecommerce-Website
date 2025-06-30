import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, Link } from "react-router-dom";

const FilterPage = () => {
  const { subCategory } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(
    decodeURIComponent(subCategory || searchParams.get("category") || "")
  );
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);

  // Fetch products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setAllProducts(res.data.products);
        setFilteredProducts(res.data.products);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...allProducts];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    result = result.filter((p) => p.rating >= rating);

    setFilteredProducts(result);
  }, [selectedCategory, priceRange, rating, allProducts]);

  // Extract unique categories for dropdown
  const categories = [...new Set(allProducts.map((item) => item.category))];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Filter Products</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* Category Filter */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block font-semibold mb-1">Price Range</label>
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full"
          />
          <div className="text-sm mt-1">Up to ${priceRange[1]}</div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block font-semibold mb-1">Minimum Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border p-2 rounded"
          >
            <option value={0}>All</option>
            <option value={1}>1★ and up</option>
            <option value={2}>2★ and up</option>
            <option value={3}>3★ and up</option>
            <option value={4}>4★ and up</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="border rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                {product.description}
              </p>
              <div className="text-sm font-semibold">${product.price}</div>
              <div className="text-yellow-500 text-sm">★ {product.rating}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilterPage;
