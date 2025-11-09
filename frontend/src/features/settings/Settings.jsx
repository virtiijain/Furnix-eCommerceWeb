import { useState } from "react";
import ProfileSection from "./components/ProfileSection";
import LanguageSection from "./components/LanguageSection";
import NotificationSection from "./components/NotificationSection";
import PasswordSection from "./components/PasswordSection";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    language: "English",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Saved settings:", formData);
    alert("Settings saved successfully!");
  };

  return (
    <section className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        <h2 className="text-xl md:text-2xl font-medium mb-6 text-gray-800 text-left">
          Settings
        </h2>

        <div className="space-y-8">
          <ProfileSection
            name={formData.name}
            email={formData.email}
            onChange={handleChange}
          />

          <LanguageSection
            language={formData.language}
            onChange={handleChange}
          />

          <NotificationSection
            notifications={formData.notifications}
            onChange={handleChange}
          />

          <PasswordSection />
        </div>

        <div className="mt-8 sm:mt-10 flex justify-center sm:justify-end">
          <button
            onClick={handleSave}
            className="w-full sm:w-auto bg-yellow-900 text-white px-6 py-3 rounded-lg hover:bg-yellow-800 transition text-sm sm:text-base"
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
