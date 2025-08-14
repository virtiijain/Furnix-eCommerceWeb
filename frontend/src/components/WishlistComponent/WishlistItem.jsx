import PropTypes from "prop-types";

const WishlistItem = ({ product, removeWishlist }) => {
  return (
    <div className="border border-slate-500 p-4 rounded-lg">
      <img
        src={product.image}
        alt={product.name}
        className="aspect-square object-cover rounded-md w-full"
      />
      <h2 className="sm:text-sm md:text-base lg:text-lg font-medium truncate">
        {product.name}
      </h2>
      <p className="text-gray-500 font-medium mb-2">{product.price}</p>

      <div className="flex flex-col gap-2 mt-3">
        <button className="border rounded-md px-4 py-2 text-sm text-white bg-yellow-900">
          Add to Cart
        </button>
        <button
          onClick={() => removeWishlist(product.id)}
          className="border rounded-md px-4 py-2 text-sm text-red-600 border-red-400"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

WishlistItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.any.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  removeWishlist: PropTypes.func.isRequired,
};

export default WishlistItem;
