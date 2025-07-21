import { CiHeart, CiMenuFries } from "react-icons/ci";

const MobileToggle = ({ onToggle }) => (
  <div className="md:hidden flex items-center space-x-3">
    <button className="text-2xl hover:bg-yellow-900 hover:text-white rounded-full p-2 duration-200">
      <CiHeart />
    </button>
    <button onClick={onToggle}>
      <CiMenuFries size={24} />
    </button>
  </div>
);

export default MobileToggle;
