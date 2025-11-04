import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const links = [
  { path: "/", label: "Home" },
  { path: "/shop", label: "Shop" },
  { path: "/contact", label: "Contact" },
];

const NavLinks = ({ onClick, mobile = false }) => (
  <>
    {links.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        onClick={onClick}
        className={({ isActive }) =>
          `${isActive ? "text-yellow-900" : "text-black"} ${
            mobile ? "hover:text-black" : "hover:text-yellow-900"
          }`
        }
      >
        <li className="cursor-pointer duration-200">{link.label}</li>
      </NavLink>
    ))}
  </>
);

export default NavLinks;

NavLinks.propTypes = {
  onClick: PropTypes.func,
  mobile: PropTypes.bool,
};
