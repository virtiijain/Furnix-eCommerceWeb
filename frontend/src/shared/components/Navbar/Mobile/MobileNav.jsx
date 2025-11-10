import NavLinks from "../NavLinks";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { openPopup } from "../../../redux/popupSlice";

const MobileNav = ({ isOpen, onClose, menuRef }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  return (
    <div
      ref={menuRef}
      className={`absolute top-16 left-0 w-full bg-black/30 backdrop-blur-sm flex flex-col items-center space-y-4 py-4 md:hidden transition-all duration-300 z-40 ${
        isOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden"
      }`}
    >
      <ul className="flex flex-col space-y-3 text-white text-center p-4 gap-3">
        <NavLinks onClick={onClose} mobile />
      </ul>

      {!token && (
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={() => {
              dispatch(openPopup("login"));
              onClose();
            }}
            className="border text-sm border-yellow-900 text-yellow-900 bg-white px-4 py-1 rounded-md hover:bg-yellow-900 hover:text-white transition-all"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              dispatch(openPopup("signup"));
              onClose();
            }}
            className="text-sm bg-yellow-900 text-white px-4 py-1 rounded-md hover:bg-yellow-800 transition-all"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileNav;

MobileNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  menuRef: PropTypes.object.isRequired,
};
