import { CiMenuFries } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import UserMenu from "../User/UserMenu";

const MobileToggle = ({ onToggle, user, token, handleLogout, showNotification }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setDropdownOpen(false), dropdownOpen);

  useEffect(() => {
    if (!token || !user) {
      setDropdownOpen(false);
    }
  }, [token, user]);

  return (
    <div className="md:hidden flex items-center space-x-4 relative">
      {token && user ? (
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
              showNotification={showNotification}
            />
          )}
        </div>
      ) : null}

      <button onClick={onToggle}>
        <CiMenuFries size={26} />
      </button>
    </div>
  );
};

MobileToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default MobileToggle;
