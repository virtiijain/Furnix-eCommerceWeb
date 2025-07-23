import PropTypes from "prop-types";

const CartSummary = ({ totalPrice, clearCart }) => {
  return (
    <div className="mt-8 flex flex-col items-end">
      <h2 className="text-xl font-semibold mb-2">Total Price: ₹{totalPrice}</h2>
      <button
        onClick={clearCart}
        className="bg-yellow-900 text-white px-6 py-2 rounded-md"
      >
        Place Order
      </button>
    </div>
  );
};

CartSummary.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  clearCart: PropTypes.func.isRequired,
};

export default CartSummary;
