import img6 from "../../assets/img6.png";
import img7 from "../../assets/img7.png";
import img8 from "../../assets/img8.png";
import img9 from "../../assets/img9.png";
import img10 from "../../assets/img10.png";
import img11 from "../../assets/img11.png";
import img12 from "../../assets/img12.png";
import img13 from "../../assets/img13.png";
import img17 from "../../assets/img17.png";
import { useState } from "react";

const products = [
  {
    name: "Sofa Couch",
    price: "10,578",
    colors: ["#D4A373", "#A68A64"],
    image: img6,
  },
  {
    name: "Accent Chair",
    price: "3,608",
    colors: ["#D4E1F5", "#90A4AE"],
    image: img7,
  },
  {
    name: "Flower Vase",
    price: "656",
    colors: ["#C5E1A5"],
    image: img8,
  },
  {
    name: "Modern Chair",
    price: "3,116",
    colors: ["#78909C", "#9FA8DA", "#B39DDB"],
    image: img9,
  },
  {
    name: "Wood Chair",
    price: "1,968",
    colors: ["#A1887F"],
    image: img10,
  },
  {
    name: "Modern Lamp",
    price: "984",
    colors: ["#FFF9C4"],
    image: img11,
  },
  {
    name: "Aurla Chair",
    price: "4,510",
    colors: ["#EDE7F6"],
    image: img12,
  },
  {
    name: "Wood Table",
    price: "8,364",
    colors: ["#BCAAA4"],
    image: img13,
  },
];

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setIsCartOpen(true); // Open the cart drawer
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const priceWithoutCurrencyAndCommas = item.price.replace('₹', '').replace(',', '');
      const priceAsNumber = parseFloat(priceWithoutCurrencyAndCommas);
      return total + (priceAsNumber || 0); 
    }, 0);
  };

  return (
    <div id="shop" className="min-h-screen p-9">
      <div className="max-w-8xl mx-auto">
        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="border border-slate-500 p-4 rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="h-50 w-full object-cover rounded-md"
              />
              <h2 className="sm:text-sm md:text-base lg:text-lg font-medium truncate">
                {product.name}
              </h2>
              <p className="text-gray-500 font-medium mb-2">{product.price}</p>
              <div className="flex space-x-2 mb-3">
                {product.colors.map((color, colorIndex) => (
                  <span
                    key={colorIndex}
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
              <button
                className="font-light text-sm border border-slate-300 rounded-lg py-2 px-2"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5">
          <button
            className="text-lg font-bold text-gray-500"
            onClick={() => setIsCartOpen(false)}
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold mb-4">Cart</h2>
          {cart.length > 0 ? (
            <div>
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <div className="ml-3 flex-1">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-500">{item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2">{item.quantity}</span>
                  </div>
                  <button
                    className="text-red-500 font-light border border-slate-300 px-3 py-1 rounded-md"
                    onClick={() => removeFromCart(index)}
                  >
                    remove
                  </button>
                </div>
              ))}
              <p className="text-lg font-semibold mt-4">
                Total: ₹{calculateTotal().toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
          {cart.length > 0 && (
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-purplish text-white py-2 rounded-lg mt-4"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Checkout & Payment */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform ${
          isCheckoutOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5">
          <button
            className="text-lg font-semibold text-gray-500"
            onClick={() => setIsCheckoutOpen(false)}
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold mb-4">Checkout & Payment</h2>
          <p className="font-medium text-slate-600 text-base mb-4">
            Customer Information
          </p>
          <p className="text-lg font-semibold mb-4">
            Total: ₹{calculateTotal()}
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="border rounded-lg w-full px-3 py-2 mt-1"
              placeholder="hello@example.com"
            />
            <div className="grid grid-cols-2 gap-2 mt-3">
              <input
                type="text"
                className="border rounded-lg px-3 py-2"
                placeholder="First Name"
              />
              <input
                type="text"
                className="border rounded-lg px-3 py-2"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Shipping Address
            </label>
            <input
              type="text"
              className="border rounded-lg w-full px-3 py-2 mt-1"
              placeholder="Address"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              className="border rounded-lg px-3 py-2"
              placeholder="City"
            />
            <input
              type="text"
              className="border rounded-lg px-3 py-2"
              placeholder="Country"
            />
          </div>
          <form>
            <div className="mb-4 mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                className="border rounded-lg w-full px-3 py-2 mt-1"
                placeholder="Card Number"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <input
                type="text"
                className="border rounded-lg px-3 py-2"
                placeholder="Exp. Date"
              />
              <input
                type="text"
                className="border rounded-lg px-3 py-2"
                placeholder="CVV"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name on Card
              </label>
              <input
                type="text"
                className="border rounded-lg w-full px-3 py-2 mt-1"
                placeholder="Name"
              />
            </div>
            <button
              onClick={(event) => {
                event.preventDefault();
                // setIsPaymentOpen(false); // Close the payment modal
                setIsOrderConfirmed(true); // Open the order confirmation modal
              }}
              className="w-full bg-purplish text-white py-2 rounded-lg"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {isOrderConfirmed && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-96 text-center shadow-lg mx-6">
            <img
              src={img17}
              alt="Confirmation Tree"
              className="mx-auto mb-4 h-24"
            />
            <h2 className="text-xl font-semibold mb-4">
              Your Order is Confirmed!
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Thank you for shopping with us! Your beautiful new furniture is on
              its way and will be with you soon. Get ready to transform your
              space!
            </p>
            <button
              className="w-full bg-purplish text-white py-2 rounded-lg"
              onClick={() => {
                setIsOrderConfirmed(false); // Close the order modal
                setIsCartOpen(false); // Close the cart drawer
                setIsCheckoutOpen(false); // Close the checkout slider
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;