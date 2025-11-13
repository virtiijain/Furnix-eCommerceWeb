import PropTypes from "prop-types";
import { X } from "lucide-react";

const OrderSummary = ({ cartItems, onQuantityChange, onRemove }) => (
  <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>

    <div className="divide-y">
      {cartItems.map((item, index) => (
        <div
          key={item._id || index}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-3"
        >
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${
                item.productId?.image
              }`}
              alt={item.productId?.name}
              className="w-16 h-16 sm:w-14 sm:h-14 rounded-lg border object-cover"
            />
            <div>
              <p className="font-medium text-gray-800 text-sm sm:text-base">
                {item.productId?.name}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                ₹{item.productId?.price}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex items-center border rounded-lg text-sm">
              <button
                onClick={() => onQuantityChange(index, -1)}
                className="px-2 py-1 text-gray-700 hover:text-yellow-900"
              >
                −
              </button>
              <span className="px-3 text-gray-800 font-medium">
                {item.quantity || 1}
              </span>
              <button
                onClick={() => onQuantityChange(index, 1)}
                className="px-2 py-1 text-gray-700 hover:text-yellow-900"
              >
                +
              </button>
            </div>

            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
            >
              <X size={14} />
              <span className="hidden sm:inline">Remove</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

OrderSummary.propTypes = {
  cartItems: PropTypes.array.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default OrderSummary;
