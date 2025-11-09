import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import HelpSupport from "./features/help&support/HelpSupport";
import MyOrders from "./features/orders/orders";
import Dashboard from "./features/admin/Dashboard";
import AdminLogin from "./features/admin/components/AdminLogin";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* 👇 Regular navbar + footer only for user-side pages */}
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

const AppContent = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <Layout>
          <Routes>
            {/* User routes */}
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

            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </Layout>
      </WishlistProvider>
    </CartProvider>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
