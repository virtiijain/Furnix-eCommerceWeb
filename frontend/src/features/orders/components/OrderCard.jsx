import { Package, Clock, MapPin } from "lucide-react";
import PropTypes from "prop-types";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Package className="w-5 h-5 text-yellow-900" />
          Order #{order._id.slice(-6)}
        </h3>
        <span className="text-sm text-gray-500 flex items-center gap-1">
          <Clock className="w-4 h-4" />{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="border-t pt-3 space-y-3">
        {order.items.map((item) => (
          <div key={item._id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={item.productId?.image}
                alt={item.productId?.name}
                className="w-14 h-14 rounded-lg border object-cover"
              />
              <div>
                <p className="font-medium text-gray-700">
                  {item.productId?.name}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity || 1}
                </p>
              </div>
            </div>
            <span className="font-medium text-gray-800">
              ₹{item.productId?.price}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600 border-t pt-3">
        <p className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-yellow-900" />
          {order.address}
        </p>
        <p className="font-medium text-gray-800">
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
