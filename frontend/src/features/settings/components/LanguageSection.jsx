import { Globe } from "lucide-react";
import PropTypes from "prop-types";

const LanguageSection = ({ language, onChange }) => (
  <div>
    <h3 className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-4">
      <Globe className="w-5 h-5 text-gray-500" /> Language
    </h3>
    <select
      name="language"
      value={language}
      onChange={onChange}
      className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
    >
      <option>English</option>
      <option>Hindi</option>
      <option>Spanish</option>
      <option>French</option>
    </select>
  </div>
);

LanguageSection.propTypes = {
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LanguageSection;
