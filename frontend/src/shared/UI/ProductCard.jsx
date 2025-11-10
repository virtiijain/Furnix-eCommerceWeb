import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="border border-slate-500 p-4 rounded-lg hover:shadow-md transition">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square object-cover rounded-md w-full cursor-pointer"
        />
      </Link>

      <h2 className="sm:text-sm md:text-base lg:text-lg font-medium truncate mt-2">
        {product.name}
      </h2>
      <p className="text-gray-500 font-medium mb-2">₹{product.price}</p>

      <div className="flex flex-col gap-2 mt-3">
        <button
          onClick={onAddToCart}
          className="border rounded-md px-4 py-2 text-[14px] text-white bg-yellow-900 hover:bg-yellow-800 transition"
        >
          Add to Cart
        </button>
        <button
          onClick={onAddToWishlist}
          className="border rounded-md px-4 py-2 text-[14px] text-yellow-900 border-yellow-800 hover:bg-yellow-50 transition"
        >
          Wishlist
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onAddToWishlist: PropTypes.func.isRequired,
};

export default ProductCard;
