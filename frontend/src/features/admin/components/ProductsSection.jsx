import { useState } from "react";
import axios from "axios";

const ProductsSection = ({ products: initialProducts }) => {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5500/api/products/add",
        formData
      );
      setProducts([...products, res.data.product]);
      resetForm();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5500/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description || "",
    });
    setShowForm(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5500/api/products/${editingProduct._id}`,
        formData
      );
      setProducts(
        products.map((p) => (p._id === editingProduct._id ? res.data.product : p))
      );
      resetForm();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({ name: "", price: "", image: "", description: "" });
    setShowForm(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-xl lg:text-2xl font-medium text-gray-800 mb-4 tracking-tight">
          Product Management
        </h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingProduct(null);
            setFormData({ name: "", price: "", image: "", description: "" });
          }}
          className="bg-yellow-900 text-white px-5 py-2 rounded-md hover:bg-yellow-800 transition w-full sm:w-auto"
        >
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          className="bg-white shadow-md rounded-xl p-4 sm:p-6 mb-8 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-yellow-900 focus:outline-none"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-yellow-900 focus:outline-none"
            />
          </div>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-yellow-900 focus:outline-none"
          />
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-yellow-900 focus:outline-none resize-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-yellow-900 text-white px-6 py-2 rounded-md hover:bg-yellow-800 transition"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow p-4 hover:shadow-2xl transition flex flex-col justify-between"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-2 text-sm sm:text-base">
                ₹{product.price}
              </p>
              {product.description && (
                <p className="text-gray-500 text-sm line-clamp-2">
                  {product.description}
                </p>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 px-4 py-2 text-sm bg-yellow-900 text-white rounded-md hover:bg-yellow-800 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 px-4 py-2 text-sm border-2 border-red-700 text-red-700 rounded-md hover:bg-red-700 hover:text-white transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;
