import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => (
  <div className="border border-gray-400 rounded-lg p-5 text-center bg-white hover:shadow-md">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-40 object-contain mb-3"
    />
    <h3 className="text-md text-gray-700">{product.name}</h3>
    <Link to={`/product/${product._id || product.id}`}>
      <button className="mt-3 text-xs lg:text-sm border rounded px-3 py-1 inline-flex items-center gap-1 hover:bg-gray-100">
        Shop Now <IoIosArrowForward />
      </button>
    </Link>
  </div>
);

const Featured = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.slice(0, 6));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading)
    return <p className="text-center py-10">Loading featured products...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <section className="p-10 relative">
      <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-4">
        Featured Collection
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Handpicked pieces specially selected for you.
      </p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="[--swiper-navigation-color:#78350f] [--swiper-pagination-color:#78350f]"
      >
        {products.map((product, i) => (
          <SwiperSlide key={product._id || product.id || i}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Featured;

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
