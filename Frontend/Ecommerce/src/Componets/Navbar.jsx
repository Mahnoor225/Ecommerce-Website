import { FaUser, FaHeart, FaShoppingCart, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/AuthSlice";
import { useState } from "react";
import { ChevronDown, Menu as LucideMenu, ShoppingBag, X } from "lucide-react";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleSubmenu = (category) => {
    setActiveSubmenu(activeSubmenu === category ? null : category);
  };

  const categories = [
    { name: "Fashion", subcategories: ["Men's Clothing", "Women's Clothing", "Kids", "Accessories"] },
    { name: "Electronics", subcategories: ["Smartphones", "Laptops", "Audio", "Accessories"] },
    { name: "Bags", subcategories: ["Handbags", "Backpacks", "Travel Bags", "Wallets"] },
    { name: "Footwear", subcategories: ["Men's Shoes", "Women's Shoes", "Sports", "Casual"] },
    { name: "Groceries", subcategories: ["Fresh Food", "Packaged Food", "Beverages", "Household"] },
    { name: "Beauty", subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances"] },
    { name: "Wellness", subcategories: ["Fitness", "Supplements", "Personal Care", "Health Devices"] },
    { name: "Jewellery", subcategories: ["Necklaces", "Earrings", "Rings", "Bracelets"] },
  ];

  return (
    <div>
      {/* Top Navbar */}
      <header className="w-full shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4 mx-10">
            {/* Logo */}
            <Link to="/">
              <div className="flex-shrink-0">
                <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/logo-1691412328.jpg" alt="logo" />
              </div>
            </Link>

            {/* Search bar */}
            <div className="w-full md:w-auto flex-grow max-w-xl">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search products here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                />
                <button className="bg-[#FF5252] text-white px-4 py-2 font-medium rounded-r-md">SEARCH</button>
              </div>
            </div>

            {/* User actions */}
            {user ? (
              <div className="relative group text-sm text-gray-700">
                <div className="flex items-center gap-2 cursor-pointer">
                  <FaUser className="text-lg" />
                  <div>
                    <span className="text-black font-semibold">Welcome, </span>
                    <span className="font-semibold text-[#FF5252]">{user.name}</span><br />
                    <span className="text-gray-500 font-medium">{user.email}</span>
                  </div>
                </div>

                <div className="absolute left-0  z-20 bg-white shadow-lg rounded-lg w-48 p-2 border border-gray-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
                  <Link to="/myaccount" className="block py-2 text-center text-sm text-white bg-[#FF5252] hover:bg-black rounded-sm">Profile</Link>
                  <Link to="/my-list" className="block py-2 text-center text-sm text-white bg-[#FF5252] hover:bg-black rounded-sm my-2">My List</Link>
                  <button onClick={handleLogout} className="block w-full py-2 text-sm text-white bg-[#FF5252] hover:bg-black rounded-sm">Logout</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-700 hover:text-[#FF5252]">
                <FaUser className="text-lg" />
                <Link to="/login" className="text-sm">Login</Link>
                <span className="text-sm">/</span>
                <Link to="/register" className="text-sm">Register</Link>
              </div>
            )}

            {/* Icons */}
            <Link to="/" className="relative text-gray-700 hover:text-[#FF5252]">
              <FaBell className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-[#FF5252] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Link>

            <Link to="/wishlist" className="relative text-gray-700 hover:text-[#FF5252]">
              <FaHeart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-[#FF5252] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Link>

            <Link to="/cart" className="relative text-gray-700 hover:text-[#FF5252]">
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-[#FF5252] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Second Navbar */}
      <nav className="bg-white shadow-md border-t-2 border-gray-200">
       
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-lg font-medium">SHOP BY Categories</div>

            {/* Desktop nav */}
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              {categories.map((category) => (
                <div key={category.name} className="relative group">
                  <button
                    className="text-gray-700 hover:text-gray-900 flex items-center"
                    onClick={() => toggleSubmenu(category.name)}
                  >
                    {category.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 w-43 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                   {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        to={`/category/${category.name.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {sub}
                      </Link>
                    ))}
                
                  </div>
                </div>
              ))}
            </div>

            {/* Icons and mobile toggle */}
            <div className="flex items-center">
              <button className="p-2 text-gray-700 hover:text-gray-900">
                <ShoppingBag className="h-6 w-6" />
              </button>
              <button className="ml-4 md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <LucideMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">Home</Link>
              {categories.map((category) => (
                <div key={category.name}>
                  <button
                    className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => toggleSubmenu(category.name)}
                  >
                    {category.name}
                    <ChevronDown className={`h-4 w-4 transition-transform ${activeSubmenu === category.name ? "rotate-180" : ""}`} />
                  </button>
                  {activeSubmenu === category.name && (
                    <div className="pl-6 space-y-1">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          to={`/category/${category.name.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
