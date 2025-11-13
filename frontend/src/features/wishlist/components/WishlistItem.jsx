import PropTypes from "prop-types";
import { X } from "lucide-react";

const WishlistItem = ({ item, onRemove, onMoveToCart }) => {
  return (
    <tr key={item._id} className="border-b hover:bg-gray-50 transition">
      <td className="py-4 text-center">
        <button
          onClick={() => onRemove(item.productId._id)}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <X size={18} />
        </button>
      </td>
      <td className="py-4 flex items-center gap-4">
        <img
  src={`${import.meta.env.VITE_BACKEND_URL}/images/${item.productId?.image}?v=${Date.now()}`}
  alt={item.productId?.name}
  className="w-16 h-16 rounded-lg object-cover border"
/>
        <div>
          <h3 className="font-semibold text-gray-800">
            {item.productId?.name}
          </h3>
        </div>
      </td>
      <td className="py-4 text-center font-medium text-gray-800">
        ₹{item.productId?.price}
      </td>
      <td className="py-4 text-center text-green-600 font-medium">In Stock</td>
      <td className="py-4 text-center">
        <button
          onClick={() => onMoveToCart(item.productId._id)}
          className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </td>
    </tr>
  );
};

export default WishlistItem;
WishlistItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    productId: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string,
      price: PropTypes.number,
    }),
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onMoveToCart: PropTypes.func.isRequired,
};
