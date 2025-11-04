import { FaArrowRight } from "react-icons/fa6";
import WishlistCartButtons from "./WishlistCartButtons";
import { useDispatch } from "react-redux";
import { openPopup } from "../../shared/redux/popupSlice";

const DesktopButtons = () => {
  const dispatch = useDispatch();
  return (
    <div className="hidden ml-3 md:flex space-x-4">
      <WishlistCartButtons />
      <button
        onClick={() => dispatch(openPopup())}
        className="flex items-center px-4 py-2 bg-yellow-900 border rounded-full text-white font-normal hover:bg-yellow-800 duration-200"
      >
        Get Started&nbsp;
        <FaArrowRight />
      </button>
    </div>
  );
};

export default DesktopButtons;
