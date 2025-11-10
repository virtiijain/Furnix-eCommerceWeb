import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserShield } from "react-icons/fa";
import Notification from "../../../shared/components/common/Notification";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
  });

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5500/api/adminAuth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setNotification({
          message: data.message || "Invalid credentials",
          type: "error",
        });
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      setNotification({
        message: `Welcome Admin ${data.admin?.name || ""}!`,
        type: "success",
      });

      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1200);
    } catch (err) {
      console.error(err);
      setNotification({
        message: "Something went wrong. Try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "success" })}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-6">
          <FaUserShield size={45} className="text-yellow-900 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500 text-sm text-center sm:text-left">
            Sign in to manage users, products & orders
          </p>
        </div>

        <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Admin Email"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-yellow-900 text-white py-2 rounded-md font-medium transition-all ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-yellow-800"
            }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
