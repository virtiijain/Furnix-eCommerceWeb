import WishlistItem from "./WishlistItem";
import PropTypes from "prop-types";

const WishlistList = ({ wishlist, removeWishlist }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
      {wishlist.map((product, index) => (
        <WishlistItem
          key={index}
          product={product}
          removeWishlist={removeWishlist}
        />
      ))}
    </div>
  );
};

WishlistList.propTypes = {
  wishlist: PropTypes.array.isRequired,
  removeWishlist: PropTypes.func.isRequired,
};

export default WishlistList;
