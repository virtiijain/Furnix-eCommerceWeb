import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavLinks from "./NavLinks";
import PopupSignup from "./PopupSignup";
import PopupLogin from "./PopupLogin";
import MobileToggle from "./MobileToggle";
import MobileNav from "./MobileNav";
import { FaUserCircle } from "react-icons/fa";
import { openPopup, closePopup } from "../../redux/popupSlice";
import useOutsideClick from "../../hooks/useOutsideClick";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, popupType } = useSelector((state) => state.popup);

  // 🧠 These must come *before* using them anywhere
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  useOutsideClick(menuRef, () => setIsMobileMenuOpen(false), isMobileMenuOpen);
  useOutsideClick(dropdownRef, () => setDropdownOpen(false), dropdownOpen);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    } else {
      setUser(null);
      setToken(null);
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    setDropdownOpen(false);
  };

  return (
    <nav className="flex items-center justify-between p-4 text-black border-b relative">
      <p className="text-xl font-semibold uppercase tracking-[0.2em] text-gray-800 drop-shadow-sm">
        Furnix
      </p>

      <ul className="hidden md:flex space-x-8 font-light ml-auto">
        <NavLinks />
      </ul>

      {/* Auth Section */}
      <div className="hidden md:flex items-center gap-4 relative ml-5">
        {token ? (
          <div className="relative" ref={dropdownRef}>
            <FaUserCircle
              size={30}
              className="text-yellow-900 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <UserMenu user={user} handleLogout={handleLogout} />
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => dispatch(openPopup("login"))}
              className="border border-yellow-900 text-yellow-900 px-4 py-1 rounded-md hover:bg-yellow-900 hover:text-white transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => dispatch(openPopup("signup"))}
              className="bg-yellow-900 text-white px-4 py-1 rounded-md hover:bg-yellow-800 transition-all"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <MobileToggle onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onGetStarted={() => dispatch(openPopup("signup"))}
        menuRef={menuRef}
      />

      {/* Popups */}
      {isOpen && popupType === "signup" && (
        <PopupSignup onClose={() => dispatch(closePopup())} />
      )}
      {isOpen && popupType === "login" && (
        <PopupLogin onClose={() => dispatch(closePopup())} />
      )}
    </nav>
  );
};

export default Navbar;
