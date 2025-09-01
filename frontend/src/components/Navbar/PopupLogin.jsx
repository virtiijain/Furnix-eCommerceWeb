import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

const PopupLogin = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5500/login", {
        email,
        password,
      });
      // Handle successful login (e.g., save token in localStorage, or cookies)
      console.log(response.data);
      onClose(); // Close popup after success
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          <FaTimes />
        </button>
        <h2 className="text-xl font-medium mb-4 text-center">Login</h2>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`bg-yellow-900 text-white font-medium py-2 px-4 rounded-md w-full mb-2 ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PopupLogin;

PopupLogin.propTypes = {
  onClose: PropTypes.func.isRequired,
};
