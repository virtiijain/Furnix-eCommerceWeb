import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import WishlistItem from "../wishlist/components/WishlistItem";
import {
  getWishlist,
  removeFromWishlist,
  moveToCart,
} from "../../api/wishlist";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const id = user?._id;
  setUserId(id);

  if (!userId) {
    console.warn("No user logged in — can't fetch wishlist");
    return;
  }

  const fetchData = async () => {
    try {
      const data = await getWishlist(id);
      setWishlistItems(data.items || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  fetchData();
}, [userId]); // this can stay empty since userId comes from localStorage


  const handleRemove = async (productId) => {
    if (!userId) return alert("Login first!");
    try {
      await removeFromWishlist(userId, productId);
      setWishlistItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleMoveToCart = async (productId) => {
    if (!userId) return alert("Login first!");
    try {
      const data = await moveToCart(userId, productId);
      if (data) await handleRemove(productId);
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
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th></th>
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
                  <WishlistItem
                    key={item._id}
                    item={item}
                    onRemove={handleRemove}
                    onMoveToCart={handleMoveToCart}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
