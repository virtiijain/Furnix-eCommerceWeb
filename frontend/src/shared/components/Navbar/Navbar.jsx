import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavLinks from "./NavLinks";
import PopupSignup from "./Popups/PopupSignup";
import PopupLogin from "./Popups/PopupLogin";
import MobileToggle from "./Mobile/MobileToggle";
import MobileNav from "./Mobile/MobileNav";
import { FaUserCircle } from "react-icons/fa";
import { openPopup, closePopup } from "../../redux/popupSlice";
import useOutsideClick from "../../hooks/useOutsideClick";
import UserMenu from "./User/UserMenu";
import Notification from "../common/Notification";
import { API } from "../../../api";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
  });
  const dispatch = useDispatch();
  const { isOpen, popupType } = useSelector((state) => state.popup);

  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  useOutsideClick(menuRef, () => setIsMobileMenuOpen(false), isMobileMenuOpen);
  useOutsideClick(dropdownRef, () => setDropdownOpen(false), dropdownOpen);

  useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    API.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
          setToken(storedToken);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          setToken(null);
        }
      })
      .catch((err) => console.error(err));
  }
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
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

      <div className="hidden md:flex items-center gap-4 relative ml-5">
        {token ? (
          <div className="relative" ref={dropdownRef}>
            <FaUserCircle
              size={30}
              className="text-yellow-900 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <UserMenu
                user={user}
                handleLogout={handleLogout}
                showNotification={(msg, type) =>
                  setNotification({ message: msg, type })
                }
              />
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

      <MobileToggle
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        user={user}
        token={token}
        handleLogout={handleLogout}
        showNotification={(msg, type) =>
          setNotification({ message: msg, type })
        }
      />
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onGetStarted={() => dispatch(openPopup("signup"))}
        menuRef={menuRef}
      />

      {isOpen && popupType === "signup" && (
        <PopupSignup onClose={() => dispatch(closePopup())} />
      )}
      {isOpen && popupType === "login" && (
        <PopupLogin onClose={() => dispatch(closePopup())} />
      )}

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "success" })}
      />
    </nav>
  );
};

export default Navbar;
