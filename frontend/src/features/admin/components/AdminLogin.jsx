import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserShield } from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5500/api/adminAuth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      // ✅ Save token securely
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      alert(`Welcome Admin ${data.admin?.name || ""}!`);
      window.location.href = "/admin/dashboard"; 
    } catch (err) {
      setError("Something went wrong. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-[380px]"
      >
        <div className="flex flex-col items-center mb-6">
          <FaUserShield size={45} className="text-yellow-900 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Login
          </h1>
          <p className="text-gray-500 text-sm">
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

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

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
