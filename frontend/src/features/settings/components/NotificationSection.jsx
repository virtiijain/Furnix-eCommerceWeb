import { Bell } from "lucide-react";
import PropTypes from "prop-types";

const NotificationSection = ({ notifications, onChange }) => (
  <div>
    <h3 className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-4">
      <Bell className="w-5 h-5 text-gray-500" /> Notifications
    </h3>
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        name="notifications"
        checked={notifications}
        onChange={onChange}
        className="w-5 h-5 text-black accent-black"
      />
      <span className="text-gray-600">Receive email notifications</span>
    </label>
  </div>
);

NotificationSection.propTypes = {
  notifications: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NotificationSection;
