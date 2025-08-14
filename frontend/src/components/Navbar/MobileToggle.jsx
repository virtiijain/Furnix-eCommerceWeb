import { CiMenuFries } from "react-icons/ci";
import WishlistCartButtons from "./WishlistCartButtons";
import PropTypes from "prop-types";

const MobileToggle = ({ onToggle }) => (
  <div className="md:hidden flex items-center space-x-3">
    <div className="flex space-x-4 text-2xl">
      <WishlistCartButtons />
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
