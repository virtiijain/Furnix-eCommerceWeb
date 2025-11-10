import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaBars } from "react-icons/fa";

const AdminNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-yellow-900 text-white shadow-md">
      <div className="flex items-center gap-2">
        <FaUserShield className="text-white" size={24} />
        <h1 className="text-lg font-semibold tracking-wide">Furnix Admin</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="border-2 text-white px-4 py-1 rounded-md hover:bg-yellow-600 hover:text-black transition-all"
        >
          Logout
        </button>
        <button onClick={toggleSidebar} className="md:hidden">
          <FaBars size={18} />
        </button>
      </div>
    </nav>
  );
};

AdminNavbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default AdminNavbar;
