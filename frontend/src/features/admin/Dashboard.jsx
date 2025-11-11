import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import AdminNavbar from "../admin/components/AdminNavbar";
import Notification from "../../shared/components/common/Notification";
import {
  Users,
  Package,
  ShoppingBag,
  IndianRupee,
  Mail,
  Shield,
} from "lucide-react";
import { API } from "../../api";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: 0, image: "" });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          setNotification({
            message: "Please login to continue.",
            type: "error",
          });
          setTimeout(() => (window.location.href = "/admin/login"), 1500);
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [usersRes, ordersRes, productsRes, cartsRes] = await Promise.all([
          API.get("/api/admin/users", config),
          API.get("/api/admin/orders", config),
          API.get("/api/admin/products", config),
          API.get("/api/admin/carts", config),
        ]);

        setUsers(usersRes.data);
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
        setCarts(cartsRes.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          setNotification({
            message: "Session expired. Please login again.",
            type: "error",
          });
          setTimeout(() => (window.location.href = "/admin/login"), 1500);
        } else {
          setNotification({ message: "Error fetching data.", type: "error" });
        }
      }
    };
    fetchData();
  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum +
      order.items.reduce(
        (itemSum, i) => itemSum + (i.productId?.price || 0) * i.quantity,
        0
      ),
    0
  );

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await API.delete(`/api/admin/users/${id}`, config);
      setUsers(users.filter((u) => u._id !== id));
      setOrders(orders.filter((o) => o.userId?._id !== id));
      setCarts(carts.filter((c) => c.userId?._id !== id));
      setNotification({
        message: "User deleted successfully.",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setNotification({ message: "Failed to delete user.", type: "error" });
    }
  };

  const handleViewUserOrders = async (userId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await API.get(`/api/admin/users/${userId}/orders`, config);
      setOrders(res.data);
      setSelectedUser(userId);
      setActiveTab("orders");
    } catch (err) {
      console.error(err);
      setNotification({
        message: "Failed to fetch user orders.",
        type: "error",
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await API.delete(`/api/admin/products/${id}`, config);
      setProducts(products.filter((p) => p._id !== id));
      setNotification({
        message: "Product deleted successfully.",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setNotification({ message: "Failed to delete product.", type: "error" });
    }
  };

  const handleAddProduct = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      if (!newProduct.name || !newProduct.price || !newProduct.category) {
        alert("Please fill in all required fields");
        return;
      }

      const res = await API.post(
        "/api/admin/products",
        {
          name: newProduct.name,
          price: Number(newProduct.price),
          image:
            newProduct.image ||
            "https://via.placeholder.com/300x200.png?text=Product+Image",
          category: newProduct.category,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts([...products, res.data.newProduct]);
      setNewProduct({ name: "", price: "", image: "", category: "" });
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setEditData({
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;
    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await API.put(
        `/api/admin/products/${editingProduct._id}`,
        editData,
        config
      );
      setProducts(
        products.map((p) => (p._id === editingProduct._id ? res.data : p))
      );
      setEditingProduct(null);
      setNotification({
        message: "Product updated successfully.",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setNotification({ message: "Failed to update product.", type: "error" });
    }
  };

  const renderAnalytics = () => (
    <div className="mb-10">
      <h2 className="text-xl lg:text-2xl font-medium text-gray-800 mb-8 text-center sm:text-left">
        Analytics Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center gap-5 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
          <div className="bg-blue-500 p-3 rounded-full text-white shadow-md">
            <Users size={26} />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Users</p>
            <h3 className="text-2xl font-bold text-gray-800">{users.length}</h3>
          </div>
        </div>

        <div className="flex items-center gap-5 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
          <div className="bg-green-500 p-3 rounded-full text-white shadow-md">
            <ShoppingBag size={26} />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {orders.length}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-5 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6 shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
          <div className="bg-purple-500 p-3 rounded-full text-white shadow-md">
            <Package size={26} />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Products</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {products.length}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-5 bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-6 shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
          <div className="bg-yellow-500 p-3 rounded-full text-white shadow-md">
            <IndianRupee size={26} />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Revenue</p>
            <h3 className="text-2xl font-bold text-gray-800">
              ₹{totalRevenue}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="mb-10">
      <h2 className="text-xl lg:text-2xl font-medium mb-8 text-gray-800 text-center sm:text-left">
        Users Management
      </h2>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No users found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((u) => (
            <div
              key={u._id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow">
                  {u.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {u.name}
                  </h3>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <Mail size={14} /> {u.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Shield size={16} className="text-gray-400" />
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    u.role === "admin"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {u.role || "User"}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => handleViewUserOrders(u._id)}
                  className="flex-1 px-3 py-2 bg-yellow-900 text-white rounded-lg text-sm font-medium transition"
                >
                  Orders
                </button>
                <button
                  onClick={() => handleDeleteUser(u._id)}
                  className="flex-1 px-3 py-2 border-2 border-red-700 text-black rounded-lg text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderOrders = () => (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-xl lg:text-2xl font-medium text-gray-800 text-center sm:text-left">
          Orders Overview
        </h2>
        {selectedUser && (
          <button
            onClick={() => {
              setActiveTab("users");
              setSelectedUser(null);
            }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            ← Back
          </button>
        )}
      </div>
      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        {orders.filter((o) => o.userId).length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          <table className="w-full min-w-[600px] table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                <th className="p-3 border-b">Order ID</th>
                <th className="p-3 border-b">User</th>
                <th className="p-3 border-b">Products</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((o) => o.userId)
                .map((o) => (
                  <tr
                    key={o._id}
                    className="hover:bg-gray-50 transition border-b last:border-b-0"
                  >
                    <td className="p-2">{o._id}</td>
                    <td className="p-2">{o.userId.name}</td>
                    <td className="p-2">
                      {o.items
                        .map((i) => i.productId?.name || "N/A")
                        .join(", ")}
                    </td>
                    <td className="p-2">{o.status}</td>
                    <td className="p-2 font-medium text-gray-700">
                      ₹
                      {o.items.reduce(
                        (sum, i) =>
                          sum + (i.productId?.price || 0) * i.quantity,
                        0
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  const renderProducts = () => (
    <div>
      <h2 className="text-xl lg:text-2xl font-medium text-gray-800 mb-6 text-center sm:text-left">
        Manage Products
      </h2>

      <div className="mb-6 bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Add New Product
        </h3>

        <div className="grid sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={handleAddProduct}
          className="mt-4 px-5 py-2 bg-yellow-900 text-white rounded"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-1 relative"
            >
              <img
                src={p.image || "https://via.placeholder.com/150"}
                alt={p.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                {editingProduct?._id === p._id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="border p-2 w-full rounded"
                    />
                    <input
                      type="number"
                      value={editData.price}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          price: Number(e.target.value),
                        })
                      }
                      className="border p-2 w-full rounded"
                    />
                    <input
                      type="text"
                      value={editData.image}
                      onChange={(e) =>
                        setEditData({ ...editData, image: e.target.value })
                      }
                      className="border p-2 w-full rounded"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {p.name}
                    </h3>
                    <p className="text-gray-600 mb-2">₹{p.price}</p>
                    <p className="text-gray-500 text-sm mb-2">
                      Category: {p.category}
                    </p>
                    <div className="flex justify-between gap-2 flex-wrap">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="px-5 py-1 bg-yellow-900 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p._id)}
                        className="px-5 py-1 border-2 border-red-700 text-black rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderCarts = () => (
    <div>
      <h2 className="text-xl lg:text-2xl font-medium mb-6 text-gray-800 text-center sm:text-left">
        Customers Cart
      </h2>
      <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        {carts.filter((c) => c.userId).length === 0 ? (
          <p className="text-gray-500">No carts found</p>
        ) : (
          <ul className="space-y-4 min-w-[400px]">
            {carts
              .filter((c) => c.userId)
              .map((c) => (
                <li key={c._id} className="border-b pb-2">
                  <h3 className="font-semibold text-gray-800">
                    {c.userId.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Total Items: {c.items?.length || 0}
                  </p>
                  <ul className="pl-4 mt-2 text-gray-700 text-sm list-disc">
                    {c.items?.map((item, idx) => (
                      <li key={idx}>
                        {item.productId?.name || "Unnamed Product"} — Qty:{" "}
                        {item.quantity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab === "dashboard" || activeTab === "analytics") {
      return (
        <div className="space-y-12">
          <div className="text-center mt-4 md:mt-12">
            <h2 className="text-4xl font-bold text-gray-800">
              Welcome, Admin!
            </h2>
            <p className="text-gray-500 mt-2">
              Access and manage your site’s features seamlessly.
            </p>
          </div>
          {renderAnalytics()}
        </div>
      );
    }

    switch (activeTab) {
      case "users":
        return renderUsers();
      case "orders":
        return renderOrders();
      case "products":
        return renderProducts();
      case "carts":
        return renderCarts();
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AdminNavbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          setActiveTab={setActiveTab}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "success" })}
        />
      )}
    </div>
  );
};

export default Dashboard;
