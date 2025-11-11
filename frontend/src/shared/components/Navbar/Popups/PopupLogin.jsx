import { useState } from "react";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { API } from "../../../../api";

const PopupLogin = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "success" });

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await API.post("/auth/login", { email, password });

    const data = await res.json();
    console.log(data.user);

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      const userName = data.user?.name || data.user?.email || "User";

      setNotification({ message: `Welcome back, ${userName}!`, type: "success" });

      setTimeout(() => {
        setNotification({ message: "", type: "success" });
        onClose();
        window.location.reload();
      }, 1500);
    } else {
      setNotification({ message: data.message || "Invalid credentials", type: "error" });
      setTimeout(() => setNotification({ message: "", type: "success" }), 3000);
    }
  } catch (err) {
    console.error(err);
    setNotification({ message: "Something went wrong. Try again later.", type: "error" });
    setTimeout(() => setNotification({ message: "", type: "success" }), 3000);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-80 relative">
        <h2 className="text-xl font-semibold mb-4 text-center">Sign In</h2>

        {notification.message && (
          <div
            className={`p-2 rounded-md mb-3 text-sm text-center font-medium ${
              notification.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {notification.message}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`bg-yellow-900 text-white py-2 rounded-md transition-all ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-yellow-800"
            }`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={22} />
        </button>
      </div>
    </div>
  );
};

PopupLogin.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PopupLogin;
