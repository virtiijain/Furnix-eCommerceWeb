import Products from "../components/ShopComponent/Products";
import Faq from "../components/common/faq";
import { Helmet } from "react-helmet";

const Shop = () => {
  return (
    <>
      <Helmet>
        <title>Shop | Furnix Store</title>
        <meta
          name="description"
          content="Explore Furnix's premium furniture collection — sofas, beds, tables, chairs, and more. Shop high-quality modern furniture at affordable prices."
        />
      </Helmet>
      <Products />
      <Faq />
    </>
  );
};

export default Shop;
