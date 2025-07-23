import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavLinks from "./NavLinks";
import PopupSignup from "./PopupSignup";
import MobileToggle from "./MobileToggle";
import MobileNav from "./MobileNav";
import DesktopButtons from "./DesktopButtons";
import { openPopup, closePopup } from "../../redux/popupSlice";
import useOutsideClick from "../../hooks/useOutsideClick";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state) => state.popup.isOpen);
  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => setIsMobileMenuOpen(false), isMobileMenuOpen);

  return (
    <nav className="flex items-center justify-between p-4 text-black border-b">
      <p className="text-xl font-semibold uppercase tracking-[0.2em] text-gray-800 drop-shadow-sm">
        Furnix
      </p>

      <ul className="hidden md:flex space-x-8 font-light ml-auto">
        <NavLinks />
      </ul>

      <DesktopButtons />

      <MobileToggle onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onGetStarted={() => dispatch(openPopup())}
        menuRef={menuRef}
      />

      {isPopupOpen && <PopupSignup onClose={() => dispatch(closePopup())} />}
    </nav>
  );
};

export default Navbar;
