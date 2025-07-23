import PropTypes from "prop-types";

const WishlistSummary = ({ totalPrice }) => {
  return (
    <div className="text-right">
      <p className="text-lg font-semibold">
        Total Price: ₹ {totalPrice.toLocaleString()}
      </p>
    </div>
  );
};

WishlistSummary.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default WishlistSummary;
