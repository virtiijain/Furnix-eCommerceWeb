import { useEffect, useState, useMemo } from "react";

export const useCart = (userId) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:5500/api/cart/${userId}`);
        const data = await res.json();
        const updatedItems = (data.items || []).map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCartItems(updatedItems);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [userId]);

  const handleQuantityChange = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId._id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const handleRemove = async (productId) => {
    try {
      await fetch(`http://localhost:5500/api/cart/${userId}/${productId}`, {
        method: "DELETE",
      });
      setCartItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) =>
          acc + (item.productId?.price || 0) * (item.quantity || 1),
        0
      ),
    [cartItems]
  );

  return { cartItems, setCartItems, handleQuantityChange, handleRemove, totalPrice };
};
