import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./shared/context/WishlistContext";
import { CartProvider } from "./shared/context/CartContext";
import Navbar from "./shared/components/Navbar/Navbar";
import Footer from "./shared/components/Footer/footer";
import Home from "./features/home/HomePage";
import Shop from "./features/shop/Shop";
import ProductDetail from "./features/shop/components/ProductDetail";
import Contact from "./features/contact/Contact";
import Cart from "./features/cart/Cart";
import Wishlist from "./features/wishlist/wishlist";
import Checkout from "./features/checkout/checkout";
import Settings from "./features/settings/Settings";
import HelpSupport from "./features/help&support/HelpSupport"
import MyOrders from "./features/orders/orders";

const App = () => {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<HelpSupport />} />
          </Routes>
          <Footer />
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
};

export default App;
