import { useParams, useNavigate } from "react-router-dom";
import products from "../../content/shopContent";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // Find the product using ID
  const product = products.find((item) => item.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold">Product not found 😕</h2>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 px-4 py-2 bg-yellow-900 text-white rounded-md"
        >
          Go Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <section className="p-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-sm rounded-lg object-cover shadow-md"
        />
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          {product.name}
        </h1>
        <p className="text-lg text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-medium text-yellow-900 mb-6">
          {product.price}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 text-lg border-r"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-3 py-1 text-lg border-l"
            >
              +
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleAddToCart}
            className="bg-yellow-900 text-white px-6 py-3 rounded-md hover:bg-yellow-800 transition"
          >
            Add to Cart
          </button>

          <button
            onClick={() => addToWishlist(product)}
            className="border border-yellow-900 text-yellow-900 px-6 py-3 rounded-md hover:bg-yellow-50 transition"
          >
            Buy Now
          </button>
        </div>

        {/* Extra Details */}
        <div className="mt-8 text-gray-600 text-sm leading-relaxed">
          <h3 className="font-medium mb-2 text-gray-800">
            Delivery & Assembly:
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Free delivery within 5–7 business days.</li>
            <li>Complimentary assembly provided by professionals.</li>
            <li>Hassle-free return or exchange within 7 days.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
