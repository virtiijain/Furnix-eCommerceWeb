import { HiOutlineHeart, HiOutlineShoppingBag } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const WishlistCartButtons = () => {
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  return (
    <>
      <NavLink
        to="/wishlist"
        className="relative flex items-center justify-center text-2xl w-10 h-10 sm:w-12 sm:h-12"
      >
        <HiOutlineHeart />
        {wishlist.length > 0 && (
          <span className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full z-50">
            {wishlist.length}
          </span>
        )}
      </NavLink>

      <NavLink
        to="/cart"
        className="relative flex items-center justify-center text-2xl w-10 h-10 sm:w-12 sm:h-12"
      >
        <HiOutlineShoppingBag />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full z-50">
            {cart.length}
          </span>
        )}
      </NavLink>
    </>
  );
};

export default WishlistCartButtons;
