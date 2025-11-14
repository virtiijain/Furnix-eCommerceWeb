import PropTypes from "prop-types";
import { X } from "lucide-react";

const CartItem = ({ item, handleQuantityChange, handleRemove }) => {
  const getImageSrc = (image) =>
    image
      ? `${import.meta.env.VITE_BACKEND_URL}${image}`
      : `${import.meta.env.VITE_BACKEND_URL}/images/default.png`;

  return (
    <div
      key={item._id}
      className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-lg p-4 gap-4"
    >
      <div className="flex items-center gap-4">
        <img
          src={getImageSrc(item.productId?.image)}
          alt={item.productId?.name || "Product"}
          className="w-16 h-16 rounded-lg object-cover border"
        />
        <div>
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
            {item.productId?.name || "Unnamed Product"}
          </h3>
          <p className="text-xs text-gray-500">
            ₹{item.productId?.price?.toLocaleString() || "0"}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2 sm:mt-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(item.productId._id, "dec")}
            className="text-gray-700 text-lg font-semibold hover:text-yellow-900"
          >
            -
          </button>
          <span className="text-gray-800 font-medium">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.productId._id, "inc")}
            className="text-gray-700 text-lg font-semibold hover:text-yellow-900"
          >
            +
          </button>
        </div>
        <button
          onClick={() => handleRemove(item.productId._id)}
          className="text-red-500 hover:text-red-700 transition"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
CartItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    quantity: PropTypes.number,
    productId: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
    }),
  }).isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};
