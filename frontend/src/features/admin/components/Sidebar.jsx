import PropTypes from "prop-types";
import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaChartBar,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = ({ setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { name: "analytics", icon: <FaChartBar /> },
    { name: "users", icon: <FaUsers /> },
    { name: "orders", icon: <FaClipboardList /> },
    { name: "products", icon: <FaBox /> },
    { name: "carts", icon: <FaShoppingCart /> },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full bg-yellow-900 text-white z-50
          w-64 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-64 md:h-auto flex flex-col
        `}
      >
        <div className="p-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Admin Panel
          </h2>
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 text-lg cursor-pointer p-2 rounded hover:bg-yellow-700 transition-colors"
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
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;
