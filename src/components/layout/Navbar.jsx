import { FaArrowRight } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import img16 from "../../assets/img16.png";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { wishlist } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isPopupOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isPopupOpen]);

  const handleClosePopup = () => setIsPopupOpen(false);
  const handleGetStarted = () => setIsPopupOpen(true);

  return (
    <nav className="flex items-center justify-between p-4 bg-white text-black border-b">
      {/* Logo */}
      <p className="text-lg font-medium uppercase">Modern Art Furnish</p>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-8 font-light ml-auto">
        <ul className="flex space-x-7 duration-200">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-yellow-900" : "text-black"
            }
          >
            <li className="cursor-pointer hover:text-yellow-900">Home</li>
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? "text-yellow-900" : "text-black"
            }
          >
            <li className="cursor-pointer hover:text-yellow-900">Shop</li>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-yellow-900" : "text-black"
            }
          >
            <li className="cursor-pointer hover:text-yellow-900">Contact</li>
          </NavLink>
        </ul>
      </div>

      {/* Buttons */}
      <div className="hidden ml-3 md:flex space-x-4">
        <NavLink
          to="/wishlist"
          className="relative w-12 h-12 flex items-center justify-center text-2xl border hover:bg-yellow-900 hover:text-white rounded-full duration-200"
        >
          <div className="relative">
            <CiHeart />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] sm:text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
        </NavLink>
        <NavLink
          to="/cart"
          className="relative w-12 h-12 flex items-center justify-center text-2xl border hover:bg-yellow-900 hover:text-white rounded-full duration-200"
        >
          <div className="relative">
            <LuShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] sm:text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </NavLink>
        <button
          onClick={handleGetStarted}
          className="flex items-center px-4 py-2 bg-yellow-900 border rounded-full text-white font-normal hover:bg-transparent hover:text-black duration-200"
        >
          Get Started&nbsp;
          <FaArrowRight />
        </button>
      </div>

      {/* Popup Signup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-xl"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-medium mb-4 text-center">
              Create an account
            </h2>
            <img src={img16} alt="Plant" className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-base font-normal mb-4 text-center">
              Lets get your account set up
            </h2>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button
              onClick={handleClosePopup}
              className="bg-yellow-900 text-white font-medium py-2 px-4 rounded-md w-full mb-2"
            >
              Create account
            </button>
            <label className="flex items-start text-xs font-light gap-1">
              <input type="checkbox" className="mt-1" />I agree to the Terms and
              Conditions and acknowledge the Privacy Policy
            </label>
          </div>
        </div>
      )}

      {/* Mobile Nav Toggle */}
      <div className="md:hidden flex items-center space-x-3">
        <button className="text-2xl hover:bg-yellow-900 hover:text-white rounded-full p-2 duration-200">
          <CiHeart />
        </button>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <CiMenuFries size={24} />
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        ref={menuRef}
        className={`absolute top-16 left-0 w-full bg-yellow-900 text-white flex flex-col items-center space-y-4 py-4 md:hidden transition-all duration-300 z-40 ${
          isMobileMenuOpen
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col space-y-2 text-center p-4 gap-3">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <li className="cursor-pointer hover:text-black duration-200">
              Home
            </li>
          </NavLink>
          <NavLink to="/shop" onClick={() => setIsMobileMenuOpen(false)}>
            <li className="cursor-pointer hover:text-black duration-200">
              Shop
            </li>
          </NavLink>
          <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <li className="cursor-pointer hover:text-black duration-200">
              Contact
            </li>
          </NavLink>
          <button
            onClick={handleGetStarted}
            className="flex items-center rounded-full text-white font-normal hover:text-black duration-200"
          >
            Get Started&nbsp;
            <FaArrowRight />
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
