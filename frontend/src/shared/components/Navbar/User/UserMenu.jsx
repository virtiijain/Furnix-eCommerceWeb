import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiHeart, FiShoppingCart, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import PropTypes from "prop-types";

const UserMenu = ({ user, handleLogout, showNotification }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    handleLogout();
    if (showNotification) {
      showNotification("You have successfully logged out!", "success");
    }
    navigate("/"); 
  };

  return (
    <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 animate-fadeIn">
      <div className="px-4 py-3 border-b flex items-center gap-3">
        <div className="w-10 h-10 bg-yellow-900 text-white flex items-center justify-center rounded-full font-semibold">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="font-medium text-gray-800">
            Hello, {user?.name ? user.name.split(" ")[0] : "User"} 
          </p>
          <p
            onClick={() => navigate("/account")}
            className="text-xs text-gray-500 cursor-pointer hover:underline"
          >
            Manage your account
          </p>
        </div>
      </div>

      <div className="flex flex-col text-gray-700 text-sm">
        <MenuButton icon={<FiShoppingBag />} label="My Orders" onClick={() => navigate("/orders")} />
        <MenuButton icon={<FiHeart />} label="Wishlist" onClick={() => navigate("/wishlist")} />
        <MenuButton icon={<FiShoppingCart />} label="My Cart" onClick={() => navigate("/cart")} />
        <MenuButton icon={<FiSettings />} label="Settings" onClick={() => navigate("/settings")} />
        <MenuButton icon={<FiHelpCircle />} label="Help / Support" onClick={() => navigate("/help")} />
      </div>

      <div className="border-t">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 font-medium"
        >
          <FiLogOut /> Sign Out
        </button>
      </div>
    </div>
  );
};

const MenuButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left"
  >
    {icon}
    {label}
  </button>
);

MenuButton.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

UserMenu.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default UserMenu;
