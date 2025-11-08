import PropTypes from "prop-types";
import { useState } from "react";
import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaChartBar,
  FaClipboardList,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ setActiveTab }) => {
  const menuItems = [
    { name: "analytics", icon: <FaChartBar /> },
    { name: "users", icon: <FaUsers /> },
    { name: "orders", icon: <FaClipboardList /> },
    { name: "products", icon: <FaBox /> },
    { name: "carts", icon: <FaShoppingCart /> },
    { name: "logout", icon: <FaSignOutAlt /> },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-900 text-white">
        <h1 className="font-bold text-xl">Admin Panel</h1>
        <button onClick={() => setIsOpen(true)}>
          <FaBars />
        </button>
      </div>

      {/* Overlay when sidebar open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-gray-900 text-white z-50
          w-64 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-64 md:h-auto flex flex-col justify-between
        `}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 hidden md:block">
            Admin Panel
          </h1>
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 text-lg cursor-pointer p-2 rounded hover:bg-gray-800 transition-colors"
              onClick={() => {
                setActiveTab(item.name);
                setIsOpen(false);
              }}
            >
              <span>{item.icon}</span>
              <span className="capitalize">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
};

export default Sidebar;
