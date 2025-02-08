import ProductCatalog from "./components/ProductCatalog"
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Faq from "./components/Faq";
import Shop from "./components/Shop";

const App = () => {

  return (
    <>
    <Navbar />
    <Hero />
    <ProductCatalog />
    <Shop />
    <Faq />
    <Footer />
    </>
  );
}

export default App;
