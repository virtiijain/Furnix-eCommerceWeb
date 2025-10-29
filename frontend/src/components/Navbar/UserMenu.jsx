import PropTypes from "prop-types";
import {
  FiShoppingBag,
  FiHeart,
  FiShoppingCart,
  FiSettings,
  FiMapPin,
  FiCreditCard,
  FiHelpCircle,
  FiLogOut,
  FiTrendingUp,
} from "react-icons/fi";

const UserMenu = ({ user, handleLogout }) => {
  return (
    <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 animate-fadeIn">
      {/* User Header */}
      <div className="px-4 py-3 border-b flex items-center gap-3">
        <div className="w-10 h-10 bg-yellow-900 text-white flex items-center justify-center rounded-full font-semibold">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="font-medium text-gray-800">
            Hello, {user?.name?.split(" ")[0] || "User"} 👋
          </p>
          <p className="text-xs text-gray-500 cursor-pointer hover:underline">
            Manage your account
          </p>
        </div>
      </div>

      {/* Menu Options */}
      <div className="flex flex-col text-gray-700 text-sm">
        <MenuButton icon={<FiShoppingBag />} label="My Orders" />
        <MenuButton icon={<FiHeart />} label="Wishlist" />
        <MenuButton icon={<FiShoppingCart />} label="My Cart" />
        <MenuButton icon={<FiSettings />} label="Settings" />
        <MenuButton icon={<FiMapPin />} label="Address Book" />
        <MenuButton icon={<FiCreditCard />} label="Payment Methods" />
        <MenuButton icon={<FiHelpCircle />} label="Help / Support" />
        <MenuButton icon={<FiTrendingUp />} label="Become a Seller" />
      </div>

      {/* Logout */}
      <div className="border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 font-medium"
        >
          <FiLogOut /> Sign Out
        </button>
      </div>
    </div>
  );
};

// ✅ Reusable Menu Button Component
const MenuButton = ({ icon, label }) => (
  <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
    {icon}
    {label}
  </button>
);

MenuButton.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

UserMenu.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
};

export default UserMenu;
