import NavLinks from "./NavLinks";
import { FaArrowRight } from "react-icons/fa6";

const MobileNav = ({ isOpen, onClose, onGetStarted, menuRef }) => (
  <div
    ref={menuRef}
    className={`absolute top-16 left-0 w-full bg-yellow-900 text-white flex flex-col items-center space-y-4 py-4 md:hidden transition-all duration-300 z-40 ${
      isOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden"
    }`}
  >
    <ul className="flex flex-col space-y-2 text-center p-4 gap-3">
      <NavLinks onClick={onClose} mobile />
      <button
        onClick={onGetStarted}
        className="flex items-center rounded-full text-white font-normal hover:text-black duration-200"
      >
        Get Started&nbsp;<FaArrowRight />
      </button>
    </ul>
  </div>
);

export default MobileNav;
