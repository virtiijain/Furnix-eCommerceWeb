import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import NavLinks from "./NavLinks";
import WishlistCartButtons from "./WishlistCartButtons";
import PopupSignup from "./PopupSignup";
import MobileToggle from "./MobileToggle";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isPopupOpen) setIsMobileMenuOpen(false);
  }, [isPopupOpen]);

  return (
    <nav className="flex items-center justify-between p-4 text-black border-b">
      <p className="text-lg font-medium uppercase">Modern Art Furnish</p>

      <ul className="hidden md:flex space-x-8 font-light ml-auto">
        <NavLinks />
      </ul>

      <div className="hidden ml-3 md:flex space-x-4">
        <WishlistCartButtons />
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex items-center px-4 py-2 bg-yellow-900 border rounded-full text-white font-normal hover:bg-transparent hover:text-black duration-200"
        >
          Get Started&nbsp;<FaArrowRight />
        </button>
      </div>

      <MobileToggle onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onGetStarted={() => setIsPopupOpen(true)}
        menuRef={menuRef}
      />

      {isPopupOpen && <PopupSignup onClose={() => setIsPopupOpen(false)} />}
    </nav>
  );
};

export default Navbar;
