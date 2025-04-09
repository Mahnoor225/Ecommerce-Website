import { FaUser, FaHeart, FaShoppingCart, FaBell } from "react-icons/fa"

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4 mx-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* <a href="/" className="flex flex-col items-center md:items-start">
              <span className="text-2xl font-bold text-rose-600">CLASSYSHOP</span>
              <span className="text-xs text-gray-500">BIG MEGA STORE</span>
            </a> */}
            <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/logo-1691412328.jpg" alt="logo image" />
          </div>

          {/* Search bar */}
          <div className="w-full md:w-auto flex-grow max-w-xl">
            <div className="flex">
              <input
                type="text"
                placeholder="Search products here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none  "
              />
              <button className="bg-[#FF5252] text-white px-4 py-2 font-medium rounded-r-md transition-colors">
                SEARCH
              </button>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-6">
            {/* Login/Register */}
            <a href="/login" className="flex items-center gap-2 text-gray-700 transition-colors hover:text-[#FF5252]">
              <FaUser className="text-lg" />
              <span className="text-sm">Login / Register</span>
            </a>

            {/* Notification */}
            <a href="/notifications" className="relative  text-gray-700 hover:text-[#FF5252] transition-colors">
              <FaBell className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-[#FF5252] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </a>

            {/* Wishlist */}
            <a href="/wishlist" className="relative text-gray-700 hover:text-[#FF5252] transition-colors">
              <FaHeart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-[#FF5252] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </a>

            {/* Cart */}
            <a href="/cart" className="relative text-gray-700 hover:text-[#FF5252] transition-colors">
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-[#FF5252] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
