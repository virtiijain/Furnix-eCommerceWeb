import { FaArrowRight } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import img16 from "../assets/img16.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
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

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  useEffect(() => {
    if (isPopupOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isPopupOpen]);
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleGetStarted = () => {
    setIsPopupOpen(true);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white text-black border-b">
      {/* LOGO */}
      <div className="text-lg font-medium uppercase">Modern Art Furnish</div>

      {/* LINKS */}
      <div className="hidden md:flex space-x-8 font-light">
        <ul className="flex space-x-7 duration-200">
          <a href="#home">
            <li className="cursor-pointer hover:text-purplish">Home</li>
          </a>
          <a href="#shop">
            <li className="cursor-pointer hover:text-purplish">Shop</li>
          </a>
          <a href="#categories">
            <li className="cursor-pointer hover:text-purplish">Categories</li>
          </a>
          <a href="#faq">
            <li className="cursor-pointer hover:text-purplish">FAQ</li>
          </a>
        </ul>
      </div>

      {/* BUTTONS */}
      <div className="hidden md:flex space-x-4">
      <button className="text-2xl hover:bg-purplish hover:text-white rounded-full  p-2 duration-200">
          <CiSearch />
          </button>
        <button
          onClick={handleGetStarted}
          className="flex items-center px-4 py-2 bg-purplish rounded-full text-white font-normal hover:bg-transparent hover:text-black duration-200"
        >
          Get Started&nbsp;
          <FaArrowRight />
        </button>
      </div>

      {/* POPUP SIGNUP */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <button
              onClick={handleClosePopup}
              className="absolute top-90 right-90 mt-1"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-medium mb-4 text-center">
              Create an account
            </h2>
            <img src={img16} alt="Plant" className="w-24 h-24 mx-auto mb-6 " />
            <h2 className=" text-base font-normal mb-4 text-center">
              lets get your account set up
            </h2>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md p-2 "
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md p-2 "
              />
            </div>

            <button
              onClick={handleClosePopup}
              className="bg-purplish text-white font-medium py-2 px-4 rounded-md w-full mb-2"
            >
              Create account
            </button>
            <input
              type="checkbox"
              id="myCheckbox"
              className="w-3 h-3 border border-gray-300 rounded-md bg-gray-100 focus:ring-1 focus:ring-blue-500"
            />
            <label htmlFor="myCheckbox" className="ml-1 text-xs font-light">
              I agree to the Terms and Conditions of Furniture and acknowledge
              the Privacy Policy
            </label>
          </div>
        </div>
      )}

      {/*Mobile Menu Button */}
      <div className="md:hidden ">
      <button className="text-2xl hover:bg-purplish hover:text-white rounded-full p-2 duration-200 mr-3">
        <CiSearch />
          </button>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <CiMenuFries size={24} />
      </button>
      </div>

      {/* Mobile Menu */}
      <div ref={menuRef}
        className={`absolute top-16 left-0 w-full bg-purplish text-white flex flex-col items-center space-y-4 py-4 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col space-y-2 text-center p-4 gap-3">
        <a href="#home">
            <li className="cursor-pointer hover:text-black duration-200">Home</li>
          </a>
          <a href="#shop">
            <li className="cursor-pointer hover:text-black duration-200">Shop</li>
          </a>
          <a href="#categories">
            <li className="cursor-pointer hover:text-black duration-200">Categories</li>
          </a>
          <a href="#faq">
            <li className="cursor-pointer hover:text-black duration-200">FAQ</li>
          </a>
          <button
          onClick={handleGetStarted}
          className="flex items-center rounded-full text-white font-normal  hover:text-black duration-200">
          Get Started&nbsp;
          <FaArrowRight />
        </button>
        </ul>
      </div>

    </nav>
  );
};

export default Navbar;
