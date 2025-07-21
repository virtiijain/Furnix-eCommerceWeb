import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlistItems");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  const addToWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
