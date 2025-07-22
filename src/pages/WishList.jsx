import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeWishlist } = useWishlist();

  const totalPrice = wishlist.reduce(
    (acc, item) => acc + parseFloat(item.price.replace(",", "")),
    0
  );

  return (
    <div className="min-h-screen p-9">
      <h2 className="text-2xl font-normal mb-2">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-sm">No items in wishlist.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {wishlist.map((product, index) => (
              <div
                key={index}
                className="border border-slate-500 p-4 rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-square object-cover rounded-md w-full"
                />
                <h2 className="sm:text-sm md:text-base lg:text-lg font-medium truncate">
                  {product.name}
                </h2>
                <p className="text-gray-500 font-medium mb-2">
                  {product.price}
                </p>

                <div className="flex flex-col gap-2 mt-3">
                  <button
                    // onClick={() => addToCart(product)}
                    className="border rounded-md px-4 py-2 text-sm text-white bg-yellow-900"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeWishlist(product.id)}
                    className="border rounded-md px-4 py-2 text-sm text-red-600 border-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold">
              Total Price: ₹ {totalPrice.toLocaleString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;