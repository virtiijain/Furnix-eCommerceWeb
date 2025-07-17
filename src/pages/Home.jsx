import ProductCatalog from "../components/HomeComponent/ProductCatalog"
import Hero from "../components/HomeComponent/Hero";
import Faq from "../components/common/faq";
import ShopNow from "../components/HomeComponent/ShopNow";

const Home = () => {
  return (
    <>
    <Hero />
    <ProductCatalog />
    <Faq />
    <ShopNow />
    </>
  )
}

export default Home
