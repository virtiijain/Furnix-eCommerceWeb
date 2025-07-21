import { CiHeart } from 'react-icons/ci';
import { LuShoppingCart } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const WishlistCartButtons = () => {
  const { wishlist } = useWishlist();
  const { cart } = useCart();         

  return (
    <>
      <NavLink
        to="/wishlist"
        className="relative w-12 h-12 flex items-center justify-center text-2xl"
      >
        <CiHeart />
        {wishlist.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center z-50">
            {wishlist.length}
          </span>
        )}
      </NavLink>

      <NavLink
        to="/cart"
        className="relative w-12 h-12 flex items-center justify-center text-2xl"
      >
        <LuShoppingCart />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center z-50">
            {cart.length}
          </span>
        )}
      </NavLink>
    </>
  );
};

export default WishlistCartButtons;
