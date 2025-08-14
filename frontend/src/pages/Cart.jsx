import { useCart } from "../context/CartContext";
import CartItem from "../components/CartComponent/CartItem";
import CartSummary from "../components/CartComponent/CartSummary";
import { Helmet } from "react-helmet";

const Cart = () => {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();

  return (
    <>
      <Helmet>
        <title>Your Cart | Furnix</title>
        <meta
          name="description"
          content="Check out the products you've added to your cart on Furnix. Review prices, quantities, and item details. Place your order or update your cart quickly and easily. Shop smart and hassle-free today!"
        />
      </Helmet>

      <div className="min-h-screen p-9">
        <div className="max-w-8xl mx-auto">
          <h1 className="text-2xl font-normal mb-2">Your Cart</h1>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </div>

              <CartSummary totalPrice={totalPrice} clearCart={clearCart} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
