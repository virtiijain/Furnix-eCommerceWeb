import PropTypes from "prop-types";
const CartItem = ({ item, removeFromCart }) => {
  return (
    <div className="border border-slate-500 p-4 rounded-lg">
      <img
        src={item.image}
        alt={item.name}
        className="aspect-square object-cover rounded-md w-full"
      />
      <h2 className="sm:text-sm md:text-base lg:text-lg font-medium truncate mt-2">
        {item.name}
      </h2>
      <p className="text-gray-500 font-medium">
        ₹{item.price} x {item.quantity}
      </p>
      <div className="flex flex-col gap-2 mt-3">
        <button
          onClick={() => removeFromCart(item.id)}
          className="border rounded-md px-4 py-2 text-[14px] text-red-600 border-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default CartItem;
