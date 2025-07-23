import WishlistList from "../components/WishlistComponent/WishlistList";
import WishlistSummary from "../components/WishlistComponent/WishlistSummary";
import { useWishlist } from "../context/WishlistContext";
import { Helmet } from "react-helmet";

const Wishlist = () => {
  const { wishlist, removeWishlist } = useWishlist();

  const totalPrice = wishlist.reduce(
    (acc, item) => acc + parseFloat(item.price.replace(",", "")),
    0
  );

  return (
    <>
      <Helmet>
        <title>Your Wishlist | Furnix</title>
        <meta
          name="description"
          content="Explore your saved items in your wishlist on Furnix. Keep track of your favorite products and plan your future purchases with ease."
        />
      </Helmet>

      <div className="min-h-screen p-9">
        <h2 className="text-2xl font-normal mb-2">Your Wishlist</h2>

        {wishlist.length === 0 ? (
          <p className="text-gray-500 text-sm">No items in wishlist.</p>
        ) : (
          <>
            <WishlistList wishlist={wishlist} removeWishlist={removeWishlist} />
            <WishlistSummary totalPrice={totalPrice} />
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
