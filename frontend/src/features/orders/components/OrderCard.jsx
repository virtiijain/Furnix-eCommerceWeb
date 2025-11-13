import { Package, Clock, MapPin } from "lucide-react";
import PropTypes from "prop-types";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white border rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 sm:gap-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Package className="w-5 h-5 text-yellow-900" />
          Order #{order._id.slice(-6).toUpperCase()}
        </h3>
        <span className="text-sm text-gray-500 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="border-t pt-3 space-y-3">
        {order.items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={`${item.productId?.image}?v=${Date.now()}`}
                alt={item.productId?.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border object-cover"
              />
              <div className="flex flex-col">
                <p className="font-medium text-gray-700">
                  {item.productId?.name}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity || 1}
                </p>
              </div>
            </div>
            <span className="font-medium text-gray-800 mt-2 sm:mt-0">
              ₹{item.productId?.price.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-600 border-t pt-3 gap-2 sm:gap-0">
        <p className="flex items-center gap-1 text-gray-600">
          <MapPin className="w-4 h-4 text-yellow-900" />
          {order.address || "No Address"}
        </p>
        <p className="font-semibold text-gray-800">
          Total: ₹{order.totalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    address: PropTypes.string,
    totalPrice: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        productId: PropTypes.shape({
          image: PropTypes.string,
          name: PropTypes.string,
          price: PropTypes.number,
        }),
        quantity: PropTypes.number,
      })
    ),
  }).isRequired,
};

export default OrderCard;
