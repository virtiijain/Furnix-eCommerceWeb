import { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import Notification from "../../../shared/components/common/Notification";
import ProductCard from "../../../shared/UI/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [notification, setNotification] = useState({ message: "", type: "success" });

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = localStorage.getItem("token");
  const userId = user?._id;
  const isLoggedIn = Boolean(userId && token);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setNotification({ message: "Failed to fetch products!", type: "error" });
      }
    };
    fetchProducts();
  }, []);

  const handleAction = async (url, method, body, successMsg, errorMsg) => {
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || errorMsg);
      setNotification({ message: successMsg, type: "success" });
    } catch (err) {
      console.error(errorMsg, err);
      setNotification({ message: errorMsg, type: "error" });
    }
  };

  const handleAddToCart = (productId) => {
    if (!isLoggedIn)
      return setNotification({ message: "Please login first!", type: "error" });

    handleAction(
      "http://localhost:5500/api/cart",
      "POST",
      { userId, productId, quantity: 1 },
      "Product added to cart!",
      "Error adding to cart!"
    );
  };

  const handleAddToWishlist = (productId) => {
    if (!isLoggedIn)
      return setNotification({ message: "Please login first!", type: "error" });

    handleAction(
      "http://localhost:5500/api/wishlist",
      "POST",
      { userId, productId },
      "Added to wishlist!",
      "Error adding to wishlist!"
    );
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

        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "", type: "success" })}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() => handleAddToCart(product._id)}
              onAddToWishlist={() => handleAddToWishlist(product._id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
