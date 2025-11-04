import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterBar from "./FilterBar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [message, setMessage] = useState("");

  // fake logged-in user (replace with real auth later)
  const userId = "674c72c24fd99b0fbd908a11";

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Add to Cart
  const handleAddToCart = async (productId) => {
    try {
      const res = await fetch("http://localhost:5500/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity: 1 }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      const data = await res.json();
      setMessage("Product added to cart!");
      console.log("Cart Updated:", data);

      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setMessage("Error adding to cart!");
    }
  };

  // ✅ Add to Wishlist
  const handleAddToWishlist = async (productId) => {
    try {
      const res = await fetch("http://localhost:5500/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });

      if (!res.ok) throw new Error("Failed to add to wishlist");

      const data = await res.json();
      setMessage("Added to wishlist!");
      console.log("Wishlist Updated:", data);

      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      setMessage("Error adding to wishlist!");
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

        {message && (
          <div className="bg-green-100 text-green-800 p-2 rounded-md mb-4 text-sm">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  className="border rounded-md px-4 py-2 text-[14px] text-white bg-yellow-900"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddToWishlist(product._id)}
                  className="border rounded-md px-4 py-2 text-[14px] text-yellow-900 border-yellow-800"
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
