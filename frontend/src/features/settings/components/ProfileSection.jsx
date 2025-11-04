import { User } from "lucide-react";
import PropTypes from "prop-types";

const ProfileSection = ({ name, email, onChange }) => (
  <div>
    <h3 className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-4">
      <User className="w-5 h-5 text-gray-500" /> Profile
    </h3>
    <div className="grid sm:grid-cols-2 gap-4">
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Full Name"
        className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  </div>
);

ProfileSection.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProfileSection;
