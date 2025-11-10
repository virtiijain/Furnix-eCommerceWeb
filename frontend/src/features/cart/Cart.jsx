import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CartItem from "../cart/components/CartItem";
import CartTable from "../cart/components/CartTable";
import SummaryCard from "../cart/components/SummaryCard";
import { useCart } from "../../shared/hooks/useCart";

const Cart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const navigate = useNavigate();

  const { cartItems, handleQuantityChange, handleRemove, totalPrice } =
    useCart(userId);

  const handleProceedToBuy = () => {
    const checkoutData = { cartItems, totalPrice };
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    navigate("/checkout");
  };

  return (
    <section className="min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-medium mb-6 text-gray-800 text-center sm:text-left">
          My Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="flex flex-col md:grid md:grid-cols-[2fr,1fr] gap-4 md:gap-6">
            <div className="flex flex-col space-y-4 md:hidden">
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  handleQuantityChange={handleQuantityChange}
                  handleRemove={handleRemove}
                />
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border overflow-x-auto md:overflow-visible">
              <CartTable
                cartItems={cartItems}
                handleQuantityChange={handleQuantityChange}
                handleRemove={handleRemove}
              />
            </div>

            <div className="mt-6 md:mt-0 md:self-start">
              <SummaryCard
                totalPrice={totalPrice}
                handleProceedToBuy={handleProceedToBuy}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
