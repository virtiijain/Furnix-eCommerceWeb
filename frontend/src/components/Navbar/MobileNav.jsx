import NavLinks from "./NavLinks";
import PropTypes from "prop-types";

const MobileNav = ({ isOpen, onClose, menuRef }) => (
  <div
    ref={menuRef}
    className={`absolute top-16 left-0 w-full bg-black/20 backdrop-blur-sm flex flex-col items-center space-y-4 py-4 md:hidden transition-all duration-300 z-40 ${
      isOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden"
    }`}
  >
    <ul className="flex flex-col space-y-2 text-white text-center p-4 gap-3">
      <NavLinks onClick={onClose} mobile />
    </ul>
  </div>
);

export default MobileNav;

MobileNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  menuRef: PropTypes.object.isRequired,
};
