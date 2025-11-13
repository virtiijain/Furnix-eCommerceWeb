import { API } from "./api"; 

export const addToCart = async (userId, product) => {
  try {
    const res = await API.post("/api/cart", {
      userId,
      productId: product.productId || product._id,
      quantity: product.quantity || 1,
    });
    return res.data;
  } catch (err) {
    console.error("Error adding to cart:", err);
    throw err;
  }
};
