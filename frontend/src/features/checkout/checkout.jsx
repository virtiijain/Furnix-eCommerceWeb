import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../../shared/components/common/PaymentModal"
import OrderSummary from "../checkout/components/OrderSummary";
import CheckoutDetails from "../checkout/components/CheckoutDetails";

const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState(null);
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const userId = "674c72c24fd99b0fbd908a11";

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checkoutData"));
    if (!data) navigate("/cart");
    else setCheckoutData(data);
  }, [navigate]);

  const handleQuantityChange = (index, change) => {
    const updated = { ...checkoutData };
    const item = updated.cartItems[index];
    item.quantity = Math.max(1, (item.quantity || 1) + change);
    updated.totalPrice = updated.cartItems.reduce(
      (acc, curr) => acc + curr.productId.price * (curr.quantity || 1),
      0
    );
    setCheckoutData(updated);
    localStorage.setItem("checkoutData", JSON.stringify(updated));
  };

  const handleRemoveItem = (index) => {
    const updated = { ...checkoutData };
    updated.cartItems.splice(index, 1);
    updated.totalPrice = updated.cartItems.reduce(
      (acc, curr) => acc + curr.productId.price * (curr.quantity || 1),
      0
    );
    setCheckoutData(updated);
    localStorage.setItem("checkoutData", JSON.stringify(updated));
  };

  const handleConfirmOrder = async () => {
    if (!address.trim()) {
      setSuccessMsg("Please enter your address.");
      setTimeout(() => setSuccessMsg(""), 2000);
      return;
    }
    try {
      const res = await fetch("http://localhost:5500/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          items: checkoutData.cartItems.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity || 1,
          })),
          totalPrice: checkoutData.totalPrice,
          address,
        }),
      });
      const data = await res.json();
      console.log("Order placed:", data);
      localStorage.removeItem("checkoutData");
      setSuccessMsg("✅ Order placed successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/orders");
      }, 2000);
    } catch (err) {
      console.error("Error placing order:", err);
      setSuccessMsg("Something went wrong while placing order.");
      setTimeout(() => setSuccessMsg(""), 2000);
    }
  };

  if (!checkoutData) return null;

  return (
    <>
      <section className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr,1fr] gap-6 sm:gap-8">
          <OrderSummary
            cartItems={checkoutData.cartItems}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveItem}
          />
          <CheckoutDetails
            address={address}
            setAddress={setAddress}
            totalPrice={checkoutData.totalPrice}
            onConfirm={() => setShowModal(true)}
          />
        </div>
      </section>

      {showModal && (
        <PaymentModal
          totalPrice={checkoutData.totalPrice}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmOrder}
        />
      )}

      {successMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-yellow-900 text-white px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base">
          {successMsg}
        </div>
      )}
    </>
  );
};

export default Checkout;
