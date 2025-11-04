import PropTypes from "prop-types";

const SummaryCard = ({ totalPrice, handleProceedToBuy }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border h-fit sticky top-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Total Summary
      </h3>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Sub-Total</span>
        <span className="font-medium text-gray-800">
          ₹{totalPrice.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between mb-6">
        <span className="text-gray-600">Delivery</span>
        <span className="text-sm text-gray-500">Free</span>
      </div>

      <button
        onClick={handleProceedToBuy}
        className="w-full bg-yellow-900 text-white py-3 rounded-lg hover:bg-yellow-800 transition text-sm sm:text-base"
      >
        Check Out
      </button>
    </div>
  );
};

export default SummaryCard;

SummaryCard.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  handleProceedToBuy: PropTypes.func.isRequired,
};
