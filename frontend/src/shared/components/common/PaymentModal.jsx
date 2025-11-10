import { useState } from "react";
import PropTypes from "prop-types";

const PaymentModal = ({ onClose, onConfirm, totalPrice }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      onConfirm(); 
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] sm:w-96 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment</h2>

        <p className="text-gray-600 mb-4">
          Total payable amount:{" "}
          <span className="font-semibold text-gray-900">
            ₹{totalPrice.toLocaleString()}
          </span>
        </p>

        <select className="w-full border rounded-lg p-2 mb-5 text-sm focus:ring-2 focus:ring-yellow-900 focus:outline-none">
          <option>UPI</option>
          <option>Credit/Debit Card</option>
          <option>Net Banking</option>
          <option>Cash on Delivery</option>
        </select>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-yellow-900 text-white py-2 rounded-lg hover:bg-yellow-800 transition"
        >
          {loading ? "Processing Payment..." : "Confirm Payment"}
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;

PaymentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};
