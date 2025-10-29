import FilterBar from "./FilterBar";
import products from "../../content/shopContent.jsx";
import { useState } from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section id="shop" className="min-h-screen p-8">
      <div className="max-w-8xl mx-auto">
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div key={index} className="border border-slate-500 p-4 rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square object-cover rounded-md w-full"
              />
              <h2 className="sm:text-sm md:text-base lg:text-lg font-medium truncate">
                {product.name}
              </h2>
              <p className="text-gray-500 font-medium mb-2">{product.price}</p>

              <div className="flex flex-col gap-2 mt-3">
                <button
                  onClick={() => addToCart(product)}
                  className="border rounded-md px-4 py-2 text-[14px] text-white bg-yellow-900"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => addToWishlist(product)}
                  className="border rounded-md px-4 py-2 text-[14px] text-yellow-900 border-yellow-800"
                >
                  WishList
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

