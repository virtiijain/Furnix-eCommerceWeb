const Products = () => {
  const products = [
    { name: "Minimal Sofa", price: "$299", image: "https://via.placeholder.com/200" },
    { name: "Wooden Table", price: "$199", image: "https://via.placeholder.com/200" },
    { name: "Modern Chair", price: "$149", image: "https://via.placeholder.com/200" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product, index) => (
        <div key={index} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
