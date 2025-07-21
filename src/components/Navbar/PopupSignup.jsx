import { FaTimes } from "react-icons/fa";
import img16 from "../../assets/img16.png";
// import PropTypes from "prop-types";

const PopupSignup = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10 z-50">
    <div className="bg-white rounded-lg p-6 max-w-sm w-full relative">
      <button onClick={onClose} className="absolute top-2 right-2 text-xl">
        <FaTimes />
      </button>
      <h2 className="text-xl font-medium mb-4 text-center">Create an account</h2>
      <img src={img16} alt="Plant" className="w-24 h-24 mx-auto mb-6" />
      <h2 className="text-base font-normal mb-4 text-center">
        Let’s get your account set up
      </h2>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <button
        onClick={onClose}
        className="bg-yellow-900 text-white font-medium py-2 px-4 rounded-md w-full mb-2"
      >
        Create account
      </button>
      <label className="flex items-start text-xs font-light gap-1">
        <input type="checkbox" className="mt-1" />
        I agree to the Terms and Conditions and acknowledge the Privacy Policy
      </label>
    </div>
  </div>
);

export default PopupSignup;

