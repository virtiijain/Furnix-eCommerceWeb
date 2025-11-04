import { Lock } from "lucide-react";

const PasswordSection = () => (
  <div>
    <h3 className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-4">
      <Lock className="w-5 h-5 text-gray-500" /> Change Password
    </h3>
    <div className="grid sm:grid-cols-2 gap-4">
      <input
        type="password"
        placeholder="Current Password"
        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
      />
      <input
        type="password"
        placeholder="New Password"
        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  </div>
);

export default PasswordSection;
