import { FaUser, FaHeart, FaShoppingCart, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";  // Ensure you import the Menu icon correctly
import { logout } from "../../redux/AuthSlice";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handlelogout = () => {
    dispatch(logout());
  }

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4 mx-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/logo-1691412328.jpg" alt="logo image" />
          </div>

          {/* Search bar */}
          <div className="w-full md:w-auto flex-grow max-w-xl">
            <div className="flex">
              <input
                type="text"
                placeholder="Search products here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button className="bg-[#FF5252] text-white px-4 py-2 font-medium rounded-r-md transition-colors">
                SEARCH
              </button>
            </div>
          </div>

          {/* User actions */}
          {user ? (
            <span className="text-sm text-gray-700 group">
              <div className="flex items-center gap-2">
              <FaUser className="text-lg" />
               <div>
             <span className="text-black font-semibold">Welcome, </span>
             <span className="font-semibold text-[#FF5252]">{user.name}</span><br />
            <span className="text-gray-500 font-medium">{user.email}</span>
           </div>
           </div>
              {/* Menu Dropdown */}
              <div className="relative group">
                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48 p-2 border border-gray-300 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 ease-in-out ">

                  <Link to="/profile" className="block py-2 rounded-sm text-center  px-4 text-sm text-gray-700 hover:bg-black hover:text-white bg-[#FF5252] text-white">
                    Profile
                  </Link>
                  <Link to="/my-list" className="block py-2 rounded-sm text-center  px-4 text-sm text-gray-700 hover:bg-black hover:text-white bg-[#FF5252] text-white my-2">
                    My List
                  </Link>
                  <button className="block py-2 px-4 text-sm w-full rounded-sm text-gray-700 hover:bg-black hover:text-white bg-[#FF5252] text-white" onClick={handlelogout}>
                    Logout
                  </button>
                </div>
              </div>
            </span>
          ) : (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-700 transition-colors hover:text-[#FF5252]">
                <FaUser className="text-lg" />
                <Link to="/login" className="text-sm hover:text-[#FF5252]">Login</Link>
                <span className="text-sm">/</span>
                <Link to="/register" className="text-sm hover:text-[#FF5252]">Register</Link>
              </div>
            </div>
          )}

          {/* Notification */}
          <Link to="/" className="relative text-gray-700 hover:text-[#FF5252] transition-colors">
            <FaBell className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-[#FF5252] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
          </Link>

          {/* Wishlist */}
          <a href="/wishlist" className="relative text-gray-700 hover:text-[#FF5252] transition-colors">
            <FaHeart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-[#FF5252] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
          </a>

          {/* Cart */}
          <a href="/cart" className="relative text-gray-700 hover:text-[#FF5252] transition-colors">
            <FaShoppingCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-[#FF5252] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
