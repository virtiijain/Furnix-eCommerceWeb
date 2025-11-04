export const getWishlist = async (userId) => {
  const res = await fetch(`http://localhost:5500/api/wishlist/${userId}`);
  return res.json();
};

export const removeFromWishlist = async (userId, productId) => {
  return fetch(`http://localhost:5500/api/wishlist/${userId}/${productId}`, {
    method: "DELETE",
  });
};

export const moveToCart = async (userId, productId) => {
  const res = await fetch(`http://localhost:5500/api/cart/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity: 1 }),
  });
  return res.json();
};
