import { useEffect } from "react";
import PropTypes from "prop-types";

const Notification = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 2000); // auto-dismiss
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow font-medium z-50
        ${
          type === "success"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-900"
        }
        max-w-xs w-full text-center`}
    >
      {message}
    </div>
  );
};

// Prop types
Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]),
  onClose: PropTypes.func.isRequired,
};

export default Notification;
