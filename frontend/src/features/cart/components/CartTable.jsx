import PropTypes from "prop-types";
import { X } from "lucide-react";

const CartTable = ({ cartItems, handleQuantityChange, handleRemove }) => {
  const getImageSrc = (product) =>
    product?.image
      ? `${import.meta.env.VITE_BACKEND_URL}/${product.image.replace(
          /^\/+/,
          ""
        )}`
      : `${import.meta.env.VITE_BACKEND_URL}/images/default.png`;

  return (
    <table className="w-full text-left hidden md:table">
      <thead>
        <tr className="border-b">
          <th className="pb-4 text-gray-500 font-medium">Product</th>
          <th className="pb-4 text-gray-500 font-medium text-center">
            Quantity
          </th>
          <th className="pb-4 text-gray-500 font-medium text-center">Price</th>
          <th className="pb-4 text-gray-500 font-medium text-center">Remove</th>
        </tr>
      </thead>

      <tbody>
        {cartItems.map((item) => (
          <tr key={item._id} className="border-b hover:bg-gray-50 transition">
            <td className="py-4 flex items-center gap-4">
              <img
                src={getImageSrc(item.productId)}
                alt={item.productId?.name || "Product"}
                className="w-16 h-16 rounded-lg object-cover border"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {item.productId?.name || "Unnamed Product"}
                </h3>
                <p className="text-sm text-gray-500">Product Code</p>
              </div>
            </td>

            <td className="py-4 text-center">
              <div className="inline-flex items-center justify-center gap-2 border border-gray-300 rounded-md px-3 py-1 shadow-sm bg-gray-50 hover:bg-gray-100 transition">
                <button
                  onClick={() =>
                    handleQuantityChange(item.productId._id, "dec")
                  }
                  className="text-gray-700 text-lg font-semibold hover:text-yellow-900"
                >
                  -
                </button>
                <span className="text-gray-800 font-medium min-w-[24px] inline-block text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.productId._id, "inc")
                  }
                  className="text-gray-700 text-lg font-semibold hover:text-yellow-900"
                >
                  +
                </button>
              </div>
            </td>

            <td className="py-4 text-center font-medium text-gray-800">
              ₹{(item.productId?.price * item.quantity).toLocaleString() || "0"}
            </td>

            <td className="py-4 text-center">
              <button
                onClick={() => handleRemove(item.productId._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <X size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;

CartTable.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      quantity: PropTypes.number,
      productId: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.string,
        price: PropTypes.number,
      }),
    })
  ).isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};
