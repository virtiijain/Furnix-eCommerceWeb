import { useEffect, useState } from "react";
import { Heart, X } from "lucide-react";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const userId = "674c72c24fd99b0fbd908a11";

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch(`http://localhost:5500/api/wishlist/${userId}`);
        const data = await res.json();
        setWishlistItems(data.items || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await fetch(`http://localhost:5500/api/wishlist/${userId}/${productId}`, {
        method: "DELETE",
      });
      setWishlistItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleMoveToCart = async (productId) => {
    try {
      await fetch(`http://localhost:5500/api/cart/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      handleRemove(productId);
    } catch (err) {
      console.error("Error moving to cart:", err);
    }
  };

  return (
    <section className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800 flex items-center gap-2">
          My Wishlist
        </h2>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <Heart className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border overflow-x-auto">
            {/* Desktop Table */}
            <table className="w-full text-left hidden md:table">
              <thead>
                <tr className="border-b">
                  <th className="pb-4"></th>
                  <th className="pb-4 text-gray-500 font-medium">Products</th>
                  <th className="pb-4 text-gray-500 font-medium text-center">Price</th>
                  <th className="pb-4 text-gray-500 font-medium text-center">Stock</th>
                  <th className="pb-4 text-gray-500 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-4 text-center">
                      <button
                        onClick={() => handleRemove(item.productId._id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <X size={18} />
                      </button>
                    </td>
                    <td className="py-4 flex items-center gap-4">
                      <img
                        src={item.productId?.image}
                        alt={item.productId?.name}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {item.productId?.name}
                        </h3>
                      </div>
                    </td>
                    <td className="py-4 text-center font-medium text-gray-800">
                      ₹{item.productId?.price}
                    </td>
                    <td className="py-4 text-center text-green-600 font-medium">
                      In Stock
                    </td>
                    <td className="py-4 text-center">
                      <button
                        onClick={() => handleMoveToCart(item.productId._id)}
                        className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition"
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Layout */}
            <div className="space-y-4 md:hidden">
              {wishlistItems.map((item) => (
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
                      <p className="text-gray-500 text-xs">
                        ₹{item.productId?.price}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleMoveToCart(item.productId._id)}
                    className="bg-black text-white text-xs px-3 py-2 rounded-md hover:bg-gray-800 transition"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
