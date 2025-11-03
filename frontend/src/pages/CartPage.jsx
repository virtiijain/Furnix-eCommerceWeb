import { useEffect, useState } from "react";
import { ShoppingCart, X } from "lucide-react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = "674c72c24fd99b0fbd908a11";

  // 🧠 Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:5500/api/cart/${userId}`);
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  // 💰 Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.productId?.price || 0),
    0
  );

  // 🗑️ Remove from cart
  const handleRemove = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:5500/api/cart/${userId}/${productId}`,
        { method: "DELETE" }
      );
      await res.json();

      setCartItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleProceedToBuy = () => {
    alert("Redirecting to checkout 🧾 — integrate payment next!");
  };

  return (
    <section className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">My Cart</h2>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-[2fr,1fr] gap-8">
            {/* 🧱 Cart Table */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border overflow-x-auto">
              {/* Table for desktop */}
              <table className="w-full text-left hidden md:table">
                <thead>
                  <tr className="border-b">
                    <th className="pb-4 text-gray-500 font-medium">Product</th>
                    <th className="pb-4 text-gray-500 font-medium text-center">Quantity</th>
                    <th className="pb-4 text-gray-500 font-medium text-center">Price</th>
                    <th className="pb-4 text-gray-500 font-medium text-center">Remove</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-4 flex items-center gap-4">
                        <img
                          src={item.productId?.image}
                          alt={item.productId?.name}
                          className="w-16 h-16 rounded-lg object-cover border"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.productId?.name}</h3>
                          <p className="text-sm text-gray-500">Product Code</p>
                        </div>
                      </td>

                      <td className="py-4 text-center">
                        <div className="inline-flex items-center border rounded-md px-3 py-1">
                          <button className="text-gray-600">−</button>
                          <span className="mx-2 text-gray-700">1</span>
                          <button className="text-gray-600">+</button>
                        </div>
                      </td>

                      <td className="py-4 text-center font-medium text-gray-800">
                        ₹{item.productId?.price || "N/A"}
                      </td>

                      <td className="py-4 text-center">
                        <button
                          onClick={() => handleRemove(item.productId._id)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Remove item"
                        >
                          <X size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Card layout for mobile */}
              <div className="space-y-4 md:hidden">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between border rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.productId?.image}
                        alt={item.productId?.name}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {item.productId?.name}
                        </h3>
                        <p className="text-gray-500 text-xs">₹{item.productId?.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.productId._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 💵 Checkout Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border h-fit">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Total</h3>
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
                className="w-full bg-yellow-900 text-white py-3 rounded-lg hover:bg-yellow-800 transition"
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
