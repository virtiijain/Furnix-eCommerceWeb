import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

const PopupSignup = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5500/auth/signup", {
        name,
        email,
        password,
      });
      
      console.log("Signup success:", res.data); // backend response
      localStorage.setItem("token", res.data.token); // JWT save in localStorage
      onClose(); // close popup
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
        <h2 className="text-xl font-medium mb-4 text-center">Create an account</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

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
            className={`bg-yellow-900 text-white font-medium py-2 px-4 rounded-md w-full mb-2 ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PopupSignup;

PopupSignup.propTypes = {
  onClose: PropTypes.func.isRequired,
};
