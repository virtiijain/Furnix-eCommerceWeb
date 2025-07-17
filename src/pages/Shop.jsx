import Products from "../components/ShopComponent/Products"
import Faq from '../components/common/faq'
import FilterBar from '../components/ShopComponent/FilterBar'

const Shop = () => {
  return (
    <>
    <FilterBar />
    <Products />
    <Faq />
    </>
  )
}

export default Shop