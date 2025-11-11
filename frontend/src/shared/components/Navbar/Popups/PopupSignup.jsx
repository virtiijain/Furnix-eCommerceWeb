import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { useState } from "react";
import Notification from "../../common/Notification"; 
import { API } from "../../../../api";

const PopupSignup = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/signup", { name, email, password });

      const { token, user } = res.data;

      if (!token || !user?._id) {
        throw new Error("Signup response incomplete. Please login manually.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const userName = user?.name || user?.email || "User";
      setNotification({ message: `Welcome, ${userName}`, type: "success" });
      setTimeout(() => {
        setNotification({ message: "", type: "success" });
        onClose();
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Something went wrong");
      setNotification({
        message: err.response?.data?.message || "Something went wrong",
        type: "error",
      });

      setTimeout(() => setNotification({ message: "", type: "success" }), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10 z-50">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "success" })}
      />

      <div className="bg-white rounded-lg p-6 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={22} />
        </button>
        <h2 className="text-xl font-medium mb-4 text-center">
          Create an account
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md p-2 mb-3"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md p-2 mb-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md p-2 mb-3"
            required
          />

          <button
            type="submit"
            className={`bg-yellow-900 text-white font-medium py-2 px-4 rounded-md w-full mb-2 ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </section>
  );
};

PopupSignup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PopupSignup;
