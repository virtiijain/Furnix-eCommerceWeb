import { CiMenuFries } from "react-icons/ci";
import { HiOutlineHeart, HiOutlineShoppingBag } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const MobileToggle = ({ onToggle }) => (
  <div className="md:hidden flex items-center space-x-3">
    <div className="flex space-x-4 text-2xl">
      <NavLink
        to="/wishlist"
        className="hover:bg-yellow-900 hover:text-white p-2 rounded-full duration-200"
      >
        <HiOutlineHeart />
      </NavLink>
      <NavLink
        to="/cart"
        className="hover:bg-yellow-900 hover:text-white p-2 rounded-full duration-200"
      >
        <HiOutlineShoppingBag />
      </NavLink>
    </div>

    <button onClick={onToggle}>
      <CiMenuFries size={24} />
    </button>
  </div>
);

export default MobileToggle;

MobileToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
};
