import { useState } from "react";
import PropTypes from "prop-types";
import { Trash2, Eye } from "lucide-react";

const UsersSection = ({ users, fetchUsers }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      setLoadingId(userId);
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete user");

      alert("User deleted successfully");
      fetchUsers(); // refresh user list
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  const handleViewOrders = async (userId) => {
    try {
      setSelectedUser(userId);
      const res = await fetch(`/api/admin/users/${userId}/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch orders");

      setOrders(data);
      if (data.length === 0) alert("No orders for this user.");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="p-2 sm:p-4">
      <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4 tracking-tight">
        User Management
      </h2>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Role</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap">{user.name}</td>
                  <td className="py-3 px-4 text-gray-700">{user.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => handleViewOrders(user._id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-100 transition"
                    >
                      <Eye size={16} />{" "}
                      <span className="hidden sm:inline">View Orders</span>
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2 rounded-lg hover:bg-red-100 transition"
                      aria-label="Delete user"
                      disabled={loadingId === user._id}
                    >
                      <Trash2
                        size={18}
                        className={`${
                          loadingId === user._id ? "text-gray-400" : "text-red-600"
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 text-center text-gray-500 text-sm sm:text-base"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders Display */}
      {selectedUser && orders.length > 0 && (
        <div className="mt-6 bg-gray-50 rounded-xl p-4 border">
          <h3 className="text-lg font-semibold mb-3">Orders for User</h3>
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow p-4 border border-gray-100"
              >
                <p className="text-sm text-gray-600 mb-1">
                  Order ID: <span className="font-medium">{order._id}</span>
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  Total Items: {order.items.length}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

UsersSection.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
    })
  ).isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

export default UsersSection;
