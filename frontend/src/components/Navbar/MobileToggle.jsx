import { CiMenuFries } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import UserMenu from "./UserMenu";

const MobileToggle = ({ onToggle }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setDropdownOpen(false), dropdownOpen);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    setDropdownOpen(false);
    window.location.reload();
  };

  return (
    <div className="md:hidden flex items-center space-x-4 relative">
      {token && (
        <div className="relative" ref={dropdownRef}>
          <FaUserCircle
            size={28}
            className="text-yellow-900 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <UserMenu
              user={user}
              handleLogout={handleLogout}
              onClose={() => setDropdownOpen(false)}
            />
          )}
        </div>
      )}

      <button onClick={onToggle}>
        <CiMenuFries size={26} />
      </button>
    </div>
  );
};

export default MobileToggle;

MobileToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
};
