import Hero from "../home/components/Hero";
import Faq from "../../shared/components/common/faq";
import ShopNow from "../home/components/ShopNow";
import Featured from "../home/components/Featured";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Furnix | Furniture for Modern Living</title>
        <meta
          name="description"
          content="Discover premium, minimalist furniture for your home. Shop sofas, beds, and decor at Furnix. Affordable luxury at your fingertips."
        />
      </Helmet>
      <Hero />
      <Featured />
      <Faq />
      <ShopNow />
    </>
  );
};

export default Home;
