import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import {
  getWishlist,
  removeFromWishlist,
} from "../../api/wishlist";
import { addToCart } from "../../cartapi"; 
import Notification from "../../shared/components/common/Notification";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "success" });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const id = user?._id;
    setUserId(id);

    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await getWishlist(id);
        setWishlistItems(data.items || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchData();
  }, []);

  const handleRemove = async (productId) => {
    if (!userId) return showNotification("Login first!", "error");
    try {
      await removeFromWishlist(userId, productId);
      setWishlistItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
      showNotification("Item removed from wishlist", "success");
    } catch (err) {
      console.error("Error removing item:", err);
      showNotification("Failed to remove item", "error");
    }
  };

  const handleMoveToCart = async (product) => {
    if (!userId) return showNotification("Login first!", "error");
    try {
      await addToCart(userId, {
        productId: product._id,
        quantity: 1,
      });

      await handleRemove(product._id);

      showNotification(`${product.name} added to cart!`, "success");
    } catch (err) {
      console.error("Error moving to cart:", err);
      showNotification("Failed to add to cart", "error");
    }
  };

  return (
    <section className="min-h-screen p-4 sm:p-6 bg-gray-50">
      {/* Notification */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "success" })}
        />
      )}

      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-medium mb-6 text-gray-800 text-center sm:text-left">
          My WishList
        </h2>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <Heart className="w-20 h-20 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow p-6 border overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-4"></th>
                    <th className="pb-4 text-gray-500 font-medium">Products</th>
                    <th className="pb-4 text-gray-500 font-medium text-center">
                      Price
                    </th>
                    <th className="pb-4 text-gray-500 font-medium text-center">
                      Stock
                    </th>
                    <th className="pb-4 text-gray-500 font-medium text-center">
                      Actions
                    </th>
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
                          X
                        </button>
                      </td>
                      <td className="py-4 flex items-center gap-4">
                        <img
                          src={`${item.productId?.image}?v=${Date.now()}`}
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
                          onClick={() => handleMoveToCart(item.productId)}
                          className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition"
                        >
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="flex flex-col gap-4 md:hidden">
              {wishlistItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border"
                >
                  <div className="flex items-start sm:items-center gap-4 w-full">
                    <img
                      src={`${item.productId?.image}?v=${Date.now()}`}
                      alt={item.productId?.name}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                        {item.productId?.name}
                      </h3>
                      <p className="text-gray-500 mt-1">₹{item.productId?.price}</p>
                      <p className="text-green-600 mt-1 font-medium">In Stock</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                    <button
                      onClick={() => handleMoveToCart(item.productId)}
                      className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(item.productId._id)}
                      className="text-red-500 border border-red-500 hover:bg-red-50 text-sm px-4 py-2 rounded-md transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
