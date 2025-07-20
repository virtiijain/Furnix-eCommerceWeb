import { useCart } from "../context/CartContext";
import { useEffect } from "react";

const Cart = () => {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();
  useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
}, [cart]);

  return (
    <div className="min-h-screen p-9">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border border-slate-500 p-4 rounded-lg"
              >
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
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-8 flex flex-col items-end">
            <h2 className="text-xl font-semibold mb-2">
              Total Price: ₹{totalPrice}
            </h2>
            <button
              onClick={clearCart}
              className="bg-green-700 text-white px-6 py-2 rounded-md"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
