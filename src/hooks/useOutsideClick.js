import { useEffect } from "react";

const useOutsideClick = (ref, callback, condition = true) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target) && condition) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback, condition]);
};

export default useOutsideClick;