import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterBar from "./FilterBar";
import Notification from "../../../shared/components/common/Notification";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
  });

  // Get userId + token safely
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = localStorage.getItem("token");
  const userId = user?._id;

  const isLoggedIn = Boolean(userId && token);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setNotification({
          message: "Failed to fetch products!",
          type: "error",
        });
      }
    };
    fetchProducts();
  }, []);

  // Add to Cart
  const handleAddToCart = async (productId) => {
    if (!isLoggedIn) {
      setNotification({ message: "Please login first!", type: "error" });
      return;
    }

    try {
      const res = await fetch("http://localhost:5500/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, productId, quantity: 1 }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add to cart");

      setNotification({ message: "Product added to cart!", type: "success" });
      console.log("Cart Updated:", data);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setNotification({ message: "Error adding to cart!", type: "error" });
    }
  };

  // Add to Wishlist
  const handleAddToWishlist = async (productId) => {
    if (!isLoggedIn) {
      setNotification({ message: "Please login first!", type: "error" });
      return;
    }

    try {
      const res = await fetch("http://localhost:5500/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, productId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add to wishlist");

      setNotification({ message: "Added to wishlist!", type: "success" });
      console.log("Wishlist Updated:", data);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      setNotification({ message: "Error adding to wishlist!", type: "error" });
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="shop" className="min-h-screen p-8">
      <div className="max-w-8xl mx-auto">
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Notification */}
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "", type: "success" })}
          />
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border border-slate-500 p-4 rounded-lg hover:shadow-md transition"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-square object-cover rounded-md w-full cursor-pointer"
                />
              </Link>

              <h2 className="sm:text-sm md:text-base lg:text-lg font-medium truncate mt-2">
                {product.name}
              </h2>
              <p className="text-gray-500 font-medium mb-2">₹{product.price}</p>

              <div className="flex flex-col gap-2 mt-3">
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="border rounded-md px-4 py-2 text-[14px] text-white bg-yellow-900 hover:bg-yellow-800 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddToWishlist(product._id)}
                  className="border rounded-md px-4 py-2 text-[14px] text-yellow-900 border-yellow-800 hover:bg-yellow-50 transition"
                >
                  Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
