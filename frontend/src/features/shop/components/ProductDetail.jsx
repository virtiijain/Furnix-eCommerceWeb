import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🟡 Product ID from URL:", id);

    if (!id) {
      console.log("⚠️ No ID found in URL.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5500/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        console.log("✅ Product fetched:", data);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log("❌ Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading product...</p>
      </div>
    );
  }

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

  return (
    <section className="p-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-sm rounded-lg object-cover shadow-md"
        />
      </div>

      <div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          {product.name}
        </h1>
        <p className="text-2xl font-medium text-yellow-900 mb-6">
          ₹ {product.price}
        </p>

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

        <div className="flex flex-wrap gap-4">
          <button className="bg-yellow-900 text-white px-6 py-3 rounded-md hover:bg-yellow-800 transition">
            Add to Cart
          </button>

          <button className="border border-yellow-900 text-yellow-900 px-6 py-3 rounded-md hover:bg-yellow-50 transition">
            Buy Now
          </button>
        </div>

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
