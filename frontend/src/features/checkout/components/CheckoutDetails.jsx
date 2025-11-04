import PropTypes from "prop-types";
import { MapPin } from "lucide-react";

const CheckoutDetails = ({ address, setAddress, totalPrice, onConfirm }) => (
  <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border h-fit">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">
      Delivery & Payment
    </h3>

    <label className="block mb-3 text-gray-700 text-sm font-medium">
      <MapPin className="inline w-4 h-4 mr-2" />
      Delivery Address
    </label>
    <textarea
      className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-yellow-900 focus:outline-none mb-4"
      placeholder="Enter your full address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      rows={3}
    />

    <div className="flex justify-between mb-4">
      <span className="text-gray-600">Total</span>
      <span className="font-semibold text-gray-800">
        ₹{totalPrice.toLocaleString()}
      </span>
    </div>

    <button
      onClick={onConfirm}
      className="w-full bg-yellow-900 text-white py-3 rounded-lg hover:bg-yellow-800 transition text-sm sm:text-base"
    >
      Confirm Order
    </button>
  </div>
);

CheckoutDetails.propTypes = {
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default CheckoutDetails;
