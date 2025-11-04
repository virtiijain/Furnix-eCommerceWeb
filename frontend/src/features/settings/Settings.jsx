import { useState } from "react";
import ProfileSection from "./components/ProfileSection";
import LanguageSection from "./components/LanguageSection";
import NotificationSection from "./components/NotificationSection";
import PasswordSection from "./components/PasswordSection";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "Virti Jain",
    email: "virti@example.com",
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
    <section className="min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm">
        <h2 className="text-3xl font-medium text-gray-800 mb-6">Settings</h2>

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

        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-yellow-900 text-white px-6 py-3 rounded-lg hover:bg-yellow-800 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
