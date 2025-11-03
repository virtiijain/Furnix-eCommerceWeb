import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./components/ShopComponent/ProductDetail";
import Contact from "./pages/Contact";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";

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
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
          <Footer />
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
};

export default App;
